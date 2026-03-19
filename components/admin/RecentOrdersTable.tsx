import { recentOrders } from "@/lib/admin/resumora-data";

export default function RecentOrdersTable() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">Recent Orders</h2>
        <p className="text-sm text-zinc-400 mt-1">
          Latest resumora client requests
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-zinc-400 border-b border-zinc-800">
            <tr>
              <th className="text-left py-3">Order</th>
              <th className="text-left py-3">Client</th>
              <th className="text-left py-3">Service</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Amount</th>
              <th className="text-left py-3">Created</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-zinc-800/40">
                <td className="py-3 text-white">{order.id}</td>
                <td className="py-3 text-zinc-300">{order.client}</td>
                <td className="py-3 text-zinc-300">{order.service}</td>
                <td className="py-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300">
                    {order.status}
                  </span>
                </td>
                <td className="py-3 text-zinc-300">{order.amount}</td>
                <td className="py-3 text-zinc-500">{order.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}