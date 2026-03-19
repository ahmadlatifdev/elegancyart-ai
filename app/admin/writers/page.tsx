import { sql } from "../../../lib/db/neon"

export default async function WritersPage() {
  let writers: {
    writer_name: string
    assigned_orders: number
    in_review: number
    ready: number
    delivered: number
  }[] = []

  try {
    const rows = await sql`
      SELECT
        status
      FROM resumora_orders
      ORDER BY created_at DESC
    `

    const allRows = rows as any[]

    writers = [
      {
        writer_name: "Senior Resume Writer",
        assigned_orders: allRows.length,
        in_review: allRows.filter((row) => row.status === "In Review").length,
        ready: allRows.filter((row) => row.status === "Ready").length,
        delivered: allRows.filter((row) => row.status === "Delivered").length,
      },
    ]
  } catch (error) {
    writers = []
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Writers Manager</h1>

      <table className="w-full border border-white/20">
        <thead className="bg-white/10">
          <tr>
            <th className="p-3 text-left">Writer</th>
            <th className="p-3 text-left">Assigned Orders</th>
            <th className="p-3 text-left">In Review</th>
            <th className="p-3 text-left">Ready</th>
            <th className="p-3 text-left">Delivered</th>
          </tr>
        </thead>

        <tbody>
          {writers.map((writer, i) => (
            <tr key={i} className="border-t border-white/20">
              <td className="p-3 font-semibold">{writer.writer_name}</td>
              <td className="p-3">{writer.assigned_orders}</td>
              <td className="p-3">{writer.in_review}</td>
              <td className="p-3">{writer.ready}</td>
              <td className="p-3">{writer.delivered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}