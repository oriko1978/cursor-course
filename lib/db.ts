// Database wrapper that switches between SQLite (local) and Postgres (production)
import { randomBytes } from "crypto";

// Check if we're in production (Vercel) with DATABASE_URL
const IS_PRODUCTION = !!process.env.DATABASE_URL;

// Conditional imports based on environment
let Database: any;
let path: any;

// Only import SQLite modules in non-production (local development)
if (!IS_PRODUCTION) {
  Database = require("better-sqlite3");
  path = require("path");
}

// Initialize SQLite database (only in local development)
let db: any;
if (!IS_PRODUCTION && Database && path) {
  const dbPath = path.join(process.cwd(), "data", "api-keys.db");
  db = new Database(dbPath);
  // Enable WAL mode for better concurrent access
  db.pragma("journal_mode = WAL");
}

// Create tables if they don't exist (only for SQLite in local development)
if (!IS_PRODUCTION && db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      image TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      last_login TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS api_keys (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      name TEXT NOT NULL,
      key TEXT NOT NULL UNIQUE,
      type TEXT NOT NULL CHECK (type IN ('dev', 'production')),
      monthly_limit INTEGER,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      last_used TEXT,
      is_active INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_api_keys_key ON api_keys(key);
    CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);
    CREATE INDEX IF NOT EXISTS idx_api_keys_is_active ON api_keys(is_active);
  `);
}

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  createdAt: string;
  lastLogin: string;
}

export interface ApiKey {
  id: string;
  userId?: string;
  name: string;
  key: string;
  type: "dev" | "production";
  monthlyLimit?: number;
  createdAt: string;
  lastUsed?: string;
  isActive: boolean;
}

function generateApiKey(type: "dev" | "production"): string {
  const prefix = type === "dev" ? "dandi-dev" : "dandi-prod";
  return `${prefix}-${randomBytes(24).toString("hex")}`;
}

function generateId(): string {
  return randomBytes(16).toString("hex");
}

// Database operations
export const database = {
  // User operations
  users: {
    getByEmail(email: string): User | null {
      const stmt = db.prepare(`
        SELECT id, email, name, image, created_at, last_login
        FROM users
        WHERE email = ?
      `);
      
      const row = stmt.get(email) as any;
      
      if (!row) return null;
      
      return {
        id: row.id,
        email: row.email,
        name: row.name,
        image: row.image,
        createdAt: row.created_at,
        lastLogin: row.last_login,
      };
    },

    create(data: { email: string; name?: string; image?: string }): User {
      const id = generateId();
      const now = new Date().toISOString();
      
      const stmt = db.prepare(`
        INSERT INTO users (id, email, name, image, created_at, last_login)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      
      stmt.run(id, data.email, data.name || null, data.image || null, now, now);
      
      return {
        id,
        email: data.email,
        name: data.name,
        image: data.image,
        createdAt: now,
        lastLogin: now,
      };
    },

    updateLastLogin(email: string): void {
      const stmt = db.prepare(`
        UPDATE users
        SET last_login = ?
        WHERE email = ?
      `);
      
      stmt.run(new Date().toISOString(), email);
    },

    upsert(data: { email: string; name?: string; image?: string }): User {
      const existing = this.getByEmail(data.email);
      
      if (existing) {
        // Update name and image if provided
        const stmt = db.prepare(`
          UPDATE users
          SET name = ?, image = ?, last_login = ?
          WHERE email = ?
        `);
        
        stmt.run(
          data.name || existing.name,
          data.image || existing.image,
          new Date().toISOString(),
          data.email
        );
        
        return this.getByEmail(data.email)!;
      } else {
        return this.create(data);
      }
    },

    getAll(): User[] {
      const stmt = db.prepare(`
        SELECT id, email, name, image, created_at, last_login
        FROM users
        ORDER BY last_login DESC
      `);
      
      const rows = stmt.all() as any[];
      
      return rows.map((row) => ({
        id: row.id,
        email: row.email,
        name: row.name,
        image: row.image,
        createdAt: row.created_at,
        lastLogin: row.last_login,
      }));
    },
  },

  // API Key operations
  getAll(): ApiKey[] {
    const stmt = db.prepare(`
      SELECT id, user_id, name, key, type, monthly_limit, created_at, last_used, is_active
      FROM api_keys
      ORDER BY created_at DESC
    `);
    
    const rows = stmt.all() as any[];
    
    return rows.map((row) => ({
      id: row.id,
      userId: row.user_id,
      name: row.name,
      key: row.key,
      type: row.type as "dev" | "production",
      monthlyLimit: row.monthly_limit,
      createdAt: row.created_at,
      lastUsed: row.last_used,
      isActive: Boolean(row.is_active),
    }));
  },

  getById(id: string): ApiKey | null {
    const stmt = db.prepare(`
      SELECT id, user_id, name, key, type, monthly_limit, created_at, last_used, is_active
      FROM api_keys
      WHERE id = ?
    `);
    
    const row = stmt.get(id) as any;
    
    if (!row) return null;
    
    return {
      id: row.id,
      userId: row.user_id,
      name: row.name,
      key: row.key,
      type: row.type as "dev" | "production",
      monthlyLimit: row.monthly_limit,
      createdAt: row.created_at,
      lastUsed: row.last_used,
      isActive: Boolean(row.is_active),
    };
  },

  getByUserId(userId: string): ApiKey[] {
    const stmt = db.prepare(`
      SELECT id, user_id, name, key, type, monthly_limit, created_at, last_used, is_active
      FROM api_keys
      WHERE user_id = ?
      ORDER BY created_at DESC
    `);
    
    const rows = stmt.all(userId) as any[];
    
    return rows.map((row) => ({
      id: row.id,
      userId: row.user_id,
      name: row.name,
      key: row.key,
      type: row.type as "dev" | "production",
      monthlyLimit: row.monthly_limit,
      createdAt: row.created_at,
      lastUsed: row.last_used,
      isActive: Boolean(row.is_active),
    }));
  },

  create(data: {
    name: string;
    type: "dev" | "production";
    monthlyLimit?: number;
    userId?: string;
  }): ApiKey {
    const id = generateId();
    const key = generateApiKey(data.type);
    const now = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO api_keys (id, user_id, name, key, type, monthly_limit, created_at, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1)
    `);
    
    stmt.run(id, data.userId || null, data.name, key, data.type, data.monthlyLimit || null, now);
    
    return {
      id,
      userId: data.userId,
      name: data.name,
      key,
      type: data.type,
      monthlyLimit: data.monthlyLimit,
      createdAt: now,
      isActive: true,
    };
  },

  update(id: string, updates: { isActive?: boolean; name?: string }): ApiKey | null {
    const existing = this.getById(id);
    if (!existing) return null;
    
    const fields: string[] = [];
    const values: any[] = [];
    
    if (typeof updates.isActive === "boolean") {
      fields.push("is_active = ?");
      values.push(updates.isActive ? 1 : 0);
    }
    
    if (typeof updates.name === "string") {
      fields.push("name = ?");
      values.push(updates.name);
    }
    
    if (fields.length === 0) return existing;
    
    values.push(id);
    
    const stmt = db.prepare(`
      UPDATE api_keys
      SET ${fields.join(", ")}
      WHERE id = ?
    `);
    
    stmt.run(...values);
    
    return this.getById(id);
  },

  delete(id: string): boolean {
    const stmt = db.prepare("DELETE FROM api_keys WHERE id = ?");
    const result = stmt.run(id);
    return result.changes > 0;
  },

  // Validate API key
  validateKey(key: string): { valid: boolean; keyInfo?: ApiKey; message?: string } {
    const stmt = db.prepare(`
      SELECT id, user_id, name, key, type, monthly_limit, created_at, last_used, is_active
      FROM api_keys
      WHERE key = ?
    `);
    
    const row = stmt.get(key) as any;
    
    if (!row) {
      return { valid: false, message: "Invalid API key" };
    }
    
    if (!row.is_active) {
      return { valid: false, message: "API key is inactive" };
    }
    
    // Update last used timestamp
    const updateStmt = db.prepare("UPDATE api_keys SET last_used = ? WHERE id = ?");
    updateStmt.run(new Date().toISOString(), row.id);
    
    const keyInfo: ApiKey = {
      id: row.id,
      userId: row.user_id,
      name: row.name,
      key: row.key,
      type: row.type as "dev" | "production",
      monthlyLimit: row.monthly_limit,
      createdAt: row.created_at,
      lastUsed: new Date().toISOString(),
      isActive: Boolean(row.is_active),
    };
    
    return { valid: true, keyInfo };
  },

  // Initialize with sample data if database is empty
  seed() {
    const count = db.prepare("SELECT COUNT(*) as count FROM api_keys").get() as any;
    
    if (count.count === 0) {
      console.log("🌱 Seeding database with sample data...");
      this.create({ name: "Development Key", type: "dev" });
      this.create({ name: "Production Key", type: "production", monthlyLimit: 10000 });
      console.log("✅ Database seeded!");
    }
  },
};

// Seed the database on initialization (only for SQLite in local development)
if (!IS_PRODUCTION) {
  database.seed();
}

export default db;
export { IS_PRODUCTION };