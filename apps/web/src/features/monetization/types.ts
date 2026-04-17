export type PlanTier = "free" | "pro" | "creator";

export interface Entitlement {
  tier: PlanTier;
  monthlyAiTokens: number;
  canUseAdvancedReasoning: boolean;
}

export interface CreditTransaction {
  userId: string;
  delta: number;
  source: "ai_chat" | "purchase" | "referral";
}
