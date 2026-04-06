"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function HomePage() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") === "fr" ? "fr" : "en";

  const t = {
    en: {
      badge: "Premium AI Career Platform",
      title1: "Build a stronger",
      title2: "career presence",
      desc:
        "Resumora helps clients create premium resumes, cover letters, and professional career assets with a modern luxury experience.",
      viewPlans: "View Plans",
      exploreServices: "Explore Services",
      ai: "Smart optimization",
      pro: "Premium templates",
      fast: "Client-ready flow",
      previewTitle: "Client Dashboard Preview",
      previewSub: "2026 luxury client experience",
      score: "Resume Score",
      upgrade: "Resume Upgrade",
      upgradeDesc: "Improve structure, language, and recruiter impact.",
      cover: "Cover Letter",
      coverDesc: "Generate a matching premium letter in seconds.",
      actions: "Quick Actions",
      startResume: "Start Resume",
      uploadCv: "Upload CV",
      linkedin: "LinkedIn Fix",
      plans: "View Plans",
    },
    fr: {
      badge: "Plateforme IA Carrière Premium",
      title1: "Construisez une",
      title2: "présence professionnelle forte",
      desc:
        "Resumora aide les clients à créer des CV premium, des lettres de motivation et des documents professionnels avec une expérience moderne et luxueuse.",
      viewPlans: "Voir les tarifs",
      exploreServices: "Explorer les services",
      ai: "Optimisation intelligente",
      pro: "Modèles premium",
      fast: "Flux prêt pour client",
      previewTitle: "Aperçu du tableau client",
      previewSub: "Expérience client luxe 2026",
      score: "Score du CV",
      upgrade: "Amélioration du CV",
      upgradeDesc: "Améliorez la structure, le langage et l’impact recruteur.",
      cover: "Lettre de motivation",
      coverDesc: "Générez une lettre premium assortie en quelques secondes.",
      actions: "Actions rapides",
      startResume: "Commencer CV",
      uploadCv: "Téléverser CV",
      linkedin: "Corriger LinkedIn",
      plans: "Voir les tarifs",
    },
  };

  const content = t[lang];

  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.14),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center rounded-full border border-[#D4AF37]/30 bg-[#0b1220] px-4 py-2 text-sm text-[#D4AF37]">
                {content.badge}
              </div>

              <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">
                {content.title1}
                <span className="block text-[#D4AF37]">{content.title2}</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
                {content.desc}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={`/pricing?lang=${lang}`}
                  className="rounded-xl bg-[#D4AF37] px-6 py-3 text-center font-semibold text-black hover:opacity-90"
                >
                  {content.viewPlans}
                </Link>

                <Link
                  href={`/services?lang=${lang}`}
                  className="rounded-xl border border-gray-600 bg-[#0b1220] px-6 py-3 text-center hover:border-[#D4AF37]"
                >
                  {content.exploreServices}
                </Link>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
                <div className="rounded-2xl border border-gray-800 bg-[#0b1220] p-4">
                  <div className="text-2xl font-bold text-[#D4AF37]">AI</div>
                  <div className="mt-1 text-sm text-gray-400">{content.ai}</div>
                </div>
                <div className="rounded-2xl border border-gray-800 bg-[#0b1220] p-4">
                  <div className="text-2xl font-bold text-[#D4AF37]">Pro</div>
                  <div className="mt-1 text-sm text-gray-400">{content.pro}</div>
                </div>
                <div className="rounded-2xl border border-gray-800 bg-[#0b1220] p-4">
                  <div className="text-2xl font-bold text-[#D4AF37]">Fast</div>
                  <div className="mt-1 text-sm text-gray-400">{content.fast}</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-800 bg-[#0b1220] p-6 shadow-2xl md:p-8">
              <div className="rounded-2xl border border-gray-800 bg-[#070b14] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{content.previewTitle}</h2>
                    <p className="mt-1 text-sm text-gray-400">{content.previewSub}</p>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-[#D4AF37]" />
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-gray-800 bg-[#0b1220] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">{content.score}</span>
                      <span className="text-sm text-[#D4AF37]">92%</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-gray-800">
                      <div className="h-2 w-[92%] rounded-full bg-[#D4AF37]" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-gray-800 bg-[#0b1220] p-4">
                      <h3 className="mb-2 font-medium">{content.upgrade}</h3>
                      <p className="text-sm text-gray-400">{content.upgradeDesc}</p>
                    </div>

                    <div className="rounded-2xl border border-gray-800 bg-[#0b1220] p-4">
                      <h3 className="mb-2 font-medium">{content.cover}</h3>
                      <p className="text-sm text-gray-400">{content.coverDesc}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-800 bg-[#0b1220] p-4">
                    <h3 className="mb-3 font-medium">{content.actions}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="rounded-xl bg-[#D4AF37] py-2 font-medium text-black">
                        {content.startResume}
                      </button>
                      <button className="rounded-xl border border-gray-700 py-2 font-medium">
                        {content.uploadCv}
                      </button>
                      <button className="rounded-xl border border-gray-700 py-2 font-medium">
                        {content.linkedin}
                      </button>
                      <Link
                        href={`/pricing?lang=${lang}`}
                        className="rounded-xl border border-gray-700 py-2 text-center font-medium"
                      >
                        {content.plans}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}