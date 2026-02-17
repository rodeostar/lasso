import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["**/*.test.ts", "**/*.spec.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "dist/", "**/*.test.ts", "**/*.spec.ts", "template/"],
    },
  },
  resolve: {
    alias: {
      blockdom: path.resolve(__dirname, "./blockdom/index.ts"),
      "@rodeostar/lasso": path.resolve(__dirname, "./framework/index.ts"),
    },
  },
});
