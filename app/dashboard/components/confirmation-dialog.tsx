"use client";

import { Modal } from "./modal";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  variant = "danger",
}: ConfirmationDialogProps) {
  function handleConfirm() {
    onConfirm();
    onClose();
  }

  const getButtonStyles = () => {
    switch (variant) {
      case "danger":
        return {
          cancel: "bg-gray-600 hover:bg-gray-700 text-white",
          confirm: "bg-red-500 hover:bg-red-600 text-white",
        };
      case "warning":
        return {
          cancel: "bg-gray-600 hover:bg-gray-700 text-white",
          confirm: "bg-yellow-500 hover:bg-yellow-600 text-white",
        };
      case "info":
        return {
          cancel: "bg-gray-600 hover:bg-gray-700 text-white",
          confirm: "bg-blue-500 hover:bg-blue-600 text-white",
        };
    }
  };

  const buttonStyles = getButtonStyles();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="rounded-2xl border border-gray-700/50 bg-gradient-to-b from-zinc-800 to-zinc-900 p-10 shadow-2xl">
        {/* Icon */}
        {variant === "danger" && (
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-red-500/20 p-4">
              <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-4 text-center">
          <h3 className="text-2xl font-bold text-white">
            {title}
          </h3>
        </div>

        {/* Message */}
        <div className="mb-10 text-center">
          <p className="text-base leading-relaxed text-gray-300">
            {message}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className={`min-w-[120px] rounded-full px-8 py-3 text-base font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 ${buttonStyles.cancel}`}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={`min-w-[120px] rounded-full px-8 py-3 text-base font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 ${buttonStyles.confirm}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
