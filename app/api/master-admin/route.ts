import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const WORKER_MAP: Record<string, string | undefined> = {
  ai_video: process.env.WORKER_AI_VIDEO_URL,
  ai_builder: process.env.WORKER_AI_BUILDER_URL,
  resumora: process.env.WORKER_RESUMORA_URL,
  tiktok_automation: process.env.WORKER_TIKTOK_URL,
  global_stock_trading: process.env.WORKER_GLOBAL_STOCK_URL,
  queue_core: process.env.WORKER_QUEUE_CORE_URL,
  elegancyart_ai_builder: process.env.WORKER_ELEGANCYART_AI_BUILDER_URL,
};

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        project_key,
        name,
        status,
        queue_count,
        failed_count
      FROM bossmind_projects
      ORDER BY name;
    `);

    return NextResponse.json({ projects: result.rows });
  } catch (error) {
    console.error("GET /api/master-admin failed:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch projects",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { project_key, action } = await req.json();

    let status = "stopped";
    if (action === "start") status = "running";
    if (action === "stop") status = "stopped";
    if (action === "retry") status = "retrying";

    const workerUrl = WORKER_MAP[project_key];

    let workerResult: {
      ok: boolean;
      status: number | null;
      body: unknown;
    } | null = null;

    if (workerUrl) {
      const response = await fetch(workerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_key,
          action,
          source: "bossmind-master-admin",
        }),
        cache: "no-store",
      });

      let body: unknown = null;
      try {
        body = await response.json();
      } catch {
        body = await response.text();
      }

      workerResult = {
        ok: response.ok,
        status: response.status,
        body,
      };

      if (!response.ok) {
        throw new Error(
          `Worker call failed for ${project_key} with status ${response.status}`
        );
      }
    }

    await pool.query(
      `
      UPDATE bossmind_projects
      SET status = $1,
          last_action = $2,
          last_action_at = NOW(),
          worker_url = $3,
          worker_enabled = $4
      WHERE project_key = $5
      `,
      [status, action, workerUrl ?? null, Boolean(workerUrl), project_key]
    );

    await pool.query(
      `
      INSERT INTO bossmind_project_events (project_key, action, result, source, message, payload)
      VALUES ($1, $2, 'success', 'master-admin', $3, $4::jsonb)
      `,
      [
        project_key,
        action,
        workerUrl
          ? `Worker executed successfully`
          : `No worker URL configured yet; database state updated only`,
        JSON.stringify({
          workerUrl: workerUrl ?? null,
          workerResult,
        }),
      ]
    );

    return NextResponse.json({
      success: true,
      project_key,
      action,
      worker_called: Boolean(workerUrl),
      worker_url: workerUrl ?? null,
      worker_result: workerResult,
    });
  } catch (error) {
    console.error("POST /api/master-admin failed:", error);

    return NextResponse.json(
      {
        error: "Action failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}