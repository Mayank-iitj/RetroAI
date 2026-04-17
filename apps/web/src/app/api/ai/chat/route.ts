import { NextRequest } from "next/server";
import { z } from "zod";
import { streamChat } from "@/lib/ai/client";
import { tokenBucketLimit } from "@/lib/rate-limit";

const bodySchema = z.object({
  companionId: z.string().min(1),
  text: z.string().min(1),
  explain: z.boolean().optional()
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limit = await tokenBucketLimit(`ai:${ip}`, 20, 20);
  if (!limit.allowed) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded" }), { status: 429 });
  }

  const parsed = bodySchema.parse(await req.json());

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const { telemetry } = await streamChat({
        system: "You are a retro AI companion.",
        message: parsed.text,
        onChunk: (chunk) => controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token: chunk })}\n\n`))
      });

      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, telemetry })}\n\n`));
      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive"
    }
  });
}
