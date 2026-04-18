import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json(
        { reply: "Message is required." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      reply: `Resumora AI received: ${message}`,
    });
  } catch {
    return NextResponse.json(
      { reply: "Invalid request." },
      { status: 400 }
    );
  }
}