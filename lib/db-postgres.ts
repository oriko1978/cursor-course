import { neon } from "@neondatabase/serverless";
import { randomBytes } from "crypto";

// Initialize Neon Postgres connection
const sql = neon(process.env.DATABASE_URL!);

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

// Database operations for Postgres
export const database = {
  // Initialize database schema
  async init() {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT,
        image TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        last_login TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    // Create api_keys table
    await sql`
      CREATE TABLE IF NOT EXISTS api_keys (
        id TEXT PRIMARY KEY,
        user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        key TEXT NOT NULL UNIQUE,
        type TEXT NOT NULL CHECK (type IN ('dev', 'production')),
        monthly_limit INTEGER,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        last_used TIMESTAMP,
        is_active BOOLEAN NOT NULL DEFAULT true
      )
    `;

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_api_keys_key ON api_keys(key)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_api_keys_is_active ON api_keys(is_active)`;

    console.log("✅ Postgres database initialized");
  },

  // User operations
  users: {
    async getByEmail(email: string): Promise<User | null> {
      const rows = await sql`
        SELECT id, email, name, image, created_at, last_login
        FROM users
        WHERE email = ${email}
      `;
      
      if (rows.length === 0) return null;
      
      const row = rows[0];
      return {
        id: row.id,
        email: row.email,
        name: row.name,
        image: row.image,
        createdAt: row.created_at,
        lastLogin: row.last_login,
      };
    },

    async create(data: { email: string; name?: string; image?: string }): Promise<User> {
      const id = generateId();
      const now = new Date().toISOString();
      
      await sql`
        INSERT INTO users (id, email, name, image, created_at, last_login)
        VALUES (${id}, ${data.email}, ${data.name || null}, ${data.image || null}, ${now}, ${now})
      `;
      
      return {
        id,
        email: data.email,
        name: data.name,
        image: data.image,
        createdAt: now,
        lastLogin: now,
      };
    },

    async upsert(data: { email: string; name?: string; image?: string }): Promise<User> {
      const existing = await this.getByEmail(data.email);
      
      if (existing) {
        const now = new Date().toISOString();
        await sql`
          UPDATE users
          SET name = ${data.name || existing.name}, 
              image = ${data.image || existing.image}, 
              last_login = ${now}
          WHERE email = ${data.email}
        `;
        
        return (await this.getByEmail(data.email))!;
      } else {
        return this.create(data);
      }
    },

    async getAll(): Promise<User[]> {
      const rows = await sql`
        SELECT id, email, name, image, created_at, last_login
        FROM users
        ORDER BY last_login DESC
      `;
      
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
  async getAll(): Promise<ApiKey[]> {
    const rows = await sql`
      SELECT id, user_id, name, key, type, monthly_limit, created_at, last_used, is_active
      FROM api_keys
      ORDER BY created_at DESC
    `;
    
    return rows.map((row) => ({
      id: row.id,
      userId: row.user_id,
      name: row.name,
      key: row.key,
      type: row.type as "dev" | "production",
      monthlyLimit: row.monthly_limit,
      createdAt: row.created_at,
      lastUsed: row.last_used,
      isActive: row.is_active,
    }));
  },

  async getById(id: string): Promise<ApiKey | null> {
    const rows = await sql`
      SELECT id, user_id, name, key, type, monthly_limit, created_at, last_used, is_active
      FROM api_keys
      WHERE id = ${id}
    `;
    
    if (rows.length === 0) return null;
    
    const row = rows[0];
    return {
      id: row.id,
      userId: row.user_id,
      name: row.name,
      key: row.key,
      type: row.type as "dev" | "production",
      monthlyLimit: row.monthly_limit,
      createdAt: row.created_at,
      lastUsed: row.last_used,
      isActive: row.is_active,
    };
  },

  async create(data: {
    name: string;
    type: "dev" | "production";
    monthlyLimit?: number;
    userId?: string;
  }): Promise<ApiKey> {
    const id = generateId();
    const key = generateApiKey(data.type);
    const now = new Date().toISOString();
    
    await sql`
      INSERT INTO api_keys (id, user_id, name, key, type, monthly_limit, created_at, is_active)
      VALUES (${id}, ${data.userId || null}, ${data.name}, ${key}, ${data.type}, ${data.monthlyLimit || null}, ${now}, true)
    `;
    
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

  async update(id: string, updates: { isActive?: boolean; name?: string }): Promise<ApiKey | null> {
    const existing = await this.getById(id);
    if (!existing) return null;
    
    if (typeof updates.isActive === "boolean") {
      await sql`UPDATE api_keys SET is_active = ${updates.isActive} WHERE id = ${id}`;
    }
    
    if (typeof updates.name === "string") {
      await sql`UPDATE api_keys SET name = ${updates.name} WHERE id = ${id}`;
    }
    
    return this.getById(id);
  },

  async delete(id: string): Promise<boolean> {
    const result = await sql`DELETE FROM api_keys WHERE id = ${id} RETURNING id`;
    return result.length > 0;
  },

  async validateKey(key: string): Promise<{ valid: boolean; keyInfo?: ApiKey; message?: string }> {
    const rows = await sql`
      SELECT id, user_id, name, key, type, monthly_limit, created_at, last_used, is_active
      FROM api_keys
      WHERE key = ${key}
    `;
    
    if (rows.length === 0) {
      return { valid: false, message: "Invalid API key" };
    }
    
    const row = rows[0];
    
    if (!row.is_active) {
      return { valid: false, message: "API key is inactive" };
    }
    
    // Update last used timestamp
    const now = new Date().toISOString();
    await sql`UPDATE api_keys SET last_used = ${now} WHERE id = ${row.id}`;
    
    const keyInfo: ApiKey = {
      id: row.id,
      userId: row.user_id,
      name: row.name,
      key: row.key,
      type: row.type as "dev" | "production",
      monthlyLimit: row.monthly_limit,
      createdAt: row.created_at,
      lastUsed: now,
      isActive: row.is_active,
    };
    
    return { valid: true, keyInfo };
  },
};
