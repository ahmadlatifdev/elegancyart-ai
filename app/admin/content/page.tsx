import { sql } from "../../../lib/db/neon"

export default async function ContentPage() {
  let contentItems: {
    order_code: string
    client_name: string
    package_name: string
    status: string
    priority: string
    due_label: string
  }[] = []

  try {
    const rows = await sql`
      SELECT
        order_code,
        client_name,
        package_name,
        status,
        priority,
        due_label
      FROM resumora_orders
      ORDER BY created_at DESC
    `

    contentItems = (rows as any[]).map((row) => ({
      order_code: row.order_code || "",
      client_name: row.client_name || "Unknown",
      package_name: row.package_name || "",
      status: row.status || "",
      priority: row.priority || "",
      due_label: row.due_label || "",
    }))
  } catch (error) {
    contentItems = []
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Content Manager</h1>

      <table className="w-full border border-white/20">
        <thead className="bg-white/10">
          <tr>
            <th className="p-3 text-left">Order</th>
            <th className="p-3 text-left">Client</th>
            <th className="p-3 text-left">Package</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Priority</th>
            <th className="p-3 text-left">Due</th>
          </tr>
        </thead>

        <tbody>
          {contentItems.map((item, i) => (
            <tr key={i} className="border-t border-white/20">
              <td className="p-3 font-semibold">{item.order_code}</td>
              <td className="p-3">{item.client_name}</td>
              <td className="p-3">{item.package_name}</td>
              <td className="p-3">{item.status}</td>
              <td className="p-3">{item.priority}</td>
              <td className="p-3">{item.due_label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}