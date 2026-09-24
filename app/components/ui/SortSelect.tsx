"use client";

import { useEffect, useRef, useState } from "react";

type SortOption = {
  value: string;
  label: string;
};

type SortSelectProps = {
  value: string;
  options: SortOption[];
  onChange: (value: string) => void;
  ariaLabel: string;
};

export default function SortSelect({
  value,
  options,
  onChange,
  ariaLabel,
}: SortSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        onClick={() => setOpen((current) => !current)}
        className="flex min-w-28 items-center justify-between gap-3 rounded-full bg-transparent text-xs font-bold text-white outline-none transition hover:text-[#ccff00] focus-visible:ring-2 focus-visible:ring-[#ccff00]/60"
      >
        <span>{selectedOption?.label}</span>
        <svg
          className={`h-3.5 w-3.5 text-[#ccff00] transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className="absolute right-0 top-[calc(100%+8px)] z-40 min-w-36 overflow-hidden rounded-2xl border border-white/10 bg-[#171b24] p-1.5 shadow-[0_16px_35px_rgba(0,0,0,0.55)]"
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-bold transition ${
                  isSelected
                    ? "bg-[#ccff00] text-[#0b0c10]"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <span aria-hidden="true">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
