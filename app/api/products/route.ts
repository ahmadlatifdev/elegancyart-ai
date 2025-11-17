// app/api/products/route.ts

export const dynamic = 'force-dynamic'; // always run on server, no cache

export async function OPTIONS() {
  // CORS preflight
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id') ?? null;

  return new Response(
    JSON.stringify({
      ok: true,
      mode: 'dynamic',
      method: 'GET',
      id,
      time: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  return new Response(
    JSON.stringify({
      ok: true,
      mode: 'dynamic',
      method: 'POST',
      body,
      time: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}
