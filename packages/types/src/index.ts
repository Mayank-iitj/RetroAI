export type CompanionMood = "happy" | "neutral" | "sad" | "angry" | "sleepy";

export interface CompanionState {
  id: string;
  name: string;
  mood: CompanionMood;
  energy: number;
  hunger: number;
  hygiene: number;
  evolutionStage: number;
  isAlive: boolean;
  skinMode: "modern" | "retro80s";
  updatedAt: string;
}

export interface ActionEvent {
  id: string;
  companionId: string;
  userId: string;
  actionType: "feed" | "play" | "clean" | "chat" | "discipline" | "heal";
  payload: Record<string, unknown>;
  aiReasoning?: string;
  createdAt: string;
}
