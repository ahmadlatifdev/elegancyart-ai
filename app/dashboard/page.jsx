"use client";

export default function Dashboard() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg,#020617,#020617,#020617)",
      color: "#fff",
      padding: "40px",
      fontFamily: "Inter, sans-serif"
    }}>
      
      <h1 style={{
        color: "#FFD700",
        fontSize: "36px",
        fontWeight: "800",
        marginBottom: "30px"
      }}>
        BossMind Master Admin 2026
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "20px",
        marginBottom: "40px"
      }}>
        {[
          { title: "Projects", value: "5" },
          { title: "Active", value: "2" },
          { title: "Queue", value: "3" },
          { title: "Errors", value: "0" }
        ].map((item, i) => (
          <div key={i} style={{
            background: "#111827",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #222"
          }}>
            <p style={{ color: "#999" }}>{item.title}</p>
            <h2 style={{ color: "#FFD700" }}>{item.value}</h2>
          </div>
        ))}
      </div>

      <div style={{
        background: "#111827",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #222"
      }}>
        <h2 style={{ marginBottom: "20px", color: "#FFD700" }}>
          Projects Control
        </h2>

        <table style={{ width: "100%" }}>
          <thead>
            <tr style={{ color: "#999" }}>
              <th align="left">Project</th>
              <th>Status</th>
              <th>Queue</th>
              <th>Failed</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {[
              "Resumora",
              "ElegancyArt",
              "Video Generator",
              "TikTok AI",
              "Global Stock"
            ].map((p, i) => (
              <tr key={i}>
                <td>{p}</td>
                <td style={{ color: "#22c55e" }}>Active</td>
                <td>0</td>
                <td>0</td>
                <td>
                  <button style={{
                    background: "#FFD700",
                    border: "none",
                    padding: "6px 10px",
                    cursor: "pointer"
                  }}>
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}