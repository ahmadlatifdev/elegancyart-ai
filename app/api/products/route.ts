// app/api/products/route.ts

// Always run on the server – never cache
export const dynamic = "force-dynamic";

// Handle CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

// Main GET endpoint
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  return new Response(
    JSON.stringify({
      ok: true,
      mode: "dynamic",
      productId: id ?? null,
      message: id
        ? `You requested product ${id}`
        : "Products API working globally",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
