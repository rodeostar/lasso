#!/usr/bin/env node
import "./ssr-compat";
import { startServer } from "./server";
import nodemon from "nodemon";
import WebSocket, { WebSocketServer } from "ws";
import { SocketEvents } from "./events";
import path from "path";
import recursiveReadDir from "recursive-readdir";
import { constants, copyFile } from "fs/promises";
import { existsSync } from "fs";
import mkdirp from "mkdirp";
const args = process.argv.slice(2);
const watchMode = args.includes("--watch");
const init = args.includes("--init");

let sockets: WebSocket.WebSocket[] = [];

const toTplTarget = (file: string) =>
  path.join(
    process.cwd(),
    path.relative(
      path.join(__dirname, "../../template"),
      path.relative(process.cwd(), file)
    )
  );

export async function main() {
  if (init) {
    const rel = path.resolve(__dirname, "../../template");
    const input = await recursiveReadDir(rel);
    const missingFiles = input
      .map((file) => ({
        rel: path.relative(process.cwd(), file),
        dir: path.dirname(toTplTarget(file)),
        source: file,
        target: toTplTarget(file),

        get exists() {
          return existsSync(this.target);
        },
      }))
      .filter((item) => !item.exists);

    if (missingFiles.length === 0) {
      console.log(
        "There is already a project in this directory. Lasso cannot init."
      );
      process.exit(0);
    }

    console.log("Missing required files:\n\n");
    console.log(missingFiles.map((i) => i.rel).join("\n"));

    console.log("\nCreating them...\n");
    for (const missing of missingFiles) {
      await mkdirp(missing.dir);
      console.log("Mounted\n" + missing.dir + "\n");

      await copyFile(missing.source, missing.target, constants.COPYFILE_EXCL);
      console.log(`Wrote: \n${missing.rel} => ${missing.target}\n\n`);
    }
  }

  if (watchMode) {
    const wss = new WebSocketServer({
      port: 8586,
    });

    wss.on("connection", (socket) => {
      /** Track all connections */
      sockets.push(socket);
      socket.on("message", (e) => {
        const payload: SocketEvents = parseInt(e.toString());

        /** If the build is complete, send a reload event */
        if (payload === SocketEvents.BUILD_COMPLETE) {
          sockets.forEach((connection) => connection.send(SocketEvents.RELOAD));

          /** Clear the connections */
          sockets = [];
        }
      });
    });

    /** Re-run the script on ts change */
    nodemon({
      script: path.join(__dirname, "./run.js"),
      ext: "ts json css scss",
    });
  } else {
    await startServer(false);
  }
}

main();
