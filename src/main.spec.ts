import { describe, it, expect, vi } from "vitest";

import plugin from "./main";

// global.require = vi.fn();
vi.stubGlobal("require", vi.fn());

describe("plugin", () => {
  it("should work", async () => {
    const output = plugin({});

    expect(output).toContain({
      name: "vite-plugin-scope-tailwind",
    });
  });

  it("should work for react", async () => {
    const output = plugin({
      react: true,
    });

    expect(output).toContain({
      name: "vite-plugin-scope-tailwind",
    });
  });
});
