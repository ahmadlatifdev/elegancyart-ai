import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

function autoSelectModel(message: string) {
  const text = message.toLowerCase();

  // 🔥 Brain (complex reasoning)
  if (
    text.includes("strategy") ||
    text.includes("architecture") ||
    text.includes("plan") ||
    text.includes("system")
  ) {
    return "gpt-5.4";
  }

  // ⚡ Background (simple tasks)
  if (
    text.length < 20 ||
    text.includes("log") ||
    text.includes("save") ||
    text.includes("status")
  ) {
    return "gpt-5.4-nano";
  }

  // ⚙️ Default worker
  return "gpt-5.4-mini";
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const model = autoSelectModel(message);

    const response = await client.responses.create({
      model,
      input: message,
    });

    return new Response(
      JSON.stringify({
        model_used: model,
        output: response.output_text,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 }
    );
  }
}