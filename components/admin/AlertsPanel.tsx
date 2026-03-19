import { alerts } from "@/lib/admin/resumora-data";

const toneClasses = {
  critical: "border-rose-500/30 bg-rose-500/10",
  warning: "border-amber-500/30 bg-amber-500/10",
  success: "border-emerald-500/30 bg-emerald-500/10",
};

export default function AlertsPanel() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">Alerts</h2>
        <p className="text-sm text-zinc-400 mt-1">
          Priority actions requiring attention
        </p>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.title}
            className={`rounded-2xl border p-4 ${toneClasses[alert.tone]}`}
          >
            <p className="text-base font-semibold text-white">{alert.title}</p>
            <p className="mt-1 text-sm text-zinc-300">{alert.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}