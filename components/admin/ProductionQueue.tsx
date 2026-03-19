import { productionQueue } from "@/lib/admin/resumora-data";

export default function ProductionQueue() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">
          Production Queue
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Live document pipeline for resumora operations
        </p>
      </div>

      <div className="space-y-6">
        {productionQueue.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-200">{item.label}</span>
              <span className="text-sm text-zinc-400">{item.progress}%</span>
            </div>

            <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}