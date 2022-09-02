import type { Handler } from "@rodeostar/lasso";

const HelloWorldHandler: Handler = (server, route) => {
  server.get(route, (_, reply) => {
    reply.send({ hello: "world" });
  });
};

export default HelloWorldHandler;
