"use client";

import { useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [modelUsed, setModelUsed] = useState("");

  async function sendMessage() {
    if (!message.trim()) return;

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    setResponse(data.output || data.error || "No response");
    setModelUsed(data.model_used || "unknown");
    setMessage(""); // clear input after send
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>BossMind AI Router</h1>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter..."
        style={{ width: "100%", height: "120px", marginBottom: "20px" }}
      />

      <button onClick={sendMessage}>Send</button>

      <div style={{ marginTop: "30px" }}>
        <h3>Model Used:</h3>
        <p>{modelUsed}</p>

        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </main>
  );
}