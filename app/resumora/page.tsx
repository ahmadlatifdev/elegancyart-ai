"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Lang = "en" | "fr";

const content = {
  en: {
    brand: "Resumora",
    subtitle: "Premium resume and career support services",
    navServices: "Services",
    navPricing: "Pricing",
    navProcess: "Process",
    navContact: "Contact",
    register: "Register",
    liveChat: "Live Chat",
    badge: "Advanced Career Support",
    heroTitle: "Build a stronger professional future with Resumora",
    heroText:
      "A complete premium client interface for resume writing, LinkedIn optimization, interview preparation, translation support, and direct live assistance.",
    heroPrimary: "Start Live Chat",
    heroSecondary: "Create Account",
    servicesTitle: "Professional Services",
    pricingTitle: "Pricing",
    processTitle: "How It Works",
    footerSupport: "Support",
    footerPrivacy: "Privacy",
    footerRefund: "Refund Policy",
    footerContact: "Contact",
    footerRights: "© 2026 Resumora. All rights reserved.",
    services: [
      {
        title: "Resume Writing",
        text: "ATS-focused resume enhancement designed to improve clarity, structure, and job impact.",
      },
      {
        title: "LinkedIn Optimization",
        text: "Upgrade your profile visibility and professional positioning for stronger opportunities.",
      },
      {
        title: "Interview Preparation",
        text: "Practical support to improve confidence, answers, and interview performance.",
      },
      {
        title: "Translation Service",
        text: "Clear bilingual support for career documents and professional presentation.",
      },
    ],
    process: [
      {
        title: "Choose Service",
        text: "Select the service or package that matches your career goal.",
      },
      {
        title: "Submit Details",
        text: "Share your existing resume, target role, or support request.",
      },
      {
        title: "Receive Professional Support",
        text: "Get guided improvement, direct live support, and next-step recommendations.",
      },
    ],
    trust: [
      "Professional premium design",
      "Direct live support",
      "Clear service structure",
      "Career-focused improvements",
    ],
    plans: [
      {
        name: "Basic",
        price: "$19",
        text: "Basic resume improvement for quick enhancement.",
      },
      {
        name: "Pro",
        price: "$49",
        text: "Resume + LinkedIn optimization with stronger positioning.",
      },
      {
        name: "Premium",
        price: "$99",
        text: "Full career package with interview preparation support.",
      },
    ],
  },
  fr: {
    brand: "Resumora",
    subtitle: "Services premium de CV et d’accompagnement professionnel",
    navServices: "Services",
    navPricing: "Tarifs",
    navProcess: "Processus",
    navContact: "Contact",
    register: "Inscription",
    liveChat: "Chat en direct",
    badge: "Accompagnement de carrière avancé",
    heroTitle: "Construisez un avenir professionnel plus fort avec Resumora",
    heroText:
      "Une interface client premium complète pour la rédaction de CV, l’optimisation LinkedIn, la préparation aux entretiens, la traduction et l’assistance directe.",
    heroPrimary: "Démarrer le chat",
    heroSecondary: "Créer un compte",
    servicesTitle: "Services professionnels",
    pricingTitle: "Tarifs",
    processTitle: "Comment ça marche",
    footerSupport: "Support",
    footerPrivacy: "Confidentialité",
    footerRefund: "Politique de remboursement",
    footerContact: "Contact",
    footerRights: "© 2026 Resumora. Tous droits réservés.",
    services: [
      {
        title: "Rédaction de CV",
        text: "Amélioration de CV orientée ATS pour renforcer la clarté, la structure et l’impact.",
      },
      {
        title: "Optimisation LinkedIn",
        text: "Améliorez la visibilité de votre profil et votre positionnement professionnel.",
      },
      {
        title: "Préparation aux entretiens",
        text: "Support pratique pour renforcer la confiance et la qualité des réponses.",
      },
      {
        title: "Service de traduction",
        text: "Support bilingue clair pour les documents de carrière et la présentation professionnelle.",
      },
    ],
    process: [
      {
        title: "Choisir le service",
        text: "Sélectionnez le service ou l’offre adaptée à votre objectif professionnel.",
      },
      {
        title: "Envoyer les détails",
        text: "Partagez votre CV actuel, le poste visé ou votre demande d’assistance.",
      },
      {
        title: "Recevoir un support professionnel",
        text: "Obtenez une amélioration guidée, une assistance directe et des recommandations concrètes.",
      },
    ],
    trust: [
      "Design premium professionnel",
      "Support direct en temps réel",
      "Structure de service claire",
      "Améliorations orientées carrière",
    ],
    plans: [
      {
        name: "Basic",
        price: "$19",
        text: "Amélioration de CV de base pour une optimisation rapide.",
      },
      {
        name: "Pro",
        price: "$49",
        text: "CV + optimisation LinkedIn avec meilleur positionnement.",
      },
      {
        name: "Premium",
        price: "$99",
        text: "Pack carrière complet avec préparation aux entretiens.",
      },
    ],
  },
};

export default function ResumoraClientHome() {
  const [lang, setLang] = useState<Lang>("en");
  const t = content[lang];

  return (
    <main className="min-h-screen bg-[#071a33] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d2748]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Image
              src="/resumora/logo.png"
              alt="Resumora logo"
              width={64}
              height={64}
              className="h-14 w-auto object-contain"
              priority
            />
            <div>
              <h1 className="text-2xl font-bold">{t.brand}</h1>
              <p className="text-sm text-blue-100/80">{t.subtitle}</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium text-blue-100/90 md:flex">
            <a href="#services">{t.navServices}</a>
            <a href="#pricing">{t.navPricing}</a>
            <a href="#process">{t.navProcess}</a>
            <a href="#contact">{t.navContact}</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                lang === "en" ? "bg-yellow-500 text-black" : "bg-slate-600 text-white"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("fr")}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                lang === "fr" ? "bg-yellow-500 text-black" : "bg-slate-600 text-white"
              }`}
            >
              FR
            </button>
            <Link
              href="/resumora/register"
              className="ml-2 rounded-lg bg-slate-600 px-4 py-2 text-sm font-semibold text-white"
            >
              {t.register}
            </Link>
            <Link
              href="/resumora/chat"
              className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-black"
            >
              {t.liveChat}
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-sm text-yellow-300">
            {t.badge}
          </div>

          <h2 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            {t.heroTitle}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100/80 md:text-lg">
            {t.heroText}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/resumora/chat"
              className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black"
            >
              {t.heroPrimary}
            </Link>

            <Link
              href="/resumora/register"
              className="rounded-xl border border-white/15 bg-[#16335c] px-6 py-3 font-semibold text-white"
            >
              {t.heroSecondary}
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {t.trust.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-[#0d2748] px-4 py-4 text-sm text-blue-50"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0d2748] p-6 shadow-2xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {t.services.map((service) => (
              <div key={service.title} className="rounded-2xl bg-[#16335c] p-5">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-blue-100/80">
                  {service.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto w-full max-w-7xl px-6 py-6">
        <h3 className="mb-6 text-3xl font-bold">{t.servicesTitle}</h3>
        <div className="grid gap-6 md:grid-cols-4">
          {t.services.map((service) => (
            <div
              key={service.title}
              className="rounded-3xl border border-white/10 bg-[#10284a] p-6"
            >
              <h4 className="text-lg font-semibold">{service.title}</h4>
              <p className="mt-3 text-sm leading-6 text-blue-100/80">
                {service.text}
              </p>
              <button className="mt-6 w-full rounded-xl bg-yellow-500 px-4 py-3 font-semibold text-black">
                {t.liveChat}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto w-full max-w-7xl px-6 py-10">
        <h3 className="mb-6 text-3xl font-bold">{t.pricingTitle}</h3>

        <div className="grid gap-6 md:grid-cols-3">
          {t.plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-6 ${
                index === 1
                  ? "border border-yellow-500/50 bg-[#16335c] shadow-xl"
                  : "border border-white/10 bg-[#10284a]"
              }`}
            >
              <h4 className="text-xl font-bold">{plan.name}</h4>
              <p className="mt-4 text-4xl font-bold text-yellow-400">{plan.price}</p>
              <p className="mt-4 text-sm leading-6 text-blue-100/80">{plan.text}</p>
              <button className="mt-8 w-full rounded-xl bg-yellow-500 px-4 py-3 font-semibold text-black">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="process" className="mx-auto w-full max-w-7xl px-6 py-10">
        <h3 className="mb-6 text-3xl font-bold">{t.processTitle}</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {t.process.map((step, index) => (
            <div
              key={step.title}
              className="rounded-3xl border border-white/10 bg-[#10284a] p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 font-bold text-black">
                {index + 1}
              </div>
              <h4 className="text-xl font-semibold">{step.title}</h4>
              <p className="mt-3 text-sm leading-6 text-blue-100/80">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-white/10 bg-[#0d2748] p-8">
          <h3 className="text-3xl font-bold">{t.navContact}</h3>
          <p className="mt-4 max-w-3xl text-base leading-7 text-blue-100/80">
            Resumora provides premium career support through a structured client experience,
            including resume improvement, LinkedIn enhancement, live guidance, and multilingual support.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/resumora/chat"
              className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black"
            >
              {t.liveChat}
            </Link>
            <Link
              href="/resumora/register"
              className="rounded-xl border border-white/15 bg-[#16335c] px-6 py-3 font-semibold text-white"
            >
              {t.register}
            </Link>
          </div>
        </div>
      </section>

      <footer className="mt-12 border-t border-white/10 bg-[#0d2748]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-blue-100/80 md:flex-row md:items-center md:justify-between">
          <span>{t.footerRights}</span>
          <div className="flex flex-wrap gap-5">
            <span>{t.footerSupport}</span>
            <span>{t.footerPrivacy}</span>
            <span>{t.footerRefund}</span>
            <span>{t.footerContact}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}