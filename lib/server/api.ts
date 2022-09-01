import recursiveReadDir from "recursive-readdir";
import path from "path";
import { FastifyInstance } from "fastify";
import { paths } from "./consts";
import type { Handler } from "../framework/types";
import { log } from "./logs";

const { info, logs } = log;

export const attachAPIRoutes = async (fastify: FastifyInstance) => {
  const apiFiles = await recursiveReadDir(paths.api);

  await Promise.all(
    apiFiles.map(async (filepath) => {
      const __Module = await import(path.relative(__dirname, filepath));

      if (typeof __Module.default === "function") {
        /** Type cast default export as an API handler */
        const handler: Handler = __Module.default;

        /** Detect [slug].ts naming convention */
        let reg = /(?<=\[).+?(?=\])/g;
        let result: RegExpExecArray;
        while ((result = reg.exec(filepath)) !== null) {
          /** Convert [slug]->:slug to match the fastify framework convention */
          filepath = filepath.replace(`[${result}]`, `:${result}`);
        }

        let route =
          "/api" + filepath.replace(/\\/g, "/").split("/api")[1].slice(0, -3);

        info([`Route registered: ${route}. ✓`]);

        /** Invoke handler */
        handler(fastify, route);
      }
    })
  );

  logs();
};
