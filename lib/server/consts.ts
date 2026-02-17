import path from "path";
import { mkdir } from "fs/promises";
import { pathToFileURL } from "url";
import { rm } from "fs/promises";
import { existsSync } from "fs";

const pathsMap = {
  input: "src",
  output: ".lasso",
  build: ".lasso/dist",
  static: ".lasso/assets",
  pages: ".lasso/dist/pages",
  api: ".lasso/dist/api",
  manifest: ".lasso/manifest.js",
  tsConfig: "tsconfig.json",
};

export const paths = {
  ...pathsMap,
  withBase(key: string): string | undefined {
    if (key in pathsMap) {
      return pathToFileURL(path.join(process.cwd(), pathsMap[key as keyof typeof pathsMap])).toString();
    }
    return undefined;
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
  await Promise.all(must.map((file) => mkdir(file, { recursive: true, mode: 0o777 })));
}
