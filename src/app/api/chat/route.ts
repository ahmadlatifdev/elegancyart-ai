import { NextRequest, NextResponse } from "next/server";
import {
  buildMemoryContext,
  getProjectMemory,
  writeEventLog,
} from "../../../../lib/bossmind-memory";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const projectKey = body.projectKey;
    const message = body.message;

    const memoryContext = await buildMemoryContext(projectKey);
    const history = await getProjectMemory(projectKey);

    const responseText = `AI response for ${projectKey}: ${message}`;

    await writeEventLog({
      projectKey,
      eventType: "chat_request",
      payload: {
        message,
        historyLength: history.length,
      },
    });

    return NextResponse.json({
      success: true,
      response: responseText,
      memoryContext,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Chat failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}