import { readFile, writeFile } from "fs/promises";
import { paths } from "../consts";
import type { Plugin } from "./index";
import path from "path";

/** Moves global styles and scripts specified in the user config to the static dir */
const moveStatic = (concat: (file: string) => void) => async (file: string) => {
  const outFile = path.join(paths.static, file);
  await readFile(path.join(paths.input, file), "utf-8").then(async (data) => {
    await writeFile(outFile, data, "utf-8");
    concat(outFile);
  });
};

export const PluginScripts: Plugin = (makePlugin) =>
  makePlugin(
    "Scripts enabled. ✓",
    (config) => !!config?.global?.scripts,
    async (_, conf) => {
      const scripts = [];

      /** Attach global JS files to the document */
      await Promise.all(
        conf.global.scripts.map(
          moveStatic((file) => {
            scripts.unshift(file);
          })
        )
      );
      return {
        scripts,
      };
    }
  );

export const PluginStylesheets: Plugin = (makePlugin) =>
  makePlugin(
    "Styles enabled. ✓",
    (config) => !!config?.global?.styles,
    async (_, conf) => {
      const stylesheets = [];

      /** Attach global JS files to the document */
      await Promise.all(
        conf.global.styles.map(
          moveStatic((file) => {
            stylesheets.unshift(file);
          })
        )
      );
      return {
        stylesheets,
      };
    }
  );
