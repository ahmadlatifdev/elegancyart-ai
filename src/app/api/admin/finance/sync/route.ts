import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sql } from "../../../../../../lib/db/neon";

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


    const refunds = await stripe.refunds.list({ limit: 100 });

    for (const r of refunds.data) {

      await sql`
        INSERT INTO stripe_refunds_local (
          id,
          charge_id,
          payment_intent_id,
          amount,
          currency,
          status,
          reason,
          created_at_stripe,
          synced_at
        )
        VALUES (
          ${r.id},
          ${typeof r.charge === "string" ? r.charge : r.charge?.id ?? null},
          ${typeof r.payment_intent === "string"
            ? r.payment_intent
            : r.payment_intent?.id ?? null},
          ${r.amount},
          ${r.currency},
          ${r.status ?? null},
          ${r.reason ?? null},
          ${toIsoFromUnix(r.created)!},
          NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          charge_id = EXCLUDED.charge_id,
          payment_intent_id = EXCLUDED.payment_intent_id,
          amount = EXCLUDED.amount,
          currency = EXCLUDED.currency,
          status = EXCLUDED.status,
          reason = EXCLUDED.reason,
          created_at_stripe = EXCLUDED.created_at_stripe,
          synced_at = NOW()
      `;
    }


    const balanceTransactions = await stripe.balanceTransactions.list({
      limit: 100,
    });

    for (const bt of balanceTransactions.data) {

      const sourceId =
        typeof bt.source === "string"
          ? bt.source
          : bt.source?.id ?? null;

      const sourceType =
        typeof bt.source === "string"
          ? null
          : bt.source?.object ?? null;

      await sql`
        INSERT INTO stripe_balance_ledger (
          id,
          type,
          reporting_category,
          amount,
          fee,
          net,
          currency,
          source_id,
          source_type,
          available_on,
          created_at_stripe,
          description,
          synced_at
        )
        VALUES (
          ${bt.id},
          ${bt.type},
          ${bt.reporting_category ?? null},
          ${bt.amount},
          ${bt.fee},
          ${bt.net},
          ${bt.currency},
          ${sourceId},
          ${sourceType},
          ${toIsoFromUnix(bt.available_on)},
          ${toIsoFromUnix(bt.created)!},
          ${bt.description ?? null},
          NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          type = EXCLUDED.type,
          reporting_category = EXCLUDED.reporting_category,
          amount = EXCLUDED.amount,
          fee = EXCLUDED.fee,
          net = EXCLUDED.net,
          currency = EXCLUDED.currency,
          source_id = EXCLUDED.source_id,
          source_type = EXCLUDED.source_type,
          available_on = EXCLUDED.available_on,
          created_at_stripe = EXCLUDED.created_at_stripe,
          description = EXCLUDED.description,
          synced_at = NOW()
      `;
    }

    return NextResponse.json({
      ok: true,
      payoutsSynced: payouts.data.length,
      refundsSynced: refunds.data.length,
      balanceTransactionsSynced: balanceTransactions.data.length,
    });

  } catch (error) {

    console.error("Finance sync failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Finance sync failed",
      },
      { status: 500 }
    );
  }
}