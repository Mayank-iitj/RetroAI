export type CareAction = "feed" | "play" | "clean" | "rest" | "discipline";

export interface NostalgiaState {
  mood: "happy" | "neutral" | "sad";
  hunger: number;
  hygiene: number;
  energy: number;
  skinMode: "modern" | "retro80s";
}
