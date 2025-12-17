// components/Sidebar.tsx
'use client';
import Link from 'next/link';

export const Sidebar = () => (
  <aside className="w-64 bg-[#111] p-6 border-r border-gray-800 hidden md:block">
    <h1 className="text-2xl font-bold mb-6">ElegancyArt</h1>
    <ul className="space-y-4">
      <li><Link href="/" className="block text-white hover:text-gold">Dashboard</Link></li>
      <li><Link href="#" className="block text-white hover:text-gold">Designs</Link></li>
      <li><Link href="#" className="block text-white hover:text-gold">Templates</Link></li>
      <li><Link href="#" className="block text-white hover:text-gold">Settings</Link></li>
    </ul>
  </aside>
);
