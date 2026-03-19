import { NextResponse } from "next/server";
import { sql } from "../../../../lib/db/neon";

export async function GET() {
  try {
    const orders = await sql`
      SELECT
        client_name,
        client_email,
        amount
      FROM resumora_orders
      ORDER BY created_at DESC
    `;

    const map = {};

    for (const o of orders) {
      const key = o.client_email || o.client_name || "unknown";

      if (!map[key]) {
        map[key] = {
          client_email: o.client_email || "",
          client_name: o.client_name || "Unknown",
          orders: 0,
          total_spent: 0,
        };
      }

      map[key].orders += 1;
      map[key].total_spent += Number(o.amount || 0);
    }

    return NextResponse.json({
      success: true,
      customers: Object.values(map),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Customers fetch failed",
      },
      { status: 500 }
    );
  }
}