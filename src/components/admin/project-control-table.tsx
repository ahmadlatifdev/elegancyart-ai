"use client";

import { useEffect, useState } from "react";
import type { ProjectOverviewRow } from "../../lib/admin/types";

type Props = {
  projects: ProjectOverviewRow[];
};

type ProjectStateMap = Record<string, string>;

function badgeColor(status: string) {
  if (status === "running") return "bg-green-500";
  if (status === "paused") return "bg-yellow-500";
  if (status === "stopped") return "bg-red-500";
  return "bg-gray-500";
}

function getSavedState(): ProjectStateMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("bossmind-project-state") || "{}");
  } catch {
    return {};
  }
}

function saveState(state: ProjectStateMap) {
  if (typeof window === "undefined") return;
  localStorage.setItem("bossmind-project-state", JSON.stringify(state));
}

export default function ProjectControlTable({ projects }: Props) {
  const [statusMap, setStatusMap] = useState<ProjectStateMap>({});

  useEffect(() => {
    const saved = getSavedState();
    const next: ProjectStateMap = {};

    for (const project of projects) {
      next[project.projectKey] = saved[project.projectKey] || project.status || "unknown";
    }

    setStatusMap(next);
  }, [projects]);

  function applyCommand(projectKey: string, command: string) {
    setStatusMap((prev) => {
      const next = { ...prev };

      if (command === "start") next[projectKey] = "running";
      if (command === "stop") next[projectKey] = "stopped";
      if (command === "pause") next[projectKey] = "paused";
      if (command === "resume") next[projectKey] = "running";
      if (command === "retry_failures" && !next[projectKey]) next[projectKey] = "unknown";

      saveState(next);
      return next;
    });
  }

  return (
    <div className="bg-black text-white p-4 rounded-2xl border border-gray-800">
      <div className="text-lg font-bold mb-4">Projects</div>

      <table className="w-full text-sm">
        <thead className="opacity-70">
          <tr>
            <th className="text-left">Project</th>
            <th>Status</th>
            <th>Queue</th>
            <th>Failed</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((p) => {
            const currentStatus = statusMap[p.projectKey] || p.status || "unknown";

            return (
              <tr key={p.projectKey} className="border-t border-gray-800">
                <td className="py-2">{p.name}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs text-white ${badgeColor(currentStatus)}`}
                  >
                    {currentStatus}
                  </span>
                </td>

                <td>{p.queueCount}</td>
                <td>{p.failedJobs}</td>

                <td className="flex gap-2 py-2">
                  <button
                    type="button"
                    onClick={() => applyCommand(p.projectKey, "start")}
                    className="bg-green-600 px-2 py-1 rounded"
                  >
                    Start
                  </button>

                  <button
                    type="button"
                    onClick={() => applyCommand(p.projectKey, "stop")}
                    className="bg-red-600 px-2 py-1 rounded"
                  >
                    Stop
                  </button>

                  <button
                    type="button"
                    onClick={() => applyCommand(p.projectKey, "retry_failures")}
                    className="bg-yellow-600 px-2 py-1 rounded"
                  >
                    Retry
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}