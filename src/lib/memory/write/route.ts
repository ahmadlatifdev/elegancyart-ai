import { NextRequest, NextResponse } from "next/server";
import { writeMemory } from "@/lib/bossmind-memory";

type WriteBody = {
  key: string;
  value: any;
  project?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as WriteBody;

    const result = await writeMemory({
      key: body.key,
      value: body.value,
      project: body.project || "global",
    });

    return NextResponse.json({
      status: "success",
      result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}