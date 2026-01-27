import Link from "next/link";

export default function ComingSoon({
  searchParams,
}: {
  searchParams: { plan?: string };
}) {
  const plan = searchParams.plan || "this feature";
  const planName = plan === "pro" ? "Pro" : plan === "enterprise" ? "Enterprise" : "This Feature";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-zinc-950 dark:via-blue-950 dark:to-purple-950 p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-blue-400/20 blur-3xl"></div>
        <div className="absolute -right-4 top-3/4 h-96 w-96 animate-pulse rounded-full bg-purple-400/20 blur-3xl delay-700"></div>
        <div className="absolute left-1/2 top-1/2 h-80 w-80 animate-pulse rounded-full bg-pink-400/20 blur-3xl delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
            <span className="text-2xl font-bold text-white">D</span>
          </div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">DANDI</span>
        </Link>

        {/* Rocket Emoji Animation */}
        <div className="mb-8 inline-block animate-bounce text-8xl">
          🚀
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          {planName} Plan
          <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Coming Soon!
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          We're working hard to bring you amazing features! 
          {plan === "pro" && " The Pro plan will include unlimited API keys, advanced analytics, and team collaboration."}
          {plan === "enterprise" && " The Enterprise plan will offer custom solutions tailored to your organization's needs."}
        </p>

        {/* Features Preview (for Pro/Enterprise) */}
        {(plan === "pro" || plan === "enterprise") && (
          <div className="mt-10 rounded-2xl border border-gray-200 bg-white/50 p-8 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              What to expect:
            </h2>
            <ul className="space-y-3 text-left text-gray-600 dark:text-gray-400">
              {plan === "pro" && (
                <>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">✨</span>
                    <span>Unlimited API key generation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    <span>Advanced usage analytics & insights</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">👥</span>
                    <span>Team collaboration tools</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <span>Priority support & faster response times</span>
                  </li>
                </>
              )}
              {plan === "enterprise" && (
                <>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">🏢</span>
                    <span>Custom deployment options</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">🔒</span>
                    <span>Advanced security & compliance features</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">📞</span>
                    <span>24/7 premium support with SLA</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}

        {/* Newsletter Signup (Optional) */}
        <div className="mt-10">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Get notified when we launch!
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-gray-400"
            />
            <button className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105">
              Notify Me
            </button>
          </div>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            We'll send you one email when this plan is available. No spam!
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-lg border-2 border-gray-900 bg-white px-8 py-3 text-base font-semibold text-gray-900 transition-all hover:bg-gray-50 dark:border-white dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900"
          >
            ← Back to Home
          </Link>
          <Link
            href="/login"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            Start with Free Plan
          </Link>
        </div>

        {/* Fun Message */}
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          In the meantime, why not try our <strong>Free plan</strong>? It's awesome! 🎉
        </p>
      </div>

      {/* Floating Particles (Optional decorative elements) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/4 top-1/4 h-2 w-2 animate-ping rounded-full bg-blue-500 opacity-75"></div>
        <div className="absolute right-1/3 top-1/3 h-2 w-2 animate-ping rounded-full bg-purple-500 opacity-75 delay-500"></div>
        <div className="absolute left-1/2 bottom-1/3 h-2 w-2 animate-ping rounded-full bg-pink-500 opacity-75 delay-1000"></div>
      </div>
    </div>
  );
}
