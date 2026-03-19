import { neonQuery } from "@/lib/db/neon";

export async function GET() {
  try {
    const result = await neonQuery(
      "SELECT * FROM settings ORDER BY updated_at DESC"
    );

    return Response.json({
      success: true,
      settings: result.rows,
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
      "INSERT INTO settings (key, value) VALUES ($1,$2) RETURNING *",
      [body.key, body.value]
    );

    return Response.json({
      success: true,
      setting: result.rows[0],
    });

  } catch (error) {

    return Response.json({
      success: false,
      error: error.message,
    });
  }
}