"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const content = {
  en: {
    premium: "Resumora Premium",
    title: "Luxury Resume Client Interface",
    description:
      "Premium resume and career platform with client-only access, bilingual interaction, premium services, free edit plans, and a refined 2026 luxury experience.",
    primary: "Create Resume",
    secondary: "Explore Services",
    experience: "Client Experience",
    language: "Language Mode",
    response: "Response Flow",
    premiumValue: "Premium",
    responseValue: "Active",
    servicesTitle: "Premium Services",
    actionsTitle: "Client Actions",
    pricingTitle: "Edit & Upgrade Plans",
    whyTitle: "Why Resumora",
    whyItems: [
      "Client-only interface with no BossMind admin exposure",
      "Instant EN / FR switching",
      "Premium resume, LinkedIn, interview, and delivery services",
      "Responsive luxury layout for desktop, tablet, and mobile",
    ],
    choose: "Choose Plan",
    open: "Open Service",
    viewAll: "View All",
    actionCreate: "Create Resume",
    actionCreateText: "Start your client profile and resume request.",
    actionServices: "Explore Services",
    actionServicesText: "Browse all active premium services.",
    actionSupport: "Contact Support",
    actionSupportText: "Reach support directly.",
    actionPrivacy: "Privacy",
    actionPrivacyText: "Review client privacy and data policy.",
  },
  fr: {
    premium: "Resumora Premium",
    title: "Interface Client CV de Luxe",
    description:
      "Plateforme premium de CV et de carrière avec accès réservé aux clients, interaction bilingue, services premium, plans avec éditions gratuites et expérience luxe 2026.",
    primary: "Créer un CV",
    secondary: "Explorer les Services",
    experience: "Expérience Client",
    language: "Mode de Langue",
    response: "Flux de Réponse",
    premiumValue: "Premium",
    responseValue: "Actif",
    servicesTitle: "Services Premium",
    actionsTitle: "Actions Client",
    pricingTitle: "Plans d’Édition & Mise à Niveau",
    whyTitle: "Pourquoi Resumora",
    whyItems: [
      "Interface réservée aux clients sans exposition admin BossMind",
      "Bascule instantanée EN / FR",
      "Services premium CV, LinkedIn, entretien et livraison",
      "Mise en page luxe responsive pour ordinateur, tablette et mobile",
    ],
    choose: "Choisir le Plan",
    open: "Ouvrir le Service",
    viewAll: "Voir Tout",
    actionCreate: "Créer un CV",
    actionCreateText: "Commencez votre profil client et votre demande de CV.",
    actionServices: "Explorer les Services",
    actionServicesText: "Voir tous les services premium actifs.",
    actionSupport: "Contacter le Support",
    actionSupportText: "Accéder directement au support.",
    actionPrivacy: "Confidentialité",
    actionPrivacyText: "Consulter la politique de confidentialité client.",
  },
};

const services = {
  en: [
    {
      title: "ATS Resume",
      text: "Professionally optimized resume structure prepared for modern applicant tracking systems.",
      href: "/services#ats-resume",
      badge: "Popular",
    },
    {
      title: "Cover Letter",
      text: "Premium targeted cover letters aligned to role, industry, and employer profile.",
      href: "/services#cover-letter",
      badge: "",
    },
    {
      title: "LinkedIn Optimization",
      text: "Profile positioning, summary refinement, and recruiter-facing improvements.",
      href: "/services#linkedin-optimization",
      badge: "",
    },
    {
      title: "Executive Resume",
      text: "Luxury executive presentation for leadership, director, and senior-level applications.",
      href: "/services#executive-resume",
      badge: "",
    },
    {
      title: "Interview Preparation",
      text: "Role-focused interview coaching, question rehearsal, and answer refinement.",
      href: "/services#interview-preparation",
      badge: "Coaching",
    },
    {
      title: "Priority Delivery",
      text: "Accelerated delivery for urgent professional application needs.",
      href: "/services#priority-delivery",
      badge: "Fast Track",
    },
  ],
  fr: [
    {
      title: "CV ATS",
      text: "Structure de CV optimisée professionnellement pour les systèmes modernes de suivi des candidatures.",
      href: "/services#ats-resume",
      badge: "Populaire",
    },
    {
      title: "Lettre de Motivation",
      text: "Lettres premium ciblées selon le poste, le secteur et le profil de l’employeur.",
      href: "/services#cover-letter",
      badge: "",
    },
    {
      title: "Optimisation LinkedIn",
      text: "Positionnement du profil, amélioration du résumé et optimisation orientée recruteurs.",
      href: "/services#linkedin-optimization",
      badge: "",
    },
    {
      title: "CV Exécutif",
      text: "Présentation haut de gamme pour candidatures de direction et postes seniors.",
      href: "/services#executive-resume",
      badge: "",
    },
    {
      title: "Préparation d’Entretien",
      text: "Coaching ciblé, répétition des questions et amélioration des réponses.",
      href: "/services#interview-preparation",
      badge: "Coaching",
    },
    {
      title: "Livraison Prioritaire",
      text: "Livraison accélérée pour les besoins urgents de candidature professionnelle.",
      href: "/services#priority-delivery",
      badge: "Express",
    },
  ],
};

const pricing = {
  en: [
    {
      title: "Resume Edit",
      price: "$89",
      note: "1 Free Edit (up to 2 pages)",
      href: "/pricing#resume-edit",
      icon: "📝",
    },
    {
      title: "Cover Letter Edit",
      price: "$29",
      note: "1 Free Edit",
      href: "/pricing#cover-letter-edit",
      icon: "✉️",
    },
    {
      title: "Package",
      price: "$110",
      note: "3 Free Edits",
      href: "/pricing#package",
      icon: "💎",
    },
  ],
  fr: [
    {
      title: "Édition de CV",
      price: "$89",
      note: "1 Édition Gratuite (jusqu’à 2 pages)",
      href: "/pricing#resume-edit",
      icon: "📝",
    },
    {
      title: "Édition de Lettre",
      price: "$29",
      note: "1 Édition Gratuite",
      href: "/pricing#cover-letter-edit",
      icon: "✉️",
    },
    {
      title: "Forfait",
      price: "$110",
      note: "3 Éditions Gratuites",
      href: "/pricing#package",
      icon: "💎",
    },
  ],
};

export default function ResumoraPage() {
  const [lang, setLang] = useState("en");
  const t = useMemo(() => content[lang], [lang]);
  const serviceList = services[lang];
  const pricingList = pricing[lang];

  return (
    <>
      <main className="res-wrap">
        <section className="hero-shell">
          <header className="topbar">
            <Link href="/resumora" className="brand">
              <img
                src="/resumora-logo.png"
                alt="Resumora Logo"
                className="brand-logo"
              />
              <div className="brand-text">
                <span className="brand-title">Resumora</span>
                <span className="brand-sub">Premium Career Platform</span>
              </div>
            </Link>

            <div className="lang-switch">
              <button
                type="button"
                className={lang === "en" ? "lang-btn active" : "lang-btn"}
                onClick={() => setLang("en")}
              >
                EN
              </button>
              <button
                type="button"
                className={lang === "fr" ? "lang-btn active" : "lang-btn"}
                onClick={() => setLang("fr")}
              >
                FR
              </button>
            </div>
          </header>

          <div className="hero-card">
            <div className="hero-left">
              <div className="premium-pill">{t.premium}</div>
              <h1>{t.title}</h1>
              <p>{t.description}</p>

              <div className="hero-actions">
                <Link href="/resumora/register" className="btn btn-primary">
                  {t.primary}
                </Link>
                <Link href="/services" className="btn btn-secondary">
                  {t.secondary}
                </Link>
              </div>
            </div>

            <div className="hero-stats">
              <div className="stat-card">
                <span>{t.experience}</span>
                <strong>{t.premiumValue}</strong>
              </div>
              <div className="stat-card">
                <span>{t.language}</span>
                <strong>EN / FR</strong>
              </div>
              <div className="stat-card">
                <span>{t.response}</span>
                <strong>{t.responseValue}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="grid-section">
          <div className="panel large">
            <div className="panel-head">
              <h2>{t.servicesTitle}</h2>
              <Link href="/services" className="mini-link">
                {t.viewAll}
              </Link>
            </div>

            <div className="service-grid">
              {serviceList.map((item) => (
                <Link href={item.href} key={item.title} className="service-card">
                  <div className="card-head">
                    <h3>{item.title}</h3>
                    {item.badge ? <span className="badge">{item.badge}</span> : null}
                  </div>
                  <p>{item.text}</p>
                  <span className="open-link">{t.open} →</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="side-stack">
            <div className="panel">
              <h2>{t.actionsTitle}</h2>

              <div className="action-grid">
                <Link href="/resumora/register" className="action-card primary">
                  <strong>{t.actionCreate}</strong>
                  <span>{t.actionCreateText}</span>
                </Link>

                <Link href="/services" className="action-card">
                  <strong>{t.actionServices}</strong>
                  <span>{t.actionServicesText}</span>
                </Link>

                <Link href="/contact" className="action-card">
                  <strong>{t.actionSupport}</strong>
                  <span>{t.actionSupportText}</span>
                </Link>

                <Link href="/privacy" className="action-card">
                  <strong>{t.actionPrivacy}</strong>
                  <span>{t.actionPrivacyText}</span>
                </Link>
              </div>
            </div>

            <div className="panel">
              <h2>{t.whyTitle}</h2>
              <ul className="why-list">
                {t.whyItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="panel pricing-panel">
          <h2>{t.pricingTitle}</h2>

          <div className="pricing-grid">
            {pricingList.map((item) => (
              <Link href={item.href} key={item.title} className="price-card">
                <div className="price-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <div className="price">{item.price}</div>
                <p>{item.note}</p>
                <span className="btn btn-outline">{t.choose}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          background: #020b1c;
          color: #ffffff;
          font-family: Arial, Helvetica, sans-serif;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        .res-wrap {
          min-height: 100vh;
          background:
            radial-gradient(circle at top right, rgba(212, 175, 55, 0.12), transparent 18%),
            linear-gradient(180deg, #03112b 0%, #020b1c 100%);
          padding: 28px;
        }

        .hero-shell,
        .grid-section,
        .pricing-panel {
          max-width: 1400px;
          margin: 0 auto;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          border: 1px solid #243b66;
          background: rgba(7, 21, 44, 0.92);
          border-radius: 18px;
        }

        .brand-logo {
          width: 54px;
          height: 54px;
          object-fit: contain;
          border-radius: 50%;
          background: #0b1730;
          border: 1px solid #bfa14a;
          padding: 4px;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .brand-title {
          color: #d6b45a;
          font-weight: 800;
          font-size: 16px;
        }

        .brand-sub {
          color: #9fb0d1;
          font-size: 12px;
        }

        .lang-switch {
          display: flex;
          gap: 8px;
          padding: 6px;
          border: 1px solid #243b66;
          background: rgba(7, 21, 44, 0.92);
          border-radius: 16px;
        }

        .lang-btn {
          border: 0;
          cursor: pointer;
          background: transparent;
          color: #fff;
          padding: 10px 14px;
          border-radius: 12px;
          font-weight: 800;
        }

        .lang-btn.active {
          background: #d4af37;
          color: #000;
        }

        .hero-card,
        .panel {
          border: 1px solid #162746;
          background: rgba(2, 15, 36, 0.95);
          border-radius: 28px;
          padding: 28px;
        }

        .hero-card {
          display: grid;
          grid-template-columns: 1.35fr 0.75fr;
          gap: 28px;
        }

        .premium-pill {
          display: inline-flex;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid #6a5a1a;
          background: #0b1730;
          color: #f4c84d;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .hero-left h1 {
          margin: 18px 0 14px;
          font-size: 64px;
          line-height: 1.02;
          font-weight: 900;
        }

        .hero-left p {
          margin: 0;
          color: #d1d8e8;
          font-size: 20px;
          line-height: 1.8;
          max-width: 900px;
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          margin-top: 28px;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 24px;
          border-radius: 18px;
          font-weight: 900;
        }

        .btn-primary {
          background: #d4af37;
          color: #000;
        }

        .btn-secondary,
        .btn-outline {
          border: 1px solid #2b436f;
          background: #08162f;
          color: #fff;
        }

        .hero-stats {
          display: grid;
          gap: 16px;
        }

        .stat-card {
          border: 1px solid #162746;
          background: #041128;
          border-radius: 24px;
          padding: 20px;
        }

        .stat-card span {
          display: block;
          color: #9fb0d1;
          font-size: 13px;
          margin-bottom: 10px;
        }

        .stat-card strong {
          display: block;
          color: #ffd34f;
          font-size: 34px;
          font-weight: 900;
        }

        .grid-section {
          display: grid;
          grid-template-columns: 1.7fr 1fr;
          gap: 24px;
          margin-top: 24px;
        }

        .panel.large {
          min-width: 0;
        }

        .side-stack {
          display: grid;
          gap: 24px;
        }

        .panel-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
        }

        .panel h2 {
          margin: 0 0 18px;
          font-size: 42px;
          font-weight: 900;
        }

        .mini-link {
          color: #ffd34f;
          font-weight: 800;
        }

        .service-grid,
        .action-grid,
        .pricing-grid {
          display: grid;
          gap: 18px;
        }

        .service-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .action-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .pricing-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .service-card,
        .action-card,
        .price-card {
          border: 1px solid #1b2f50;
          background: #06152e;
          border-radius: 24px;
          padding: 22px;
          transition: 0.2s ease;
        }

        .service-card:hover,
        .action-card:hover,
        .price-card:hover {
          transform: translateY(-2px);
          border-color: #d4af37;
        }

        .card-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
        }

        .service-card h3,
        .price-card h3 {
          margin: 0;
          font-size: 28px;
          font-weight: 900;
        }

        .service-card p,
        .action-card span,
        .price-card p {
          margin: 14px 0 0;
          color: #d1d8e8;
          line-height: 1.8;
          font-size: 18px;
        }

        .badge {
          display: inline-flex;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid #6a5a1a;
          background: #0b1730;
          color: #f4c84d;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .open-link {
          display: inline-block;
          margin-top: 16px;
          color: #f4c84d;
          font-weight: 800;
        }

        .action-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .action-card strong {
          font-size: 28px;
          font-weight: 900;
        }

        .action-card.primary {
          background: #d4af37;
          color: #000;
          border-color: #d4af37;
        }

        .action-card.primary span {
          color: rgba(0, 0, 0, 0.82);
        }

        .why-list {
          margin: 0;
          padding-left: 20px;
        }

        .why-list li {
          color: #d1d8e8;
          line-height: 1.8;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .pricing-panel {
          margin-top: 24px;
        }

        .price-card {
          text-align: center;
          background: linear-gradient(180deg, #16294b 0%, #0b1833 100%);
        }

        .price-icon {
          font-size: 42px;
        }

        .price {
          margin-top: 14px;
          font-size: 58px;
          font-weight: 900;
          color: #d4af37;
        }

        .price-card .btn-outline {
          margin-top: 20px;
        }

        @media (max-width: 1200px) {
          .hero-card,
          .grid-section,
          .pricing-grid,
          .service-grid,
          .action-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .res-wrap {
            padding: 16px;
          }

          .topbar {
            flex-direction: column;
            align-items: stretch;
          }

          .hero-left h1 {
            font-size: 42px;
          }

          .panel h2 {
            font-size: 32px;
          }

          .service-card h3,
          .price-card h3,
          .action-card strong {
            font-size: 24px;
          }

          .price {
            font-size: 44px;
          }
        }
      `}</style>
    </>
  );
}