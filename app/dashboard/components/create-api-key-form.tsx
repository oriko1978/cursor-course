import { useState } from "react";

interface CreateApiKeyFormProps {
  onSubmit: (data: {
    name: string;
    type: "dev" | "production";
    monthlyLimit?: number;
  }) => void;
  onCancel: () => void;
}

export function CreateApiKeyForm({ onSubmit, onCancel }: CreateApiKeyFormProps) {
  const [name, setName] = useState("");
  const [keyType, setKeyType] = useState<"dev" | "production">("dev");
  const [limitUsage, setLimitUsage] = useState(false);
  const [monthlyLimit, setMonthlyLimit] = useState("1000");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim()) {
      onSubmit({
        name: name.trim(),
        type: keyType,
        monthlyLimit: limitUsage ? parseInt(monthlyLimit) : undefined,
      });
      setName("");
      setKeyType("dev");
      setLimitUsage(false);
      setMonthlyLimit("1000");
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      {/* Close Button */}
      <button
        type="button"
        onClick={onCancel}
        className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-zinc-800 dark:hover:text-gray-300"
        aria-label="Close"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        Create a new API key
      </h3>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        Enter a name and limit for the new API key.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Key Name */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white">
            Key Name <span className="font-normal text-gray-500 dark:text-gray-400">— A unique name to identify this key</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Key Name"
            className="block w-full rounded-lg border-2 border-blue-500 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-blue-600 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500"
            required
          />
        </div>

        {/* Key Type */}
        <div>
          <label className="mb-3 block text-sm font-semibold text-gray-900 dark:text-white">
            Key Type <span className="font-normal text-gray-500 dark:text-gray-400">— Choose the environment for this key</span>
          </label>
          <div className="space-y-3">
            {/* Development Option */}
            <label
              className={`flex cursor-pointer items-start gap-4 rounded-lg border-2 p-4 transition-all ${
                keyType === "dev"
                  ? "border-blue-500 bg-blue-50 dark:border-blue-600 dark:bg-blue-950/20"
                  : "border-gray-200 bg-white hover:border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600"
              }`}
            >
              <input
                type="radio"
                name="keyType"
                value="dev"
                checked={keyType === "dev"}
                onChange={(e) => setKeyType(e.target.value as "dev")}
                className="mt-0.5 h-5 w-5 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span className="font-semibold text-gray-900 dark:text-white">Development</span>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Rate limited to 100 requests/minute
                </p>
              </div>
            </label>

            {/* Production Option */}
            <label
              className={`flex cursor-pointer items-start gap-4 rounded-lg border-2 p-4 transition-all ${
                keyType === "production"
                  ? "border-blue-500 bg-blue-50 dark:border-blue-600 dark:bg-blue-950/20"
                  : "border-gray-200 bg-white hover:border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600"
              }`}
            >
              <input
                type="radio"
                name="keyType"
                value="production"
                checked={keyType === "production"}
                onChange={(e) => setKeyType(e.target.value as "production")}
                className="mt-0.5 h-5 w-5 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  <span className="font-semibold text-gray-900 dark:text-white">Production</span>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Rate limited to 1,000 requests/minute
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Monthly Usage Limit */}
        <div>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={limitUsage}
              onChange={(e) => setLimitUsage(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Limit monthly usage*
            </span>
          </label>
          {limitUsage && (
            <input
              type="number"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(e.target.value)}
              placeholder="1000"
              className="mt-3 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-500"
              min="1"
            />
          )}
          <p className="mt-3 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            * If the combined usage of all your keys exceeds your account's allocated usage limit (plan, add-ons, and any pay-as-you-go limit), all requests will be rejected.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
