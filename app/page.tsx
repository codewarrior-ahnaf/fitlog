"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import ExerciseCard from "@/app/components/exercises/ExerciseCard";
import { getExercises, type Exercise } from "@/lib/fitlog";

const sortOptions = {
  duration: (a: Exercise, b: Exercise) => b.duration - a.duration,
  calories: (a: Exercise, b: Exercise) => b.caloriesBurned - a.caloriesBurned,
  rating: (a: Exercise, b: Exercise) => b.rating - a.rating,
} as const;

export default function HomePage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [sortBy, setSortBy] = useState<keyof typeof sortOptions>("duration");
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

  const sortedExercises = useMemo(() => {
    return [...exercises].sort(sortOptions[sortBy]);
  }, [exercises, sortBy]);

  return (
    <main className="mx-auto w-full max-w-[1500px] px-4 pb-12 pt-6 text-white md:px-6">
      <section className="mb-10 grid items-center gap-8 overflow-hidden rounded-[30px] border border-white/8 bg-[#11161d] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.38)] md:grid-cols-[1.05fr_0.95fr] md:p-8">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-lime-300">
            WORKOUT LIBRARY
          </p>
          <h1 className="max-w-xl text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="max-w-xl text-sm leading-7 text-slate-300 md:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="inline-flex items-center gap-3 rounded-full bg-lime-300 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#0b0d10] hover:bg-lime-200"
          >
            <span>▶</span>
            BROWSE WORKOUTS
          </a>
        </div>

        <div className="relative min-h-[300px] overflow-hidden rounded-[24px] border border-white/6 bg-[#0c0f14]">
          <Image
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80"
            alt="Fitness workout banner"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 45vw"
            priority
          />
        </div>
      </section>

      <section id="library" className="mt-12">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              The Library
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase text-white">
              THE LIBRARY
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <label className="flex items-center gap-2 rounded-full border border-white/8 bg-[#11161d] px-3 py-2 text-sm text-slate-200">
            <span>Sort By</span>
            <select
              aria-label="Sort workouts"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as keyof typeof sortOptions)
              }
              className="rounded-full border border-white/8 bg-[#0B0D10] px-3 py-1 text-sm text-white outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </label>
        </div>

        {loading ? (
          <div className="flex min-h-[220px] items-center justify-center rounded-[28px] border border-white/8 bg-[#11161d]">
            <div className="flex items-center gap-3 text-lime-300">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-lime-300 border-t-transparent" />
              <span className="text-sm uppercase tracking-[0.18em]">
                Loading workouts…
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {sortedExercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
