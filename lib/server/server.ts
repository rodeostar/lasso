import "./ssr-compat";
import Fastify from "fastify";
import { build } from "./build";
import { attachAPIRoutes } from "./api";
import { serveStatic } from "./static";
import { log } from "./logs";

export async function startServer(watchMode = false) {
  const fastify = await Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
      },
    },
  });

  const routes = await build(watchMode);

  for (const { route, getDocument } of routes) {
    const doc = await getDocument();

    fastify.get(route, async function (_, reply) {
      reply.type("text/html");
      reply.send(doc);
    });
  }

  log.logs();

  /** Searches through the user's API directory and attaches routes */
  await attachAPIRoutes(fastify);

  /** Handle js, css, images, etc. */
  await serveStatic(fastify);

  await fastify.listen({ host: "0.0.0.0", port: 8585 });
}
