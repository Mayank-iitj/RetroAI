import { describe, expect, it } from "vitest";
import { createSnapshot, enqueueSync, replaySnapshots } from "./service";

describe("persistence", () => {
  it("increments snapshot version", () => {
    const s1 = createSnapshot([], { x: 1 });
    const s2 = createSnapshot([s1], { x: 2 });
    expect(s2.version).toBe(2);
  });

  it("orders sync queue by timestamp", () => {
    const queue = enqueueSync([], { id: "1", op: "save", payload: {}, timestamp: 10 });
    const next = enqueueSync(queue, { id: "2", op: "save", payload: {}, timestamp: 1 });
    expect(next[0].id).toBe("2");
    expect(replaySnapshots([{ id: "a", version: 2, createdAt: "", state: {} }, { id: "b", version: 1, createdAt: "", state: {} }])[0].version).toBe(1);
  });
});
