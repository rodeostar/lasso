import esbuild from "esbuild";
import { globSync } from "glob";
import path from "path";
import { paths } from "./consts";
import { replaceTscAliasPaths } from "tsc-alias";
import type { LibConfig } from "../framework/types";

const globOpts = {
  ignore: ["node_modules/**/*"],
};

const browserOpts = (
  mode: "production" | "development" = "production"
): Partial<esbuild.BuildOptions> => ({
  target: "es2017",
  bundle: true,
  minify: mode === "production",
  minifyWhitespace: mode === "production",
  legalComments: "none",
  format: "iife",
  treeShaking: true,
  platform: "browser",
  sourcemap: mode === "development",
});

const isDev = (config: LibConfig) => !!config?.__frameworkdev;

export async function bundleJS(config: LibConfig) {
  const pages = globSync(`./src/pages/**/*.ts`, globOpts);

  await esbuild.build({
    outdir: paths.static,
    entryPoints: pages,
    outbase: "src/pages",
    ...browserOpts(config.mode),
  });

  const router = path.join(__dirname, "../framework/api/routing.js");

  await esbuild.build({
    entryPoints: [router],
    outfile: path.join(paths.static, "./router.js"),
    outbase: path.dirname(router),
    ...browserOpts(config.mode),
  });
}

export async function bundleApp(config: LibConfig) {
  const entryPoints = globSync(`./src/**/*.ts`, globOpts);

  await esbuild.build({
    tsconfig: paths.tsConfig,
    target: "es2017",
    entryPoints,
    outdir: isDev(config) ? paths.pages : paths.build,
    legalComments: "none",
    format: "cjs",
    treeShaking: true,
    platform: "node",
    sourcemap: config.mode === "development",
  });

  await replaceTscAliasPaths({
    configFile: paths.tsConfig,
  });
}
