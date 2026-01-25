import { useState } from "react";
import { ApiKey } from "../page";

interface EditApiKeyFormProps {
  apiKey: ApiKey;
  onSubmit: (id: string, name: string) => void;
  onCancel: () => void;
}

export function EditApiKeyForm({ apiKey, onSubmit, onCancel }: EditApiKeyFormProps) {
  const [name, setName] = useState(apiKey.name);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(apiKey.id, name.trim());
      setName("");
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

      <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Edit API Key
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="edit-name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Key Name
          </label>
          <input
            type="text"
            id="edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Production API Key"
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-700"
            required
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
