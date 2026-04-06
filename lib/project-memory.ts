import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(databaseUrl);

export type ProjectMemoryMessage = {
  id: string;
  projectKey: string;
  engineKey: string;
  role: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
};

type RawProjectMemoryRow = {
  id: string;
  project_key: string;
  engine_key: string;
  role: string;
  content: string;
  image_url: string | null;
  created_at: string;
};

function mapRow(row: RawProjectMemoryRow): ProjectMemoryMessage {
  return {
    id: row.id,
    projectKey: row.project_key,
    engineKey: row.engine_key,
    role: row.role,
    content: row.content,
    imageUrl: row.image_url,
    createdAt: row.created_at,
  };
}

export async function getBossMindMemory(
  projectKey: string,
  limit = 50
): Promise<ProjectMemoryMessage[]> {
  const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.min(limit, 200)) : 50;

  const rows = (await sql`
    SELECT
      id,
      project_key,
      engine_key,
      role,
      content,
      image_url,
      created_at
    FROM bossmind_project_memory
    WHERE project_key = ${projectKey}
    ORDER BY created_at DESC
    LIMIT ${safeLimit}
  `) as RawProjectMemoryRow[];

  return rows.map(mapRow);
}

export async function addBossMindMemory(input: {
  projectKey: string;
  engineKey: string;
  role: string;
  content: string;
  imageUrl?: string | null;
}): Promise<ProjectMemoryMessage> {
  const rows = (await sql`
    INSERT INTO bossmind_project_memory (
      project_key,
      engine_key,
      role,
      content,
      image_url
    )
    VALUES (
      ${input.projectKey},
      ${input.engineKey},
      ${input.role},
      ${input.content},
      ${input.imageUrl ?? null}
    )
    RETURNING
      id,
      project_key,
      engine_key,
      role,
      content,
      image_url,
      created_at
  `) as RawProjectMemoryRow[];

  return mapRow(rows[0]);
}

export async function clearBossMindMemory(projectKey: string): Promise<void> {
  await sql`
    DELETE FROM bossmind_project_memory
    WHERE project_key = ${projectKey}
  `;
}