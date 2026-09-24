"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { showToast } from "@/app/components/ui/ToastProvider";
import type { Exercise } from "@/lib/fitlog";
import {
  addExerciseToPlan,
  addExerciseToSaved,
  readFitlogState,
} from "@/lib/fitlog-storage";

export default function ExerciseDetail({ exercise }: { exercise: Exercise }) {
  const [isInPlan, setIsInPlan] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [planCount, setPlanCount] = useState(0);

  useEffect(() => {
    const syncState = () => {
      const state = readFitlogState();
      setIsInPlan(state.plan.some((item) => item.id === exercise.id));
      setIsSaved(state.saved.some((item) => item.id === exercise.id));
      setPlanCount(state.plan.length);
    };

    syncState();
    window.addEventListener("fitlog-state-change", syncState);
    window.addEventListener("storage", syncState);

    return () => {
      window.removeEventListener("fitlog-state-change", syncState);
      window.removeEventListener("storage", syncState);
    };
  }, [exercise.id]);

  const handleAddToPlan = () => {
    if (isInPlan) {
      showToast("Already in today's plan");
      return;
    }

    if (planCount >= 5) {
      showToast("Today's plan is full (maximum 5 lifts).");
      return;
    }

    const result = addExerciseToPlan(exercise);
    if (result.ok) {
      showToast("Added to today's plan");
    } else if (result.reason === "limit_reached") {
      showToast("Today's plan is full (maximum 5 lifts).");
    }
  };

  const handleSaveForLater = () => {
    if (isSaved) {
      showToast("Already saved for later");
      return;
    }

    const result = addExerciseToSaved(exercise);
    if (result.ok) {
      showToast("Saved for later");
    }
  };

  const isPlanFull = planCount >= 5 && !isInPlan;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Back to Library Navigation */}
      <div className="mb-6">
        <Link
          href="/#library"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 transition hover:text-[#ccff00]"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Back to library</span>
        </Link>
      </div>

      {/* Two-Column Layout (Matching Figma Details Page) */}
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Side: Visual / Media */}
        <div className="lg:col-span-6">
          <div className="relative aspect-square w-full overflow-hidden rounded-[26px] border border-white/8 bg-[#141822] shadow-[0_20px_45px_rgba(0,0,0,0.5)]">
            <Image
              src={exercise.image}
              alt={exercise.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Right Side: Details, Specs, Instructions, Actions */}
        <div className="flex flex-col justify-between space-y-6 lg:col-span-6">
          <div className="space-y-5">
            {/* Title & Description */}
            <div>
              <h1 className="font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
                {exercise.name}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                {exercise.description}
              </p>
            </div>

            {/* Category Tags in filled neon lime pills */}
            <div className="flex flex-wrap items-center gap-2">
              {exercise.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#0b0c10]"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Key Specs Table / Panel */}
            <div className="rounded-[20px] border border-white/8 bg-[#141822] p-5 shadow-inner">
              <div className="divide-y divide-white/6 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5">
                  <span className="font-bold uppercase tracking-wider text-slate-400">
                    EQUIPMENT
                  </span>
                  <span className="text-right font-medium text-white">
                    {exercise.equipment}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5">
                  <span className="font-bold uppercase tracking-wider text-slate-400">
                    DIFFICULTY
                  </span>
                  <span className="text-right font-medium text-white">
                    {exercise.difficulty}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5">
                  <span className="font-bold uppercase tracking-wider text-slate-400">
                    SETS
                  </span>
                  <span className="font-medium text-white">
                    {exercise.sets}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5">
                  <span className="font-bold uppercase tracking-wider text-slate-400">
                    REPS
                  </span>
                  <span className="font-medium text-white">
                    {exercise.reps}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5">
                  <span className="font-bold uppercase tracking-wider text-slate-400">
                    DURATION
                  </span>
                  <span className="text-right font-medium text-white">
                    {exercise.duration} min
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5">
                  <span className="font-bold uppercase tracking-wider text-slate-400">
                    CALORIES
                  </span>
                  <span className="text-right font-medium text-white">
                    {exercise.caloriesBurned} kcal
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5">
                  <span className="font-bold uppercase tracking-wider text-slate-400">
                    RATING
                  </span>
                  <span className="flex items-center gap-1 font-medium text-white">
                    <svg
                      className="h-3.5 w-3.5 text-yellow-400"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    {exercise.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Instructions Section */}
            <div className="space-y-3">
              <h2 className="font-display text-base font-black uppercase tracking-wider text-white">
                INSTRUCTIONS
              </h2>
              <ol className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                {exercise.instructions.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ccff00]/15 text-[10px] font-black text-[#ccff00]">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Call-To-Action Buttons */}
          <div className="flex flex-col items-stretch gap-3 pt-3 sm:flex-row sm:flex-wrap sm:items-center">
            {/* Primary button: Add to today's plan */}
            <button
              onClick={handleAddToPlan}
              disabled={isPlanFull}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs font-black uppercase tracking-wider transition active:scale-95 sm:w-auto ${
                isInPlan
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : isPlanFull
                    ? "cursor-not-allowed bg-slate-700 text-slate-400 opacity-60"
                    : "bg-[#ccff00] text-[#0b0c10] shadow-[0_4px_20px_rgba(204,255,0,0.25)] hover:bg-[#b8e600]"
              }`}
            >
              {isInPlan ? (
                <>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>In Today&apos;s Plan</span>
                </>
              ) : isPlanFull ? (
                <>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>Plan Full (Max 5)</span>
                </>
              ) : (
                <>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Add to today&apos;s plan</span>
                </>
              )}
            </button>

            {/* Secondary button: Save for later */}
            <button
              onClick={handleSaveForLater}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition active:scale-95 sm:w-auto ${
                isSaved
                  ? "border-[#ccff00]/60 bg-[#ccff00]/10 text-[#ccff00]"
                  : "border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
              }`}
            >
              <svg
                className="h-4 w-4"
                fill={isSaved ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <span>{isSaved ? "Saved" : "Save for later"}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
