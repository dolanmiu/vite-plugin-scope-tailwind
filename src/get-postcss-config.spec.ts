import { describe, it, expect } from "vitest";

import { getPostCssConfig, postCssPluginsToArray } from "./get-postcss-config";

// global.require = vi.fn(() => {});

describe("get-postcss-config", () => {
  describe("getPostCssConfig", () => {
    it("should work", async () => {
      const output = getPostCssConfig();
      expect(output).toEqual({
        plugins: {
          autoprefixer: {},
          tailwindcss: {},
        },
      });
    });
  });

  describe("postCssPluginsToArray", () => {
    it("should work", async () => {
      const output = postCssPluginsToArray({
        plugins: {
          test: {},
          foo: {},
        },
      });
      expect(output).toEqual(["test", "foo"]);
    });
  });
});
