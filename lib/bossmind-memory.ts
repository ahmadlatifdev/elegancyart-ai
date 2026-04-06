export type BossMindMemoryContext = {
  projectKey: string;
  memoryLoaded: boolean;
  items: string[];
  timestamp: string;
};

export async function getBossMindMemoryContext(
  projectKey: string
): Promise<BossMindMemoryContext> {
  return {
    projectKey,
    memoryLoaded: true,
    items: [],
    timestamp: new Date().toISOString(),
  };
}

export async function buildMemoryContext(projectKey: string) {
  return getBossMindMemoryContext(projectKey);
}

export async function getProjectMemory(projectKey: string) {
  return [];
}

export async function writeEventLog(input: {
  projectKey: string;
  eventType: string;
  payload?: unknown;
}) {
  return {
    ok: true,
    projectKey: input.projectKey,
    eventType: input.eventType,
    payload: input.payload ?? null,
    timestamp: new Date().toISOString(),
  };
}