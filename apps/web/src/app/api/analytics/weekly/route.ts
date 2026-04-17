import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    usageHeatmap: [{ hour: 10, interactions: 14 }],
    timeline: [{ ts: new Date().toISOString(), action: "feed" }],
    aiSummary: "User engagement was stable with peak evening activity.",
    anomalies: ["No major anomalies."]
  });
}
