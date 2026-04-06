import fs from "fs";
import path from "path";
import { getBossMindMemoryFromNeon } from "./bossmind-neon";

const memoryPath = process.env.BOSSMIND_MEMORY || "";

export async function loadBossMindMemory() {
  try {
    const neonMemory = await getBossMindMemoryFromNeon();
    if (neonMemory) {
      return neonMemory;
    }

    const fullPath = path.resolve(memoryPath);
    const data = fs.readFileSync(fullPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("BossMind Memory Load Error:", err);
    return null;
  }
}

export async function injectMemory(prompt: string) {
  const memory = await loadBossMindMemory();

  if (!memory) return prompt;

  return `
SYSTEM MODE: BOSSMIND_STRICT

MEMORY:
${JSON.stringify(memory)}

USER INPUT:
${prompt}
`;
}