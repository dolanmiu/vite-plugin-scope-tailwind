import { describe, it, expect } from "vitest";
import { appendTags, appendTagsForReact } from "./append-tags";
import { COMPILED_BACK_TICK_JSX_WITH_PREFLIGHT_TAGS } from "@/mocks/compiled-jsx";
import { HTML } from "@/mocks/html";

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
  });
});
