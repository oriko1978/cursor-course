import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-blue-950">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Header */}
        <header className="relative">
          <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                <span className="text-xl font-bold text-white">D</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">DANDI</span>
            </div>
            <div className="flex items-center gap-4">
              {session ? (
                <Link
                  href="/dashboard"
                  className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        </header>

        {/* Hero Content */}
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
              Secure API Key
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Management</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Generate, manage, and monitor your API keys with enterprise-grade security. 
              Built for developers who need reliability and simplicity.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                  >
                    Go to Dashboard
                  </Link>
                  <Link
                    href="/dashboard/docs"
                    className="rounded-lg border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 transition-all hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                  >
                    Documentation
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    href="#features"
                    className="rounded-lg border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 transition-all hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                  >
                    Learn More
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center rounded-2xl bg-white/50 p-8 backdrop-blur-sm dark:bg-zinc-900/50">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">99.9%</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">Uptime</div>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-white/50 p-8 backdrop-blur-sm dark:bg-zinc-900/50">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">&lt;100ms</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">Response Time</div>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-white/50 p-8 backdrop-blur-sm dark:bg-zinc-900/50">
              <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">256-bit</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">Encryption</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-24 dark:bg-zinc-950 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to manage API keys
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Powerful features designed for developers, by developers.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col rounded-2xl border border-gray-200 p-8 dark:border-zinc-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Secure by Default</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Enterprise-grade encryption and security. Your keys are protected with industry-standard protocols.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col rounded-2xl border border-gray-200 p-8 dark:border-zinc-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Lightning Fast</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Instant key generation and validation. Built on modern infrastructure for maximum performance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col rounded-2xl border border-gray-200 p-8 dark:border-zinc-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-600">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Usage Analytics</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Track usage, set limits, and monitor your API keys with real-time analytics and insights.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col rounded-2xl border border-gray-200 p-8 dark:border-zinc-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">API Playground</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Test and validate your API keys instantly with our built-in playground environment.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="flex flex-col rounded-2xl border border-gray-200 p-8 dark:border-zinc-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-600">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Instant Revocation</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Revoke access instantly when needed. Full control over your API keys at all times.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="flex flex-col rounded-2xl border border-gray-200 p-8 dark:border-zinc-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-600">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Team Management</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Collaborate with your team. Manage access and permissions across your organization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Join developers who trust DANDI for secure API key management. 
              Sign up with Google and start managing your keys in seconds.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              {session ? (
                <Link
                  href="/dashboard"
                  className="rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-blue-600 shadow-lg transition-all hover:bg-gray-100 hover:scale-105"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-blue-600 shadow-lg transition-all hover:bg-gray-100 hover:scale-105"
                >
                  Sign Up with Google
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <span className="text-lg font-bold text-white">D</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">DANDI</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2026 DANDI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="https://github.com/oriko1978" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
