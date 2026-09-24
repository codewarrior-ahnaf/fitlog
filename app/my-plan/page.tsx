"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { showToast } from "@/app/components/ui/ToastProvider";
import type { Exercise } from "@/lib/fitlog";
import {
  addExerciseToPlan,
  markExerciseDone,
  readFitlogState,
  removeExerciseFromPlan,
  removeExerciseFromSaved,
  totalCaloriesFromExercises,
  totalMinutesFromExercises,
} from "@/lib/fitlog-storage";

const sortOptions = {
  duration: (a: Exercise, b: Exercise) => b.duration - a.duration,
  calories: (a: Exercise, b: Exercise) => b.caloriesBurned - a.caloriesBurned,
  rating: (a: Exercise, b: Exercise) => b.rating - a.rating,
} as const;

export default function MyPlanPage() {
  const [tab, setTab] = useState<"plan" | "saved">("plan");
  const [state, setState] = useState(() => readFitlogState());
  const [isLoaded, setIsLoaded] = useState(false);
  const [sortBy, setSortBy] = useState<keyof typeof sortOptions>("duration");
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    // Read state on client mount to avoid hydration mismatch
    const syncState = () => setState(readFitlogState());
    syncState();
    setIsLoaded(true);

    window.addEventListener("fitlog-state-change", syncState);
    window.addEventListener("storage", syncState);

    return () => {
      window.removeEventListener("fitlog-state-change", syncState);
      window.removeEventListener("storage", syncState);
    };
  }, []);

  const targetExercises = tab === "plan" ? state.plan : state.saved;

  // Real-time metric calculations
  const summary = useMemo(() => {
    return {
      exercises: targetExercises.length,
      minutes: totalMinutesFromExercises(targetExercises),
      calories: totalCaloriesFromExercises(targetExercises),
    };
  }, [targetExercises]);

  // Sorted and filtered list
  const displayedExercises = useMemo(() => {
    return [...targetExercises]
      .filter((exercise) => {
        if (!searchFilter.trim()) return true;
        const q = searchFilter.toLowerCase().trim();
        return (
          exercise.name.toLowerCase().includes(q) ||
          exercise.equipment.toLowerCase().includes(q) ||
          exercise.muscleGroups.some((group) => group.toLowerCase().includes(q))
        );
      })
      .sort(sortOptions[sortBy]);
  }, [targetExercises, sortBy, searchFilter]);

  const handleRemove = (exerciseId: number) => {
    if (tab === "plan") {
      removeExerciseFromPlan(exerciseId);
      showToast("Removed from today's plan");
    } else {
      removeExerciseFromSaved(exerciseId);
      showToast("Removed from saved");
    }
  };

  const handleToggleDone = (exerciseId: number) => {
    const { isDone } = markExerciseDone(exerciseId);
    if (isDone) {
      showToast("Marked as done");
    } else {
      showToast("Marked as not completed");
    }
  };

  const handleMoveToPlan = (exercise: Exercise) => {
    if (state.plan.length >= 5) {
      showToast("Today's plan is full (maximum 5 lifts).");
      return;
    }

    const result = addExerciseToPlan(exercise);
    if (result.ok) {
      removeExerciseFromSaved(exercise.id);
      showToast("Moved to today's plan");
    } else if (result.reason === "already_in_plan") {
      removeExerciseFromSaved(exercise.id);
      showToast("Already in today's plan");
    }
  };

  if (!isLoaded) {
    return (
      <main className="mx-auto flex min-h-[60vh] w-full max-w-7xl items-center justify-center px-4 py-16 text-white sm:px-6">
        <div className="flex items-center gap-3 text-[#ccff00]">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#ccff00] border-t-transparent" />
          <span className="font-display text-sm uppercase tracking-[0.2em]">
            Loading workouts…
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      {/* 6. Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
          MY PLAN
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row (Unified 3-Column Card Matching Figma) */}
      <section className="mb-8 overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#141822] p-6 shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
        <div className="grid grid-cols-1 divide-y divide-white/[0.06] text-center sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:text-left">
          {/* Exercises metric - large lime green number */}
          <div className="pb-4 sm:pb-0 sm:pr-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Exercises
            </span>
            <div className="mt-2 font-display text-4xl font-black text-[#ccff00] sm:text-5xl">
              {summary.exercises}
            </div>
          </div>

          {/* Minutes metric - large white number */}
          <div className="py-4 sm:py-0 sm:px-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Minutes
            </span>
            <div className="mt-2 font-display text-4xl font-black text-white sm:text-5xl">
              {summary.minutes}
            </div>
          </div>

          {/* Calories metric - large white number */}
          <div className="pt-4 sm:pt-0 sm:pl-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Calories
            </span>
            <div className="mt-2 font-display text-4xl font-black text-white sm:text-5xl">
              {summary.calories}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Switcher and Sort Dropdown Row */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Tab Switcher (Today's Plan / Saved) */}
        <div className="inline-flex rounded-full border border-white/10 bg-[#141822] p-1">
          <button
            onClick={() => setTab("plan")}
            className={`rounded-full px-5 py-2 text-xs font-black uppercase tracking-wider transition ${
              tab === "plan"
                ? "bg-[#ccff00] text-[#0b0c10] shadow-[0_2px_10px_rgba(204,255,0,0.2)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
            <span className="ml-2 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">
              {state.plan.length}
            </span>
          </button>
          <button
            onClick={() => setTab("saved")}
            className={`rounded-full px-5 py-2 text-xs font-black uppercase tracking-wider transition ${
              tab === "saved"
                ? "bg-[#ccff00] text-[#0b0c10] shadow-[0_2px_10px_rgba(204,255,0,0.2)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Saved
            <span className="ml-2 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">
              {state.saved.length}
            </span>
          </button>
        </div>

        {/* Right: Filters & Sort Dropdown */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Optional Search inside Plan/Saved */}
          {targetExercises.length > 0 && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-36 rounded-full border border-white/10 bg-[#141822] px-3.5 py-1.5 pl-8 text-xs text-white placeholder-slate-500 outline-none transition focus:border-[#ccff00]/60 sm:w-44"
              />
              <svg
                className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400"
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
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter("")}
                  className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* C1. Sort Dropdown with chevron */}
          <label className="flex items-center gap-2 rounded-full border border-white/10 bg-[#141822] px-3.5 py-1.5 text-xs text-slate-300">
            <span className="font-medium text-slate-400">Sort By</span>
            <div className="relative flex items-center">
              <select
                aria-label="Sort plan items"
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

      {/* Empty State */}
      {displayedExercises.length === 0 ? (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[26px] border border-dashed border-white/15 bg-[#141822]/60 p-8 text-center sm:p-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ccff00]/10 text-[#ccff00]">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h2 className="mt-4 font-display text-2xl font-black uppercase tracking-wide text-white sm:text-3xl">
            NOTHING HERE YET
          </h2>
          <p className="mt-2 max-w-md text-xs sm:text-sm text-slate-400">
            {searchFilter
              ? `No workouts found matching "${searchFilter}".`
              : "Browse the library and add a lift to get today moving."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {searchFilter ? (
              <button
                onClick={() => setSearchFilter("")}
                className="rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase tracking-wider text-[#0b0c10]"
              >
                Clear Search
              </button>
            ) : (
              <Link
                href="/#library"
                className="inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-7 py-3.5 text-xs font-black uppercase tracking-wider text-[#0b0c10] shadow-[0_4px_20px_rgba(204,255,0,0.25)] transition hover:bg-[#b8e600] active:scale-95"
              >
                <span>Go to workouts</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      ) : (
        /* Workout Cards List (Matching Figma Horizontal Rows) */
        <div className="space-y-4">
          {displayedExercises.map((exercise) => {
            const isDone = state.done.includes(exercise.id);

            return (
              <article
                key={exercise.id}
                className={`flex flex-col gap-4 rounded-[22px] border border-white/[0.08] bg-[#141822] p-4 shadow-md transition duration-200 hover:border-white/20 sm:p-5 md:flex-row md:items-center ${
                  isDone ? "border-emerald-500/30 bg-[#141c1f]" : ""
                }`}
              >
                {/* Thumbnail */}
                <div className="relative h-28 w-full overflow-hidden rounded-[16px] bg-[#0d0f14] md:w-44 md:shrink-0">
                  <Image
                    src={exercise.image}
                    alt={exercise.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 180px"
                  />
                  {isDone && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[1px]">
                      <span className="flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-black uppercase text-black">
                        ✓ Completed
                      </span>
                    </div>
                  )}
                </div>

                {/* Details Middle Section */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={`font-display text-lg font-black uppercase tracking-wide sm:text-xl ${
                        isDone ? "text-slate-400 line-through" : "text-white"
                      }`}
                    >
                      {exercise.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 font-medium">
                    {exercise.equipment}
                  </p>

                  {/* Stats Row with icons */}
                  <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5 font-medium">
                      <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{exercise.duration} min</span>
                    </div>

                    <div className="flex items-center gap-1.5 font-medium">
                      <svg className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 23c4.97 0 9-3.8 9-8.5C21 8.5 16 2 12 1 8 2 3 8.5 3 14.5 3 19.2 7.03 23 12 23zm0-18.42c2.47 2.15 6 6.94 6 9.92 0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2.98 3.53-7.77 6-9.92z" />
                      </svg>
                      <span>{exercise.caloriesBurned} kcal</span>
                    </div>

                    <div className="flex items-center gap-1.5 font-medium">
                      <svg className="h-3.5 w-3.5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span>{exercise.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
                  {/* View Details Button */}
                  <Link
                    href={`/exercises/${exercise.id}`}
                    className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:border-white/40 hover:bg-white/10 active:scale-95"
                  >
                    View Details
                  </Link>

                  {/* Tab specific action */}
                  {tab === "plan" ? (
                    /* C3. Mark as Done button (with check icon) */
                    <button
                      onClick={() => handleToggleDone(exercise.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider transition active:scale-95 ${
                        isDone
                          ? "border border-emerald-500/40 bg-emerald-500/20 text-emerald-400"
                          : "bg-[#ccff00] text-[#0b0c10] shadow-[0_2px_10px_rgba(204,255,0,0.2)] hover:bg-[#b8e600]"
                      }`}
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{isDone ? "Done ✓" : "Mark as Done"}</span>
                    </button>
                  ) : (
                    /* In Saved tab: Move to Plan */
                    <button
                      onClick={() => handleMoveToPlan(exercise)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black uppercase tracking-wider text-[#0b0c10] shadow-[0_2px_10px_rgba(204,255,0,0.2)] transition hover:bg-[#b8e600] active:scale-95"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Move to Plan</span>
                    </button>
                  )}

                  {/* C3. Remove (X) button */}
                  <button
                    onClick={() => handleRemove(exercise.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-400 active:scale-90"
                    title={tab === "plan" ? "Remove from today's plan" : "Remove from saved"}
                    aria-label="Remove workout"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
