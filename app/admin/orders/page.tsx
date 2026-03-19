"use client"

import { useEffect, useState } from "react"

type Order = {
  id: string
  order_code: string
  client_name: string
  client_email: string
  package_name: string
  status: string
  priority: string
  due_label: string
  amount: string
}

export default function OrdersPage() {

  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/orders")
      .then(res => res.json())
      .then(data => {
        setOrders(data.orders)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="p-8 text-lg">Loading orders...</div>
  }

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Orders Manager
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full border">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">Order</th>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Package</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Due</th>
              <th className="p-3 text-left">Amount</th>

            </tr>

          </thead>

          <tbody>

            {orders.map(order => (

              <tr key={order.id} className="border-t">

                <td className="p-3 font-semibold">
                  {order.order_code}
                </td>

                <td className="p-3">
                  {order.client_name}
                  <div className="text-sm text-gray-500">
                    {order.client_email}
                  </div>
                </td>

                <td className="p-3">
                  {order.package_name}
                </td>

                <td className="p-3">
                  {order.status}
                </td>

                <td className="p-3">
                  {order.priority}
                </td>

                <td className="p-3">
                  {order.due_label}
                </td>

                <td className="p-3 font-semibold">
                  ${order.amount}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}