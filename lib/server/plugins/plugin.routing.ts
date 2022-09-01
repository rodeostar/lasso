import path from "path";
import { paths } from "../consts";
import type { Plugin } from "./index";

export const PluginRouting: Plugin = (validator) =>
  validator(
    "SPA Routing enabled. ✓",
    (config) => config?.routing == true,
    async () => {
      return {
        scripts: [path.join(paths.static, "./router.js")],
      };
    }
  );
