#!/usr/bin/env node
import "./ssr-compat";
import { startServer } from "./server";
import nodemon from "nodemon";
import WebSocket, { WebSocketServer } from "ws";
import { SocketEvents } from "./events";
import path from "path";

const args = process.argv.slice(2);

const watchMode = args.includes("--watch");

let sockets: WebSocket.WebSocket[] = [];

export async function main() {
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
