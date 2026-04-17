import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  jsonState: z.record(z.unknown())
});

export async function POST(req: NextRequest) {
  schema.parse(await req.json());
  return NextResponse.json({ companionId: crypto.randomUUID() });
}
