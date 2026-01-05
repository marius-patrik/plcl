import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: "./src/main.tsx",
    },
  },
  resolve: {
    alias: {
      "@plcl/core/styles.css": resolve(__dirname, "../@plcl-core/dist/esm/index.css"),
      "@plcl/core": resolve(__dirname, "../@plcl-core/dist/esm/index.js"),
      "@plcl/ui": resolve(__dirname, "../@plcl-ui/dist/esm/index.js"),
      "@plcl/core-types": resolve(__dirname, "../@plcl-core-types/dist/esm/index.js"),
      "@plcl/ui-types": resolve(__dirname, "../@plcl-ui-types/dist/esm/index.js"),
    },
  },
  server: {
    port: 4001,
  },
  html: {
    title: "PLCL Library Playground",
  },
});
