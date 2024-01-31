import { resolve } from "path";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

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
  test: {
    globals: true,
    coverage: {
      provider: "v8",
      reportsDirectory: "coverage",
      enabled: true,
      reporter: ["text", "cobertura", "html"],
      statements: 91.21,
      branches: 96.55,
      functions: 91.66,
      lines: 91.21,
      exclude: ["**/src/test/**", "**/*.test.{ts,tsx}"],
    },
    reporters: ["default"],
    testTimeout: 60000,
  },
});
