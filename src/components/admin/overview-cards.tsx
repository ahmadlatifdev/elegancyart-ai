"use client";

import type { OverviewMetric } from "@/lib/admin/types";

type Props = {
  metrics: OverviewMetric[];
};

function getColor(tone: string) {
  if (tone === "healthy") return "bg-green-500";
  if (tone === "warning") return "bg-yellow-500";
  if (tone === "critical") return "bg-red-500";
  return "bg-gray-500";
}

export default function OverviewCards({ metrics }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className="p-4 rounded-2xl shadow bg-black text-white border border-gray-800"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-70">{m.label}</span>
            <span
              className={`w-3 h-3 rounded-full ${getColor(m.tone)}`}
            />
          </div>

          <div className="text-2xl font-bold mt-2">{m.value}</div>

          <div className="text-xs opacity-60 mt-1">
            {m.helpText}
          </div>
        </div>
      ))}
    </div>
  );
}