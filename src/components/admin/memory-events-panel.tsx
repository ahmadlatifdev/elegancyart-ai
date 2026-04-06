"use client";

import type { MemoryEventItem } from "@/lib/admin/types";

type Props = {
  events: MemoryEventItem[];
};

export default function MemoryEventsPanel({ events }: Props) {
  return (
    <div className="bg-black text-white p-4 rounded-2xl border border-gray-800 mt-6">
      <div className="text-lg font-bold mb-4">Memory Events</div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {events.map((e) => (
          <div
            key={e.id}
            className="border border-gray-800 rounded p-3"
          >
            <div className="flex justify-between">
              <span className="font-semibold">
                {e.eventType}
              </span>
              <span className="text-xs opacity-60">
                {new Date(e.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="text-xs opacity-60 mt-1">
              {e.projectKey} • {e.entityType}
            </div>

            <div className="text-xs mt-2 opacity-70 break-all">
              {JSON.stringify(e.payload)}
            </div>
          </div>
        ))}

        {events.length === 0 && (
          <div className="text-sm opacity-50">
            No memory events
          </div>
        )}
      </div>
    </div>
  );
}