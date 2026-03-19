"use client";

import { useEffect, useState } from "react";

type ProfitResponse = {
  ok: boolean;
  currency: string;
  summary: {
    grossRevenueNetAfterStripeFees: number;
    stripeFees: number;
    payoutsSent: number;
    payoutsFailedOrCanceled: number;
    bankTransfersVerified: number;
    writerPaymentsPaid: number;
    adsCost: number;
    refunds: number;
    realNetProfit: number;
  };
};

export default function ProfitPage() {

  const [data, setData] = useState<ProfitResponse | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadProfit() {

    const res = await fetch("http://localhost:3001/api/admin/profit");

    const json = await res.json();

    setData(json);

    setLoading(false);

  }

  useEffect(() => {

    loadProfit();

  }, []);

  if (loading) {

    return <div style={{padding:20}}>Loading profit dashboard...</div>;

  }

  if (!data?.ok) {

    return <div style={{padding:20}}>Profit fetch failed</div>;

  }

  const s = data.summary;

  return (

    <div style={{padding:30}}>

      <h1 style={{fontSize:28, marginBottom:30}}>Profit Dashboard</h1>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(3,1fr)",
          gap:20
        }}
      >

        <Card title="Gross Revenue" value={money(s.grossRevenueNetAfterStripeFees)} />
        <Card title="Stripe Fees" value={money(s.stripeFees)} />
        <Card title="Writer Cost" value={money(s.writerPaymentsPaid)} />
        <Card title="Ads Cost" value={money(s.adsCost)} />
        <Card title="Refunds" value={money(s.refunds)} />
        <Card title="Estimated Net Profit" value={money(s.realNetProfit)} strong />

      </div>

    </div>

  );

}

function Card({
  title,
  value,
  strong
}:{
  title:string,
  value:string,
  strong?:boolean
}){

  return (

    <div
      style={{
        border:"1px solid #333",
        borderRadius:10,
        padding:20,
        background:"#111",
        color:"#fff"
      }}
    >

      <div style={{fontSize:14,opacity:0.8}}>
        {title}
      </div>

      <div
        style={{
          fontSize:28,
          marginTop:10,
          fontWeight: strong ? "bold" : "600"
        }}
      >
        {value}
      </div>

    </div>

  );

}

function money(value:number){

  return new Intl.NumberFormat("en-CA",{
    style:"currency",
    currency:"CAD"
  }).format(value / 100);

}