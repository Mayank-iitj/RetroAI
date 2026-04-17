"use client";

import { useState } from "react";
import { DebugConsole } from "@/components/debug-console";
import { generateIntelligenceReply } from "./service";
import type { PersonalityMemory } from "./types";

const seedMemory: PersonalityMemory[] = [
  { id: "m1", summary: "User tends to check in at night", salience: 0.9 },
  { id: "m2", summary: "User likes sarcastic humor", salience: 0.7 }
];

export function IntelligencePanel() {
  const [input, setInput] = useState("How are you feeling today?");
  const [reply, setReply] = useState("I am waiting for your next command, caretaker.");
  const [debugLines, setDebugLines] = useState<string[]>(["AI reasoning panel initialized."]);
  const [loading, setLoading] = useState(false);

  return (
    <section className="space-y-4 rounded-2xl border border-cyan-300/30 bg-zinc-900/60 p-6">
      <h2 className="text-xl font-bold">AI Intelligence Layer</h2>
      <p className="text-cyan-100/90">Natural language replaces button-only interaction. Personality evolves from memory.</p>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded bg-zinc-800 px-3 py-2"
          placeholder="Talk to your companion..."
        />
        <button
          type="button"
          disabled={loading || !input.trim()}
          className="rounded bg-cyan-300 px-3 py-2 font-semibold text-black"
          onClick={async () => {
            setLoading(true);
            try {
              const { result, telemetry } = await generateIntelligenceReply(input, seedMemory);
              setReply(result.response);
              setDebugLines([
                `tone=${result.tone}`,
                `reason=${result.reasoning}`,
                `memories=${result.memoryRefs.join(" | ")}`,
                `cost=$${telemetry.estimatedCostUsd}`
              ]);
            } catch (error) {
              const message = error instanceof Error ? error.message : "AI request failed.";
              setDebugLines([`error=${message}`]);
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      <div className="rounded border border-cyan-400/30 bg-black/50 p-4">
        <p className="text-sm text-cyan-200">Companion:</p>
        <p className="mt-1 text-white">{reply}</p>
      </div>

      <DebugConsole lines={debugLines} />
    </section>
  );
}
