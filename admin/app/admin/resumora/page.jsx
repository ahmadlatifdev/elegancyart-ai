"use client";

export default function ResumoraAdminPage() {
  return (
    <div className="p-6 text-white bg-black min-h-screen">

      <div className="mb-6 p-4 bg-[#111] rounded-xl border border-gray-800">
        <h2 className="text-lg font-bold text-yellow-400 mb-3">Control Commands</h2>

        <div className="flex gap-3">
          <button
            onClick={() => window.location.href = "/admin"}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded"
          >
            BACK TO DASHBOARD
          </button>

          <button
            onClick={() => window.location.href = "/resumora"}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded"
          >
            CONTINUE RESUMORA
          </button>

          <button
            onClick={() => window.location.href = "/admin/deploy"}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded"
          >
            DEPLOY ADMIN
          </button>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-yellow-400">Resumora Control Center</h1>

    </div>
  );
}