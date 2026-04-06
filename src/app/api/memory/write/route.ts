import { NextRequest, NextResponse } from "next/server";
import { writeMemory } from "@/lib/bossmind-memory";

type WriteBody = {
  key: string;
  project?: string;
  value: Record<string, unknown>;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as WriteBody;

    if (!body.key || !body.value) {
      return NextResponse.json(
        {
          status: "error",
          message: "key and value are required",
        },
        { status: 400 }
      );
    }

    const saved = await writeMemory({
      key: body.key,
      project: body.project || "global",
      value: body.value,
    });

    return NextResponse.json({
      status: "success",
      saved,
    });
  } catch (error) {
    console.error("POST /api/memory/write failed:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to write memory",
      },
      { status: 500 }
    );
  }
}