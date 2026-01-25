"use client";

import { useState } from "react";
import { ToastContainer } from "../components/toast";

export default function PlaygroundPage() {
  const [apiKey, setApiKey] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    message: string;
    keyInfo?: any;
  } | null>(null);
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; variant?: "success" | "error" }>>([]);

  function showToast(message: string, variant: "success" | "error" = "success") {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, variant }]);
  }

  function closeToast(id: string) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  async function handleValidate(e: React.FormEvent) {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      showToast("Please enter an API key", "error");
      return;
    }

    setIsValidating(true);
    setValidationResult(null);

    try {
      const response = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      });

      const data = await response.json();
      setValidationResult(data);

      if (data.valid) {
        showToast("✅ API Key is valid!", "success");
      } else {
        showToast(`❌ ${data.message}`, "error");
      }
    } catch (error) {
      console.error("Validation error:", error);
      showToast("Failed to validate API key", "error");
    } finally {
      setIsValidating(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Pages / API Playground
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            API Playground
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Test and validate your API keys
          </p>
        </div>

        {/* Validation Form */}
        <div className="rounded-xl bg-white p-8 shadow-sm dark:bg-zinc-900">
          <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
            Validate API Key
          </h2>

          <form onSubmit={handleValidate} className="space-y-6">
            <div>
              <label
                htmlFor="apiKey"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                API Key
              </label>
              <input
                type="text"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key (e.g., dandi-dev-...)"
                className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-500"
                disabled={isValidating}
              />
            </div>

            <button
              type="submit"
              disabled={isValidating}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isValidating ? "Validating..." : "Validate API Key"}
            </button>
          </form>

          {/* Validation Result */}
          {validationResult && (
            <div className="mt-8">
              <div
                className={`rounded-lg border-2 p-6 ${
                  validationResult.valid
                    ? "border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-950/20"
                    : "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20"
                }`}
              >
                <div className="flex items-start gap-4">
                  {validationResult.valid ? (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                      <svg
                        className="h-6 w-6 text-green-600 dark:text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                      <svg
                        className="h-6 w-6 text-red-600 dark:text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  )}

                  <div className="flex-1">
                    <h3
                      className={`text-lg font-bold ${
                        validationResult.valid
                          ? "text-green-900 dark:text-green-100"
                          : "text-red-900 dark:text-red-100"
                      }`}
                    >
                      {validationResult.valid ? "Valid API Key" : "Invalid API Key"}
                    </h3>
                    <p
                      className={`mt-1 text-sm ${
                        validationResult.valid
                          ? "text-green-700 dark:text-green-300"
                          : "text-red-700 dark:text-red-300"
                      }`}
                    >
                      {validationResult.message}
                    </p>

                    {validationResult.valid && validationResult.keyInfo && (
                      <div className="mt-4 space-y-2 rounded-lg bg-white p-4 dark:bg-zinc-800">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-600 dark:text-gray-400">
                            Name:
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {validationResult.keyInfo.name}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-600 dark:text-gray-400">
                            Type:
                          </span>
                          <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-zinc-700 dark:text-gray-300">
                            {validationResult.keyInfo.type}
                          </span>
                        </div>
                        {validationResult.keyInfo.monthlyLimit && (
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-gray-600 dark:text-gray-400">
                              Monthly Limit:
                            </span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {validationResult.keyInfo.monthlyLimit.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Toast Notifications */}
        <ToastContainer toasts={toasts} onClose={closeToast} />
      </div>
    </div>
  );
}
