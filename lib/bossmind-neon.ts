import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL || "";

export const sql = databaseUrl ? neon(databaseUrl) : null;

export async function getBossMindMemoryFromNeon() {
  if (!sql) return null;

  try {
    const result = await sql`
      SELECT memory_json
      FROM bossmind_memory
      ORDER BY updated_at DESC
      LIMIT 1
    `;

    return result?.[0]?.memory_json || null;
  } catch (error) {
    console.error("Neon memory read error:", error);
    return null;
  }
}