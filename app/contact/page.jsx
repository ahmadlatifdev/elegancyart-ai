"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  return (
    <main className="min-h-screen bg-[#070b14] text-white px-6 py-16">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-[#D4AF37] mb-6">
          Contact Us
        </h1>

        <div className="bg-[#0b1220] border border-gray-700 rounded-2xl p-6">
          <div className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-[#070b14] border border-gray-600 focus:outline-none"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-[#070b14] border border-gray-600 focus:outline-none"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full p-3 rounded-lg bg-[#070b14] border border-gray-600 focus:outline-none"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            <button className="w-full py-3 bg-[#D4AF37] text-black rounded-lg hover:opacity-90">
              Send Message
            </button>

          </div>
        </div>

      </div>
    </main>
  );
}