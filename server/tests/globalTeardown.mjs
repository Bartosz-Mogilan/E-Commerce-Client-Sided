import pool from "../config/db.js";

export default async function globalTeardown() {
  console.log("Global teardown: Closing database pool...");

  if (pool && typeof pool.end === "function") {
    await pool.end();
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log("Database pool closed successfully.");
  } else {
    console.log("pool.end is not a function. Check your db export.");
  }
}
