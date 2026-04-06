import { NextRequest, NextResponse } from "next/server";
import { getProjectMemory } from "../../../../lib/bossmind-memory";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const projectKey = body.projectKey ?? "bossmind-master-admin";

    const items = await getProjectMemory(projectKey);

    return NextResponse.json({
      success: true,
      items,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Memory get failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}