# DANDI - API Key Management Platform

A modern, secure API key management platform built with Next.js, featuring Google OAuth authentication and a beautiful Tavily-inspired UI.

## ✨ Features

### 🔐 Authentication
- **Google OAuth 2.0** - Secure single sign-on with Google
- **Protected Routes** - Automatic middleware-based route protection
- **Session Management** - Persistent user sessions with NextAuth.js

### 🔑 API Key Management
- **Create API Keys** - Generate development and production keys
- **Key Types** - Separate keys for development and production environments
- **Usage Limits** - Set monthly usage limits for each key
- **Key Masking** - Secure display of API keys with toggle visibility
- **Copy to Clipboard** - One-click key copying with toast notifications
- **Edit & Delete** - Full CRUD operations on API keys
- **Active/Inactive Toggle** - Quickly enable or disable keys

### 🎨 User Interface
- **Tavily-Inspired Design** - Clean, modern, and professional interface
- **Dark Mode** - Full dark mode support
- **Responsive Layout** - Works seamlessly on all devices
- **Collapsible Sidebar** - Space-efficient navigation
- **Modal Dialogs** - Beautiful popups for forms and confirmations
- **Toast Notifications** - User-friendly feedback system

### 🛠️ Developer Tools
- **API Playground** - Test and validate API keys in real-time
- **Dashboard Overview** - Statistics and usage cards
- **SQLite Database** - Local, file-based data storage
- **LangChain Integration** - Ready for AI/ML features

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Google Cloud account (for OAuth)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/oriko1978/cursor-course.git
   cd cursor-course/dandi
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Google OAuth:**
   - Follow the detailed guide in [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md)
   - Create OAuth credentials in Google Cloud Console
   - Copy your Client ID and Client Secret

4. **Configure environment variables:**
   ```bash
   cp ENV_TEMPLATE.txt .env.local
   ```

   Update `.env.local` with your credentials:
   ```env
   # NextAuth Configuration
   AUTH_SECRET=your-secret-here  # Generate with: openssl rand -base64 32
   
   # Google OAuth
   AUTH_GOOGLE_ID=your-google-client-id.apps.googleusercontent.com
   AUTH_GOOGLE_SECRET=your-google-client-secret
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
dandi/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth API routes
│   │   ├── keys/                  # API key CRUD endpoints
│   │   └── validate/              # Key validation endpoint
│   ├── dashboard/
│   │   ├── components/            # Dashboard UI components
│   │   │   ├── api-key-list.tsx
│   │   │   ├── create-api-key-form.tsx
│   │   │   ├── edit-api-key-form.tsx
│   │   │   ├── confirmation-dialog.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── toast.tsx
│   │   ├── playground/            # API testing page
│   │   ├── use-cases/
│   │   ├── billing/
│   │   ├── settings/
│   │   ├── docs/
│   │   ├── layout.tsx             # Dashboard layout
│   │   └── page.tsx               # Main dashboard
│   ├── login/
│   │   └── page.tsx               # Login page
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Homepage
├── lib/
│   ├── db.ts                      # SQLite database
│   └── api-keys-store.ts          # API key utilities
├── data/
│   └── api-keys.db                # SQLite database file
├── auth.ts                        # NextAuth configuration
├── middleware.ts                  # Route protection
├── package.json
├── ENV_TEMPLATE.txt
├── GOOGLE_OAUTH_SETUP.md
└── README.md
```

## 🔧 Tech Stack

### Core
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### Authentication
- **[NextAuth.js v5](https://next-auth.js.org/)** - Authentication
- **Google OAuth 2.0** - Identity provider

### Database
- **[better-sqlite3](https://github.com/WiseLibs/better-sqlite3)** - SQLite database
- Local file-based storage

### UI & Styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **Dark Mode** - Built-in theme support
- **Radix UI** - Accessible components (via Shadcn)

### AI/ML (Optional)
- **[LangChain](https://js.langchain.com/)** - LLM framework
- **@langchain/openai** - OpenAI integration
- **@langchain/community** - Community integrations

## 📖 API Routes

### Authentication
- `GET/POST /api/auth/[...nextauth]` - NextAuth endpoints

### API Keys
- `GET /api/keys` - List all API keys
- `POST /api/keys` - Create new API key
- `PATCH /api/keys/[id]` - Update API key
- `DELETE /api/keys/[id]` - Delete API key
- `POST /api/validate` - Validate API key

## 🎯 Usage Examples

### Creating an API Key

1. Navigate to the Dashboard
2. Click "Create New Key"
3. Enter a name for your key
4. Select type (Development/Production)
5. Optionally set a monthly usage limit
6. Click "Create Key"

### Testing an API Key

1. Go to "API Playground" in the sidebar
2. Enter your API key
3. Click "Validate Key"
4. See the validation result (green checkmark for valid, red X for invalid)

### Managing API Keys

- **Toggle Active/Inactive:** Click the switch in the OPTIONS column
- **Copy Key:** Click the copy icon next to the key
- **Show/Hide Key:** Click the eye icon to toggle visibility
- **Edit:** Click "Edit" to change the key name
- **Delete:** Click "Delete" and confirm in the dialog

## 🔒 Security

- ✅ All routes protected by NextAuth middleware
- ✅ API keys stored securely in SQLite
- ✅ Keys masked in UI by default
- ✅ Google OAuth for authentication
- ✅ Environment variables for sensitive data
- ✅ No hardcoded secrets in code

## 🌐 Deployment

### Environment Variables (Production)

Set these in your hosting platform:

```env
AUTH_SECRET=your-production-secret
AUTH_GOOGLE_ID=your-google-client-id.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=your-google-client-secret
NEXTAUTH_URL=https://yourdomain.com
```

### Vercel Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Vercel
- Netlify
- Railway
- Digital Ocean
- AWS

## 🛠️ Development

### Running Tests
```bash
npm run lint
```

### Building for Production
```bash
npm run build
npm start
```

### Database Reset
```bash
rm data/api-keys.db
# Restart the dev server to reinitialize
```

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [LangChain Documentation](https://js.langchain.com/)
- [Google OAuth Setup Guide](./GOOGLE_OAUTH_SETUP.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspired by [Tavily](https://tavily.com/)
- Built with [Next.js](https://nextjs.org/)
- Authentication powered by [NextAuth.js](https://next-auth.js.org/)

## 📧 Contact

- GitHub: [@oriko1978](https://github.com/oriko1978)
- Email: oristar@gmail.com

---

Made with ❤️ using Cursor AI
