import {
  checkDatabaseHealth,
  getWorstHealth,
  heartbeatAgeSeconds,
  toHealthStatus,
} from "./monitoring";

export async function getMasterOverview() {
  const db = await checkDatabaseHealth();

  return {
    database: db,
    overall: getWorstHealth(db),
    heartbeat: heartbeatAgeSeconds(),
    status: toHealthStatus(db),
    timestamp: new Date().toISOString(),
  };
}