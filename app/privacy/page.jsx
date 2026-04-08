"use client";

import { useEffect, useMemo, useState } from "react";

const copy = {
  en: {
    title: "Privacy",
    text: "Resumora protects client input, selected plan, contact requests, and interface preferences inside a professional client experience flow."
  },
  fr: {
    title: "Confidentialité",
    text: "Resumora protège les données client, le forfait sélectionné, les demandes de contact et les préférences d’interface dans un flux d’expérience client professionnel."
  }
};

export default function PrivacyPage() {
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
      <div style={styles.card}>
        <a href={`/resumora?lang=${lang}`} style={styles.backLink}>← Resumora</a>
        <h1 style={styles.title}>{t.title}</h1>
        <p style={styles.text}>{t.text}</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg,#07111f,#030712)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    fontFamily: 'Inter, Arial, sans-serif'
  },
  card: {
    width: "100%",
    maxWidth: 760,
    background: "rgba(8,15,28,0.92)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 24,
    padding: 28
  },
  backLink: {
    color: "#FFD700",
    textDecoration: "none",
    fontWeight: 800
  },
  title: {
    fontSize: 42,
    fontWeight: 900,
    marginBottom: 12
  },
  text: {
    color: "#d9e1ec",
    lineHeight: 1.9,
    fontSize: 16
  }
};