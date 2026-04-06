import fs from "fs";
import path from "path";

const logPath = path.resolve("bossmind.logs.json");

export function detectConflict(newOutput: string) {
  try {
    if (!fs.existsSync(logPath)) return false;

    const logs = JSON.parse(fs.readFileSync(logPath, "utf-8"));

    for (const log of logs.reverse()) {
      if (log.output && log.output !== newOutput) {
        return false;
      }
    }

    return false;
  } catch {
    return false;
  }
}