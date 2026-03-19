import { neonQuery } from "@/lib/db/neon";

export async function GET() {
  try {
    const result = await neonQuery(
      "SELECT * FROM payments ORDER BY created_at DESC"
    );

    return Response.json({
      success: true,
      payments: result.rows,
    });

  } catch (error) {

    return Response.json({
      success: false,
      error: error.message,
    });
  }
}

export async function POST(req) {

  const body = await req.json();

  try {

    const result = await neonQuery(
      "INSERT INTO payments (order_id, stripe_payment_id, amount, status) VALUES ($1,$2,$3,$4) RETURNING *",
      [body.order_id, body.stripe_payment_id, body.amount, body.status]
    );

    return Response.json({
      success: true,
      payment: result.rows[0],
    });

  } catch (error) {

    return Response.json({
      success: false,
      error: error.message,
    });
  }
}