import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

export async function GET() {
  try {

    const DATABASE_URL =
      process.env.DATABASE_URL ||
      process.env.NEON_DATABASE_URL ||
      process.env.POSTGRES_URL ||
      "";

    if (!DATABASE_URL) {
      return NextResponse.json({
        ok: false,
        error: "DATABASE_URL missing",
        hint: "Check .env.local file"
      });
    }

    const sql = neon(DATABASE_URL);

    const overview = await sql`
      SELECT
        (SELECT COUNT(*) FROM orders) AS total_orders,
        (SELECT COUNT(*) FROM memory_store) AS total_memory,
        (SELECT COUNT(*) FROM system_logs) AS total_logs,
        (SELECT COUNT(*) FROM video_jobs) AS total_videos,
        (SELECT COUNT(*) FROM ai_projects) AS total_projects,
        (SELECT COUNT(*) FROM ai_users) AS total_users
    `;

    const orders = await sql`
      SELECT id, customer_email, product_name, amount, currency, status, created_at
      FROM orders
      ORDER BY created_at DESC
      LIMIT 10
    `;

    const videos = await sql`
      SELECT id, title, language, status, youtube_url, created_at
      FROM video_jobs
      ORDER BY created_at DESC
      LIMIT 10
    `;

    const projects = await sql`
      SELECT id, project_name, description, status
      FROM ai_projects
      ORDER BY project_name ASC
    `;

    const settings = await sql`
      SELECT setting_key, setting_value
      FROM ai_settings
      ORDER BY setting_key ASC
    `;

    const logs = await sql`
      SELECT id, project, action, status, details, created_at
      FROM system_logs
      ORDER BY created_at DESC
      LIMIT 20
    `;

    return NextResponse.json({
      ok: true,
      overview: overview[0],
      orders,
      videos,
      projects,
      settings,
      logs
    });

  } catch (error: any) {

    return NextResponse.json({
      ok: false,
      error: "Database connection failed",
      message: error?.message || "Unknown error"
    });

  }
}