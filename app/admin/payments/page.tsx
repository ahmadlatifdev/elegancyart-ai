import { sql } from "../../../lib/db/neon"

export default async function PaymentsPage() {
  let payments: {
    order_code: string
    client_name: string
    client_email: string
    package_name: string
    amount: number
    status: string
    created_at: string
  }[] = []

  try {
    const rows = await sql`
      SELECT
        order_code,
        client_name,
        client_email,
        package_name,
        amount,
        status,
        created_at
      FROM resumora_orders
      ORDER BY created_at DESC
    `

    payments = (rows as any[]).map((row) => ({
      order_code: row.order_code || "",
      client_name: row.client_name || "Unknown",
      client_email: row.client_email || "",
      package_name: row.package_name || "",
      amount: Number(row.amount || 0),
      status: row.status || "",
      created_at: row.created_at
        ? new Date(row.created_at).toLocaleDateString()
        : "",
    }))
  } catch (error) {
    payments = []
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Payments Manager</h1>

      <table className="w-full border border-white/20">
        <thead className="bg-white/10">
          <tr>
            <th className="p-3 text-left">Order</th>
            <th className="p-3 text-left">Client</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Package</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment, i) => (
            <tr key={i} className="border-t border-white/20">
              <td className="p-3 font-semibold">{payment.order_code}</td>
              <td className="p-3">{payment.client_name}</td>
              <td className="p-3">{payment.client_email}</td>
              <td className="p-3">{payment.package_name}</td>
              <td className="p-3 font-semibold">${payment.amount.toFixed(2)}</td>
              <td className="p-3">{payment.status}</td>
              <td className="p-3">{payment.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}