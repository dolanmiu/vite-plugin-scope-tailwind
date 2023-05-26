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
    lib: {
      entry: resolve("src", "main.ts"),
      name: "vite-plugin-scope-tailwind",
      formats: ["es", "cjs"],
      fileName: (format) => `${format}/index.js`,
    },
    rollupOptions: {
      external: ["fs", "path"],
    },
  },
});
