const { neonQuery } = require("../../../../lib/db/neon");

export async function GET() {
  try {
    const result = await neonQuery(
      "SELECT * FROM content_blocks ORDER BY updated_at DESC"
    );

    return Response.json({
      success: true,
      content: result.rows,
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
      "INSERT INTO content_blocks (section, title, body) VALUES ($1,$2,$3) RETURNING *",
      [body.section, body.title, body.body]
    );

    return Response.json({
      success: true,
      block: result.rows[0],
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}