import type { CreditTransaction, Entitlement, PlanTier } from "./types";

export function getEntitlement(tier: PlanTier): Entitlement {
  if (tier === "creator") {
    return { tier, monthlyAiTokens: 1_000_000, canUseAdvancedReasoning: true };
  }
  if (tier === "pro") {
    return { tier, monthlyAiTokens: 250_000, canUseAdvancedReasoning: true };
  }
  return { tier: "free", monthlyAiTokens: 50_000, canUseAdvancedReasoning: false };
}

export function applyCredit(txns: CreditTransaction[], txn: CreditTransaction) {
  return [...txns, txn];
}

export function balanceFromLedger(txns: CreditTransaction[]) {
  return txns.reduce((sum, txn) => sum + txn.delta, 0);
}
