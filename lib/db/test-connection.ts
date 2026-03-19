import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing in .env.local");
}

const sql = neon(databaseUrl);

async function test() {
  try {
    const result = await sql`SELECT NOW() as now`;
    console.log("Neon connected:", result);
  } catch (error) {
    console.error("Neon connection failed:", error);
  }
}

test();