"use client";

import { useState } from "react";

export default function BossMindTestPanel() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [raw, setRaw] = useState<any>(null);

  async function sendPrompt() {
    setLoading(true);
    setReply("");
    setRaw(null);

    try {
      const response = await fetch("/api/bossmind/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setRaw(data);
      setReply(data?.reply ?? "No reply received");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setReply("ERROR: " + message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20, border: "1px solid #444", borderRadius: 8 }}>
      <h3>BossMind Test Panel</h3>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        style={{ width: "100%" }}
        placeholder="Enter test prompt..."
      />

      <button
        onClick={sendPrompt}
        disabled={loading}
        style={{ marginTop: 10 }}
      >
        {loading ? "Running..." : "Send"}
      </button>

      {reply && (
        <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>{reply}</pre>
      )}
    </div>
  );
}
