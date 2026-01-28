# Security Policy

## 🔒 Security Measures Implemented

### Authentication & Authorization
- ✅ **NextAuth.js** for secure authentication
- ✅ **Google OAuth SSO** - No password storage
- ✅ **JWT-based sessions** with secure cookies
- ✅ **User-scoped API operations** - Users can only access their own data
- ✅ **Ownership verification** on all CRUD operations
- ✅ **401 Unauthorized** responses for unauthenticated requests
- ✅ **404 responses** for unauthorized access (security by obscurity)

### Data Protection
- ✅ **User isolation** - Each user sees only their API keys
- ✅ **Database user_id association** - All keys tied to owner
- ✅ **Server-side validation** on all API endpoints
- ✅ **Input sanitization** (TypeScript type checking)
- ✅ **Encrypted connections** (HTTPS only in production)

### API Security
- ✅ **Authentication required** for all sensitive endpoints
- ✅ **Rate limiting** (via Vercel platform)
- ✅ **CORS protection** (Next.js default)
- ✅ **API key prefix** (`dandi-dev-`, `dandi-prod-`)
- ✅ **Monthly usage limits** per API key

### Infrastructure Security
- ✅ **Environment variables** for secrets (not in code)
- ✅ **Neon Postgres** with SSL connections
- ✅ **Vercel serverless** - Auto-scaling, DDoS protection
- ✅ **No exposed database credentials**
- ✅ **Edge Runtime** for middleware (isolated execution)

### Dependencies
- ✅ **npm audit** runs on every push (GitHub Actions)
- ✅ **Dependency review** on pull requests
- ✅ **Weekly automated security scans**
- ✅ **Minimal dependencies** (reduces attack surface)

## 🔍 Security Scanning

### Run Security Audit Locally

```bash
# Check for vulnerabilities
npm run security:audit

# Fix vulnerabilities automatically
npm run security:audit-fix

# Full security check (audit + outdated packages)
npm run security:check
```

### GitHub Actions
- **Automatic scans** on every push to main
- **Dependency review** on pull requests
- **Weekly scheduled scans** (Mondays 9 AM UTC)
- **Security reports** uploaded as artifacts

## 🛡️ Current Security Status

### Last Audit: 2026-01-28
- **npm vulnerabilities**: 0 found ✅
- **Next.js version**: 16.1.6 (patched DoS vulnerability)
- **Dependencies**: All up to date

### Outdated Packages (Non-Critical)
- `@types/node`: 20.19.30 → 25.0.10 (minor)
- `@types/react`: 19.2.9 → 19.2.10 (patch)
- `eslint-config-next`: 16.1.4 → 16.1.6 (patch)
- `react`: 19.2.3 → 19.2.4 (patch)
- `react-dom`: 19.2.3 → 19.2.4 (patch)

## 🚨 Reporting Security Issues

If you discover a security vulnerability, please:

1. **DO NOT** open a public issue
2. Email: security@dandi.com (or your email)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours.

## 🔐 Best Practices

### For Users
- ✅ Use **strong Google account** with 2FA
- ✅ **Rotate API keys** regularly
- ✅ **Delete unused keys** immediately
- ✅ **Use development keys** for testing only
- ✅ **Set monthly limits** on production keys
- ✅ **Monitor usage** via dashboard

### For Developers
- ✅ **Never commit** `.env.local` or secrets
- ✅ **Use environment variables** for all sensitive data
- ✅ **Run `npm audit`** before every deployment
- ✅ **Keep dependencies updated**
- ✅ **Review pull requests** for security issues
- ✅ **Test authentication** in every feature
- ✅ **Validate all user inputs** server-side

## 📋 Security Checklist

### Before Each Deployment
- [ ] Run `npm audit` - no vulnerabilities
- [ ] Run `npm outdated` - check for critical updates
- [ ] Test authentication flows
- [ ] Verify user isolation (can't access other users' data)
- [ ] Check environment variables are set in Vercel
- [ ] Review new code for security issues
- [ ] Test in production (staging environment)

### Monthly Review
- [ ] Update dependencies
- [ ] Review access logs
- [ ] Check for unusual API usage patterns
- [ ] Rotate Google OAuth credentials (if needed)
- [ ] Review and delete old/unused API keys
- [ ] Check GitHub Actions security scan results

### Quarterly Review
- [ ] Full security audit
- [ ] Penetration testing (if applicable)
- [ ] Review and update security policies
- [ ] Update documentation
- [ ] Review user feedback on security

## 🔗 Resources

- [NextAuth.js Security](https://next-auth.js.org/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [npm Security Best Practices](https://docs.npmjs.com/security-best-practices)
- [Vercel Security](https://vercel.com/docs/security)
- [Neon Security](https://neon.tech/docs/security)

## 📊 Compliance

### Standards Followed
- **OWASP Top 10** - Web application security
- **OAuth 2.0** - Industry-standard authorization
- **HTTPS/TLS** - Encrypted communications
- **GDPR considerations** - User data protection
- **Principle of Least Privilege** - Minimal access rights

---

**Last Updated**: 2026-01-28  
**Next Review**: 2026-02-28
