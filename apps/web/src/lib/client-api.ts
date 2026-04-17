export interface SseChatResult {
  text: string;
  telemetry: {
    inputTokens: number;
    outputTokens: number;
    estimatedCostUsd: number;
  };
}

export async function streamChatFromApi(companionId: string, text: string): Promise<SseChatResult> {
  const response = await fetch("/api/ai/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ companionId, text, explain: true })
  });

  if (!response.ok || !response.body) {
    throw new Error("Unable to stream AI response.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";
  let fullText = "";
  let telemetry = { inputTokens: 0, outputTokens: 0, estimatedCostUsd: 0 };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const chunks = buffer.split("\n\n");
    buffer = chunks.pop() || "";

    for (const chunk of chunks) {
      const line = chunk.trim();
      if (!line.startsWith("data: ")) continue;

      const raw = line.slice(6);
      try {
        const payload = JSON.parse(raw) as {
          token?: string;
          done?: boolean;
          telemetry?: { inputTokens: number; outputTokens: number; estimatedCostUsd: number };
        };

        if (payload.token) {
          fullText += payload.token;
        }

        if (payload.done && payload.telemetry) {
          telemetry = payload.telemetry;
        }
      } catch {
        // Ignore malformed SSE lines and continue parsing stream.
      }
    }
  }

  return { text: fullText.trim(), telemetry };
}

export async function postJson<TResponse>(url: string, body: Record<string, unknown>): Promise<TResponse> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  return response.json() as Promise<TResponse>;
}
