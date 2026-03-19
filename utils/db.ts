import { pool } from '@/utils/db'

export default async function Home() {
  const client = await pool.connect()
  try {
    const result = await client.query(`
      SELECT * FROM pricing_plans
      ORDER BY sort_order ASC
    `)
    const plans = result.rows

    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-center mb-4">Elevate Your Career with Resumora</h1>
          <p className="text-xl text-center text-gray-600 mb-12">Choose the perfect plan for your professional journey</p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition">
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className="text-gray-500 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price_monthly}</span>
                  <span className="text-gray-500">/mo</span>
                  <p className="text-sm text-gray-400 mt-1">or ${plan.price_yearly}/year</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  } finally {
    client.release()
  }
}