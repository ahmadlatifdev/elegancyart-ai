export async function sendBossMindMessage(message) {
  const payload = {
    messages: [
      {
        role: "user",
        content: message || "Hello BossMind, test message from AI Builder."
      }
    ]
  };

  const res = await fetch("/api/bossmind-chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`BossMind API failed: ${text}`);
  }

  return await res.json();
}
