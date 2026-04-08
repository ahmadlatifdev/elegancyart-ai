"use client";

import { useEffect, useMemo, useState } from "react";

const copy = {
  en: {
    title: "Contact Us",
    subtitle: "Send a professional support request to the Resumora client team.",
    name: "Your Name",
    email: "Your Email",
    message: "Your Message",
    button: "Send Message",
    success: "Your message was submitted successfully. Resumora support response flow is active."
  },
  fr: {
    title: "Contactez-Nous",
    subtitle: "Envoyez une demande d’assistance professionnelle à l’équipe client Resumora.",
    name: "Votre Nom",
    email: "Votre E-mail",
    message: "Votre Message",
    button: "Envoyer le Message",
    success: "Votre message a été envoyé avec succès. Le flux de réponse du support Resumora est actif."
  }
};

export default function ContactPage() {
  const [lang, setLang] = useState("en");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qLang = params.get("lang");
    const saved = localStorage.getItem("resumora_lang");
    setLang(qLang === "fr" || qLang === "en" ? qLang : saved === "fr" ? "fr" : "en");
  }, []);

  const t = useMemo(() => copy[lang], [lang]);

  function submit(e) {
    e.preventDefault();
    setSuccess(t.success);
    localStorage.setItem("resumora_contact_name", form.name);
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <a href={`/resumora?lang=${lang}`} style={styles.backLink}>← Resumora</a>
        <h1 style={styles.title}>{t.title}</h1>
        <p style={styles.subtitle}>{t.subtitle}</p>

        <form onSubmit={submit} style={styles.form}>
          <input
            style={styles.input}
            placeholder={t.name}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            style={styles.input}
            placeholder={t.email}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            style={styles.textarea}
            placeholder={t.message}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <button type="submit" style={styles.button}>{t.button}</button>
        </form>

        {success ? <div style={styles.successBox}>{success}</div> : null}
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
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    fontFamily: 'Inter, Arial, sans-serif'
  },
  card: {
    width: "100%",
    maxWidth: 720,
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
  input: {
    background: "#0d1b31",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#fff",
    borderRadius: 12,
    padding: "14px 16px",
    fontSize: 15
  },
  textarea: {
    background: "#0d1b31",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#fff",
    borderRadius: 12,
    padding: "14px 16px",
    fontSize: 15,
    minHeight: 180,
    resize: "vertical"
  },
  button: {
    border: "none",
    borderRadius: 12,
    padding: "14px 18px",
    background: "linear-gradient(135deg,#FFD700,#c59b00)",
    color: "#08111f",
    fontWeight: 900,
    cursor: "pointer"
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