#!/usr/bin/env node
import "./ssr-compat";
import path from "path";
import Fastify from "fastify";
import { FC, renderToString } from "../framework";
import { DocumentOptions, __Document } from "./document";
import { readdir, writeFile } from "fs/promises";
import {
  bundleApp,
  getUserConfig,
  attachStyles,
  collectStyles,
  paths,
  ensureDirectories,
  bundleJS,
  serveStatic,
  attachAPIRoutes,
} from "./deps";
import { log } from "./logs";

const { info, logs } = log;

type DynamicPageImport = {
  default: FC<{}>;
  __Page?: DocumentOptions;
};

async function main() {
  /** Ingest user provided config */
  const userConfig = await getUserConfig();

  info([
    "Unpacked config. ✓",
    `\n`,
    Object.entries(userConfig)
      .map((i) => `>>> ${i[0]}: ${JSON.stringify(i[1], undefined, 4)}`)
      .join(`\n`),
  ]);

  /** Ensure required directories exist in .lasso */
  await ensureDirectories();

  /** Bundle application runtime */
  await bundleApp();

  /** Bundle client side scripts */
  await bundleJS(userConfig.mode);

  /** Initialize Fastify http */
  const fastify = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
      },
      prettifier: true,
    },
  });

  /** Get all routes in the pages directory */
  const pagesDirectory = await readdir(paths.pages);
  const pageFiles = pagesDirectory.map((file) =>
    path.relative(__dirname, path.join(process.cwd(), paths.pages, file))
  );

  if (pageFiles) {
    /** Collect styles from template css`` directive */
    collectStyles(userConfig.css);

    await attachAPIRoutes(fastify);

    for (const pageFilePath of pageFiles) {
      /** Build the target path for a user provided component */

      /** Dynamic import of the default module */
      const __Module: DynamicPageImport = await import(pageFilePath).catch(
        (error) => {
          console.info({ error, pageFilePath });
        }
      );

      /** Avoid dead files */
      if (typeof __Module.default !== "function") {
        console.error(
          `Expected __Module of type function but received ${typeof __Module.default}`
        );
        continue;
      }

      /** Readable name, i.e. home.ts -> home */
      const name = path.basename(pageFilePath, ".js");

      info([`Page registered: ${name}. ✓`]);

      /** File writeout name */
      const outfile = `${paths.static}/${name}.js`;

      /** Server side rendering of the template */
      const { html: body, cssCache } = await renderToString(__Module.default);

      /** Configuration for the HTML builder */
      const docOptions: DocumentOptions = __Module?.__Page || {};

      docOptions.body = body;
      docOptions.scripts = [outfile];

      if (userConfig.routing) {
        info(["Single page routing enabled. ✓"]);
        docOptions.scripts.push(path.join(paths.static, "./router.js"));
      }

      /** Attach styles to the virtual sheet from the library's css cache */
      if (userConfig.css) {
        info(["TailwindCSS enabled. ✓"]);
        const cssName = `${paths.static}/${name}.css`;
        await writeFile(cssName, attachStyles(cssCache));
        docOptions.stylesheets = [cssName];
      }

      /** Account for index as the default route */
      const routeDefaulted = name === "index" ? "/" : `/${name}`;

      /** Attach route to fastify */
      fastify.get(routeDefaulted, async function (_, reply) {
        reply.type("text/html");
        reply.send(__Document(docOptions));
      });
    }

    logs();

    /** Attach static handlers */
    await serveStatic(fastify);

    try {
      /** Start the server */
      await fastify.listen({ port: 3000 });
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }
}

main();
