import type { HeatmapCell, WeeklyInsight } from "./types";

export function buildHeatmap(events: { hour: number }[]): HeatmapCell[] {
  const map = new Map<number, number>();
  for (const event of events) {
    map.set(event.hour, (map.get(event.hour) || 0) + 1);
  }

  return Array.from({ length: 24 }, (_, hour) => ({
    hour,
    interactions: map.get(hour) || 0
  }));
}

export function summarizeWeek(events: { action: string }[]): WeeklyInsight {
  const counts = new Map<string, number>();
  for (const event of events) {
    counts.set(event.action, (counts.get(event.action) || 0) + 1);
  }

  const topActions = Array.from(counts.entries())
    .map(([action, count]) => ({ action, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const anomalies = topActions.some((item) => item.count > 100)
    ? ["Interaction spike detected."]
    : ["No major anomalies."];

  return {
    summary: `This week had ${events.length} interactions with ${topActions[0]?.action || "no"} as top action.`,
    anomalies,
    topActions
  };
}
