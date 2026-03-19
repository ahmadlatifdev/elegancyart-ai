import { sql } from "../../../lib/db/neon"

export default async function AutomationPage() {
  let stats = {
    totalOrders: 0,
    inReview: 0,
    awaitingClient: 0,
    ready: 0,
    delivered: 0,
    highPriority: 0,
  }

  try {
    const rows = await sql`
      SELECT
        status,
        priority
      FROM resumora_orders
      ORDER BY created_at DESC
    `

    stats.totalOrders = (rows as any[]).length

    for (const row of rows as any[]) {
      if (row.status === "In Review") stats.inReview += 1
      if (row.status === "Awaiting Client") stats.awaitingClient += 1
      if (row.status === "Ready") stats.ready += 1
      if (row.status === "Delivered") stats.delivered += 1
      if (row.priority === "High") stats.highPriority += 1
    }
  } catch (error) {
    stats = {
      totalOrders: 0,
      inReview: 0,
      awaitingClient: 0,
      ready: 0,
      delivered: 0,
      highPriority: 0,
    }
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-8">Automation Manager</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">Total Orders</div>
          <div className="text-3xl font-bold">{stats.totalOrders}</div>
        </div>

        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">In Review</div>
          <div className="text-3xl font-bold">{stats.inReview}</div>
        </div>

        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">Awaiting Client</div>
          <div className="text-3xl font-bold">{stats.awaitingClient}</div>
        </div>

        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">Ready</div>
          <div className="text-3xl font-bold">{stats.ready}</div>
        </div>

        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">Delivered</div>
          <div className="text-3xl font-bold">{stats.delivered}</div>
        </div>

        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">High Priority</div>
          <div className="text-3xl font-bold">{stats.highPriority}</div>
        </div>
      </div>
    </div>
  )
}