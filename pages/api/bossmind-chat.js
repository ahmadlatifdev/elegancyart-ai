export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const response = await fetch(
      "http://localhost:5001/api/deepseek/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      }
    );

    const data = await response.json();

    return res.status(200).json({
      ok: true,
      assistantReply:
        data.assistantReply ||
        data.reply ||
        data?.raw?.choices?.[0]?.message?.content ||
        null,
      raw: data
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: "fetch failed",
      details: err.message
    });
  }
}
