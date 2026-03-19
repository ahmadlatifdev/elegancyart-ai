app/admin/overview/page.tsx

export default function OverviewPage() {
  return (
    <div className="space-y-10">

      <div>
        <h1 className="text-4xl font-bold text-amber-400">
          Resumora Admin Overview
        </h1>
        <p className="text-zinc-400 mt-2">
          Operations dashboard for resumora platform
        </p>
      </div>

      <AdminStats />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <ProductionQueue />
        <AlertsPanel />
      </div>

      <RecentOrdersTable />

    </div>
  );
}