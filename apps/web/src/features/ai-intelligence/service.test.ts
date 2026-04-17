import { describe, expect, it, vi } from "vitest";
import * as client from "@/lib/client-api";
import { generateIntelligenceReply } from "./service";

vi.mock("@/lib/client-api", () => ({
  streamChatFromApi: vi.fn().mockResolvedValue({
    text: "I remember your routines.",
    telemetry: { inputTokens: 10, outputTokens: 20, estimatedCostUsd: 0.0004 }
  })
}));

describe("ai intelligence", () => {
  it("returns reasoning and memory refs", async () => {
    const { result } = await generateIntelligenceReply("hello", [
      { id: "1", summary: "prefers short check-ins", salience: 1 }
    ]);

    expect(result.response).toContain("remember");
    expect(result.memoryRefs.length).toBeGreaterThan(0);
    expect(client.streamChatFromApi).toHaveBeenCalled();
  });
});
