"use client";

import Link from "next/link";

export default function Footer({ lang = "en" }) {
  const t = {
    en: {
      about: "About",
      services: "Services",
      pricing: "Pricing",
      contact: "Contact",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      support: "Support",
      copyright: "© 2026 Resumora. All rights reserved."
    },
    fr: {
      about: "À propos",
      services: "Services",
      pricing: "Tarifs",
      contact: "Contact",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      support: "Support",
      copyright: "© 2026 Resumora. Tous droits réservés."
    }
  };

  const content = t[lang] || t.en;

  return (
    <footer className="bg-[#0b0f1a] text-gray-300 border-t border-gray-800 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">

        <div>
          <h3 className="text-gold font-semibold mb-3">Resumora</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-white">{content.about}</Link></li>
            <li><Link href="/services" className="hover:text-white">{content.services}</Link></li>
            <li><Link href="/pricing" className="hover:text-white">{content.pricing}</Link></li>
            <li><Link href="/contact" className="hover:text-white">{content.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-gold font-semibold mb-3">Legal</h3>
          <ul className="space-y-2">
            <li><Link href="/privacy" className="hover:text-white">{content.privacy}</Link></li>
            <li><Link href="/terms" className="hover:text-white">{content.terms}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-gold font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li><Link href="/support" className="hover:text-white">{content.support}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-gold font-semibold mb-3">Language</h3>
          <div className="flex gap-2">
            <Link href="?lang=en" className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-700">EN</Link>
            <Link href="?lang=fr" className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-700">FR</Link>
          </div>
        </div>

      </div>

      <div className="text-center text-sm text-gray-500 pb-6">
        {content.copyright}
      </div>
    </footer>
  );
}