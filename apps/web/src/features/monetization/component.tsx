"use client";

import { useMemo, useState } from "react";
import { applyCredit, balanceFromLedger, getEntitlement } from "./service";
import type { CreditTransaction, PlanTier } from "./types";
import { postJson } from "@/lib/client-api";

export function MonetizationPanel() {
  const [tier, setTier] = useState<PlanTier>("free");
  const [ledger, setLedger] = useState<CreditTransaction[]>([{ userId: "u1", delta: 100, source: "referral" }]);
  const [status, setStatus] = useState("Billing idle");
  const entitlement = useMemo(() => getEntitlement(tier), [tier]);
  const balance = useMemo(() => balanceFromLedger(ledger), [ledger]);

  return (
    <section className="space-y-4 rounded-2xl border border-cyan-300/30 bg-zinc-900/60 p-6">
      <h2 className="text-xl font-bold">Modern Monetization</h2>

      <div className="flex flex-wrap gap-2">
        {(["free", "pro", "creator"] as PlanTier[]).map((candidate) => (
          <button
            key={candidate}
            type="button"
            className="rounded border border-cyan-300/50 px-3 py-2"
            onClick={() => {
              setTier(candidate);
              setStatus(`Selected ${candidate} plan.`);
            }}
          >
            {candidate}
          </button>
        ))}
      </div>

      <div className="rounded border border-zinc-700/50 bg-black/40 p-3 text-sm">
        <p>Tier: {entitlement.tier}</p>
        <p>Monthly AI tokens: {entitlement.monthlyAiTokens.toLocaleString()}</p>
        <p>Advanced reasoning: {entitlement.canUseAdvancedReasoning ? "enabled" : "paywalled"}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-cyan-300 px-3 py-2 font-semibold text-black"
          onClick={() =>
            setLedger((prev) =>
              applyCredit(prev, { userId: "u1", delta: -25, source: "ai_chat" })
            )
          }
        >
          Spend 25 Credits
        </button>
        <button
          type="button"
          className="rounded border border-cyan-300/70 px-3 py-2 text-cyan-100"
          onClick={async () => {
            if (tier === "free") {
              setStatus("Select Pro or Creator to start checkout.");
              return;
            }

            try {
              const payload = await postJson<{ checkoutUrl?: string }>("/api/billing/checkout", {
                plan: tier,
                successUrl: `${window.location.origin}/app/monetization?checkout=success`,
                cancelUrl: `${window.location.origin}/app/monetization?checkout=cancel`
              });

              if (payload.checkoutUrl) {
                window.location.href = payload.checkoutUrl;
              } else {
                setStatus("Checkout started but URL was unavailable.");
              }
            } catch {
              setStatus("Unable to start checkout. Verify Stripe env configuration.");
            }
          }}
        >
          Checkout Selected Plan
        </button>
      </div>

      <p className="text-sm">Credit Balance: {balance}</p>
      <p className="text-xs text-cyan-200/90">{status}</p>
      <p className="text-sm text-cyan-100/80">Stripe checkout and webhook routes are scaffolded in API handlers.</p>
    </section>
  );
}
