"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header({ lang = "en" }) {
  const t = {
    en: {
      brand: "Resumora",
      tagline: "Premium AI Career Platform",
      about: "About",
      services: "Services",
      pricing: "Pricing",
      contact: "Contact",
      login: "Login",
      start: "Get Started",
    },
    fr: {
      brand: "Resumora",
      tagline: "Plateforme IA carrière premium",
      about: "À propos",
      services: "Services",
      pricing: "Tarifs",
      contact: "Contact",
      login: "Connexion",
      start: "Commencer",
    },
  };

  const content = t[lang] || t.en;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070b14]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-white transition hover:opacity-90"
        >
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-[#0b1220] shadow-lg shadow-black/20">
            <Image
              src="/resumora-logo.png"
              alt="Resumora Logo"
              width={48}
              height={48}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div>
            <div className="text-lg font-semibold tracking-wide">
              {content.brand}
            </div>
            <div className="text-xs text-gray-400">
              {content.tagline}
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <Link href="/about" className="text-sm text-gray-300 hover:text-white">
            {content.about}
          </Link>
          <Link href="/services" className="text-sm text-gray-300 hover:text-white">
            {content.services}
          </Link>
          <Link href="/pricing" className="text-sm text-gray-300 hover:text-white">
            {content.pricing}
          </Link>
          <Link href="/contact" className="text-sm text-gray-300 hover:text-white">
            {content.contact}
          </Link>
        </nav