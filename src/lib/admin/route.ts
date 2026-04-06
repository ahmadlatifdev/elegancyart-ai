import { NextResponse } from "next/server";
import { getMasterOverview } from "@/lib/admin/overview";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getMasterOverview();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/overview failed:", error);

    return NextResponse.json(
      {
        message: "Failed to load admin overview.",
      },
      { status: 500 }
    );
  }
}