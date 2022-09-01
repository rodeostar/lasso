import "../ssr-compat";
import { paths } from "../consts";
import { DocumentOptions, __Document } from "../document";
import { type FC, renderToString } from "../../framework";
import type { Plugin } from "./index";
import path from "path";

type DynamicPageImport = {
  default: FC<{}>;
  __Page?: DocumentOptions;
};

const projectDir = (...file: string[]) =>
  path.relative(__dirname, path.join(process.cwd(), ...file));

export const PluginPages: Plugin = (validator) =>
  validator(
    "Page plugin enabled. ✓",
    () => true,
    async (doc) => {
      console.log(doc.page);
      const modulePath = projectDir(doc.page);

      /** Dynamic import of the default module */
      const __Module: DynamicPageImport = await import(modulePath).catch(
        (error) => {
          console.info({ error, page: modulePath });
        }
      );

      /** Avoid dead files */
      if (typeof __Module.default !== "function") {
        console.error(
          `Expected __Module of type function but received ${typeof __Module.default}`
        );
        return null;
      }

      /** File writeout name */
      const outfile = `${paths.static}/${doc.name}.js`;

      /** Server side rendering of the template */
      const body = await renderToString(__Module.default);

      /** Create a new object and attach the body html and scripts */
      return {
        body,
        scripts: [outfile],
        ...(__Module?.__Page || {}),
      };
    }
  );
