import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  companionId: z.string().uuid(),
  activity: z.string().min(1)
});

export async function POST(req: NextRequest) {
  const body = schema.parse(await req.json());
  return NextResponse.json({
    ok: true,
    presence: {
      userId: "demo-user",
      companionId: body.companionId,
      activity: body.activity,
      status: "online"
    }
  });
}
