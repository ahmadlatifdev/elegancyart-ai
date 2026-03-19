import { NextResponse } from "next/server";
import { sql } from "../../../../../../lib/db/neon";

type MoneyRow = { total: string | number | null };

export async function GET() {
  try {
    const [
      grossRevenueRes,
      stripeFeesRes,
      payoutSentRes,
      payoutFailedRes,
      payoutVerifiedRes,
      writerPaidRes,
      adsCostRes,
      refundsRes,
      monthlyBreakdownRes,
      latestPayoutsRes,
      latestRefundsRes,
      latestWriterPaymentsRes,
      latestAdsRes,
    ] = await Promise.all([
      sql<MoneyRow[]>`
        SELECT COALESCE(SUM(net), 0) AS total
        FROM stripe_balance_ledger
        WHERE type = 'charge'
      `,
      sql<MoneyRow[]>`
        SELECT COALESCE(SUM(fee), 0) AS total
        FROM stripe_balance_ledger
        WHERE type = 'charge'
      `,
      sql<MoneyRow[]>`
        SELECT COALESCE(SUM(amount), 0) AS total
        FROM stripe_payouts
        WHERE status = 'paid'
      `,
      sql<MoneyRow[]>`
        SELECT COALESCE(SUM(amount), 0) AS total
        FROM stripe_payouts
        WHERE status IN ('failed', 'canceled')
      `,
      sql<MoneyRow[]>`
        SELECT COALESCE(SUM(COALESCE(btv.verified_amount, sp.amount)), 0) AS total
        FROM bank_transfer_verifications btv
        JOIN stripe_payouts sp ON sp.id = btv.payout_id
        WHERE btv.verified = true
      `,
      sql<MoneyRow[]>`
        SELECT COALESCE(SUM(amount), 0) AS total
        FROM writer_payments
        WHERE status = 'paid'
      `,
      sql<MoneyRow[]>`
        SELECT COALESCE(SUM(cost), 0) AS total
        FROM ad_costs
      `,
      sql<MoneyRow[]>`
        SELECT COALESCE(SUM(amount), 0) AS total
        FROM stripe_refunds_local
        WHERE status = 'succeeded'
      `,
      sql`
        WITH months AS (
          SELECT TO_CHAR(DATE_TRUNC('month', created_at_stripe), 'YYYY-MM') AS month
          FROM stripe_balance_ledger
          UNION
          SELECT TO_CHAR(DATE_TRUNC('month', created_at_stripe), 'YYYY-MM') AS month
          FROM stripe_refunds_local
          UNION
          SELECT TO_CHAR(DATE_TRUNC('month', paid_at), 'YYYY-MM') AS month
          FROM writer_payments
          WHERE paid_at IS NOT NULL
          UNION
          SELECT TO_CHAR(DATE_TRUNC('month', cost_date::timestamp), 'YYYY-MM') AS month
          FROM ad_costs
        ),
        revenue AS (
          SELECT TO_CHAR(DATE_TRUNC('month', created_at_stripe), 'YYYY-MM') AS month,
                 COALESCE(SUM(net), 0) AS amount
          FROM stripe_balance_ledger
          WHERE type = 'charge'
          GROUP BY 1
        ),
        refunds AS (
          SELECT TO_CHAR(DATE_TRUNC('month', created_at_stripe), 'YYYY-MM') AS month,
                 COALESCE(SUM(amount), 0) AS amount
          FROM stripe_refunds_local
          WHERE status = 'succeeded'
          GROUP BY 1
        ),
        writers AS (
          SELECT TO_CHAR(DATE_TRUNC('month', paid_at), 'YYYY-MM') AS month,
                 COALESCE(SUM(amount), 0) AS amount
          FROM writer_payments
          WHERE status = 'paid' AND paid_at IS NOT NULL
          GROUP BY 1
        ),
        ads AS (
          SELECT TO_CHAR(DATE_TRUNC('month', cost_date::timestamp), 'YYYY-MM') AS month,
                 COALESCE(SUM(cost), 0) AS amount
          FROM ad_costs
          GROUP BY 1
        )
        SELECT
          m.month,
          COALESCE(r.amount, 0) AS revenue_net_after_stripe,
          COALESCE(ref.amount, 0) AS refunds,
          COALESCE(w.amount, 0) AS writer_payments,
          COALESCE(a.amount, 0) AS ads_cost,
          (
            COALESCE(r.amount, 0)
            - COALESCE(ref.amount, 0)
            - COALESCE(w.amount, 0)
            - COALESCE(a.amount, 0)
          ) AS real_net_profit
        FROM months m
        LEFT JOIN revenue r ON r.month = m.month
        LEFT JOIN refunds ref ON ref.month = m.month
        LEFT JOIN writers w ON w.month = m.month
        LEFT JOIN ads a ON a.month = m.month
        GROUP BY m.month, r.amount, ref.amount, w.amount, a.amount
        ORDER BY m.month DESC
        LIMIT 12
      `,
      sql`
        SELECT
          sp.id,
          sp.amount,
          sp.currency,
          sp.status,
          sp.arrival_date,
          btv.verified,
          btv.verified_amount,
          btv.verified_date,
          btv.bank_reference
        FROM stripe_payouts sp
        LEFT JOIN bank_transfer_verifications btv ON btv.payout_id = sp.id
        ORDER BY sp.created_at_stripe DESC
        LIMIT 10
      `,
      sql`
        SELECT
          id,
          charge_id,
          payment_intent_id,
          amount,
          currency,
          status,
          reason,
          created_at_stripe
        FROM stripe_refunds_local
        ORDER BY created_at_stripe DESC
        LIMIT 10
      `,
      sql`
        SELECT
          id,
          order_id,
          writer_id,
          writer_name,
          amount,
          currency,
          status,
          paid_at,
          payment_method,
          payment_reference
        FROM writer_payments
        ORDER BY COALESCE(paid_at, created_at) DESC
        LIMIT 10
      `,
      sql`
        SELECT
          id,
          source,
          campaign_name,
          cost,
          currency,
          cost_date,
          notes
        FROM ad_costs
        ORDER BY cost_date DESC, id DESC
        LIMIT 10
      `,
    ]);

    const grossRevenue = Number(grossRevenueRes[0]?.total ?? 0);
    const stripeFees = Number(stripeFeesRes[0]?.total ?? 0);
    const payoutsSent = Number(payoutSentRes[0]?.total ?? 0);
    const payoutsFailedOrCanceled = Number(payoutFailedRes[0]?.total ?? 0);
    const bankTransfersVerified = Number(payoutVerifiedRes[0]?.total ?? 0);
    const writerPaymentsPaid = Number(writerPaidRes[0]?.total ?? 0);
    const adsCost = Number(adsCostRes[0]?.total ?? 0);
    const refunds = Number(refundsRes[0]?.total ?? 0);

    const realNetProfit =
      grossRevenue - refunds - writerPaymentsPaid - adsCost;

    return NextResponse.json({
      ok: true,
      currency: "cad",
      summary: {
        grossRevenueNetAfterStripeFees: grossRevenue,
        stripeFees,
        payoutsSent,
        payoutsFailedOrCanceled,
        bankTransfersVerified,
        writerPaymentsPaid,
        adsCost,
        refunds,
        realNetProfit,
      },
      monthlyBreakdown: monthlyBreakdownRes,
      latestPayouts: latestPayoutsRes,
      latestRefunds: latestRefundsRes,
      latestWriterPayments: latestWriterPaymentsRes,
      latestAdsCosts: latestAdsRes,
    });
  } catch (error) {
    console.error("Profit API failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Profit API failed",
      },
      { status: 500 }
    );
  }
}