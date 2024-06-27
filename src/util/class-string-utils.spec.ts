import { describe, expect, it } from "vitest";
import {
  appendIdWithQuotesInMind,
  getNonQuotedCleanedOutput,
} from "./class-string-utils";

describe("appendIdWithQuotesInMind", () => {
  it("should work for regular case", () => {
    expect(appendIdWithQuotesInMind("test", "prefix")).toEqual("prefix-test");
  });

  it("should work for double quotes at the end", () => {
    expect(appendIdWithQuotesInMind(`test"`, "prefix")).toEqual(`prefix-test"`);
  });

  it("should work for single quotes at the end", () => {
    expect(appendIdWithQuotesInMind(`test'`, "prefix")).toEqual(`prefix-test'`);
  });

  it("should work for double quotes at the front", () => {
    expect(appendIdWithQuotesInMind(`"test`, "prefix")).toEqual(`"prefix-test`);
  });

  it("should work for single quotes at the front", () => {
    expect(appendIdWithQuotesInMind(`'test`, "prefix")).toEqual(`'prefix-test`);
  });

  it("should work for single quotes at the front and end", () => {
    expect(appendIdWithQuotesInMind(`'test'`, "prefix")).toEqual(
      `'prefix-test'`,
    );
  });

  it("should work for double quotes at the front and end", () => {
    expect(appendIdWithQuotesInMind(`"test"`, "prefix")).toEqual(
      `"prefix-test"`,
    );
  });
});

describe("getNonQuotedCleanedOutput", () => {
  it("should work for double quotes", () => {
    expect(getNonQuotedCleanedOutput(`test"`)).toEqual("test");
    expect(getNonQuotedCleanedOutput(`"test`)).toEqual("test");
  });

  it("should work for single quotes", () => {
    expect(getNonQuotedCleanedOutput(`test'`)).toEqual("test");
    expect(getNonQuotedCleanedOutput(`'test`)).toEqual("test");
  });
});
