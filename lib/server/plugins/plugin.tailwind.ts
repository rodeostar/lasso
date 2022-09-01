import { writeFile } from "fs/promises";
import { attachStyles, collectStyles } from "../css";
import { paths } from "../consts";
import type { Plugin } from "./index";
import { StylesCache } from "../../framework";

export const PluginTailwindCSS: Plugin = (makePlugin) =>
  makePlugin(
    "TailwindCSS enabled. ✓",
    (config) => !!config?.css,
    async (doc, config) => {
      if (!doc?.name) {
        throw Error("No document name found.");
      }

      collectStyles(config.css);

      const cssName = `${paths.static}/${doc.name}.css`;
      await writeFile(cssName, attachStyles(StylesCache), "utf-8");

      return {
        stylesheets: [cssName],
      };
    }
  );
