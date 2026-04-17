import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  companionId: z.string().uuid(),
  label: z.string().optional()
});

export async function POST(req: NextRequest) {
  const body = schema.parse(await req.json());
  return NextResponse.json({
    snapshotId: crypto.randomUUID(),
    companionId: body.companionId,
    version: 1
  });
}
