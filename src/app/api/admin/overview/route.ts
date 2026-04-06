import { NextResponse } from "next/server";

// ✅ FIXED IMPORT (relative path)
import { getMasterOverview } from "../../../../lib/admin/overview";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getMasterOverview();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}