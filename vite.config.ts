/// <reference types="vite/client" />
import { defineConfig } from "vite";
import { resolve } from "path";
import tsConfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    dts({
      include: ["src"],
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve("src", "main.ts"),
      name: "vite-plugin-scope-tailwind",
      formats: ["es", "cjs"],
      fileName: (format) => {
        switch (format) {
          case "es":
            return `${format}/index.mjs`;
          case "cjs":
            return `${format}/index.cjs`;
          default:
            return "index.js";
        }
      },
    },
    rollupOptions: {
      external: ["fs", "path"],
    },
  },
});
