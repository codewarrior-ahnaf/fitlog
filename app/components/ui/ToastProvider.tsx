"use client";

import { useEffect, useState } from "react";

type Toast = {
  id: number;
  message: string;
};

let toastId = 0;

export function showToast(message: string) {
  const event = new CustomEvent("fitlog-toast", { detail: { message } });
  window.dispatchEvent(event);
}

export default function ToastProvider() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const onToast = (event: Event) => {
      const customEvent = event as CustomEvent<{ message: string }>;
      const message = customEvent.detail?.message;

      if (!message) {
        return;
      }

      const id = ++toastId;
      setToasts((current) => [...current, { id, message }]);

      setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      }, 2200);
    };

    window.addEventListener("fitlog-toast", onToast);
    return () => window.removeEventListener("fitlog-toast", onToast);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto rounded-full border border-lime-300/60 bg-[#10151a] px-4 py-2 text-sm font-medium text-lime-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
