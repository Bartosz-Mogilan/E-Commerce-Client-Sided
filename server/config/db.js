import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

// Check for required environment variables
const requiredVars = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASSWORD', 'DB_PORT'];
requiredVars.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing a required environment variable: ${key}`);
    process.exit(1);
  }
});

// Create a connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
  idleTimeoutMillis: 100,
});

// Test database connection
(async () => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    console.log("Connected to PostgreSQL at", result.rows[0].now);
    client.release();
  } catch (err) {
    console.error("Database connection error", err.stack);
    process.exit(1);
  }
})();

export default pool;