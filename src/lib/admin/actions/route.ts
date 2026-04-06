import { NextResponse } from "next/server";
import { projectState } from "../runtime-state";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const project = body?.project || "global";
    const action = body?.action || "get";
    const details = body?.details || null;

    const state = projectState(project);

    if (action === "set-running") {
      return NextResponse.json({
        success: true,
        state: state.set("running", details),
      });
    }

    if (action === "set-success") {
      return NextResponse.json({
        success: true,
        state: state.set("success", details),
      });
    }

    if (action === "set-error") {
      return NextResponse.json({
        success: true,
        state: state.set("error", details),
      });
    }

    if (action === "reset") {
      return NextResponse.json({
        success: true,
        state: state.reset(),
      });
    }

    return NextResponse.json({
      success: true,
      state: state.get(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}