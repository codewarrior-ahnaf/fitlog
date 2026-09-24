"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { readFitlogState } from "@/lib/fitlog-storage";

export default function Navbar() {
  const pathname = usePathname();
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateCounters = () => {
      const state = readFitlogState();
      setPlanCount(state.plan.length);
      setSavedCount(state.saved.length);
    };

    updateCounters();
    window.addEventListener("fitlog-state-change", updateCounters);
    window.addEventListener("storage", updateCounters);

    return () => {
      window.removeEventListener("fitlog-state-change", updateCounters);
      window.removeEventListener("storage", updateCounters);
    };
  }, []);

  const isWorkoutActive = pathname === "/" || pathname.startsWith("/exercises") || pathname.startsWith("/workout");
  const isPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0c0d10]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2.5 transition active:scale-95"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ccff00]/10 p-1 transition group-hover:bg-[#ccff00]/20">
              <Image
                src="/logo.png"
                alt="FitLog Logo"
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
                priority
              />
            </div>
            <span className="font-display text-xl font-black uppercase tracking-wider text-white">
              FITLOG
            </span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className={`rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
              isWorkoutActive
                ? "border border-[#ccff00]/80 bg-[#ccff00]/15 text-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.15)]"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
              isPlanActive
                ? "border border-[#ccff00]/80 bg-[#ccff00]/15 text-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.15)]"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Plan and Saved Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Plan badge (filled pill with accent background #ccff00) */}
          <Link
            href=""
            className="flex items-center gap-1.5 rounded-full bg-[#ccff00] px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-[#0b0c10] shadow-[0_2px_10px_rgba(204,255,0,0.25)] transition hover:bg-[#b8e600] active:scale-95"
            title="View Today's Plan"
          >
            <span>Plan</span>
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0b0c10]/20 px-1 text-[11px] font-black text-[#0b0c10]">
              {planCount}
            </span>
          </Link>

          {/* Saved badge (pill with outline/border only) */}
          <Link
            href=""
            className="flex items-center gap-1.5 rounded-full border border-white/25 bg-transparent px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white transition hover:border-white/50 hover:bg-white/5 active:scale-95"
            title="View Saved Workouts"
          >
            <span>Saved</span>
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full border border-white/20 bg-white/10 px-1 text-[11px] font-bold text-white">
              {savedCount}
            </span>
          </Link>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#161a22] text-slate-300 md:hidden hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#0e1117] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                isWorkoutActive
                  ? "border border-[#ccff00]/80 bg-[#ccff00]/15 text-[#ccff00]"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              Workout
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                isPlanActive
                  ? "border border-[#ccff00]/80 bg-[#ccff00]/15 text-[#ccff00]"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              My Plan
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
