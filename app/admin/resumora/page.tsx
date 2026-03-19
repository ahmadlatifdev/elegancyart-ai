const resumoraStats = [
  { label: "Live Domain", value: "resumora.net" },
  { label: "Admin Mode", value: "Active" },
  { label: "Billing", value: "Stripe Connected" },
  { label: "Database", value: "Neon Ready" },
];

const systemBlocks = [
  {
    title: "Brand Core",
    items: ["Luxury UI active", "Admin structure ready", "Dark theme applied"],
  },
  {
    title: "Service Stack",
    items: ["Resume services", "Cover letter services", "LinkedIn services"],
  },
  {
    title: "Operations",
    items: ["Orders tracking", "Payments dashboard", "Automation monitoring"],
  },
  {
    title: "Next Integration",
    items: ["Real database sync", "Live payment records", "Client file handling"],
  },
];

export default function ResumoraPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-amber-400">
          Resumora Control Center
        </h1>
        <p className="text-zinc-400 mt-2">
          Central admin identity and platform status for Resumora
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {resumoraStats.map((item) => (
          <div
            key={item.label}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
          >
            <p className="text-sm text-zinc-400">{item.label}</p>
            <h2 className="mt-2 text-2xl font-bold text-white">{item.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {systemBlocks.map((block) => (
          <div
            key={block.title}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white">{block.title}</h2>

            <div className="mt-5 space-y-3">
              {block.items.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}