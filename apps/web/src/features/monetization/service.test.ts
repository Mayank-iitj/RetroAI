import { describe, expect, it } from "vitest";
import { applyCredit, balanceFromLedger, getEntitlement } from "./service";

describe("monetization", () => {
  it("returns stronger entitlements for higher tiers", () => {
    expect(getEntitlement("creator").monthlyAiTokens).toBeGreaterThan(getEntitlement("pro").monthlyAiTokens);
  });

  it("tracks credit ledger balance", () => {
    const ledger = applyCredit([], { userId: "u", delta: 100, source: "purchase" });
    expect(balanceFromLedger(ledger)).toBe(100);
  });
});
