"use client";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#070b14] text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#D4AF37]">
            Resumora Services
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl leading-8">
            Premium career services designed for clients who want a stronger,
            cleaner, and more competitive professional profile.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          <section className="rounded-2xl border border-[#1f2937] bg-[#0b1220] p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-3">
              Resume Creation
            </h2>
            <p className="text-gray-300 leading-7">
              Professionally structured resumes designed for clarity, impact,
              and modern hiring standards.
            </p>
          </section>

          <section className="rounded-2xl border border-[#1f2937] bg-[#0b1220] p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-3">
              Cover Letter Writing
            </h2>
            <p className="text-gray-300 leading-7">
              Personalized cover letters tailored to job roles, industries, and
              employer expectations.
            </p>
          </section>

          <section className="rounded-2xl border border-[#1f2937] bg-[#0b1220] p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-3">
              Resume Upgrade
            </h2>
            <p className="text-gray-300 leading-7">
              Upgrade outdated resumes into polished, modern, premium-quality
              documents.
            </p>
          </section>

          <section className="rounded-2xl border border-[#1f2937] bg-[#0b1220] p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-3">
              Job Application Optimization
            </h2>
            <p className="text-gray-300 leading-7">
              Improve wording, structure, and positioning to increase interview
              potential.
            </p>
          </section>

          <section className="rounded-2xl border border-[#1f2937] bg-[#0b1220] p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-3">
              LinkedIn Profile Enhancement
            </h2>
            <p className="text-gray-300 leading-7">
              Strengthen profile presentation for recruiters, employers, and
              networking visibility.
            </p>
          </section>

          <section className="rounded-2xl border border-[#1f2937] bg-[#0b1220] p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-3">
              Premium Career Support
            </h2>
            <p className="text-gray-300 leading-7">
              High-end client support for premium package users who want deeper
              career document refinement.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}