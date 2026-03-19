async function getPricingPlans() {
  const res = await fetch("http://localhost:3000/api/admin/pricing", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load pricing plans");
  }

  return res.json();
}

export default async function PricingPage() {
  const data = await getPricingPlans();
  const plans = data.plans || [];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-amber-400">
          Pricing Manager
        </h1>
        <p className="text-zinc-400 mt-2">
          Manage Resumora packages, billing values, and package features
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-zinc-800 text-zinc-400">
            <tr>
              <th className="text-left py-3">Name</th>
              <th className="text-left py-3">Slug</th>
              <th className="text-left py-3">Monthly</th>
              <th className="text-left py-3">Yearly</th>
              <th className="text-left py-3">Description</th>
              <th className="text-left py-3">Active</th>
              <th className="text-left py-3">Order</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800">
            {plans.map((plan: any) => (
              <tr key={plan.id} className="hover:bg-zinc-800/40">
                <td className="py-3 text-white">{plan.name}</td>
                <td className="py-3 text-zinc-400">{plan.slug}</td>
                <td className="py-3 text-zinc-300">${plan.price_monthly}</td>
                <td className="py-3 text-zinc-300">${plan.price_yearly}</td>
                <td className="py-3 text-zinc-400 max-w-md">{plan.description}</td>
                <td className="py-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs">
                    {plan.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 text-zinc-400">{plan.sort_order}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}