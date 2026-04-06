"use client";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#070b14] text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">

        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#D4AF37]">
            Pricing Plans
          </h1>
          <p className="mt-4 text-gray-300 text-lg">
            Choose the plan that fits your career goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="rounded-2xl border border-gray-700 p-6 bg-[#0b1220]">
            <h2 className="text-xl font-semibold mb-3">Basic</h2>
            <p className="text-gray-400 mb-6">Simple and effective resume</p>
            <div className="text-3xl font-bold mb-6">$19</div>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>✔ Resume Creation</li>
              <li>✔ Standard Template</li>
              <li>✔ PDF Download</li>
            </ul>
            <button className="w-full py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
              Select Plan
            </button>
          </div>

          <div className="rounded-2xl border border-[#D4AF37] p-6 bg-[#0b1220] shadow-lg">
            <h2 className="text-xl font-semibold mb-3 text-[#D4AF37]">Pro</h2>
            <p className="text-gray-400 mb-6">Most popular choice</p>
            <div className="text-3xl font-bold mb-6">$49</div>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>✔ Resume + Cover Letter</li>
              <li>✔ Premium Templates</li>
              <li>✔ AI Optimization</li>
            </ul>
            <button className="w-full py-2 bg-[#D4AF37] text-black rounded-lg hover:opacity-90">
              Select Plan
            </button>
          </div>

          <div className="rounded-2xl border border-gray-700 p-6 bg-[#0b1220]">
            <h2 className="text-xl font-semibold mb-3">Elite</h2>
            <p className="text-gray-400 mb-6">Full premium experience</p>
            <div className="text-3xl font-bold mb-6">$99</div>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>✔ All Pro Features</li>
              <li>✔ LinkedIn Optimization</li>
              <li>✔ Priority Support</li>
            </ul>
            <button className="w-full py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
              Select Plan
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}