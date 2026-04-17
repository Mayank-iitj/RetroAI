import { describe, expect, it } from "vitest";
import { applyCareAction } from "./service";

describe("nostalgia core", () => {
  it("reduces hunger when feeding", () => {
    const next = applyCareAction(
      { mood: "neutral", hunger: 60, hygiene: 60, energy: 40, skinMode: "modern" },
      "feed"
    );

    expect(next.hunger).toBe(40);
  });

  it("becomes sad when neglected stats are poor", () => {
    const next = applyCareAction(
      { mood: "happy", hunger: 90, hygiene: 15, energy: 10, skinMode: "modern" },
      "play"
    );

    expect(next.mood).toBe("sad");
  });
});
