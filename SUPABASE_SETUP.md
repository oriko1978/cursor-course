# 🏴‍☠️ Supabase Database Setup Guide

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in:
   - **Name**: DANDI API Keys
   - **Database Password**: (create a strong password)
   - **Region**: Choose closest to you
5. Click "Create new project"

## Step 2: Create Database Table

1. In your Supabase project, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste this SQL:

```sql
-- Create API Keys Table
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  key TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('dev', 'production')),
  monthly_limit INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_used TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Create index for faster lookups
CREATE INDEX idx_api_keys_key ON api_keys(key);
CREATE INDEX idx_api_keys_is_active ON api_keys(is_active);

-- Enable Row Level Security
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for development)
-- IMPORTANT: In production, you should create more restrictive policies
CREATE POLICY "Allow all operations on api_keys" ON api_keys
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. Click **Run** or press `Ctrl/Cmd + Enter`

## Step 3: Get Your API Credentials

1. Go to **Project Settings** (gear icon in sidebar)
2. Click on **API** in the left menu
3. You'll see:
   - **Project URL**: Your Supabase URL
   - **anon/public key**: Your anonymous key

## Step 4: Set Up Environment Variables

1. In your project root (`/Users/oriko/Projects/DANDI/dandi/`), create a file named `.env.local`
2. Add your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Replace with your actual values from Supabase

## Step 5: Install Supabase Client

Run this in your terminal:

```bash
cd /Users/oriko/Projects/DANDI/dandi
npm install @supabase/supabase-js
```

If you get SSL errors, try:

```bash
npm config set strict-ssl false
npm install @supabase/supabase-js
npm config set strict-ssl true
```

## Step 6: Restart Your Dev Server

```bash
npm run dev
```

## ✅ Verification

Your API keys will now be stored in Supabase! You can:
- View data in Supabase Dashboard → **Table Editor** → **api_keys**
- Test CRUD operations in your app
- Data persists across server restarts

## 🔒 Security Notes

- The current RLS policy allows all operations (good for development)
- For production, create proper authentication and authorization
- Never commit `.env.local` to git (it's already in `.gitignore`)
- Consider adding user authentication with Supabase Auth

## 📊 Optional: Add Sample Data

You can add sample API keys directly in Supabase:

1. Go to **Table Editor** → **api_keys**
2. Click **Insert** → **Insert row**
3. Fill in the fields
4. Click **Save**

Or run this SQL in SQL Editor:

```sql
INSERT INTO api_keys (name, key, type, monthly_limit, is_active)
VALUES 
  ('Development Key', 'tvly-dev-' || gen_random_uuid()::text, 'dev', NULL, true),
  ('Production Key', 'tvly-prod-' || gen_random_uuid()::text, 'production', 10000, true);
```

Arrr! Your database be ready to sail! 🏴‍☠️
