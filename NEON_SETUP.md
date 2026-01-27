# Neon Postgres Setup for Vercel Deployment

This guide will help you set up Neon Postgres for deploying DANDI to Vercel.

## Why Neon?

- ✅ **3 GB free storage** (vs 256 MB Vercel Postgres)
- ✅ **191 compute hours/month**
- ✅ **Unlimited databases**
- ✅ **Database branching** (like Git!)
- ✅ **Official Vercel partner**
- ✅ **No credit card required**

## Step 1: Create a Neon Account

1. Go to [https://console.neon.tech](https://console.neon.tech)
2. Click **"Sign Up"** (you can use GitHub OAuth)
3. Verify your email

## Step 2: Create a Project

1. Click **"Create a project"**
2. **Project name:** `dandi` (or whatever you prefer)
3. **Region:** Choose closest to your users (e.g., US East for America)
4. **Postgres version:** 16 (latest)
5. Click **"Create project"**

## Step 3: Get Your Connection String

After creating the project, you'll see a **Connection String**:

```
postgresql://user:password@ep-xxx-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
```

**Copy this entire string!** You'll need it for Vercel.

### Connection String Format:
```
postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

### Alternative: Get it from Dashboard
1. Go to your project dashboard
2. Click **"Connection String"** on the left sidebar
3. Select **"Node.js"** or **"Connection string"**
4. Copy the connection string

## Step 4: Configure Vercel

### Option A: Deploy with Vercel Dashboard

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository: `oriko1978/cursor-course`
4. In **"Configure Project"**, add environment variables:

   ```env
   AUTH_SECRET=<generate with: openssl rand -base64 32>
   AUTH_GOOGLE_ID=<your-google-client-id>
   AUTH_GOOGLE_SECRET=<your-google-client-secret>
   DATABASE_URL=<your-neon-connection-string>
   ```

5. Click **"Deploy"**

### Option B: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Set environment variables
vercel env add DATABASE_URL
# Paste your Neon connection string when prompted

vercel env add AUTH_SECRET
# Paste your auth secret

vercel env add AUTH_GOOGLE_ID
# Paste your Google client ID

vercel env add AUTH_GOOGLE_SECRET
# Paste your Google secret

# Deploy
vercel --prod
```

## Step 5: Update Google OAuth Redirect URIs

After deploying, add your Vercel URL to Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Select your OAuth client
3. Add **Authorized redirect URIs:**
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```
4. Save

## Step 6: Test Your Deployment

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Click **"Sign In with Google"**
3. After signing in, create an API key
4. Check if everything works!

## Database Management

### View Tables in Neon Console

1. Go to [https://console.neon.tech](https://console.neon.tech)
2. Select your project
3. Click **"SQL Editor"** on the left
4. Run queries:

```sql
-- View all users
SELECT * FROM users ORDER BY last_login DESC;

-- View all API keys
SELECT * FROM api_keys ORDER BY created_at DESC;

-- Count users
SELECT COUNT(*) FROM users;

-- Count API keys
SELECT COUNT(*) FROM api_keys;
```

### Branching (Optional)

Neon supports database branching like Git!

1. Go to your project → **"Branches"**
2. Click **"Create branch"**
3. Name it (e.g., `staging` or `development`)
4. Get the branch connection string
5. Use it in your staging environment

## Monitoring

### Check Database Usage

1. Go to [Neon Console](https://console.neon.tech)
2. Select your project
3. Click **"Monitoring"** to see:
   - Storage used
   - Compute hours
   - Active connections
   - Query performance

## Local Development

**No changes needed!** The app automatically uses:
- **SQLite** when running locally (`npm run dev`)
- **Neon Postgres** when deployed to Vercel (when `DATABASE_URL` is set)

### Test Locally with Neon (Optional)

If you want to test with Neon locally:

1. Add to `.env.local`:
   ```env
   DATABASE_URL=<your-neon-connection-string>
   ```

2. Run:
   ```bash
   npm run dev
   ```

3. It will use Neon instead of SQLite

## Troubleshooting

### Error: "relation does not exist"

The database tables haven't been created yet. The app automatically creates them on first request, but you can manually run:

```sql
-- In Neon SQL Editor
CREATE TABLE users (...); -- See lib/db-postgres.ts for full schema
CREATE TABLE api_keys (...);
```

### Error: "connection timeout"

- Check your DATABASE_URL is correct
- Ensure your internet connection is stable
- Neon might be sleeping (free tier) - first request wakes it up (takes ~1-2 seconds)

### Corporate Proxy Issues

If deploying from a corporate network:
- Vercel deployment doesn't need local network access
- Use Vercel Dashboard instead of CLI
- Database connection happens from Vercel servers, not your machine

## Pricing

### Hobby (Free) - What You Have

- ✅ 3 GB storage
- ✅ 191 compute hours/month (~6 hours/day)
- ✅ Unlimited projects
- ✅ 1 concurrent connection
- ✅ Community support

### When to Upgrade to Pro ($19/month)

- Need more than 3 GB storage
- Need more compute hours
- Need autoscaling
- Need higher connection limits
- Need dedicated support

For your API key management platform, **free tier is more than enough!**

## Security Best Practices

1. ✅ Never commit `.env.local` or connection strings to Git
2. ✅ Use different databases for development/staging/production
3. ✅ Enable database backups in Neon Console
4. ✅ Rotate credentials periodically
5. ✅ Monitor database usage regularly
6. ✅ Use connection pooling (Neon handles this automatically)

## Support

- 📚 [Neon Documentation](https://neon.tech/docs)
- 💬 [Neon Discord](https://discord.gg/92vNTzKDGp)
- 🐛 [Neon GitHub Issues](https://github.com/neondatabase/neon)
- 📖 [Vercel + Neon Guide](https://vercel.com/guides/nextjs-prisma-postgres)

## Migration from SQLite

Don't worry! Your local SQLite data stays local. When you deploy:

1. New Neon database starts empty
2. Users will need to sign in again (creates new records)
3. API keys need to be recreated (more secure anyway)

This is normal and expected for a fresh deployment!

---

Made with ❤️ using Neon + Vercel
