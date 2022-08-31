import "./ssr-compat";
import path from "path";
import { LibConfig } from "lib";
import { __Document } from "./document";
import { readFile } from "fs/promises";

/** Default configuration */
const defaultConfig: LibConfig = {
  appDir: path.join(process.cwd(), "./src"),
  mode: "production",
  css: {},
};

/** Read in and parse a user provided configuration */
export async function getUserConfig(): Promise<LibConfig> {
  try {
    const rawConfiguration = await readFile(
      path.join(process.cwd(), "./lasso.config.json"),
      "utf-8"
    );

    const parsedConfiguration: LibConfig = JSON.parse(rawConfiguration);

    return {
      ...defaultConfig,
      ...parsedConfiguration,
    };
  } catch (error) {
    console.log(error);
    return defaultConfig;
  }
}
