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
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      const state = readFitlogState();
      setPlanCount(state.plan.length);
      setSavedCount(state.saved.length);
    };

    updateCounts();
    window.addEventListener("fitlog-state-change", updateCounts);
    return () =>
      window.removeEventListener("fitlog-state-change", updateCounts);
  }, []);

  const handleAddToPlan = () => {
    if (planCount >= 5) {
      showToast("Today's plan is full. Remove one and try again.");
      return;
    }

    addExerciseToPlan(exercise);
    showToast("Added to today's plan");
  };

  const handleSaveForLater = () => {
    addExerciseToSaved(exercise);
    showToast("Saved for later");
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 text-white">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-sm text-lime-300 hover:text-lime-200">
          ← Back to library
        </Link>
      </div>

      <section className="overflow-hidden rounded-[28px] border border-white/8 bg-[#10141b] shadow-[0_18px_45px_rgba(0,0,0,0.42)]">
        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[350px]">
            <Image
              src={exercise.image}
              alt={exercise.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="space-y-6 p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              {exercise.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full border border-lime-400/30 bg-lime-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-lime-200"
                >
                  {group}
                </span>
              ))}
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                Workout
              </p>
              <h1 className="text-3xl font-black md:text-4xl uppercase">
                {exercise.name}
              </h1>
            </div>

            <p className="text-sm leading-7 text-slate-300">
              {exercise.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
              <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
                <p className="text-slate-400">Equipment</p>
                <p className="mt-2 font-semibold text-white">
                  {exercise.equipment}
                </p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
                <p className="text-slate-400">Difficulty</p>
                <p className="mt-2 font-semibold text-white">
                  {exercise.difficulty}
                </p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
                <p className="text-slate-400">Sets</p>
                <p className="mt-2 font-semibold text-white">{exercise.sets}</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
                <p className="text-slate-400">Reps</p>
                <p className="mt-2 font-semibold text-white">{exercise.reps}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleAddToPlan}
                disabled={planCount >= 5}
                className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#0b0d10] transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>＋</span>
                Add to today&apos;s plan
              </button>

              <button
                onClick={handleSaveForLater}
                className="inline-flex items-center gap-2 rounded-full border border-lime-300/60 bg-transparent px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-lime-300 hover:bg-lime-300/10"
              >
                <span>☆</span>
                Save for later
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[24px] border border-white/8 bg-[#10141b] p-6">
          <h2 className="mb-4 text-xl font-bold text-white">Key Specs</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex justify-between border-b border-white/8 pb-2">
              <span>Equipment</span>
              <span className="font-medium text-white">
                {exercise.equipment}
              </span>
            </li>
            <li className="flex justify-between border-b border-white/8 pb-2">
              <span>Difficulty</span>
              <span className="font-medium text-white">
                {exercise.difficulty}
              </span>
            </li>
            <li className="flex justify-between border-b border-white/8 pb-2">
              <span>Sets</span>
              <span className="font-medium text-white">{exercise.sets}</span>
            </li>
            <li className="flex justify-between border-b border-white/8 pb-2">
              <span>Reps</span>
              <span className="font-medium text-white">{exercise.reps}</span>
            </li>
            <li className="flex justify-between border-b border-white/8 pb-2">
              <span>Duration</span>
              <span className="font-medium text-white">
                {exercise.duration} min
              </span>
            </li>
            <li className="flex justify-between border-b border-white/8 pb-2">
              <span>Calories</span>
              <span className="font-medium text-white">
                {exercise.caloriesBurned} kcal
              </span>
            </li>
            <li className="flex justify-between">
              <span>Rating</span>
              <span className="font-medium text-white">
                ★ {exercise.rating.toFixed(1)}
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-[24px] border border-white/8 bg-[#10141b] p-6">
          <h2 className="mb-4 text-xl font-bold text-white">Instructions</h2>
          <ol className="space-y-4">
            {exercise.instructions.map((step, index) => (
              <li
                key={step}
                className="flex gap-3 text-sm leading-7 text-slate-300"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-300 text-xs font-black text-[#0b0d10]">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
