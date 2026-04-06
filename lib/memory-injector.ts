export async function injectMemory(projectKey: string) {
  return {
    projectKey,
    memoryLoaded: true,
    timestamp: new Date().toISOString(),
  };
}