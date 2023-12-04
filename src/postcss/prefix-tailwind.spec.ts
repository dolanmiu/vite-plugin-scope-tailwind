import { describe, it, expect, vi, test } from "vitest";

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

  it("should walk and prefix selectors", async () => {
    const output = prefixPlugin({
      prefix: "test.",
      ignore: [],
    });

    const walkRules = vi.fn().mockImplementation((fn) => {
      const input = {
        selectors: [".test-class"],
      };
      expect(fn(input)).toEqual(undefined);
      expect(input.selectors).toEqual([".test.test-class"]);
    });

    (output as any).Root({
      walkRules,
    });
  });

  test.each([{ ignore: [/sb-/] }, { ignore: /sb-/ }])(
    "should ignore classes with Regex",
    ({ ignore }) => {
      const output = prefixPlugin({
        prefix: "test.",
        ignore,
      });

      const walkRules = vi.fn().mockImplementation((fn) => {
        const input = {
          selectors: [".sb-test-class", ".test-class"],
        };
        expect(fn(input)).toEqual(undefined);
        expect(input.selectors).toEqual([".sb-test-class", ".test.test-class"]);
      });

      (output as any).Root({
        walkRules,
      });
    },
  );

  test.each([{ ignore: ["ignore"] }, { ignore: "ignore" }])(
    "should ignore classes with string",
    ({ ignore }) => {
      const output = prefixPlugin({
        prefix: "test.",
        ignore,
      });

      const walkRules = vi.fn().mockImplementation((fn) => {
        const input = {
          selectors: [".ignore"],
        };
        expect(fn(input)).toEqual(undefined);
        expect(input.selectors).toEqual([".ignore"]);
      });

      (output as any).Root({
        walkRules,
      });
    },
  );

  it("should return false if there are no selectors", async () => {
    const output = prefixPlugin({
      prefix: "test.",
      ignore: [],
    });

    const walkRules = vi.fn().mockImplementation((fn) => {
      expect(fn({})).toEqual(false);
    });

    (output as any).Root({
      walkRules,
    });
  });

  it("should walk non-class selectors", async () => {
    const output = prefixPlugin({
      prefix: "test.",
      ignore: [],
    });

    const walkRules = vi.fn().mockImplementation((fn) => {
      const input = {
        selectors: ["test"],
      };
      expect(fn(input)).toEqual(undefined);
      expect(input.selectors).toEqual(["test"]);
    });

    (output as any).Root({
      walkRules,
    });
  });
});
