"use client";

import { useEffect, useState } from "react";

type Project = {
  project_key: string;
  name: string;
  status: string;
  queue_count: number;
  failed_count: number;
};

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  const loadProjects = async () => {
    const res = await fetch("/api/master-admin");
    const data = await res.json();
    setProjects(data.projects || []);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleAction = async (project_key: string, action: string) => {
    await fetch("/api/master-admin", {
      method: "POST",
      body: JSON.stringify({ project_key, action }),
    });

    await loadProjects();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>BossMind Master Admin</h1>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Project</th>
            <th>Status</th>
            <th>Queue</th>
            <th>Failed</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((p) => (
            <tr key={p.project_key}>
              <td>{p.name}</td>
              <td>{p.status}</td>
              <td>{p.queue_count}</td>
              <td>{p.failed_count}</td>
              <td>
                <button onClick={() => handleAction(p.project_key, "start")}>
                  Start
                </button>
                <button onClick={() => handleAction(p.project_key, "stop")}>
                  Stop
                </button>
                <button onClick={() => handleAction(p.project_key, "retry")}>
                  Retry
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}