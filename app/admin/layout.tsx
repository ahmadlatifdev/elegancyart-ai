"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", path: "/admin/resumora" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Customers", path: "/admin/customers" },
  { name: "Content", path: "/admin/content" },
  { name: "Pricing", path: "/admin/pricing" },
  { name: "Payments", path: "/admin/payments" },
  { name: "Automation", path: "/admin/automation" },
  { name: "Profit", path: "/admin/profit" },
  { name: "Settings", path: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-zinc-950 text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-zinc-800 p-6">
        <h1 className="text-xl font-bold mb-8 tracking-wide text-amber-400">
          Resumora Admin
        </h1>

        <nav className="space-y-4 text-sm">
          {navigation.map((item) => {
            const active = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`block transition ${
                  active
                    ? "text-amber-400 font-semibold"
                    : "text-zinc-300 hover:text-amber-400"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main workspace */}
      <main className="flex-1 p-10">
        {children}
      </main>

    </div>
  );
}