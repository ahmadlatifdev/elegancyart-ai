import { sql } from "../../../lib/db/neon"

export default async function CustomersPage() {
  let customers: {
    client_email: string
    client_name: string
    orders: number
    total_spent: number
  }[] = []

  try {
    const orders = await sql`
      SELECT
        client_name,
        client_email,
        amount
      FROM resumora_orders
      ORDER BY created_at DESC
    `

    const map: Record<
      string,
      {
        client_email: string
        client_name: string
        orders: number
        total_spent: number
      }
    > = {}

    for (const o of orders as any[]) {
      const key = o.client_email || o.client_name || "unknown"

      if (!map[key]) {
        map[key] = {
          client_email: o.client_email || "",
          client_name: o.client_name || "Unknown",
          orders: 0,
          total_spent: 0,
        }
      }

      map[key].orders += 1
      map[key].total_spent += Number(o.amount || 0)
    }

    customers = Object.values(map).sort((a, b) => b.total_spent - a.total_spent)
  } catch (error) {
    customers = []
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Customers Manager</h1>

      <table className="w-full border border-white/20">
        <thead className="bg-white/10">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Orders</th>
            <th className="p-3 text-left">Total Spent</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c, i) => (
            <tr key={i} className="border-t border-white/20">
              <td className="p-3">{c.client_name}</td>
              <td className="p-3">{c.client_email}</td>
              <td className="p-3">{c.orders}</td>
              <td className="p-3 font-semibold">${c.total_spent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}