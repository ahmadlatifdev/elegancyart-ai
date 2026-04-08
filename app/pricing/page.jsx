"use client";

import { useEffect, useMemo, useState } from "react";

const copy = {
  en: {
    title: "Pricing Plans",
    subtitle: "Choose the premium plan that fits your career goals.",
    button: "Select Plan",
    chosen: "Selected plan saved. Continue to login for the next professional step.",
    plans: [
      { name: "Basic", desc: "Simple and effective resume", price: "$19", items: ["Resume Creation", "Standard Template", "PDF Download"] },
      { name: "Pro", desc: "Most popular choice", price: "$49", items: ["Resume + Cover Letter", "Premium Templates", "AI Optimization"] },
      { name: "Elite", desc: "Full premium experience", price: "$99", items: ["All Pro Features", "LinkedIn Optimization", "Priority Support"] }
    ]
  },
  fr: {
    title: "Plans Tarifaires",
    subtitle: "Choisissez le forfait premium adapté à vos objectifs de carrière.",
    button: "Choisir le Forfait",
    chosen: "Le forfait sélectionné est enregistré. Continuez vers la connexion pour l’étape professionnelle suivante.",
    plans: [
      { name: "Basic", desc: "CV simple et efficace", price: "$19", items: ["Création de CV", "Modèle Standard", "Téléchargement PDF"] },
      { name: "Pro", desc: "Le choix le plus populaire", price: "$49", items: ["CV + Lettre de Motivation", "Modèles Premium", "Optimisation IA"] },
      { name: "Elite", desc: "Expérience premium complète", price: "$99", items: ["Toutes les fonctions Pro", "Optimisation LinkedIn", "Support Prioritaire"] }
    ]
  }
};

export default function PricingPage() {
  const [lang, setLang] = useState("en");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qLang = params.get("lang");
    const saved = localStorage.getItem("resumora_lang");
    const finalLang = qLang === "fr" || qLang === "en" ? qLang : saved === "fr" ? "fr" : "en";
    setLang(finalLang);
  }, []);

  const t = useMemo(() => copy[lang], [lang]);

  function choosePlan(name) {
    localStorage.setItem("resumora_plan", name);
    setSelected(t.chosen);
  }

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <a href={`/resumora?lang=${lang}`} style={styles.backLink}>← Resumora</a>
        <h1 style={styles.title}>{t.title}</h1>
        <p style={styles.subtitle}>{t.subtitle}</p>

        <div style={styles.grid}>
          {t.plans.map((plan) => (
            <div key={plan.name} style={styles.card}>
              <div style={styles.planName}>{plan.name}</div>
              <div style={styles.planDesc}>{plan.desc}</div>
              <div style={styles.price}>{plan.price}</div>
              <ul style={styles.list}>
                {plan.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <button type="button" onClick={() => choosePlan(plan.name)} style={styles.button}>
                {t.button}
              </button>
            </div>
          ))}
        </div>

        {selected ? (
          <div style={styles.successBox}>
            {selected} <a href={`/login?lang=${lang}`} style={styles.link}>Login</a>
          </div>
        ) : null}
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
    maxWidth: 1180,
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
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 18,
    marginTop: 22
  },
  card: {
    background: "rgba(8, 15, 28, 0.90)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 22,
    padding: 22
  },
  planName: {
    fontSize: 30,
    fontWeight: 900
  },
  planDesc: {
    marginTop: 8,
    color: "#d9e1ec"
  },
  price: {
    marginTop: 14,
    fontSize: 34,
    color: "#FFD700",
    fontWeight: 900
  },
  list: {
    marginTop: 14,
    lineHeight: 2
  },
  button: {
    marginTop: 12,
    background: "linear-gradient(135deg,#FFD700,#c59b00)",
    color: "#08111f",
    border: "none",
    borderRadius: 12,
    padding: "12px 16px",
    fontWeight: 900,
    cursor: "pointer"
  },
  successBox: {
    marginTop: 18,
    background: "rgba(34,197,94,0.12)",
    border: "1px solid rgba(34,197,94,0.24)",
    color: "#86efac",
    padding: 14,
    borderRadius: 12
  },
  link: {
    color: "#FFD700",
    textDecoration: "none",
    fontWeight: 900
  }
};