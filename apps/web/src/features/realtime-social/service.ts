import type { LeaderboardEntry, PresenceState, SocialEvent } from "./types";

export function mergePresence(current: PresenceState[], incoming: PresenceState): PresenceState[] {
  const others = current.filter((item) => item.userId !== incoming.userId);
  return [...others, incoming].sort((a, b) => a.userId.localeCompare(b.userId));
}

export function appendEvent(feed: SocialEvent[], event: SocialEvent): SocialEvent[] {
  return [event, ...feed].slice(0, 50);
}

export function rankLeaderboard(events: SocialEvent[]): LeaderboardEntry[] {
  const scores = new Map<string, number>();
  for (const event of events) {
    scores.set(event.actor, (scores.get(event.actor) || 0) + 10);
  }

  return Array.from(scores.entries())
    .map(([userId, score]) => ({ userId, score }))
    .sort((a, b) => b.score - a.score);
}
