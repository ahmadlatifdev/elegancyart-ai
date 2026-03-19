import { NextResponse } from "next/server";
import { sql } from "../../../../lib/db/neon";

export async function GET() {
  try {
    const orders = await sql`SELECT * FROM resumora_orders`;

    return NextResponse.json({
      success: true,
      count: Array.isArray(orders) ? orders.length : 0,
      first_row: Array.isArray(orders) && orders.length > 0 ? orders[0] : null,
      orders
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: String(error)
      },
      { status: 500 }
    );
  }
}