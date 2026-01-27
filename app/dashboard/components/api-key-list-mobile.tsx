import { useState } from "react";
import { ApiKey } from "../page";

interface ApiKeyListMobileProps {
  apiKeys: ApiKey[];
  onDelete: (id: string) => void;
  onToggle: (id: string, isActive: boolean) => void;
  onEdit: (apiKey: ApiKey) => void;
  onCopy: () => void;
}

export function ApiKeyListMobile({ apiKeys, onDelete, onToggle, onEdit, onCopy }: ApiKeyListMobileProps) {
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  function toggleKeyVisibility(id: string) {
    setVisibleKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  function maskKey(key: string, isVisible: boolean) {
    if (isVisible) return key;
    const prefix = key.substring(0, 8);
    return `${prefix}${"*".repeat(24)}`;
  }

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      onCopy();
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }

  if (apiKeys.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          No API keys found. Create your first API key to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {apiKeys.map((apiKey) => {
        const isVisible = visibleKeys.has(apiKey.id);
        const displayKey = maskKey(apiKey.key, isVisible);

        return (
          <div
            key={apiKey.id}
            className="rounded-lg border border-gray-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            {/* Header */}
            <div className="mb-3 flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {apiKey.name}
                </h4>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      apiKey.type === "production"
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                    }`}
                  >
                    {apiKey.type === "production" ? "Production" : "Development"}
                  </span>
                </div>
              </div>
              
              {/* Active Toggle */}
              <button
                onClick={() => onToggle(apiKey.id, !apiKey.isActive)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  apiKey.isActive ? "bg-blue-600" : "bg-gray-200 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    apiKey.isActive ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Usage */}
            {apiKey.monthlyLimit && (
              <div className="mb-3">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Monthly Limit: {apiKey.monthlyLimit.toLocaleString()}
                </div>
              </div>
            )}

            {/* API Key */}
            <div className="mb-3">
              <div className="flex items-center gap-2 rounded-md bg-gray-50 p-2 dark:bg-zinc-800">
                <code className="flex-1 overflow-x-auto text-xs text-gray-700 dark:text-gray-300">
                  {displayKey}
                </code>
                <button
                  onClick={() => toggleKeyVisibility(apiKey.id)}
                  className="rounded p-1 text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-zinc-700"
                  title={isVisible ? "Hide key" : "Show key"}
                >
                  {isVisible ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => copyToClipboard(apiKey.key)}
                  className="rounded p-1 text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-zinc-700"
                  title="Copy key"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(apiKey)}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(apiKey.id)}
                className="flex-1 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-900/50 dark:bg-zinc-800 dark:text-red-400 dark:hover:bg-red-950/20"
              >
                Delete
              </button>
            </div>

            {/* Created Date */}
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Created: {new Date(apiKey.createdAt).toLocaleDateString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
