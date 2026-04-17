import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return NextResponse.json({
    timeline: [
      { id, version: 1, state: { mood: "neutral" } },
      { id: `${id}-2`, version: 2, state: { mood: "happy" } }
    ]
  });
}
