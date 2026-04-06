"use client";

import { useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [modelUsed, setModelUsed] = useState("");

  async function sendMessage(type = "worker") {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, type }),
    });

    const data = await res.json();
    setResponse(data.output || data.error || "");
    setModelUsed(data.model_used || "");
  }

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>BossMind AI Router</h1>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message..."
        style={{ width: "100%", height: "120px", marginBottom: "20px" }}
      />

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => sendMessage("brain")}>Brain (GPT-5.4)</button>
        <button onClick={() => sendMessage("worker")}>Worker (Mini)</button>
        <button onClick={() => sendMessage("background")}>
          Background (Nano)
        </button>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3>Model Used:</h3>
        <p>{modelUsed}</p>

        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </main>
  );
}