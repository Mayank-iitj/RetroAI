import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ exportUrl: "https://storage.example.com/export/user-data.json" });
}
