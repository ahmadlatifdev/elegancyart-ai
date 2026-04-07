export const dynamic = "force-static";

export async function POST(req) {
  return new Response(JSON.stringify({ success: true, message: "Chat OK" }), {
    status: 200,
  });
}