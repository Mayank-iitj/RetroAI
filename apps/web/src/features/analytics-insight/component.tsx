"use client";

import { useMemo } from "react";
import { buildHeatmap, summarizeWeek } from "./service";

const events = [
  { hour: 9, action: "feed" },
  { hour: 10, action: "play" },
  { hour: 10, action: "play" },
  { hour: 22, action: "chat" }
];

export function AnalyticsPanel() {
  const heatmap = useMemo(() => buildHeatmap(events.map((e) => ({ hour: e.hour }))), []);
  const insight = useMemo(() => summarizeWeek(events.map((e) => ({ action: e.action }))), []);

  return (
    <section className="space-y-4 rounded-2xl border border-cyan-300/30 bg-zinc-900/60 p-6">
      <h2 className="text-xl font-bold">Analytics and Insight Dashboard</h2>

      <div className="rounded border border-zinc-700/50 bg-black/40 p-3">
        <p className="mb-2 font-semibold">Hourly Heatmap</p>
        <div className="grid grid-cols-12 gap-1">
          {heatmap.slice(0, 12).map((cell) => (
            <div
              key={cell.hour}
              className="h-6 rounded"
              style={{ background: `rgba(48,245,210,${Math.min(1, cell.interactions / 4 + 0.1)})` }}
              title={`${cell.hour}:00 -> ${cell.interactions}`}
            />
          ))}
        </div>
      </div>

      <div className="rounded border border-zinc-700/50 bg-black/40 p-3">
        <p className="mb-2 font-semibold">AI Weekly Summary</p>
        <p className="text-sm">{insight.summary}</p>
        {insight.anomalies.map((a) => (
          <p key={a} className="text-sm text-amber-300">- {a}</p>
        ))}
      </div>
    </section>
  );
}
