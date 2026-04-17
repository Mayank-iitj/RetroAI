import { streamChatFromApi } from "@/lib/client-api";
import type { IntelligenceReply, PersonalityMemory } from "./types";

export async function generateIntelligenceReply(input: string, memories: PersonalityMemory[]) {
  const sortedMemories = [...memories].sort((a, b) => b.salience - a.salience);
  const { text, telemetry } = await streamChatFromApi("11111111-1111-1111-1111-111111111111", input);

  const result: IntelligenceReply = {
    response: text || "Signal received. I am thinking in retro mode.",
    tone: input.includes("why") ? "wise" : "playful",
    reasoning: "Used high-salience recent memories and current emotional state cues.",
    memoryRefs: sortedMemories.slice(0, 3).map((m) => m.summary)
  };

  return { result, telemetry };
}
