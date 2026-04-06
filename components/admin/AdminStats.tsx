"use client";

import ProjectChatButtons from "./ProjectChatButtons";

export default function AdminStats() {
  return (
    <div className="space-y-6">

      {/* ===== TOP STATS ===== */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-5">
          <p className="text-sm text-slate-400">Total Users</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">1,284</h3>
        </div>

        <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-5">
          <p className="text-sm text-slate-400">Active Sessions</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">342</h3>
        </div>

        <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-5">
          <p className="text-sm text-slate-400">AI Requests</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">9,812</h3>
        </div>

        <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-5">
          <p className="text-sm text-slate-400">Revenue</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">$2,430</h3>
        </div>

      </div>

      {/* ===== CHAT BUTTONS SECTION (NEW) ===== */}
      <ProjectChatButtons />

    </div>
  );
}