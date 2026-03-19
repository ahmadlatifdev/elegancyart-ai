import { adminStats } from "@/lib/admin/resumora-data";

export default function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {adminStats.map((stat) => (
        <div
          key={stat.label}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
        >
          <p className="text-sm text-zinc-400">{stat.label}</p>

          <div className="mt-2 flex items-end justify-between">
            <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
          </div>

          <div className="mt-3 text-sm">
            <span
              className={`font-semibold ${
                stat.changeType === "positive"
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {stat.change}
            </span>

            <span className="text-zinc-400 ml-2">{stat.note}</span>
          </div>
        </div>
      ))}
    </div>
  );
}