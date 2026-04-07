export const dynamic = "force-static";

export async function POST(req: Request) {
  return new Response(
    JSON.stringify({
      success: true,
      message: "Chat disabled for static build"
    }),
    {
      headers: { "Content-Type": "application/json" }
    }
  );
}