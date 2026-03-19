import { sql } from "../../lib/db/neon"

export default async function AdminDashboardPage() {
  let totalOrders = 0
  let totalRevenue = 0
  let totalCustomers = 0
  let inReview = 0
  let ready = 0
  let delivered = 0

  try {
    const orders = await sql`
      SELECT
        client_name,
        client_email,
        amount,
        status
      FROM resumora_orders
      ORDER BY created_at DESC
    `

    totalOrders = orders.length

    const customerSet = new Set<string>()

    for (const order of orders as any[]) {
      totalRevenue += Number(order.amount || 0)

      const customerKey =
        order.client_email || order.client_name || `customer-${Math.random()}`
      customerSet.add(customerKey)

      if (order.status === "In Review") inReview += 1
      if (order.status === "Ready") ready += 1
      if (order.status === "Delivered") delivered += 1
    }

    totalCustomers = customerSet.size
  } catch (error) {
    totalOrders = 0
    totalRevenue = 0
    totalCustomers = 0
    inReview = 0
    ready = 0
    delivered = 0
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">Total Orders</div>
          <div className="text-3xl font-bold">{totalOrders}</div>
        </div>

        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">Total Revenue</div>
          <div className="text-3xl font-bold">${totalRevenue.toFixed(2)}</div>
        </div>

        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">Total Customers</div>
          <div className="text-3xl font-bold">{totalCustomers}</div>
        </div>

        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">In Review</div>
          <div className="text-3xl font-bold">{inReview}</div>
        </div>

        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">Ready</div>
          <div className="text-3xl font-bold">{ready}</div>
        </div>

        <div className="border border-white/20 rounded-xl p-6 bg-white/5">
          <div className="text-sm text-white/70 mb-2">Delivered</div>
          <div className="text-3xl font-bold">{delivered}</div>
        </div>
      </div>
    </div>
  )
}