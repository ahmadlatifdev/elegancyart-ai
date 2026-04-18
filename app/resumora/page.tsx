"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type Lang = "en" | "fr";

type ServiceItem = {
  key: string;
  title: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
  href: string;
  badge?: {
    en: string;
    fr: string;
  };
};

type ActionItem = {
  key: string;
  title: {
    en: string;
    fr: string;
  };
  subtitle: {
    en: string;
    fr: string;
  };
  href: string;
  variant?: "primary" | "secondary";
};

const CONTENT = {
  en: {
    premium: "Resumora Premium",
    languageMode: "Language Mode",
    clientExperience: "Client Experience",
    responseFlow: "Response Flow",
    premiumValue: "Premium",
    activeValue: "Active",
    heroTitle: "Luxury Resume Client Interface",
    heroDescription:
      "Premium resume and career platform with advanced client-ready structure, instant response behavior, refined onboarding, and a high-end 2026 client experience.",
    heroPrimary: "Create Resume",
    heroSecondary: "Explore Services",
    servicesTitle: "Premium Services",
    actionsTitle: "Client Actions",
    whyTitle: "Why Resumora",
    whyItems: [
      "Instant EN / FR switching",
      "Fast client-focused navigation",
      "Responsive premium layout on desktop, tablet, and mobile",
      "Direct service entry points without admin exposure",
    ],
    trustTitle: "Client-Only Experience",
    trustText:
      "This interface is designed for clients only. No BossMind dashboard access links are exposed here.",
    footerTitle: "Resumora",
    footerText:
      "Premium resume, cover letter, interview preparation, and priority delivery services.",
  },
  fr: {
    premium: "Resumora Premium",
    languageMode: "Mode de Langue",
    clientExperience: "Expérience Client",
    responseFlow: "Flux de Réponse",
    premiumValue: "Premium",
    activeValue: "Actif",
    heroTitle: "Interface Client CV de Luxe",
    heroDescription:
      "Plateforme premium de CV et de carrière avec structure avancée orientée client, réponse instantanée, intégration fluide et expérience haut de gamme 2026.",
    heroPrimary: "Créer un CV",
    heroSecondary: "Explorer les Services",
    servicesTitle: "Services Premium",
    actionsTitle: "Actions Client",
    whyTitle: "Pourquoi Resumora",
    whyItems: [
      "Bascule instantanée EN / FR",
      "Navigation rapide orientée client",
      "Interface premium responsive sur ordinateur, tablette et mobile",
      "Accès direct aux services sans exposition admin",
    ],
    trustTitle: "Expérience Réservée aux Clients",
    trustText:
      "Cette interface est conçue uniquement pour les clients. Aucun lien d’accès au tableau de bord BossMind n’est exposé ici.",
    footerTitle: "Resumora",
    footerText:
      "Services premium de CV, lettre de motivation, préparation d’entretien et livraison prioritaire.",
  },
};

const SERVICES: ServiceItem[] = [
  {
    key: "ats",
    title: { en: "ATS Resume", fr: "CV ATS" },
    description: {
      en: "Professionally optimized resume structure prepared for modern applicant tracking systems.",
      fr: "Structure de CV optimisée professionnellement pour les systèmes modernes de suivi des candidatures.",
    },
    href: "/resumora/services#ats-resume",
    badge: { en: "Popular", fr: "Populaire" },
  },
  {
    key: "cover",
    title: { en: "Cover Letter", fr: "Lettre de Motivation" },
    description: {
      en: "Premium targeted cover letters aligned to role, industry, and employer profile.",
      fr: "Lettres premium ciblées selon le poste, le secteur et le profil de l’employeur.",
    },
    href: "/resumora/services#cover-letter",
  },
  {
    key: "linkedin",
    title: { en: "LinkedIn Optimization", fr: "Optimisation LinkedIn" },
    description: {
      en: "Profile positioning, summary refinement, and recruiter-facing improvements.",
      fr: "Positionnement du profil, amélioration du résumé et optimisation orientée recruteurs.",
    },
    href: "/resumora/services#linkedin-optimization",
  },
  {
    key: "executive",
    title: { en: "Executive Resume", fr: "CV Exécutif" },
    description: {
      en: "Luxury executive presentation for leadership, director, and senior-level applications.",
      fr: "Présentation haut de gamme pour candidatures de direction et postes seniors.",
    },
    href: "/resumora/services#executive-resume",
  },
  {
    key: "interview",
    title: { en: "Interview Preparation", fr: "Préparation d’Entretien" },
    description: {
      en: "Role-focused interview preparation with structured coaching, question rehearsal, and answer refinement.",
      fr: "Préparation ciblée avec coaching structuré, répétition des questions et amélioration des réponses.",
    },
    href: "/resumora/services#interview-preparation",
    badge: { en: "Coaching", fr: "Coaching" },
  },
  {
    key: "priority",
    title: { en: "Priority Delivery", fr: "Livraison Prioritaire" },
    description: {
      en: "Accelerated delivery service for urgent professional applications with prioritized turnaround handling.",
      fr: "Service accéléré pour candidatures urgentes avec traitement prioritaire des délais.",
    },
    href: "/resumora/services#priority-delivery",
    badge: { en: "Fast Track", fr: "Express" },
  },
];

const ACTIONS: ActionItem[] = [
  {
    key: "create",
    title: { en: "Create Resume", fr: "Créer un CV" },
    subtitle: {
      en: "Start your client profile and resume request.",
      fr: "Commencez votre profil client et votre demande de CV.",
    },
    href: "/resumora/register",
    variant: "primary",
  },
  {
    key: "services",
    title: { en: "Explore Services", fr: "Explorer les Services" },
    subtitle: {
      en: "View all premium career services.",
      fr: "Voir tous les services carrière premium.",
    },
    href: "/resumora/services",
    variant: "secondary",
  },
  {
    key: "support",
    title: { en: "Contact Support", fr: "Contacter le Support" },
    subtitle: {
      en: "Reach client support quickly.",
      fr: "Accéder rapidement au support client.",
    },
    href: "/contact",
    variant: "secondary",
  },
  {
    key: "privacy",
    title: { en: "Privacy", fr: "Confidentialité" },
    subtitle: {
      en: "Review privacy and client data policy.",
      fr: "Consulter la politique de confidentialité et des données client.",
    },
    href: "/privacy",
    variant: "secondary",
  },
];

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ResumoraPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = useMemo(() => CONTENT[lang], [lang]);

  return (
    <main className="min-h-screen bg-[#020b1c] text-white">
      <section className="relative overflow-hidden border-b border-[#13213c] bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.10),transparent_18%),linear-gradient(180deg,#03112b_0%,#020b1c_100%)]">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute -top-24 right-[-120px] h-72 w-72 rounded-full bg-[#d4af37]/10 blur-3xl" />
          <div className="absolute bottom-[-120px] left-[-120px] h-72 w-72 rounded-full bg-[#2458b6]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/resumora"
                className="group inline-flex max-w-full items-center gap-3 rounded-2xl border border-[#20345c] bg-[#07152c]/90 px-3 py-3 transition duration-200 hover:border-[#d4af37] hover:bg-[#091a36]"
                aria-label="Resumora Home"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#bfa14a] bg-[#0b1730]">
                  <Image
                    src="/resumora-logo.png"
                    alt="Resumora Logo"
                    fill
                    className="object-contain p-1.5"
                    priority
                  />
                </div>

                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold tracking-wide text-[#d6b45a]">
                    Resumora
                  </div>
                  <div className="truncate text-xs text-[#9fb0d1]">
                    Premium Career Platform
                  </div>
                </div>
              </Link>

              <div className="flex items-center gap-2 rounded-2xl border border-[#20345c] bg-[#07152c]/90 p-1">
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-bold transition",
                    lang === "en"
                      ? "bg-[#d4af37] text-black"
                      : "bg-transparent text-white hover:bg-[#0f2448]"
                  )}
                  aria-pressed={lang === "en"}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLang("fr")}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-bold transition",
                    lang === "fr"
                      ? "bg-[#d4af37] text-black"
                      : "bg-transparent text-white hover:bg-[#0f2448]"
                  )}
                  aria-pressed={lang === "fr"}
                >
                  FR
                </button>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#162746] bg-[#031028]/90 p-6 sm:p-8 lg:p-10">
              <div className="mb-5 inline-flex rounded-full border border-[#6a5a1a] bg-[#0b1730] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f4c84d] sm:text-sm">
                {t.premium}
              </div>

              <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
                <div>
                  <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {t.heroTitle}
                  </h1>

                  <p className="mt-5 max-w-3xl text-base leading-8 text-[#d1d8e8] sm:text-lg">
                    {t.heroDescription}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/resumora/register"
                      className="inline-flex items-center justify-center rounded-2xl bg-[#d4af37] px-6 py-4 text-base font-extrabold text-black transition hover:scale-[1.01] hover:bg-[#e3bf4c]"
                    >
                      {t.heroPrimary}
                    </Link>

                    <Link
                      href="/resumora/services"
                      className="inline-flex items-center justify-center rounded-2xl border border-[#21355d] bg-[#08162f] px-6 py-4 text-base font-extrabold text-white transition hover:border-[#d4af37] hover:text-[#ffd34f]"
                    >
                      {t.heroSecondary}
                    </Link>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-3xl border border-[#162746] bg-[#041128] p-5">
                    <div className="text-xs uppercase tracking-[0.15em] text-[#9fb0d1]">
                      {t.clientExperience}
                    </div>
                    <div className="mt-3 text-2xl font-black text-[#ffd34f]">
                      {t.premiumValue}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[#162746] bg-[#041128] p-5">
                    <div className="text-xs uppercase tracking-[0.15em] text-[#9fb0d1]">
                      {t.languageMode}
                    </div>
                    <div className="mt-3 text-2xl font-black text-[#ffd34f]">
                      EN / FR
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[#162746] bg-[#041128] p-5">
                    <div className="text-xs uppercase tracking-[0.15em] text-[#9fb0d1]">
                      {t.responseFlow}
                    </div>
                    <div className="mt-3 text-2xl font-black text-[#ffd34f]">
                      {t.activeValue}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="rounded-[28px] border border-[#162746] bg-[#020f24] p-5 sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black sm:text-3xl">{t.servicesTitle}</h2>
              <Link
                href="/resumora/services"
                className="rounded-xl border border-[#21355d] bg-[#08162f] px-4 py-2 text-sm font-bold text-white transition hover:border-[#d4af37] hover:text-[#ffd34f]"
              >
                {lang === "en" ? "View All" : "Voir Tout"}
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {SERVICES.map((service) => (
                <Link
                  key={service.key}
                  href={service.href}
                  className="group rounded-[24px] border border-[#182c4d] bg-[#06152e] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#d1ab3c] hover:shadow-[0_0_0_1px_rgba(209,171,60,0.25)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-extrabold text-white sm:text-2xl">
                      {service.title[lang]}
                    </h3>

                    {service.badge ? (
                      <span className="rounded-full border border-[#6a5a1a] bg-[#0b1730] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#f4c84d]">
                        {service.badge[lang]}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-3 text-sm leading-7 text-[#d1d8e8] sm:text-base">
                    {service.description[lang]}
                  </p>

                  <div className="mt-5 text-sm font-bold text-[#f4c84d] transition group-hover:translate-x-1">
                    {lang === "en" ? "Open Service →" : "Ouvrir le Service →"}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[28px] border border-[#162746] bg-[#020f24] p-5 sm:p-6">
              <h2 className="mb-5 text-2xl font-black sm:text-3xl">{t.actionsTitle}</h2>

              <div className="grid gap-4">
                {ACTIONS.map((action) => (
                  <Link
                    key={action.key}
                    href={action.href}
                    className={cn(
                      "rounded-[24px] border px-5 py-5 transition duration-200 hover:-translate-y-0.5",
                      action.variant === "primary"
                        ? "border-[#d4af37] bg-[#d4af37] text-black hover:bg-[#e3bf4c]"
                        : "border-[#182c4d] bg-[#06152e] text-white hover:border-[#d1ab3c] hover:text-[#ffd34f]"
                    )}
                  >
                    <div className="text-xl font-extrabold">{action.title[lang]}</div>
                    <div
                      className={cn(
                        "mt-2 text-sm leading-6",
                        action.variant === "primary" ? "text-black/80" : "text-[#cbd5e7]"
                      )}
                    >
                      {action.subtitle[lang]}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-[#162746] bg-[#041128] p-5 sm:p-6">
              <h3 className="text-xl font-black">{t.whyTitle}</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[#d1d8e8] sm:text-base">
                {t.whyItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#d4af37]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[28px] border border-[#162746] bg-[#041128] p-5 sm:p-6">
              <h3 className="text-xl font-black">{t.trustTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-[#d1d8e8] sm:text-base">
                {t.trustText}
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#13213c] bg-[#020b1c]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link
            href="/resumora"
            className="inline-flex items-center gap-3 rounded-2xl border border-[#20345c] bg-[#07152c]/90 px-4 py-3 transition hover:border-[#d4af37]"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[#bfa14a] bg-[#0b1730]">
              <Image
                src="/resumora-logo.png"
                alt="Resumora Logo"
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-[#d6b45a]">{t.footerTitle}</div>
              <div className="text-xs text-[#9fb0d1]">Premium Career Platform</div>
            </div>
          </Link>

          <div className="max-w-2xl text-sm leading-7 text-[#9fb0d1]">{t.footerText}</div>
        </div>
      </footer>
    </main>
  );
}