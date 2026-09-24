"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import ExerciseCard from "@/app/components/exercises/ExerciseCard";
import { ExerciseGridSkeleton } from "@/app/components/ui/LoadingStates";
import { getExercises, type Exercise } from "@/lib/fitlog";

const sortOptions = {
  duration: (a: Exercise, b: Exercise) => b.duration - a.duration,
  calories: (a: Exercise, b: Exercise) => b.caloriesBurned - a.caloriesBurned,
  rating: (a: Exercise, b: Exercise) => b.rating - a.rating,
} as const;

export default function HomePage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [sortBy, setSortBy] = useState<keyof typeof sortOptions>("duration");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const data = await getExercises();
        setExercises(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  const displayedExercises = useMemo(() => {
    return [...exercises]
      .filter((exercise) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        return (
          exercise.name.toLowerCase().includes(q) ||
          exercise.equipment.toLowerCase().includes(q) ||
          exercise.muscleGroups.some((group) => group.toLowerCase().includes(q))
        );
      })
      .sort(sortOptions[sortBy]);
  }, [exercises, sortBy, searchQuery]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      {/* 2. Hero / Banner (Top of the Home page) */}
      <section className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-[#141822] via-[#11141b] to-[#0d0f14] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] sm:p-10 lg:p-12">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#ccff00]/5 blur-3xl" />

        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* Hero Left Column */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 px-3.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ccff00] animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#ccff00]">
                WORKOUT LIBRARY
              </span>
            </div>

            <h1 className="font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.05]">
              TRAIN WITH INTENT. <br />
              LOG EVERY SET.
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <div className="pt-2">
              <a
                href="#library"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#ccff00] px-7 py-3.5 text-xs font-black uppercase tracking-[0.16em] text-[#0b0c10] shadow-[0_4px_20px_rgba(204,255,0,0.25)] transition hover:bg-[#b8e600] active:scale-95"
              >
                <span>BROWSE WORKOUTS</span>
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Hero Right Column (Banner Illustration) */}
          <div className="flex items-center justify-center lg:col-span-5">
            <div className="relative flex h-[280px] w-full items-center justify-center sm:h-[340px] lg:h-[380px]">
              <Image
                src="/banner.png"
                alt="Fitness Athlete Training"
                width={420}
                height={420}
                className="h-full w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Library Section */}
      <section id="library" className="mt-14 scroll-mt-24 sm:mt-16">
        {/* Section Header with Heading, Subtitle & Sort Dropdown */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-black uppercase tracking-wide text-white sm:text-4xl">
              THE LIBRARY
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Filters & Sorting */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search lifts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 rounded-full border border-white/10 bg-[#141822] px-3.5 py-2 pl-9 text-xs text-white placeholder-slate-500 outline-none transition focus:border-[#ccff00]/60 sm:w-52"
              />
              <svg
                className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <label className="flex items-center gap-2 rounded-full border border-white/10 bg-[#141822] px-3.5 py-1.5 text-xs text-slate-300">
              <span className="font-medium text-slate-400">Sort By</span>
              <div className="relative flex items-center">
                <select
                  aria-label="Sort workouts"
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value as keyof typeof sortOptions)
                  }
                  className="cursor-pointer appearance-none rounded-full bg-transparent pr-5 text-xs font-bold text-white outline-none"
                >
                  <option value="duration" className="bg-[#141822] text-white">
                    Duration
                  </option>
                  <option value="calories" className="bg-[#141822] text-white">
                    Calories
                  </option>
                  <option value="rating" className="bg-[#141822] text-white">
                    Rating
                  </option>
                </select>
                {/* Chevron icon */}
                <svg
                  className="pointer-events-none absolute right-0 h-3.5 w-3.5 text-[#ccff00]"
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
              </div>
            </label>
          </div>
        </div>

        {/* Workouts Grid or Loading/Empty state */}
        {loading ? (
          <ExerciseGridSkeleton />
        ) : displayedExercises.length === 0 ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-[#141822] p-8 text-center">
            <p className="text-sm font-bold text-slate-300">
              No workouts found matching &quot;{searchQuery}&quot;
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black uppercase text-black"
            >
              Clear search
            </button>
          </div>
        ) : (
          /* 3x4 Grid on large screens (12 items) */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedExercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
