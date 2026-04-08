"use client";

export default function Page() {
  return (
    <div style={{
      background: "#0b0f19",
      color: "#fff",
      height: "100vh",
      padding: "40px",
      fontFamily: "Arial"
    }}>
      <h1 style={{ color: "#FFD700" }}>
        BossMind Master Admin Dashboard
      </h1>

      <p>System ACTIVE ✅</p>

      <div style={{ marginTop: "20px" }}>
        <a href="/resumora" style={{ color: "#FFD700" }}>
          Open Resumora Interface →
        </a>
      </div>
    </div>
  );
}