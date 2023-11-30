import { startServer } from "./server";
import WebSocket from "ws";
import { SocketEvents } from "./events";

async function run() {
  const ws = new WebSocket("ws://localhost:3333");
  ws.on("open", async () => {
    await startServer(true);
    ws.send(SocketEvents.BUILD_COMPLETE);
  });
}

run();
