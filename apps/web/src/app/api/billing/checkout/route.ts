import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createCheckoutSession } from "@/lib/billing";

const schema = z.object({
  plan: z.enum(["pro", "creator"]),
  successUrl: z.string().url(),
  cancelUrl: z.string().url()
});

export async function POST(req: NextRequest) {
  const body = schema.parse(await req.json());
  const session = await createCheckoutSession(body.plan, body.successUrl, body.cancelUrl);
  return NextResponse.json({ checkoutUrl: session.url });
}
