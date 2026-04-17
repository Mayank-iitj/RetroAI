export interface PresenceState {
  userId: string;
  status: "online" | "idle" | "offline";
  activity: string;
}

export interface SocialEvent {
  id: string;
  actor: string;
  action: string;
  createdAt: string;
}

export interface LeaderboardEntry {
  userId: string;
  score: number;
}
