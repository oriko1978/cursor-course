"use client";

import { useState, useEffect } from "react";
import { ApiKeyList } from "./components/api-key-list";
import { ApiKeyListMobile } from "./components/api-key-list-mobile";
import { CreateApiKeyForm } from "./components/create-api-key-form";
import { EditApiKeyForm } from "./components/edit-api-key-form";
import { Modal } from "./components/modal";
import { ConfirmationDialog } from "./components/confirmation-dialog";
import { ToastContainer } from "./components/toast";

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  type: "dev" | "production";
  monthlyLimit?: number;
  createdAt: string;
  lastUsed?: string;
  isActive: boolean;
}

export default function DashboardPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  const [deletingKeyId, setDeletingKeyId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; variant?: "success" | "error" }>>([]);

  async function fetchApiKeys() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/keys");
      if (response.ok) {
        const data = await response.json();
        setApiKeys(data.keys);
      }
    } catch (error) {
      console.error("Failed to fetch API keys:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchApiKeys();
  }, []);

  async function handleCreateKey(data: {
    name: string;
    type: "dev" | "production";
    monthlyLimit?: number;
  }) {
    try {
      const response = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchApiKeys();
        setShowCreateForm(false);
      }
    } catch (error) {
      console.error("Failed to create API key:", error);
    }
  }

  function handleDeleteClick(id: string) {
    setDeletingKeyId(id);
  }

  async function confirmDelete() {
    if (!deletingKeyId) return;

    try {
      const response = await fetch(`/api/keys/${deletingKeyId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchApiKeys();
        setDeletingKeyId(null);
      }
    } catch (error) {
      console.error("Failed to delete API key:", error);
    }
  }

  async function handleToggleKey(id: string, isActive: boolean) {
    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      });

      if (response.ok) {
        await fetchApiKeys();
      }
    } catch (error) {
      console.error("Failed to update API key:", error);
    }
  }

  async function handleEditKey(id: string, name: string) {
    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        await fetchApiKeys();
        setEditingKey(null);
      }
    } catch (error) {
      console.error("Failed to update API key:", error);
    }
  }

  function handleEditClick(apiKey: ApiKey) {
    setEditingKey(apiKey);
    setShowCreateForm(false);
  }

  function showToast(message: string, variant: "success" | "error" = "success") {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, variant }]);
  }

  function closeToast(id: string) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Pages / Overview
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Overview
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 dark:bg-green-900/20">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-400">
                  Operational
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Card */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900 sm:mb-8 sm:p-8">
          <div className="mb-4 flex items-center justify-between sm:mb-6">
            <div>
              <div className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Current Plan
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                Developer
              </h2>
            </div>
          </div>

          <div className="mb-2 flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              API Usage
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Monthly plan
          </div>
          <div className="mt-2 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
            {apiKeys.length} / Unlimited Keys
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gradient-to-r from-gray-200 via-blue-100 to-purple-100 dark:from-zinc-800 dark:via-blue-950 dark:to-purple-950">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: "15%" }}
            />
          </div>
        </div>

        {/* Create/Edit Modals */}
        <Modal isOpen={showCreateForm} onClose={() => setShowCreateForm(false)}>
          <CreateApiKeyForm
            onSubmit={handleCreateKey}
            onCancel={() => setShowCreateForm(false)}
          />
        </Modal>

        <Modal isOpen={!!editingKey} onClose={() => setEditingKey(null)}>
          {editingKey && (
            <EditApiKeyForm
              apiKey={editingKey}
              onSubmit={handleEditKey}
              onCancel={() => setEditingKey(null)}
            />
          )}
        </Modal>

        {/* Delete Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={!!deletingKeyId}
          onClose={() => setDeletingKeyId(null)}
          onConfirm={confirmDelete}
          title="Delete API Key"
          message="Are you sure you want to delete this API key? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
        />

        {/* Toast Notifications */}
        <ToastContainer toasts={toasts} onClose={closeToast} />

        {/* API Keys Section */}
        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-900 sm:p-8">
          <div className="mb-4 flex items-center justify-between sm:mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
              API Keys
            </h3>
            <button
              onClick={() => {
                setShowCreateForm(!showCreateForm);
                setEditingKey(null);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xl font-semibold text-white transition-colors hover:bg-blue-700 sm:h-8 sm:w-8 sm:bg-gray-100 sm:text-gray-600 sm:hover:bg-gray-200 dark:sm:bg-zinc-800 dark:sm:text-gray-400 dark:sm:hover:bg-zinc-700"
              title={showCreateForm ? "Cancel" : "Add API Key"}
            >
              {showCreateForm ? "×" : "+"}
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-600 dark:text-gray-400">Loading...</div>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block">
                <ApiKeyList
                  apiKeys={apiKeys}
                  onDelete={handleDeleteClick}
                  onToggle={handleToggleKey}
                  onEdit={handleEditClick}
                  onCopy={() => showToast("Copied API Key to clipboard")}
                />
              </div>
              
              {/* Mobile Card View */}
              <div className="md:hidden">
                <ApiKeyListMobile
                  apiKeys={apiKeys}
                  onDelete={handleDeleteClick}
                  onToggle={handleToggleKey}
                  onEdit={handleEditClick}
                  onCopy={() => showToast("Copied API Key to clipboard")}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
