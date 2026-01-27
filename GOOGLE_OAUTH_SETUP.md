# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for the DANDI platform.

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click **"New Project"**
4. Enter a project name (e.g., "DANDI Auth")
5. Click **"Create"**

## Step 2: Configure OAuth Consent Screen

1. In the left sidebar, go to **"APIs & Services" → "OAuth consent screen"**
2. Select **"External"** user type (unless you have a Google Workspace account)
3. Click **"Create"**
4. Fill in the required fields:
   - **App name**: DANDI
   - **User support email**: Your email
   - **Developer contact email**: Your email
5. Click **"Save and Continue"**
6. Skip the "Scopes" section (click **"Save and Continue"**)
7. Add test users if needed (your email address)
8. Click **"Save and Continue"**
9. Review and click **"Back to Dashboard"**

## Step 3: Create OAuth 2.0 Credentials

1. In the left sidebar, go to **"APIs & Services" → "Credentials"**
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. Select **"Web application"**
4. Give it a name (e.g., "DANDI Web Client")
5. Under **"Authorized JavaScript origins"**, add:
   - `http://localhost:3000` (for local development)
   - Your production URL (e.g., `https://yourdomain.com`)
6. Under **"Authorized redirect URIs"**, add:
   - `http://localhost:3000/api/auth/callback/google` (for local development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Click **"Create"**
8. Copy the **Client ID** and **Client Secret**

## Step 4: Update Environment Variables

1. Copy `ENV_TEMPLATE.txt` to `.env.local`:
   ```bash
   cp ENV_TEMPLATE.txt .env.local
   ```

2. Update `.env.local` with your credentials:
   ```env
   # NextAuth Configuration
   AUTH_SECRET=your-secret-here  # Generate with: openssl rand -base64 32
   
   # Google OAuth
   AUTH_GOOGLE_ID=your-google-client-id.apps.googleusercontent.com
   AUTH_GOOGLE_SECRET=your-google-client-secret
   ```

3. Generate a secure `AUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

## Step 5: Test Your Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`
3. Click **"Sign In"**
4. You should be redirected to Google's login page
5. After signing in, you should be redirected back to the dashboard

## Troubleshooting

### "Error 400: redirect_uri_mismatch"
- Make sure the redirect URI in your Google Cloud Console matches exactly:
  - `http://localhost:3000/api/auth/callback/google` (for development)
  - Include the protocol (`http://` or `https://`)
  - Port must match (`:3000`)

### "Error 403: access_denied"
- Add your email as a test user in the OAuth consent screen
- Make sure your app is not in "Testing" mode with restricted access

### "Error: Missing AUTH_SECRET"
- Generate a secret with: `openssl rand -base64 32`
- Add it to your `.env.local` file

## Production Deployment

When deploying to production:

1. Add your production URL to **"Authorized JavaScript origins"**:
   - `https://yourdomain.com`

2. Add your production callback URL to **"Authorized redirect URIs"**:
   - `https://yourdomain.com/api/auth/callback/google`

3. Set environment variables in your hosting platform (Vercel, Netlify, etc.):
   - `AUTH_SECRET`
   - `AUTH_GOOGLE_ID`
   - `AUTH_GOOGLE_SECRET`

4. If using Vercel, make sure `NEXTAUTH_URL` is set automatically, or set it manually:
   - `NEXTAUTH_URL=https://yourdomain.com`

## Security Best Practices

- ✅ Never commit `.env.local` to version control
- ✅ Use different Google OAuth clients for development and production
- ✅ Rotate your `AUTH_SECRET` periodically
- ✅ Enable 2FA on your Google Cloud account
- ✅ Review OAuth consent screen regularly
- ✅ Monitor API usage in Google Cloud Console

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [NextAuth Google Provider](https://next-auth.js.org/providers/google)
