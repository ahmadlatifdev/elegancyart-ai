"use client";

import { useEffect, useMemo, useState } from "react";

const copy = {
  en: {
    title: "Premium Services",
    subtitle: "Professional Resumora service lines built for modern career positioning.",
    items: [
      "ATS Resume Writing",
      "Cover Letter Personalization",
      "LinkedIn Profile Optimization",
      "Executive Resume Upgrade",
      "Interview Preparation Kit",
      "Priority Delivery Track"
    ]
  },
  fr: {
    title: "Services Premium",
    subtitle: "Lignes de services Resumora conçues pour un positionnement de carrière moderne.",
    items: [
      "Rédaction de CV ATS",
      "Personnalisation de Lettre de Motivation",
      "Optimisation du Profil LinkedIn",
      "Mise à Niveau de CV Exécutif",
      "Kit de Préparation d’Entretien",
      "Voie de Livraison Prioritaire"
    ]
  }
};

export default function ServicesPage() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qLang = params.get("lang");
    const saved = localStorage.getItem("resumora_lang");
    setLang(qLang === "fr" || qLang === "en" ? qLang : saved === "fr" ? "fr" : "en");
  }, []);

  const t = useMemo(() => copy[lang], [lang]);

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <a href={`/resumora?lang=${lang}`} style={styles.backLink}>← Resumora</a>
        <h1 style={styles.title}>{t.title}</h1>
        <p style={styles.subtitle}>{t.subtitle}</p>

        <div style={styles.grid}>
          {t.items.map((item) => (
            <div key={item} style={styles.card}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg,#07111f,#030712)",
    color: "#fff",
    padding: 28,
    fontFamily: 'Inter, Arial, sans-serif'
  },
  wrap: {
    maxWidth: 1100,
    margin: "0 auto"
  },
  backLink: {
    color: "#FFD700",
    textDecoration: "none",
    fontWeight: 800
  },
  title: {
    fontSize: 46,
    fontWeight: 900,
    marginBottom: 10
  },
  subtitle: {
    color: "#d9e1ec",
    lineHeight: 1.8
  },
  grid: {
    marginTop: 20,
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 16
  },
  card: {
    background: "rgba(8,15,28,0.90)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 18,
    padding: 22,
    fontWeight: 800
  }
};