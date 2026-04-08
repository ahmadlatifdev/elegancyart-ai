"use client";

import { useEffect, useMemo, useState } from "react";

const copy = {
  en: {
    title: "Welcome Back",
    subtitle: "Sign in to access your premium Resumora workspace.",
    email: "Email",
    password: "Password",
    emailPlaceholder: "Enter your email",
    passwordPlaceholder: "Enter your password",
    signIn: "Sign In",
    pricing: "View plans",
    help: "Need help?",
    success: "Login request submitted successfully. A professional response flow is now active."
  },
  fr: {
    title: "Bon Retour",
    subtitle: "Connectez-vous pour accéder à votre espace premium Resumora.",
    email: "E-mail",
    password: "Mot de passe",
    emailPlaceholder: "Entrez votre e-mail",
    passwordPlaceholder: "Entrez votre mot de passe",
    signIn: "Se Connecter",
    pricing: "Voir les forfaits",
    help: "Besoin d’aide ?",
    success: "La demande de connexion a été envoyée avec succès. Un flux de réponse professionnel est maintenant actif."
  }
};

export default function LoginPage() {
  const [lang, setLang] = useState("en");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qLang = params.get("lang");
    const saved = localStorage.getItem("resumora_lang");
    const finalLang = qLang === "fr" || qLang === "en" ? qLang : saved === "fr" ? "fr" : "en";
    setLang(finalLang);
    localStorage.setItem("resumora_lang", finalLang);
  }, []);

  const t = useMemo(() => copy[lang], [lang]);

  function submit(e) {
    e.preventDefault();
    setMessage(t.success);
    localStorage.setItem("resumora_login_email", email);
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <a href={`/resumora?lang=${lang}`} style={styles.backLink}>← Resumora</a>
        <h1 style={styles.title}>{t.title}</h1>
        <p style={styles.subtitle}>{t.subtitle}</p>

        <form onSubmit={submit} style={styles.form}>
          <label style={styles.label}>{t.email}</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            style={styles.input}
            required
          />

          <label style={styles.label}>{t.password}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.passwordPlaceholder}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.primaryButton}>{t.signIn}</button>
        </form>

        <div style={styles.footerRow}>
          <span>{t.help}</span>
          <a href={`/pricing?lang=${lang}`} style={styles.link}>{t.pricing}</a>
        </div>

        {message ? <div style={styles.successBox}>{message}</div> : null}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg,#06101f,#030712)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    fontFamily: 'Inter, Arial, sans-serif'
  },
  card: {
    width: "100%",
    maxWidth: 520,
    background: "rgba(8, 15, 28, 0.92)",
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
    marginBottom: 10
  },
  subtitle: {
    color: "#d9e1ec",
    lineHeight: 1.8
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 18
  },
  label: {
    fontWeight: 800
  },
  input: {
    background: "#0d1b31",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#fff",
    borderRadius: 12,
    padding: "14px 16px",
    fontSize: 15
  },
  primaryButton: {
    marginTop: 6,
    border: "none",
    borderRadius: 12,
    padding: "14px 18px",
    background: "linear-gradient(135deg,#FFD700,#c59b00)",
    color: "#08111f",
    fontWeight: 900,
    cursor: "pointer"
  },
  footerRow: {
    display: "flex",
    gap: 8,
    marginTop: 18,
    color: "#d9e1ec"
  },
  link: {
    color: "#FFD700",
    textDecoration: "none",
    fontWeight: 800
  },
  successBox: {
    marginTop: 18,
    background: "rgba(34,197,94,0.12)",
    border: "1px solid rgba(34,197,94,0.24)",
    color: "#86efac",
    padding: 14,
    borderRadius: 12,
    lineHeight: 1.7
  }
};