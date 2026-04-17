import { describe, expect, it } from "vitest";
import { buildHeatmap, summarizeWeek } from "./service";

describe("analytics", () => {
  it("builds a full-day heatmap", () => {
    const heatmap = buildHeatmap([{ hour: 1 }, { hour: 1 }]);
    expect(heatmap).toHaveLength(24);
    expect(heatmap[1].interactions).toBe(2);
  });

  it("returns weekly summary", () => {
    const summary = summarizeWeek([{ action: "feed" }, { action: "feed" }, { action: "chat" }]);
    expect(summary.topActions[0].action).toBe("feed");
  });
});
