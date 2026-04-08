"use client";

const services = [
  "ATS Resume",
  "Cover Letter",
  "LinkedIn Optimization",
  "Executive Resume",
  "Interview Preparation",
  "Priority Delivery"
];

export default function ResumoraPage() {
  return (
    <div style={styles.page}>
      <div style={styles.topGlow} />
      <div style={styles.bottomGlow} />

      <header style={styles.header}>
        <a href="/dashboard" style={styles.backLink}>← Back to Master Admin</a>
        <div style={styles.langSwitch}>
          <button style={styles.langButtonActive}>EN</button>
          <button style={styles.langButton}>FR</button>
        </div>
      </header>

      <section style={styles.hero}>
        <div style={styles.badge}>Resumora Premium</div>
        <h1 style={styles.title}>Luxury Resume Client Interface</h1>
        <p style={styles.subtitle}>
          Premium resume and career platform with advanced client-ready structure,
          clean onboarding, premium services, and modern 2026 visual language.
        </p>

        <div style={styles.heroActions}>
          <a href="/login" style={styles.primaryButton}>Client Login</a>
          <a href="/pricing" style={styles.secondaryButton}>View Pricing</a>
        </div>
      </section>

      <section style={styles.cardGrid}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Premium Services</div>
          <ul style={styles.list}>
            {services.map((item) => (
              <li key={item} style={styles.listItem}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>Client Actions</div>
          <div style={styles.actionsGrid}>
            <a href="/generate" style={styles.actionTile}>Create Resume</a>
            <a href="/services" style={styles.actionTile}>Explore Services</a>
            <a href="/contact" style={styles.actionTile}>Contact Support</a>
            <a href="/privacy" style={styles.actionTile}>Privacy</a>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #07111f 0%, #08101b 50%, #040816 100%)",
    color: "#f8fafc",
    fontFamily: 'Inter, Arial, sans-serif',
    padding: "28px",
    position: "relative",
    overflow: "hidden"
  },
  topGlow: {
    position: "absolute",
    top: "-100px",
    right: "-100px",
    width: "320px",
    height: "320px",
    borderRadius: "999px",
    background: "rgba(255, 215, 0, 0.10)",
    filter: "blur(70px)"
  },
  bottomGlow: {
    position: "absolute",
    bottom: "-100px",
    left: "-100px",
    width: "320px",
    height: "320px",
    borderRadius: "999px",
    background: "rgba(59, 130, 246, 0.08)",
    filter: "blur(80px)"
  },
  header: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },
  backLink: {
    color: "#FFD700",
    textDecoration: "none",
    fontWeight: 700
  },
  langSwitch: {
    display: "flex",
    gap: "8px"
  },
  langButton: {
    background: "rgba(15, 23, 42, 0.8)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    padding: "8px 12px",
    fontWeight: 700
  },
  langButtonActive: {
    background: "#FFD700",
    color: "#08111f",
    border: "none",
    borderRadius: "10px",
    padding: "8px 12px",
    fontWeight: 800
  },
  hero: {
    position: "relative",
    zIndex: 1,
    maxWidth: "860px",
    background: "rgba(10, 16, 28, 0.82)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "28px",
    padding: "34px",
    marginBottom: "22px"
  },
  badge: {
    display: "inline-block",
    background: "rgba(255, 215, 0, 0.12)",
    color: "#FFD700",
    border: "1px solid rgba(255,215,0,0.24)",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  title: {
    marginTop: "18px",
    marginBottom: "14px",
    fontSize: "42px",
    lineHeight: 1.1,
    fontWeight: 900
  },
  subtitle: {
    color: "#cbd5e1",
    lineHeight: 1.8,
    fontSize: "16px",
    maxWidth: "720px"
  },
  heroActions: {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
    flexWrap: "wrap"
  },
  primaryButton: {
    textDecoration: "none",
    background: "linear-gradient(135deg,#FFD700,#c59b00)",
    color: "#08111f",
    padding: "12px 18px",
    borderRadius: "12px",
    fontWeight: 800
  },
  secondaryButton: {
    textDecoration: "none",
    background: "rgba(15,23,42,0.8)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "12px 18px",
    borderRadius: "12px",
    fontWeight: 800
  },
  cardGrid: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  },
  card: {
    background: "rgba(10, 16, 28, 0.82)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "24px",
    padding: "24px"
  },
  cardTitle: {
    fontSize: "24px",
    fontWeight: 900,
    marginBottom: "16px"
  },
  list: {
    paddingLeft: "20px",
    margin: 0
  },
  listItem: {
    marginBottom: "10px",
    color: "#e5e7eb"
  },
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px"
  },
  actionTile: {
    textDecoration: "none",
    color: "#fff",
    background: "rgba(15,23,42,0.8)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "16px",
    padding: "16px",
    fontWeight: 700
  }
};