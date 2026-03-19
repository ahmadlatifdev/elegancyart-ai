import { NextResponse } from "next/server";
import { sql } from "../../../../lib/db/neon";

export async function GET() {
  try {
    const plans = await sql`
      SELECT 
        id,
        name,
        slug,
        price_monthly,
        price_yearly,
        description,
        is_active,
        sort_order
      FROM resumora_pricing
      ORDER BY sort_order ASC
    `;

    return NextResponse.json({
      success: true,
      plans,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      error: "Pricing fetch failed",
    });
  }
}