"use client";

import { useEffect, useMemo, useState } from "react";

const content = {
  en: {
    back: "Back to Master Admin",
    badge: "Resumora Premium",
    title: "Luxury Resume Client Interface",
    subtitle:
      "Premium resume and career platform with advanced client-ready structure, clean onboarding, premium services, and modern 2026 visual language.",
    login: "Client Login",
    pricing: "View Pricing",
    servicesTitle: "Premium Services",
    actionsTitle: "Client Actions",
    createResume: "Create Resume",
    exploreServices: "Explore Services",
    contactSupport: "Contact Support",
    privacy: "Privacy",
    featureCards: [
      {
        title: "ATS Resume",
        text: "Professionally optimized resume structure prepared for modern applicant tracking systems."
      },
      {
        title: "Cover Letter",
        text: "Premium targeted cover letters aligned to role, industry, and employer profile."
      },
      {
        title: "LinkedIn Optimization",
        text: "Profile positioning, summary refinement, and recruiter-facing improvements."
      },
      {
        title: "Executive Resume",
        text: "Luxury executive presentation for leadership, director, and senior-level applications."
      },
      {
        title: "Interview Preparation",
        text: "Role-focused interview prep framework with premium coaching-ready structure."
      },
      {
        title: "Priority Delivery",
        text: "Accelerated delivery lane for urgent professional application needs."
      }
    ],
    stats: [
      { label: "Client Experience", value: "Premium" },
      { label: "Language Mode", value: "EN / FR" },
      { label: "Response Flow", value: "Active" }
    ]
  },
  fr: {
    back: "Retour au tableau principal",
    badge: "Resumora Premium",
    title: "Interface Client CV de Luxe",
    subtitle:
      "Plateforme premium de CV et de carrière avec structure avancée prête pour les clients, intégration fluide, services premium et design moderne 2026.",
    login: "Connexion Client",
    pricing: "Voir les Tarifs",
    servicesTitle: "Services Premium",
    actionsTitle: "Actions Client",
    createResume: "Créer un CV",
    exploreServices: "Explorer les Services",
    contactSupport: "Contacter le Support",
    privacy: "Confidentialité",
    featureCards: [
      {
        title: "CV ATS",
        text: "Structure de CV optimisée professionnellement pour les systèmes modernes de suivi des candidatures."
      },
      {
        title: "Lettre de Motivation",
        text: "Lettres premium ciblées selon le poste, le secteur et le profil de l’employeur."
      },
      {
        title: "Optimisation LinkedIn",
        text: "Positionnement du profil, amélioration du résumé et optimisation orientée recruteurs."
      },
      {
        title: "CV Exécutif",
        text: "Présentation haut de gamme pour candidatures de direction et postes seniors."
      },
      {
        title: "Préparation d’Entretien",
        text: "Cadre de préparation ciblé selon le poste avec structure premium."
      },
      {
        title: "Livraison Prioritaire",
        text: "Voie accélérée pour les besoins urgents de candidature professionnelle."
      }
    ],
    stats: [
      { label: "Expérience Client", value: "Premium" },
      { label: "Mode Langue", value: "EN / FR" },
      { label: "Flux de Réponse", value: "Actif" }
    ]
  }
};

export default function ResumoraPage() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("resumora_lang");
    if (saved === "en" || saved === "fr") setLang(saved);
  }, []);

  function switchLang(nextLang) {
    setLang(nextLang);
    localStorage.setItem("resumora_lang", nextLang);
  }

  const t = useMemo(() => content[lang], [lang]);

  return (
    <div style={styles.page}>
      <div style={styles.glowTop} />
      <div style={styles.glowBottom} />

      <header style={styles.header}>
        <a href="/dashboard" style={styles.backLink}>
          ← {t.back}
        </a>

        <div style={styles.langWrap}>
          <button
            type="button"
            onClick={() => switchLang("en")}
            style={lang === "en" ? styles.langButtonActive : styles.langButton}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => switchLang("fr")}
            style={lang === "fr" ? styles.langButtonActive : styles.langButton}
          >
            FR
          </button>
        </div>
      </header>

      <section style={styles.hero}>
        <div style={styles.badge}>{t.badge}</div>
        <h1 style={styles.title}>{t.title}</h1>
        <p style={styles.subtitle}>{t.subtitle}</p>

        <div style={styles.heroButtons}>
          <a href={`/login?lang=${lang}`} style={styles.primaryButton}>
            {t.login}
          </a>
          <a href={`/pricing?lang=${lang}`} style={styles.secondaryButton}>
            {t.pricing}
          </a>
        </div>

        <div style={styles.statsGrid}>
          {t.stats.map((item) => (
            <div key={item.label} style={styles.statCard}>
              <div style={styles.statLabel}>{item.label}</div>
              <div style={styles.statValue}>{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.mainGrid}>
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>{t.servicesTitle}</h2>
          <div style={styles.featureGrid}>
            {t.featureCards.map((item) => (
              <div key={item.title} style={styles.featureCard}>
                <div style={styles.featureTitle}>{item.title}</div>
                <div style={styles.featureText}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>{t.actionsTitle}</h2>

          <div style={styles.actionsGrid}>
            <a href={`/generate?lang=${lang}`} style={styles.actionCard}>
              {t.createResume}
            </a>
            <a href={`/services?lang=${lang}`} style={styles.actionCard}>
              {t.exploreServices}
            </a>
            <a href={`/contact?lang=${lang}`} style={styles.actionCard}>
              {t.contactSupport}
            </a>
            <a href={`/privacy?lang=${lang}`} style={styles.actionCard}>
              {t.privacy}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #06101f 0%, #071427 55%, #030712 100%)",
    color: "#f8fafc",
    fontFamily: 'Inter, Arial, sans-serif',
    padding: "28px",
    position: "relative",
    overflow: "hidden"
  },
  glowTop: {
    position: "absolute",
    top: "-120px",
    right: "-120px",
    width: 360,
    height: 360,
    borderRadius: 999,
    background: "rgba(255, 215, 0, 0.10)",
    filter: "blur(80px)"
  },
  glowBottom: {
    position: "absolute",
    bottom: "-140px",
    left: "-140px",
    width: 380,
    height: 380,
    borderRadius: 999,
    background: "rgba(59, 130, 246, 0.10)",
    filter: "blur(90px)"
  },
  header: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    gap: 16
  },
  backLink: {
    color: "#FFD700",
    textDecoration: "none",
    fontWeight: 800
  },
  langWrap: {
    display: "flex",
    gap: 8
  },
  langButton: {
    background: "rgba(15,23,42,0.8)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "10px 14px",
    fontWeight: 800,
    cursor: "pointer"
  },
  langButtonActive: {
    background: "linear-gradient(135deg,#FFD700,#c59b00)",
    color: "#08111f",
    border: "none",
    borderRadius: 10,
    padding: "10px 14px",
    fontWeight: 900,
    cursor: "pointer"
  },
  hero: {
    position: "relative",
    zIndex: 1,
    background: "rgba(8, 15, 28, 0.82)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 28,
    padding: 34,
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)"
  },
  badge: {
    display: "inline-block",
    background: "rgba(255, 215, 0, 0.12)",
    color: "#FFD700",
    border: "1px solid rgba(255,215,0,0.24)",
    padding: "8px 14px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: 1
  },
  title: {
    marginTop: 22,
    marginBottom: 14,
    fontSize: 56,
    lineHeight: 1.05,
    fontWeight: 900
  },
  subtitle: {
    color: "#dbe5f1",
    fontSize: 16,
    lineHeight: 1.85,
    maxWidth: 860,
    marginBottom: 0
  },
  heroButtons: {
    display: "flex",
    gap: 14,
    marginTop: 28,
    flexWrap: "wrap"
  },
  primaryButton: {
    textDecoration: "none",
    background: "linear-gradient(135deg,#FFD700,#c59b00)",
    color: "#08111f",
    padding: "14px 22px",
    borderRadius: 14,
    fontWeight: 900
  },
  secondaryButton: {
    textDecoration: "none",
    background: "rgba(15,23,42,0.85)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "14px 22px",
    borderRadius: 14,
    fontWeight: 900
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 14,
    marginTop: 28
  },
  statCard: {
    background: "rgba(12, 22, 40, 0.88)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 18,
    padding: 18
  },
  statLabel: {
    fontSize: 13,
    color: "#9fb0c7",
    marginBottom: 8
  },
  statValue: {
    fontSize: 20,
    color: "#FFD700",
    fontWeight: 900
  },
  mainGrid: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: 20,
    marginTop: 22
  },
  panel: {
    background: "rgba(8, 15, 28, 0.82)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 24,
    padding: 24
  },
  panelTitle: {
    margin: 0,
    marginBottom: 18,
    fontSize: 30,
    fontWeight: 900
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 14
  },
  featureCard: {
    background: "rgba(12, 22, 40, 0.88)",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: 18,
    padding: 18
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 900,
    marginBottom: 10
  },
  featureText: {
    fontSize: 14,
    color: "#d5deea",
    lineHeight: 1.75
  },
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14
  },
  actionCard: {
    textDecoration: "none",
    color: "#fff",
    background: "rgba(12, 22, 40, 0.88)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 18,
    padding: 20,
    fontWeight: 800,
    minHeight: 72,
    display: "flex",
    alignItems: "center"
  }
};