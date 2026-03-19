"use client"

import { useEffect, useState } from "react"

export default function ProfitPage() {

  const [data,setData] = useState<any>(null)

  useEffect(()=>{

    fetch("/api/admin/profit")
      .then(res=>res.json())
      .then(d=>setData(d.summary))

  },[])

  if(!data){
    return <div className="p-10 text-white">Loading profit...</div>
  }

  return(

    <div className="p-10 text-white">

      <h1 className="text-3xl font-bold mb-8">
        Profit Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="p-6 border border-white/20 rounded-xl">
          <div className="text-sm">Gross Revenue</div>
          <div className="text-2xl font-bold">${data.gross_revenue}</div>
        </div>

        <div className="p-6 border border-white/20 rounded-xl">
          <div className="text-sm">Stripe Fees</div>
          <div className="text-2xl font-bold">${data.stripe_fees}</div>
        </div>

        <div className="p-6 border border-white/20 rounded-xl">
          <div className="text-sm">Writer Cost</div>
          <div className="text-2xl font-bold">${data.writer_cost}</div>
        </div>

        <div className="p-6 border border-white/20 rounded-xl">
          <div className="text-sm">Ads Cost</div>
          <div className="text-2xl font-bold">${data.ads_cost}</div>
        </div>

        <div className="p-6 border border-white/20 rounded-xl">
          <div className="text-sm">Refunds</div>
          <div className="text-2xl font-bold">${data.refunds}</div>
        </div>

        <div className="p-6 border border-white/20 rounded-xl">
          <div className="text-sm">Tax Collected</div>
          <div className="text-2xl font-bold">${data.tax_collected}</div>
        </div>

        <div className="p-6 border border-green-500 rounded-xl col-span-3">
          <div className="text-sm">Net Profit</div>
          <div className="text-3xl font-bold text-green-400">
            ${data.net_profit}
          </div>
        </div>

      </div>

    </div>

  )

}