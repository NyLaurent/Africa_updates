import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-01-27.acacia" });

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  try {
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Publisher Subscription" },
            unit_amount: 5000,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
      },
      client_reference_id: userId,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed`,
    });

    // Only create payment session record when we receive the webhook
    // This avoids the issue with missing payment_intent

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}