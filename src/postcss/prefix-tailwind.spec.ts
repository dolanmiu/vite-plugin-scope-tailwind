import { describe, it, expect, vi } from "vitest";

import { prefixPlugin } from "./prefix-tailwind";

describe("prefixPlugin", () => {
  it("should work", async () => {
    expect(true).toEqual(true);
  });

  it("should work", async () => {
    const output = prefixPlugin({
      prefix: "test",
      ignore: [],
    });

    expect(output).toContain({ postcssPlugin: "prefix-tailwind-classes" });
  });

  it("should call walkRules", async () => {
    const output = prefixPlugin({
      prefix: "test",
      ignore: [],
    });

    const walkRules = vi.fn();

    (output as any).Root({
      walkRules,
    });

    walkRules({
      selectors: [],
    });
  });
});
