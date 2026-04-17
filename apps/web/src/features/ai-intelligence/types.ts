export interface PersonalityMemory {
  id: string;
  summary: string;
  salience: number;
}

export interface IntelligenceReply {
  response: string;
  tone: "playful" | "calm" | "dramatic" | "wise";
  reasoning: string;
  memoryRefs: string[];
}
