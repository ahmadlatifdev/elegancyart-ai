export type HealthStatus = "healthy" | "warning" | "critical" | "unknown";

export type OverviewMetric = {
  label: string;
  value: number | string;
  tone: HealthStatus;
  helpText: string;
};

export type ProjectOverviewRow = {
  projectKey: string;
  name: string;
  status: string;
  health: HealthStatus;
  workerHeartbeatAgeSeconds: number | null;
  queueCount: number;
  failedJobs: number;
  socialConnected: number;
  lastError: string | null;
  updatedAt: string | null;
};

export type AlertItem = {
  id: string;
  projectKey: string;
  title: string;
  severity: HealthStatus;
  createdAt: string;
  detail: string;
};

export type MemoryEventItem = {
  id: string;
  projectKey: string;
  eventType: string;
  entityType: string;
  entityId: string | null;
  createdAt: string;
  payload: unknown;
};

export type MasterOverviewPayload = {
  generatedAt: string;
  metrics: OverviewMetric[];
  projects: ProjectOverviewRow[];
  alerts: AlertItem[];
  memoryEvents: MemoryEventItem[];
};

export type ProjectDetailPayload = {
  project: ProjectOverviewRow | null;
  recentTaskRuns: Array<{
    id: string;
    workerName: string;
    taskType: string;
    status: string;
    retryCount: number;
    startedAt: string;
    finishedAt: string | null;
    errorText: string | null;
  }>;
  recentMemoryEvents: MemoryEventItem[];
};

export type AdminActionRequest = {
  projectKey: string;
  command:
    | "start"
    | "stop"
    | "pause"
    | "resume"
    | "retry_failures"
    | "refresh_sync"
    | "refresh_analytics";
  actor?: string;
};

export type AdminActionResponse = {
  ok: boolean;
  projectKey: string;
  command: string;
  acceptedAt: string;
  message: string;
};