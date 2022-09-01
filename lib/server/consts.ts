import path from "path";
import mkdirp from "mkdirp";
import { pathToFileURL } from "url";
import { rmdir } from "fs/promises";
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
    await rmdir(lasso, {
      recursive: true,
    });
  }

  const must = [
    paths.output,
    paths.build,
    paths.static,
    paths.pages,
    paths.api,
  ];

  /** Wait until all directories exist */
  await Promise.all(must.map(mkdirp));
}
