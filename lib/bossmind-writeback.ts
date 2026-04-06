import { sql } from "./bossmind-neon";

export async function saveMemoryToNeon(memory: any) {
  if (!sql) return;

  try {
    await sql`
      INSERT INTO bossmind_memory (memory_json, updated_at)
      VALUES (${JSON.stringify(memory)}, NOW())
    `;
  } catch (error) {
    console.error("Neon write error:", error);
  }
}