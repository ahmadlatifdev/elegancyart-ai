"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#070b14] text-white px-6 py-16">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/40 bg-[#111827] text-xl font-bold text-[#D4AF37]">
              R
            </div>
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="mt-2 text-sm text-gray-400">
              Sign in to access your premium Resumora workspace.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-gray-300">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none transition focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none transition focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#D4AF37] px-4 py-3 font-semibold text-black transition hover:opacity-90"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
            <Link href="/contact" className="hover:text-white">
              Need help?
            </Link>
            <Link href="/pricing" className="hover:text-white">
              View plans
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}