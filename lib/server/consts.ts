import path from "path";
import mkdirp from "mkdirp";
import { pathToFileURL } from "url";

export const paths = {
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
