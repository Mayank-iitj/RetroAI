import type { CareAction, NostalgiaState } from "./types";

export function applyCareAction(state: NostalgiaState, action: CareAction): NostalgiaState {
  const next = { ...state };

  switch (action) {
    case "feed":
      next.hunger = Math.max(0, next.hunger - 20);
      next.energy = Math.min(100, next.energy + 5);
      break;
    case "play":
      next.energy = Math.max(0, next.energy - 10);
      next.hunger = Math.min(100, next.hunger + 10);
      next.mood = "happy";
      break;
    case "clean":
      next.hygiene = Math.min(100, next.hygiene + 30);
      break;
    case "rest":
      next.energy = Math.min(100, next.energy + 20);
      break;
    case "discipline":
      next.mood = next.mood === "happy" ? "neutral" : "sad";
      break;
  }

  if (next.hunger > 80 || next.hygiene < 20 || next.energy < 15) {
    next.mood = "sad";
  }

  return next;
}

export function playRetroBeep(freq = 440, duration = 120) {
  if (typeof window === "undefined") return;
  const context = new AudioContext();
  const osc = context.createOscillator();
  const gain = context.createGain();

  osc.type = "square";
  osc.frequency.value = freq;
  gain.gain.value = 0.03;
  osc.connect(gain);
  gain.connect(context.destination);
  osc.start();

  setTimeout(() => {
    osc.stop();
    context.close();
  }, duration);
}
