import path from "path";
import { readFile } from "fs/promises";
import { FastifyInstance, FastifyRequest } from "fastify";
import { paths } from "./consts";

export async function handleStatic(request: FastifyRequest) {
  if (request.url.match(/\.(css|js|jpg)$/i)) {
    return await readFile(path.join(process.cwd(), request.url), "utf-8");
  } else {
    return null;
  }
}

function getReplyType(extension: string) {
  switch (extension) {
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    case ".html":
      return "text/html";
    default:
      return "text/plain";
  }
}

export async function serveStatic(fastify: FastifyInstance) {
  /** Serve static assets  */
  fastify.get(`/${paths.static}/*`, async function (request, reply) {
    const isStatic = await handleStatic(request);
    const ext = path.extname(request.url);

    reply.type(getReplyType(ext));
    reply.send(isStatic || "404");
  });
}
