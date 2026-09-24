"use client";

import { useEffect, useState } from "react";

type Toast = {
  id: number;
  message: string;
};

let toastId = 0;

export function showToast(message: string) {
  if (typeof window !== "undefined") {
    const event = new CustomEvent("fitlog-toast", { detail: { message } });
    window.dispatchEvent(event);
  }
}

export default function ToastProvider() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const onToast = (event: Event) => {
      const customEvent = event as CustomEvent<{ message: string }>;
      const message = customEvent.detail?.message;

      if (!message) return;

      const id = ++toastId;
      setToasts((current) => [...current, { id, message }]);

      setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      }, 2500);
    };

    window.addEventListener("fitlog-toast", onToast);
    return () => window.removeEventListener("fitlog-toast", onToast);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex max-w-sm flex-col gap-2.5">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-[#ccff00]/40 bg-[#12161f]/95 px-4 py-2.5 text-xs font-bold text-white shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-3"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-[10px] font-black text-[#0b0c10]">
            ✓
          </span>
          <span className="tracking-wide">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
