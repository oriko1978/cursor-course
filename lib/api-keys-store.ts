import { randomBytes } from "crypto";

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  type: "dev" | "production";
  monthlyLimit?: number;
  createdAt: string;
  lastUsed?: string;
  isActive: boolean;
}

// In-memory store (in production, use a database)
const apiKeys: Map<string, ApiKey> = new Map();

function generateApiKey(type: "dev" | "production"): string {
  const prefix = type === "dev" ? "dandi-dev" : "dandi-prod";
  return `${prefix}-${randomBytes(24).toString("hex")}`;
}

function generateId(): string {
  return randomBytes(16).toString("hex");
}

export const apiKeysStore = {
  getAll(): ApiKey[] {
    return Array.from(apiKeys.values());
  },

  getById(id: string): ApiKey | undefined {
    return apiKeys.get(id);
  },

  create(data: {
    name: string;
    type: "dev" | "production";
    monthlyLimit?: number;
  }): ApiKey {
    const id = generateId();
    const apiKey: ApiKey = {
      id,
      name: data.name,
      key: generateApiKey(data.type),
      type: data.type,
      monthlyLimit: data.monthlyLimit,
      createdAt: new Date().toISOString(),
      isActive: true,
    };
    apiKeys.set(id, apiKey);
    return apiKey;
  },

  update(id: string, updates: Partial<Omit<ApiKey, "id" | "key" | "createdAt">>): ApiKey | null {
    const apiKey = apiKeys.get(id);
    if (!apiKey) return null;

    const updatedKey = { ...apiKey, ...updates };
    apiKeys.set(id, updatedKey);
    return updatedKey;
  },

  delete(id: string): boolean {
    return apiKeys.delete(id);
  },

  // Utility to update last used timestamp
  markAsUsed(id: string): void {
    const apiKey = apiKeys.get(id);
    if (apiKey) {
      apiKey.lastUsed = new Date().toISOString();
      apiKeys.set(id, apiKey);
    }
  },
};

// Initialize with some sample data for testing
apiKeysStore.create({ name: "Development Key", type: "dev" });
apiKeysStore.create({ name: "Production Key", type: "production", monthlyLimit: 10000 });
