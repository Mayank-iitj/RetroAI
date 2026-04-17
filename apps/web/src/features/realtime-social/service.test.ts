import { describe, expect, it } from "vitest";
import { appendEvent, mergePresence, rankLeaderboard } from "./service";

describe("realtime social", () => {
  it("merges presence by user id", () => {
    const result = mergePresence([{ userId: "a", status: "online", activity: "x" }], {
      userId: "a",
      status: "idle",
      activity: "y"
    });

    expect(result).toHaveLength(1);
    expect(result[0].status).toBe("idle");
  });

  it("ranks leaderboard by events", () => {
    const board = rankLeaderboard([
      { id: "1", actor: "a", action: "feed", createdAt: "x" },
      { id: "2", actor: "a", action: "play", createdAt: "x" },
      { id: "3", actor: "b", action: "feed", createdAt: "x" }
    ]);

    expect(board[0].userId).toBe("a");
    expect(appendEvent([], { id: "x", actor: "a", action: "feed", createdAt: "z" })).toHaveLength(1);
  });
});
