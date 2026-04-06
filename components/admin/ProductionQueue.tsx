import {
  productionQueue,
  type ProductionQueueItem,
} from "../../lib/admin/resumora-data";

export default function ProductionQueue() {
  return (
    <div className="rounded-[30px] border border-white/10 bg-gradient-to-br from-[#17171c] via-[#111116] to-[#0a0a0e] p-6 shadow-[0_16px_50px_rgba(0,0,0,0.45)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-300/70">
            Workflow
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Production Queue
          </h2>
        </div>

        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200">
          Active
        </span>
      </div>

      <div className="space-y-4">
        {productionQueue.map((item: ProductionQueueItem) => (
          <div
            key={item.id}
            className="rounded-[22px] border border-white/10 bg-gradient-to-r from-white/[0.05] to-white/[0.02] p-5 transition duration-300 hover:border-cyan-300/30 hover:bg-white/[0.07]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/35">
                  {item.id}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  {item.candidate}
                </h3>
                <p className="mt-1 text-sm text-white/55">{item.role}</p>
              </div>

              <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}