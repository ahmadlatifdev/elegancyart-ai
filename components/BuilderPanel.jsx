'use client';

import React, { useEffect } from 'react';

export default function BuilderPanel() {
  // ✅ This component previously loaded legacy/old dashboards.
  // ✅ Now it is hard-disabled to prevent the old UI from appearing anywhere.

  useEffect(() => {
    // Auto-redirect to the active dashboard
    const t = setTimeout(() => {
      window.location.href = 'https://ai.elegancyart.com';
    }, 800);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl">
        <div className="text-xl font-semibold mb-2">This dashboard was removed</div>

        <p className="text-white/70 text-sm leading-relaxed">
          The legacy dashboard is disabled to prevent old/incorrect pages from showing.
          You are being redirected to the active ElegancyArt AI dashboard now.
        </p>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <a
            href="https://ai.elegancyart.com"
            className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-4 py-2 text-black font-semibold hover:bg-yellow-400 transition"
          >
            Go to Active Dashboard (ai.elegancyart.com)
          </a>

          <button
            onClick={() => (window.location.href = 'https://ai.elegancyart.com')}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-4 py-2 text-white hover:bg-white/10 transition"
          >
            Redirect Now
          </button>
        </div>

        <div className="mt-4 text-xs text-white/50">
          If you still see the old page after deploy, purge Cloudflare cache once.
        </div>
      </div>
    </div>
  );
}
