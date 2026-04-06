"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#070b14] text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#D4AF37]">
            About Resumora
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl leading-8">
            Resumora is a premium AI-powered career platform built to help clients create
            stronger resumes, cover letters, and job application assets with a luxury,
            modern, and professional experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <section className="rounded-2xl border border-[#1f2937] bg-[#0b1220] p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-3">Our Mission</h2>
            <p className="text-gray-300 leading-7">
              Deliver high-end resume and career tools that feel elite, fast, and reliable
              for every client.
            </p>
          </section>

          <section className="rounded-2xl border border-[#1f2937] bg-[#0b1220] p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-3">Our Standard</h2>
            <p className="text-gray-300 leading-7">
              Every interface, workflow, and feature is designed to match a 2026-level
              premium client experience.
            </p>
          </section>

          <section className="rounded-2xl border border-[#1f2937] bg-[#0b1220] p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-3">Our Focus</h2>
            <p className="text-gray-300 leading-7">
              Clarity, speed, premium quality, bilingual usability, and strong results for
              job seekers.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}