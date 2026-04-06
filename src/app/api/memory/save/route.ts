import { NextRequest, NextResponse } from "next/server";
import { writeEventLog } from "../../../../lib/bossmind-memory";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const projectKey = body.projectKey ?? "bossmind-master-admin";
    const content = body.content ?? "";

    const result = await writeEventLog({
      projectKey,
      eventType: "memory_save",
      payload: { content },
    });

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Memory save failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}