import { alerts, type AlertItem } from "../../lib/admin/resumora-data";

const levelClasses: Record<AlertItem["level"], string> = {
  critical:
    "border-rose-500/25 bg-gradient-to-br from-rose-500/16 to-rose-900/8 text-rose-100",
  warning:
    "border-amber-400/25 bg-gradient-to-br from-amber-400/16 to-amber-900/8 text-amber-100",
  success:
    "border-emerald-400/25 bg-gradient-to-br from-emerald-400/16 to-emerald-900/8 text-emerald-100",
};

export default function AlertsPanel() {
  return (
    <div className="rounded-[30px] border border-white/10 bg-gradient-to-br from-[#17171c] via-[#111116] to-[#0a0a0e] p-6 shadow-[0_16px_50px_rgba(0,0,0,0.45)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300/70">
            Monitoring
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Alerts</h2>
        </div>

        <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
          Live
        </span>
      </div>

      <div className="space-y-4">
        {alerts.map((alert: AlertItem) => (
          <div
            key={alert.title}
            className={`rounded-[22px] border p-5 shadow-inner ${levelClasses[alert.level]}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold">{alert.title}</h3>
                <p className="mt-2 text-sm leading-6 opacity-90">
                  {alert.message}
                </p>
              </div>

              <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em]">
                {alert.level}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}