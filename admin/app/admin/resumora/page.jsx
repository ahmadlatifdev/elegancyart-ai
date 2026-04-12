"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ResumoraPage() {
  const [lang, setLang] = useState("en");

  const t = {
    en: {
      title: "Luxury Resume Client Interface",
      btn1: "Create Resume",
      btn2: "Explore Services",
      services: "Premium Services",
      pricing: "Edit & Upgrade Plans",
      choose: "Choose Plan →",
    },
    fr: {
      title: "Interface Client CV de Luxe",
      btn1: "Créer un CV",
      btn2: "Explorer",
      services: "Services Premium",
      pricing: "Plans d’Édition",
      choose: "Choisir →",
    },
  }[lang];

  return (
    <main className="min-h-screen bg-[#020b1c] text-white px-6 py-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <Link href="/resumora" className="flex items-center gap-3">
          <div className="w-12 h-12 relative">
            <Image src="/resumora-logo.png" fill alt="logo" />
          </div>
          <span className="text-[#d4af37] font-bold">Resumora</span>
        </Link>

        <div className="flex gap-2">
          <button onClick={() => setLang("en")} className="px-3 py-2 bg-[#d4af37] text-black rounded">EN</button>
          <button onClick={() => setLang("fr")} className="px-3 py-2 border rounded">FR</button>
        </div>
      </div>

      {/* HERO */}
      <h1 className="text-5xl font-black mb-6">{t.title}</h1>

      <div className="flex gap-4 mb-10">
        <Link href="/resumora/register" className="bg-[#d4af37] text-black px-6 py-3 rounded font-bold">
          {t.btn1}
        </Link>
        <Link href="/resumora/services" className="border px-6 py-3 rounded">
          {t.btn2}
        </Link>
      </div>

      {/* SERVICES */}
      <h2 className="text-3xl font-bold mb-6">{t.services}</h2>

      <div className="grid md:grid-cols-2 gap-5 mb-12">

        <Link href="/resumora/services#ats" className="card">ATS Resume</Link>
        <Link href="/resumora/services#cover" className="card">Cover Letter</Link>
        <Link href="/resumora/services#linkedin" className="card">LinkedIn Optimization</Link>
        <Link href="/resumora/services#executive" className="card">Executive Resume</Link>
        <Link href="/resumora/services#interview" className="card">Interview Preparation</Link>
        <Link href="/resumora/services#priority" className="card">Priority Delivery</Link>

      </div>

      {/* PRICING */}
      <h2 className="text-3xl font-bold mb-6">{t.pricing}</h2>

      <div className="grid md:grid-cols-3 gap-6">

        <Link href="#" className="plan">
          <h3>Resume Edit</h3>
          <div className="price">$89</div>
          <p>1 Free Edit (2 pages)</p>
          <button>{t.choose}</button>
        </Link>

        <Link href="#" className="plan">
          <h3>Cover Letter Edit</h3>
          <div className="price">$29</div>
          <p>1 Free Edit</p>
          <button>{t.choose}</button>
        </Link>

        <Link href="#" className="plan">
          <h3>Package</h3>
          <div className="price">$110</div>
          <p>3 Free Edits</p>
          <button>{t.choose}</button>
        </Link>

      </div>

      {/* STYLE */}
      <style jsx>{`
        .card {
          background:#06152e;
          padding:20px;
          border-radius:16px;
          border:1px solid #1c2c4a;
          font-weight:bold;
        }
        .plan {
          background:#0b1833;
          padding:25px;
          border-radius:20px;
          border:1px solid #2b3f68;
          text-align:center;
        }
        .price {
          font-size:40px;
          color:#d4af37;
          margin:10px 0;
        }
      `}</style>

    </main>
  );
}