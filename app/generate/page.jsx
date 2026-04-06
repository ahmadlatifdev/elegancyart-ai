"use client";

import { useState } from "react";

export default function GeneratePage() {
  const [form, setForm] = useState({
    name: "",
    job: "",
    experience: "",
  });

  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.success) {
      setResult(data.resume);
    } else {
      setResult("Generation failed.");
    }
  };

  return (
    <main className="min-h-screen bg-[#070b14] text-white p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <input
          placeholder="Name"
          className="w-full rounded-xl border border-gray-700 bg-black p-3"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Target Job"
          className="w-full rounded-xl border border-gray-700 bg-black p-3"
          onChange={(e) => setForm({ ...form, job: e.target.value })}
        />
        <input
          placeholder="Experience"
          className="w-full rounded-xl border border-gray-700 bg-black p-3"
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
        />
        <button
          onClick={handleGenerate}
          className="w-full rounded-xl bg-[#D4AF37] p-3 font-semibold text-black"
        >
          Generate Resume
        </button>

        <pre className="whitespace-pre-wrap rounded-xl border border-gray-700 bg-black p-4">
{result}
        </pre>
      </div>
    </main>
  );
}
