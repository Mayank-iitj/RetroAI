import Groq from "groq-sdk";
import { env } from "@/lib/env";

const groq = new Groq({ apiKey: env.GROQ_API_KEY });

type StreamChunkCallback = (chunk: string) => void;

interface ChatOptions {
  system: string;
  message: string;
  onChunk?: StreamChunkCallback;
  retries?: number;
}

export interface CostTelemetry {
  inputTokens: number;
  outputTokens: number;
  estimatedCostUsd: number;
}

function estimateCost(inputTokens: number, outputTokens: number): number {
  const inCost = (inputTokens / 1_000_000) * env.AI_COST_INPUT_PER_1M;
  const outCost = (outputTokens / 1_000_000) * env.AI_COST_OUTPUT_PER_1M;
  return Number((inCost + outCost).toFixed(6));
}

function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

export async function streamChat({ system, message, onChunk, retries = 2 }: ChatOptions) {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      const stream = await groq.chat.completions.create({
        model: env.AI_MODEL,
        messages: [
          { role: "system", content: system },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_completion_tokens: 1000,
        stream: true
      });

      let text = "";

      for await (const chunk of stream) {
        const token = chunk.choices?.[0]?.delta?.content || "";
        if (token) {
          text += token;
          onChunk?.(token);
        }
      }

      const inputTokens = estimateTokens(`${system}\n${message}`);
      const outputTokens = estimateTokens(text);
      const telemetry: CostTelemetry = {
        inputTokens,
        outputTokens,
        estimatedCostUsd: estimateCost(inputTokens, outputTokens)
      };

      return { text, telemetry };
    } catch (error) {
      if (attempt === retries) throw error;
      attempt += 1;
      await new Promise((resolve) => setTimeout(resolve, 300 * attempt));
    }
  }

  throw new Error("AI stream failed after retries");
}
