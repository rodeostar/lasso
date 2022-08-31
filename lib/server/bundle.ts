import glob from "glob";
import esbuild from "esbuild";
import { paths } from "./consts";

import { replaceTscAliasPaths } from "tsc-alias";
import path from "path";

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
});

export async function bundleJS(
  mode: "production" | "development" = "production"
) {
  const pages = glob.sync(`./src/pages/**/*.ts`, globOpts);

  await esbuild.build({
    outdir: paths.static,
    entryPoints: pages,
    outbase: "src/pages",
    ...browserOpts(mode),
  });

  const router = path.join(__dirname, "../framework/api/routing.js");

  await esbuild.build({
    entryPoints: [router],
    outfile: path.join(paths.static, "./router.js"),
    outbase: path.dirname(router),
    ...browserOpts(mode),
  });
}

export async function bundleApp() {
  const pattern = (...exts: string[]) =>
    exts.map((ext) => glob.sync(`./src/**/*${ext}`, globOpts)).flat();

  const entryPoints = pattern(".ts");

  await esbuild.build({
    tsconfig: paths.tsConfig,
    target: "es2017",
    entryPoints,
    outdir: paths.build,
    legalComments: "none",
    format: "cjs",
    treeShaking: true,
    platform: "node",
  });

  await replaceTscAliasPaths({
    configFile: paths.tsConfig,
  });
}
