"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  variant?: "success" | "error";
}

export function Toast({ message, isVisible, onClose, variant = "success" }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const isSuccess = variant === "success";
  const bgColor = isSuccess ? "bg-green-600" : "bg-red-600";
  const iconColor = isSuccess ? "text-green-600" : "text-red-600";

  return (
    <div className={`fixed left-1/2 top-4 z-50 flex -translate-x-1/2 transform items-center gap-3 rounded-lg ${bgColor} px-6 py-3 shadow-lg transition-all animate-in fade-in slide-in-from-top-2`}>
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
        {isSuccess ? (
          <svg
            className={`h-4 w-4 ${iconColor}`}
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
        ) : (
          <svg
            className={`h-4 w-4 ${iconColor}`}
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
        )}
      </div>
      <span className="text-sm font-medium text-white">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-white/80 hover:text-white"
        aria-label="Close"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; variant?: "success" | "error" }>;
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          variant={toast.variant}
          isVisible={true}
          onClose={() => onClose(toast.id)}
        />
      ))}
    </>
  );
}
