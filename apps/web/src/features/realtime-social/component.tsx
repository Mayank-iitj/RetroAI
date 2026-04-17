"use client";

import { useMemo, useState } from "react";
import { appendEvent, mergePresence, rankLeaderboard } from "./service";
import type { PresenceState, SocialEvent } from "./types";
import { postJson } from "@/lib/client-api";

export function SocialPanel() {
  const [presence, setPresence] = useState<PresenceState[]>([
    { userId: "alice", status: "online", activity: "feeding" }
  ]);
  const [feed, setFeed] = useState<SocialEvent[]>([]);
  const [status, setStatus] = useState("Live bus ready");

  const leaderboard = useMemo(() => rankLeaderboard(feed), [feed]);

  return (
    <section className="space-y-4 rounded-2xl border border-cyan-300/30 bg-zinc-900/60 p-6">
      <h2 className="text-xl font-bold">Realtime Multiplayer / Social</h2>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-cyan-300 px-3 py-2 font-semibold text-black"
          onClick={async () => {
            const next = { userId: "bob", status: "online" as const, activity: "playing" };
            setPresence((prev) => mergePresence(prev, next));
            setFeed((prev) =>
              appendEvent(prev, {
                id: crypto.randomUUID(),
                actor: "bob",
                action: "play",
                createdAt: new Date().toISOString()
              })
            );
            try {
              await postJson("/api/realtime/presence", {
                companionId: "11111111-1111-1111-1111-111111111111",
                activity: "playing"
              });
              setStatus("Presence synced to realtime API.");
            } catch {
              setStatus("Realtime API unavailable, local simulation active.");
            }
          }}
        >
          Simulate User Join
        </button>
      </div>
      <p className="text-xs text-cyan-200/90">{status}</p>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded border border-zinc-700/50 bg-black/40 p-3">
          <p className="mb-2 font-semibold">Presence</p>
          {presence.map((p) => (
            <p key={p.userId} className="text-sm">{p.userId} - {p.status} ({p.activity})</p>
          ))}
        </div>
        <div className="rounded border border-zinc-700/50 bg-black/40 p-3 md:col-span-2">
          <p className="mb-2 font-semibold">Event Feed</p>
          {feed.map((event) => (
            <p key={event.id} className="text-sm">{event.actor} did {event.action}</p>
          ))}
        </div>
      </div>

      <div className="rounded border border-zinc-700/50 bg-black/40 p-3">
        <p className="mb-2 font-semibold">Leaderboard</p>
        {leaderboard.map((entry) => (
          <p key={entry.userId} className="text-sm">{entry.userId}: {entry.score}</p>
        ))}
      </div>
    </section>
  );
}
