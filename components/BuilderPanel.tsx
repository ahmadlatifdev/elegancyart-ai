// components/BuilderPanel.tsx
'use client';
export const BuilderPanel = ({ active, onToggle }: { active: boolean, onToggle: () => void }) => (
  <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
    <h2 className="text-xl font-bold mb-4">Builder Panel</h2>
    <button
      onClick={onToggle}
      className="px-4 py-2 bg-gold text-black rounded hover:opacity-90 transition"
    >
      {active ? 'Hide' : 'Show'} Builder
    </button>
    {active && (
      <div className="mt-4 text-sm text-gray-300">
        DeepSeek-powered smart builder area (future buttons + AI logic here).
      </div>
    )}
  </div>
);
