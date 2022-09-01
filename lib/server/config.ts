import "./ssr-compat";
import path from "path";
import { LibConfig } from "../framework/types";
import { __Document } from "./document";
import { readFile, writeFile } from "fs/promises";

/** Read in and parse a user provided configuration */
export async function getUserConfig(watchMode = false): Promise<LibConfig> {
  const lassoConf = path.join(process.cwd(), "./lasso.config.json");
  /** Default configuration */
  const defaultConfig: LibConfig = {
    appDir: path.join(process.cwd(), "./src"),
    mode: "production",
    css: null,
    watchMode,
    global: {
      styles: [],
      scripts: [],
    },
  };

  try {
    const rawConfiguration = await readFile(lassoConf, "utf-8");
    const parsedConfiguration: LibConfig = JSON.parse(rawConfiguration);

    return {
      ...defaultConfig,
      ...parsedConfiguration,
    };
  } catch (error) {
    await writeFile(
      lassoConf,
      JSON.stringify(defaultConfig, undefined, 4),
      "utf-8"
    );

    return defaultConfig;
  }
}
