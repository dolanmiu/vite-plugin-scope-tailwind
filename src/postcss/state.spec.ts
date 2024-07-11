import { describe, expect, it } from "vitest";

import { getTailwindClassNames, persistTailwindClassNames } from "./state";

describe("persistTailwindClassNames", () => {
  it("should work", async () => {
    persistTailwindClassNames(["test"]);

    expect(getTailwindClassNames()).toEqual(new Set(["test"]));

    persistTailwindClassNames([""]);
    expect(getTailwindClassNames()).toEqual(new Set(["test"]));

    persistTailwindClassNames(["[&:not(:first-child)]:border-t"]);
    expect(getTailwindClassNames()).toEqual(
      new Set(["test", "[&:not(:first-child)]:border-t"]),
    );

    persistTailwindClassNames(["focus\\:outline-none:focus"]);
    expect(getTailwindClassNames()).toEqual(
      new Set([
        "test",
        "[&:not(:first-child)]:border-t",
        "focus:outline-none",
        "focus:outline-none:focus",
      ]),
    );
  });
});
