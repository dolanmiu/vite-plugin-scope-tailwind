import { describe, expect, it } from "vitest";
import { splitClassNames } from "./tailwind-edgecases";

describe("splitClassNames", () => {
  it("should correctly split class names", () => {
    expect(splitClassNames(`px-3\\.5.py-4.bg-red-500`)).toEqual([
      `px-3\\.5`,
      `py-4`,
      `bg-red-500`,
    ]);
    expect(splitClassNames(`px-3\\.5.py-4.bg-red-500`)).toEqual([
      `px-3\\.5`,
      `py-4`,
      `bg-red-500`,
    ]);
    expect(splitClassNames(`px-3\\.5`)).toEqual([`px-3\\.5`]);
  });

  it("should return an empty array for an empty string", () => {
    expect(splitClassNames("")).toEqual([""]);
  });

  it("should ignore leading, trailing, and consecutive dots", () => {
    expect(splitClassNames(`.px-3\\.5..py-4...bg-red-500.`)).toEqual([
      "",
      `px-3\\.5`,
      "",
      `py-4`,
      "",
      "",
      `bg-red-500`,
      "",
    ]);
  });

  it("should ignore leading, trailing, and consecutive dots", () => {
    expect(splitClassNames(`.ignore`)).toEqual(["", `ignore`]);
  });
});
