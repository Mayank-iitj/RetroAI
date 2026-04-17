"use client";

import { useState } from "react";
import { applyCareAction, playRetroBeep } from "./service";
import type { CareAction, NostalgiaState } from "./types";
import { useKonami } from "@/hooks/use-konami";
import { postJson } from "@/lib/client-api";

const actions: CareAction[] = ["feed", "play", "clean", "rest", "discipline"];

export function NostalgiaCorePanel() {
  const [state, setState] = useState<NostalgiaState>({
    mood: "neutral",
    hunger: 40,
    hygiene: 60,
    energy: 65,
    skinMode: "modern"
  });
  const [secretMode, setSecretMode] = useState(false);
  const [status, setStatus] = useState("Ready");

  useKonami(() => setSecretMode(true));

  return (
    <section className={`space-y-4 rounded-2xl border p-6 ${state.skinMode === "retro80s" ? "crt border-amber-300/50 bg-black/70 font-display text-xs" : "border-cyan-300/30 bg-zinc-900/60"}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold">Nostalgia Core Loop</h2>
        <button
          type="button"
          className="rounded border border-cyan-300/50 px-3 py-1"
          onClick={() =>
            setState((s) => ({ ...s, skinMode: s.skinMode === "modern" ? "retro80s" : "modern" }))
          }
        >
          80s Mode: {state.skinMode === "retro80s" ? "ON" : "OFF"}
        </button>
      </div>

      {secretMode && <p className="text-pink-300">KONAMI MODE UNLOCKED: Neon BIOS Personality Active</p>}

      <div className="grid gap-2 md:grid-cols-4">
        <Stat label="Mood" value={state.mood} />
        <Stat label="Hunger" value={String(state.hunger)} />
        <Stat label="Hygiene" value={String(state.hygiene)} />
        <Stat label="Energy" value={String(state.energy)} />
      </div>

      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action}
            type="button"
            className="rounded bg-cyan-300 px-3 py-2 text-sm font-semibold text-black"
            onClick={async () => {
              setState((current) => applyCareAction(current, action));
              playRetroBeep(220 + Math.random() * 300, 90);
              try {
                const mode = state.skinMode === "retro80s" ? "80s" : "modern";
                await postJson(`/api/companions/11111111-1111-1111-1111-111111111111/actions`, {
                  actionType: action,
                  payload: { source: "ui" },
                  mode
                });
                setStatus(`Action synced: ${action}`);
              } catch {
                setStatus(`Action queued offline: ${action}`);
              }
            }}
          >
            {action.toUpperCase()}
          </button>
        ))}
      </div>
      <p className="text-xs text-cyan-200/90">{status}</p>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-zinc-600/40 bg-black/30 p-2">
      <p className="text-xs uppercase tracking-wider text-zinc-300">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
