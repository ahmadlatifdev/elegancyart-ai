import { NextRequest, NextResponse } from "next/server";
import { getBossMindMemoryContext } from "../../../../lib/bossmind-memory";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const projectKey = body.projectKey ?? "bossmind-master-admin";

    const memoryContext = await getBossMindMemoryContext(projectKey);

    return NextResponse.json({
      success: true,
      memoryContext,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Memory context failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}