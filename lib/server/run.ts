import { startServer } from "./server";
import WebSocket from "ws";
import { SocketEvents } from "./events";

async function run() {
  const ws = new WebSocket("ws://localhost:8586");
  ws.on("open", async () => {
    await startServer(true);
    ws.send(SocketEvents.BUILD_COMPLETE);
  });
}

run();
