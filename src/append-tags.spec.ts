import {
  COMPILED_BACK_TICK_JSX_WITH_PREFLIGHT_TAGS,
  COMPILED_NESTED_TAG_JSX,
} from "@/mocks/compiled-jsx";
import { HTML } from "@/mocks/html";
import { describe, expect, it } from "vitest";
import { appendTags, appendTagsForReact } from "./append-tags";

describe("append-tags", () => {
  describe("appendTagsForReact", () => {
    it("should work", async () => {
      const transformedCode = appendTagsForReact("test-id")(
        COMPILED_BACK_TICK_JSX_WITH_PREFLIGHT_TAGS,
      );
      expect(transformedCode).toEqual(
        expect.objectContaining({
          code: expect.stringContaining(`className: "test-id`),
        }),
      );
    });

    it("should work with nested tags", async () => {
      const transformedCode = appendTagsForReact("test-id")(
        COMPILED_NESTED_TAG_JSX,
      );
      expect(transformedCode).toEqual(
        expect.objectContaining({
          code: expect.stringContaining(`className: "test-id`),
        }),
      );
    });
  });

  describe("appendTags", () => {
    it("should work", async () => {
      const transformedCode = appendTags("test-id")(HTML);
      expect(transformedCode).toEqual(
        expect.objectContaining({
          code: expect.stringContaining(`class="test-id`),
        }),
      );
    });

    it("should work with nested tags", async () => {
      const transformedCode = appendTags("test-id")(HTML);
      expect(transformedCode).toEqual(
        expect.objectContaining({
          code: expect.stringContaining(`ol class="test-id`),
        }),
      );
    });
  });
});
