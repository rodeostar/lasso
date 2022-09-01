import { writeFile } from "fs/promises";
import path from "path";
import { paths } from "../consts";
import type { Plugin } from "./index";

export const PluginHMR: Plugin = (validator) =>
  validator(
    "HMR  enabled. ✓",
    (config) => config?.watchMode == true,
    async () => {
      /** Adds websocket client to the document */
      const hmrclient = path.join(paths.static, "hmr.js");

      await writeFile(
        hmrclient,
        `(function() {
            const ws = new WebSocket("ws://localhost:8586");
            ws.onmessage = (event) => event.data === "1" && window.location.reload()
          })();`,
        "utf-8"
      );

      return {
        scripts: [hmrclient],
      };
    }
  );
