import path from "path";
import mkdirp from "mkdirp";
import { pathToFileURL } from "url";
import { rm } from "fs/promises";
import { existsSync } from "fs";

export const paths = {
  input: "src",
  output: ".lasso",
  build: ".lasso/dist",
  static: ".lasso/assets",
  pages: ".lasso/dist/pages",
  api: ".lasso/dist/api",
  manifest: ".lasso/manifest.js",
  tsConfig: "tsconfig.json",
  /** Utility to get absolute paths */
  withBase(key: string) {
    if (key in this && key !== "withBase") {
      return pathToFileURL(path.join(process.cwd(), this[key])).toString();
    }
  },
};

/** Ensure directories exist, to avoid read/write errors later on */
export async function ensureDirectories() {
  const lasso = path.join(process.cwd(), paths.output);
  const exists = existsSync(lasso);

  if (exists) {
    await rm(lasso, {
      recursive: true,
    });
  }

  const must = [
    "src/pages",
    "src/api",
    paths.static,
    paths.pages,
    paths.api,
  ].map((p) => path.join(process.cwd(), p));

  /** Wait until all directories exist */
  await Promise.all(must.map((file) => mkdirp(file, "777")));
}
