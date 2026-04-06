"use client";

import { useEffect, useState } from "react";
import OverviewCards from "../../components/admin/overview-cards";
import ProjectControlTable from "../../components/admin/project-control-table";
import AlertsPanel from "../../components/admin/alerts-panel";
import MemoryEventsPanel from "../../components/admin/memory-events-panel";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);

  async function load() {
    const res = await fetch("/api/admin/overview");
    const json = await res.json();

    const saved =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("bossmind-project-state") || "{}")
        : {};

    const updatedProjects = json.projects.map((p: any) => ({
      ...p,
      status: saved[p.projectKey] || p.status,
    }));

    setData({
      ...json,
      projects: updatedProjects,
    });
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return (
      <div className="p-10 text-white bg-black min-h-screen">
        Loading BossMind Admin...
      </div>
    );
  }

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <div className="text-2xl font-bold mb-6">
        BossMind Master Admin
      </div>

      <OverviewCards metrics={data.metrics} />
      <ProjectControlTable projects={data.projects} />
      <AlertsPanel alerts={data.alerts} />
      <MemoryEventsPanel events={data.memoryEvents} />
    </div>
  );
}