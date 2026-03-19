import { neonQuery } from "@/lib/db/neon";

export async function GET() {
  try {
    const result = await neonQuery(
      "SELECT * FROM automation_jobs ORDER BY created_at DESC"
    );

    return Response.json({
      success: true,
      jobs: result.rows,
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
      "INSERT INTO automation_jobs (job_name, status) VALUES ($1,$2) RETURNING *",
      [body.job_name, body.status]
    );

    return Response.json({
      success: true,
      job: result.rows[0],
    });

  } catch (error) {

    return Response.json({
      success: false,
      error: error.message,
    });
  }
}