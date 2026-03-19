import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sql } from "../../../../lib/db/neon";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

function toIsoFromUnix(unix?: number | null) {
  return unix ? new Date(unix * 1000).toISOString() : null;
}

export async function POST() {
  try {

    const payouts = await stripe.payouts.list({ limit: 100 });

    for (const p of payouts.data) {

      await sql`
        INSERT INTO stripe_payouts (
          id,
          amount,
          currency,
          arrival_date,
          status,
          method,
          type,
          automatic,
          statement_descriptor,
          failure_code,
          failure_message,
          balance_transaction_id,
          created_at_stripe,
          synced_at
        )
        VALUES (
          ${p.id},
          ${p.amount},
          ${p.currency},
          ${toIsoFromUnix(p.arrival_date)},
          ${p.status},
          ${p.method ?? null},
          ${p.type ?? null},
          ${p.automatic ?? false},
          ${p.statement_descriptor ?? null},
          ${p.failure_code ?? null},
          ${p.failure_message ?? null},
          ${typeof p.balance_transaction === "string"
            ? p.balance_transaction
            : p.balance_transaction?.id ?? null},
          ${toIsoFromUnix(p.created)!},
          NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          amount = EXCLUDED.amount,
          currency = EXCLUDED.currency,
          arrival_date = EXCLUDED.arrival_date,
          status = EXCLUDED.status,
          method = EXCLUDED.method,
          type = EXCLUDED.type,
          automatic = EXCLUDED.automatic,
          statement_descriptor = EXCLUDED.statement_descriptor,
          failure_code = EXCLUDED.failure_code,
          failure_message = EXCLUDED.failure_message,
          balance_transaction_id = EXCLUDED.balance_transaction_id,
          created_at_stripe = EXCLUDED.created_at_stripe,
          synced_at = NOW()
      `;

    }

    return NextResponse.json({
      ok: true,
      payoutsSynced: payouts.data.length
    });

  } catch (error) {

    console.error("Stripe sync error:", error);

    return NextResponse.json(
      { ok:false },
      { status:500 }
    );

  }
}