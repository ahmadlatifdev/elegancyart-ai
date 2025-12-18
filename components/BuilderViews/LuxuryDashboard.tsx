"use client";

import React from "react";

import Sidebar from "@/components/LuxuryLayout/Sidebar";
import Topbar from "@/components/LuxuryLayout/Topbar";

type LuxuryDashboardProps = {
  children?: React.ReactNode;
};

export default function LuxuryDashboard({ children }: LuxuryDashboardProps) {
  return (
    <div className="min-h-screen w-full flex bg-black text-white">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar />
        <main className="flex-1 min-h-0 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
