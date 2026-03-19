require("dotenv").config({ path: ".env.local" });
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.BOSSMIND_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function runTest() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Neon database connected successfully.");
    console.log("Server time:", result.rows[0]);
  } catch (error) {
    console.error("Neon database connection failed:", error);
  } finally {
    await pool.end();
  }
}

runTest();