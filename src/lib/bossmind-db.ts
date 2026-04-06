import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __bossmindPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

export const pool =
  global.__bossmindPool ??
  new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

if (process.env.NODE_ENV !== "production") {
  global.__bossmindPool = pool;
}