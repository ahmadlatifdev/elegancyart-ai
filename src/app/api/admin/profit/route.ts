import { NextResponse } from "next/server";
import { sql } from "../../../../../lib/db/neon";

export async function GET() {
  try {
    const [chargesRows, refundsRows, ordersRows] = await Promise.all([
      sql`
        SELECT COALESCE(SUM(net), 0) AS total
        FROM stripe_balance_ledger
        WHERE type = 'charge'
      `,
      sql`
        SELECT COALESCE(SUM(net), 0) AS total
        FROM stripe_balance_ledger
        WHERE type = 'refund'
      `,
      sql`
        SELECT COUNT(*) AS count
        FROM orders
      `,
    ]);

    const charges = Number(chargesRows?.[0]?.total ?? 0);
    const refunds = Number(refundsRows?.[0]?.total ?? 0);
    const orders = Number(ordersRows?.[0]?.count ?? 0);
    const netProfit = charges - Math.abs(refunds);

    return NextResponse.json({
      success: true,
      data: {
        charges,
        refunds,
        orders,
        netProfit,
      },
    });
  } catch (error) {
    console.error("Profit route error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load profit data",
      },
      { status: 500 }
    );
  }
}