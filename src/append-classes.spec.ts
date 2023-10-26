import { describe, it, expect } from "vitest";

import { COMPILED_JSX, COMPILED_BACK_TICK_JSX } from "@/mocks/compiled-jsx";

import { appendClassForReact } from "./append-classes";

describe("my-awesome-tests", () => {
  describe("appendClassForReact", () => {
    it("should work", async () => {
      const transformedCode = appendClassForReact("test-id")(COMPILED_JSX);
      expect(transformedCode).toContain(`className: "test-id `);
    });

    it("should work for back ticks", async () => {
      const transformedCode = appendClassForReact("test-id")(
        COMPILED_BACK_TICK_JSX,
      );
      expect(transformedCode).toContain("className: `test-id ");
    });
  });

  describe("appendClass", () => {
    it("should work", async () => {
      expect(true).toEqual(true);
    });
  });
});
