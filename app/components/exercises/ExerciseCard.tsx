import Image from "next/image";
import Link, { useLinkStatus } from "next/link";
import type { Exercise } from "@/lib/fitlog";

function CardPendingOverlay() {
  const { pending } = useLinkStatus();

  if (!pending) return null;

  return (
    <div
      aria-label="Loading exercise"
      className="absolute inset-0 z-10 flex flex-col gap-4 bg-[#141821]/95 p-5"
    >
      <div className="h-56 w-full animate-pulse rounded bg-white/8" />
      <div className="h-5 w-2/3 animate-pulse rounded bg-white/8" />
      <div className="h-3 w-1/3 animate-pulse rounded bg-white/8" />
    </div>
  );
}

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[22px] border border-white/8 bg-[#141821] shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ccff00]/40 hover:shadow-[0_15px_35px_rgba(204,255,0,0.08)]">
      <Link
        href={`/exercises/${exercise.id}`}
        className="relative flex flex-1 flex-col"
      >
        <CardPendingOverlay />
        {/* Card Image */}
        <div className="relative h-56 w-full overflow-hidden bg-[#0d0f14]">
          <Image
            src={exercise.image}
            alt={exercise.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#141821] via-transparent to-transparent opacity-60" />
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col justify-between p-5">
          <div className="space-y-3">
            {/* Category Tags in filled neon lime pills with dark text */}
            <div className="flex flex-wrap items-center gap-1.5">
              {exercise.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#ccff00] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#0b0c10]"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Workout Name */}
            <div>
              <h3 className="font-display text-lg font-black uppercase tracking-wide text-white transition-colors group-hover:text-[#ccff00] line-clamp-1">
                {exercise.name}
              </h3>
              <p className="mt-1 text-xs text-slate-400 font-medium">
                {exercise.equipment}
              </p>
            </div>
          </div>

          {/* Stats Row with icons */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-x-2 gap-y-2 border-t border-white/6 pt-3 text-xs text-slate-300">
            {/* Duration */}
            <div
              className="flex min-w-0 items-center gap-1.5 font-medium"
              title="Duration"
            >
              <svg
                className="h-3.5 w-3.5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="whitespace-nowrap">{exercise.duration} min</span>
            </div>

            {/* Calories */}
            <div
              className="flex min-w-0 items-center gap-1.5 font-medium"
              title="Calories Burned"
            >
              <svg
                className="h-3.5 w-3.5 text-amber-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 23c4.97 0 9-3.8 9-8.5C21 8.5 16 2 12 1 8 2 3 8.5 3 14.5 3 19.2 7.03 23 12 23zm0-18.42c2.47 2.15 6 6.94 6 9.92 0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2.98 3.53-7.77 6-9.92z" />
              </svg>
              <span className="whitespace-nowrap">
                {exercise.caloriesBurned} kcal
              </span>
            </div>

            {/* Rating */}
            <div
              className="flex items-center gap-1.5 font-medium"
              title="Rating"
            >
              <svg
                className="h-3.5 w-3.5 text-yellow-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span>{exercise.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
