import { sql } from "../../../lib/db/neon"

export default async function AnalyticsPage() {
  let analytics = {
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    pending: 0,
    inReview: 0,
    awaitingClient: 0,
    ready: 0,
    delivered: 0,
    highPriority: 0,
  }

  try {
    const rows = await sql`
      SELECT
        amount,
        status,
        priority
      FROM resumora_orders
      ORDER BY created_at DESC
    `

    const orders = rows as any[]

    analytics.totalOrders = orders.length

    for (const row of orders) {
      analytics.totalRevenue += Number(row.amount || 0)

      if (row.status === "Pending") analytics.pending += 1
      if (row.status === "In Review") analytics.inReview += 1
      if (row.status === "Awaiting Client") analytics.awaitingClient += 1
      if (row.status === "Ready") analytics.ready += 1
      if (row.status === "Delivered") analytics.delivered += 1
      if (row.priority === "High") analytics.highPriority += 1
    }

    analytics.averageOrderValue =
      analytics.totalOrders > 0
        ? analytics.totalRevenue / analytics.totalOrders
        : 0
  } catch (error) {
    analytics = {
      totalOrders: 0,
      totalRevenue: 0,
      averageOrderValue: 0,
      pending: 0,
      inReview: 0,
      awaitingClient: 0,
      ready: 0,
      delivered: 0,
      highPriority: 0,
    }
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-8">Analytics Manager</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">Total Orders</div>
          <div className="text-3xl font-bold">{analytics.totalOrders}</div>
        </div>

        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">Total Revenue</div>
          <div className="text-3xl font-bold">
            ${analytics.totalRevenue.toFixed(2)}
          </div>
        </div>

        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">Average Order Value</div>
          <div className="text-3xl font-bold">
            ${analytics.averageOrderValue.toFixed(2)}
          </div>
        </div>

        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">Pending</div>
          <div className="text-3xl font-bold">{analytics.pending}</div>
        </div>

        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">In Review</div>
          <div className="text-3xl font-bold">{analytics.inReview}</div>
        </div>

        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">Awaiting Client</div>
          <div className="text-3xl font-bold">{analytics.awaitingClient}</div>
        </div>

        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">Ready</div>
          <div className="text-3xl font-bold">{analytics.ready}</div>
        </div>

        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">Delivered</div>
          <div className="text-3xl font-bold">{analytics.delivered}</div>
        </div>

        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">High Priority</div>
          <div className="text-3xl font-bold">{analytics.highPriority}</div>
        </div>
      </div>
    </div>
  )
}