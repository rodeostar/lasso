import "./ssr-compat";
import path from "path";
import { LibConfig } from "../framework";
import { readdir } from "fs/promises";
import { paths } from "./deps";
import { log } from "./logs";
import { getUserConfig, ensureDirectories, bundleApp, bundleJS } from "./deps";
import {
  ExecutePlugins,
  PluginHMR,
  PluginRouting,
  PluginTailwindCSS,
  PluginScripts,
  PluginStylesheets,
  PluginPages,
} from "./plugins";

const { info } = log;

export function createPageRoute(page: string, name: string, config: LibConfig) {
  return {
    page,
    get route() {
      return name === "index" ? "/" : `/${name}`;
    },
    async getDocument() {
      /**
       * Plugins are asyncronous reducers that have access to the user
       * configuration, and always give back the previous document options
       * plus any additional mutations.
       */
      const plugins = [
        PluginPages,
        PluginHMR,
        PluginRouting,
        PluginTailwindCSS,
        PluginScripts,
        PluginStylesheets,
      ];

      return await ExecutePlugins({
        config,
        options: {
          mode: config.mode,
          page,
          name,
        },
        plugins,
      });
    },
  };
}

export async function build(watchMode = false) {
  /** Ensure required directories exist in .lasso */
  await ensureDirectories();

  /** Ingest user provided config */
  const config = await getUserConfig(watchMode);

  info(["Unpacked config. ✓"]);

  /** Bundle application runtime */
  await bundleApp(config);

  /** Bundle client side scripts */
  await bundleJS(config);

  /** Get all routes in the pages directory (only .js, not .map) */
  const allFiles = await readdir(paths.pages);
  const pages = allFiles.filter((f) => f.endsWith(".js") && !f.endsWith(".js.map"));

  return pages.map((file) =>
    createPageRoute(
      path.join(paths.pages, file),
      path.basename(file, ".js"),
      config
    )
  );
}
