"use client";

import type { AlertItem } from "@/lib/admin/types";

type Props = {
  alerts: AlertItem[];
};

function color(severity: string) {
  if (severity === "critical") return "text-red-400";
  if (severity === "warning") return "text-yellow-400";
  return "text-gray-400";
}

export default function AlertsPanel({ alerts }: Props) {
  return (
    <div className="bg-black text-white p-4 rounded-2xl border border-gray-800 mt-6">
      <div className="text-lg font-bold mb-4">Alerts</div>

      <div className="space-y-3">
        {alerts.map((a) => (
          <div
            key={a.id}
            className="border border-gray-800 rounded p-3"
          >
            <div className="flex justify-between">
              <span className={`font-semibold ${color(a.severity)}`}>
                {a.title}
              </span>
              <span className="text-xs opacity-60">
                {new Date(a.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="text-xs opacity-70 mt-1">
              {a.projectKey}
            </div>

            <div className="text-xs mt-2 opacity-60 break-all">
              {a.detail}
            </div>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="text-sm opacity-50">
            No alerts
          </div>
        )}
      </div>
    </div>
  );
}