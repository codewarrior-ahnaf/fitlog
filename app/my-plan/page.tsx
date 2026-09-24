"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { showToast } from "@/app/components/ui/ToastProvider";
import type { Exercise } from "@/lib/fitlog";
import {
  markExerciseDone,
  readFitlogState,
  removeExerciseFromPlan,
  removeExerciseFromSaved,
  totalCaloriesFromExercises,
  totalMinutesFromExercises,
  writeFitlogState,
} from "@/lib/fitlog-storage";

const initialPageState = () => readFitlogState();

export default function MyPlanPage() {
  const [tab, setTab] = useState<"plan" | "saved">("plan");
  const [state, setState] = useState(initialPageState);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    const syncState = () => setState(readFitlogState());
    syncState();
    window.addEventListener("fitlog-state-change", syncState);
    return () => window.removeEventListener("fitlog-state-change", syncState);
  }, []);

  const currentExercises = tab === "plan" ? state.plan : state.saved;

  const summary = useMemo(() => {
    const target = tab === "plan" ? state.plan : state.saved;
    return {
      totalExercises: target.length,
      minutes: totalMinutesFromExercises(target),
      calories: totalCaloriesFromExercises(target),
    };
  }, [state, tab]);

  const removeItem = (exerciseId: number) => {
    if (tab === "plan") {
      removeExerciseFromPlan(exerciseId);
      showToast("Removed from today's plan");
    } else {
      removeExerciseFromSaved(exerciseId);
      showToast("Removed from saved");
    }
  };

  const markDone = (exerciseId: number) => {
    markExerciseDone(exerciseId);
    showToast("Marked as done");
  };

  if (!isReady) {
    return (
      <main className="mx-auto flex min-h-[60vh] w-full max-w-6xl items-center justify-center px-4 py-12 text-white">
        <div className="flex items-center gap-3 text-lime-300">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-lime-300 border-t-transparent" />
          <span className="text-sm uppercase tracking-[0.18em]">
            Loading workouts…
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-8 text-white md:px-6">
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
            My Plan
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase md:text-4xl">
            MY PLAN
          </h1>
        </div>
        <p className="text-sm text-slate-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-[22px] border border-white/8 bg-[#11161d] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Exercises
          </p>
          <p className="mt-3 text-3xl font-black text-white">
            {summary.totalExercises}
          </p>
        </div>
        <div className="rounded-[22px] border border-white/8 bg-[#11161d] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Minutes
          </p>
          <p className="mt-3 text-3xl font-black text-white">
            {summary.minutes}
          </p>
        </div>
        <div className="rounded-[22px] border border-white/8 bg-[#11161d] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Calories
          </p>
          <p className="mt-3 text-3xl font-black text-white">
            {summary.calories}
          </p>
        </div>
      </section>

      <div className="mb-8 flex gap-3">
        <button
          onClick={() => setTab("plan")}
          className={`rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] ${
            tab === "plan"
              ? "bg-lime-300 text-[#0b0d10]"
              : "border border-white/8 bg-[#11161d] text-slate-300"
          }`}
        >
          Today&apos;s Plan
        </button>
        <button
          onClick={() => setTab("saved")}
          className={`rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] ${
            tab === "saved"
              ? "bg-lime-300 text-[#0b0d10]"
              : "border border-white/8 bg-[#11161d] text-slate-300"
          }`}
        >
          Saved
        </button>
      </div>

      {!currentExercises.length ? (
        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[28px] border border-dashed border-white/12 bg-[#10151a] text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-lime-300">
            Nothing here yet
          </p>
          <h2 className="mt-3 text-2xl font-black uppercase text-white">
            Nothing Here Yet
          </h2>
          <p className="mt-3 max-w-md text-sm text-slate-400">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-lime-300 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#0b0d10]"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {currentExercises.map((exercise: Exercise) => (
            <article
              key={exercise.id}
              className="flex flex-col gap-4 rounded-[24px] border border-white/8 bg-[#11161d] p-4 md:flex-row md:items-center"
            >
              <div className="relative h-24 w-full overflow-hidden rounded-[18px] md:w-40">
                <Image
                  src={exercise.image}
                  alt={exercise.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 160px"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-black uppercase text-white">
                  {exercise.name}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {exercise.equipment}
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-300">
                  <span>⏱ {exercise.duration} min</span>
                  <span>🔥 {exercise.caloriesBurned} kcal</span>
                  <span>★ {exercise.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 md:justify-end">
                <Link
                  href={`/exercises/${exercise.id}`}
                  className="rounded-full border border-white/10 bg-transparent px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-white/5"
                >
                  View Details
                </Link>
                {tab === "plan" && (
                  <button
                    onClick={() => markDone(exercise.id)}
                    className="rounded-full border border-lime-300/50 bg-lime-300/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-lime-300"
                  >
                    Mark as Done
                  </button>
                )}
                <button
                  onClick={() => removeItem(exercise.id)}
                  className="rounded-full border border-red-400/40 bg-red-500/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-red-300"
                >
                  X remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
