import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const payloadSchema = z.object({
  actionType: z.enum(["feed", "play", "clean", "chat", "discipline", "heal"]),
  payload: z.record(z.unknown()).default({}),
  mode: z.enum(["modern", "80s"]).default("modern")
});

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = payloadSchema.parse(await req.json());

  return NextResponse.json({
    newState: {
      companionId: id,
      mood: parsed.actionType === "play" ? "happy" : "neutral"
    },
    eventId: crypto.randomUUID(),
    aiOverlay: parsed.mode === "80s" ? "BEEP-BOOP: ACTION ACCEPTED" : "Action accepted"
  });
}
