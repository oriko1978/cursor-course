import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

// Create Supabase client (won't work behind corporate proxy, but won't crash)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface ApiKeyRow {
  id: string;
  name: string;
  key: string;
  type: "dev" | "production";
  monthly_limit: number | null;
  created_at: string;
  last_used: string | null;
  is_active: boolean;
}
