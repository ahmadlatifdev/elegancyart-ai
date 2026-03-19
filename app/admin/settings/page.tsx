const settingsGroups = [
  {
    title: "Platform",
    items: [
      { label: "Project Name", value: "Resumora Admin" },
      { label: "Primary Domain", value: "resumora.net" },
      { label: "Environment", value: "Local Development" },
    ],
  },
  {
    title: "Billing",
    items: [
      { label: "Stripe Status", value: "Connected" },
      { label: "Default Currency", value: "CAD" },
      { label: "Refund Mode", value: "Manual Review" },
    ],
  },
  {
    title: "Automation",
    items: [
      { label: "Email Delivery", value: "Active" },
      { label: "Order Sync", value: "Active" },
      { label: "Admin Alerts", value: "Active" },
    ],
  },
  {
    title: "Security",
    items: [
      { label: "Admin Access", value: "Protected" },
      { label: "Session Mode", value: "Local Session" },
      { label: "Audit Logs", value: "Enabled" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-amber-400">
          Settings
        </h1>
        <p className="text-zinc-400 mt-2">
          Manage platform configuration, billing, automation, and security
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {settingsGroups.map((group) => (
          <div
            key={group.title}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white">
              {group.title}
            </h2>

            <div className="mt-6 space-y-4">
              {group.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between border-b border-zinc-800 pb-3"
                >
                  <span className="text-zinc-400">{item.label}</span>
                  <span className="text-white font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}