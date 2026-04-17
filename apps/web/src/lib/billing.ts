import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia"
});

export async function createCheckoutSession(plan: "pro" | "creator", successUrl: string, cancelUrl: string) {
  const priceLookup: Record<string, string> = {
    pro: process.env.STRIPE_PRICE_PRO || "price_pro_placeholder",
    creator: process.env.STRIPE_PRICE_CREATOR || "price_creator_placeholder"
  };

  return stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceLookup[plan], quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl
  });
}
