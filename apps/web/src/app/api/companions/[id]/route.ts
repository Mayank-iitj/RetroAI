import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({
    companion: {
      id,
      name: "ByteBuddy",
      mood: "neutral",
      energy: 68,
      hunger: 35,
      hygiene: 75,
      evolutionStage: 2,
      isAlive: true,
      skinMode: "modern"
    },
    stats: {
      dailyActions: 14,
      activeUsers: 5
    },
    currentPresence: [
      { userId: "alice", status: "online", activity: "feeding" }
    ]
  });
}
