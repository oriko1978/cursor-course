// Smart database wrapper that auto-switches between SQLite (local) and Postgres (production)

const IS_PRODUCTION = !!process.env.DATABASE_URL;

if (IS_PRODUCTION) {
  // Use Postgres in production (Vercel)
  console.log("📊 Using Neon Postgres (Production)");
  const { database } = require("./db-postgres");
  
  // Initialize Postgres schema on first load
  database.init().catch((err: Error) => {
    console.error("Failed to initialize Postgres:", err);
  });
  
  module.exports = { database };
} else {
  // Use SQLite in local development
  console.log("📊 Using SQLite (Local Development)");
  const { database } = require("./db");
  module.exports = { database };
}
