type BossMindLog = {
  event: any;
  timestamp: string;
};

const logs: BossMindLog[] = [];

export function logEvent(event: any) {
  try {
    logs.push({
      event,
      timestamp: new Date().toISOString(),
    });

    console.log("BossMind Log:", event);

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}