import { describe, it } from "vitest";

import { syncWait } from "./sync-wait";

describe("prefixPlugin", () => {
  it("should work", async () => {
    syncWait(10);
  });
});
