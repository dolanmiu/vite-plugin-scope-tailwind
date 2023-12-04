import { describe, it, expect } from "vitest";

import { COMPILED_JSX, COMPILED_BACK_TICK_JSX } from "@/mocks/compiled-jsx";
import { HTML } from "@/mocks/html";

import { appendClass, appendClassForReact } from "./append-classes";

describe("append-classes", () => {
  describe("appendClassForReact", () => {
    it("should work", async () => {
      const transformedCode = appendClassForReact("test-id")(COMPILED_JSX);
      expect(transformedCode).toEqual(
        expect.objectContaining({
          code: expect.stringContaining(`className: "test-id `),
        })
      );
    });

    it("should work for 3+ levels deep", async () => {
      const transformedCode = appendClassForReact("test-id")(COMPILED_JSX);
      expect(transformedCode).toEqual(
        expect.objectContaining({
          code: expect.stringContaining(`className: "test-id `),
        })
      );
    });

    it("should work for back ticks", async () => {
      const transformedCode = appendClassForReact("test-id")(
        COMPILED_BACK_TICK_JSX
      );
      expect(transformedCode).toEqual(
        expect.objectContaining({
          code: expect.stringContaining("className: `test-id "),
        })
      );
    });
  });

  describe("appendClass", () => {
    it("should work", async () => {
      const transformedCode = appendClass("test-id")(HTML);
      expect(transformedCode).toEqual(
        expect.objectContaining({
          code: expect.stringContaining(`class="test-id `),
        })
      );
    });
  });
});
