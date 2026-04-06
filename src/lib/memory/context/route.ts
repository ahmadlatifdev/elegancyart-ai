import { NextResponse } from "next/server";
import { getProjectMemory } from "@/lib/bossmind-memory";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const project = searchParams.get("project") || "global";

    const memory = await getProjectMemory(project);

    return NextResponse.json({
      status: "success",
      project,
      memory,
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