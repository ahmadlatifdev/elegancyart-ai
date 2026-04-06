import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET() {
  try {
    const balance = await stripe.balance.retrieve();

    return NextResponse.json({
      success: true,
      balance,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Stripe sync failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}