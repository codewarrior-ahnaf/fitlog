import Image from "next/image";
import Link from "next/link";
import type { Exercise } from "@/lib/fitlog";

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <article className="group overflow-hidden rounded-[24px] border border-white/8 bg-[#11161d] shadow-[0_15px_35px_rgba(0,0,0,0.28)] transition duration-200 hover:-translate-y-1 hover:border-lime-400/40">
      <Link href={`/exercises/${exercise.id}`} className="block">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={exercise.image}
            alt={exercise.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>

        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {exercise.muscleGroups.slice(0, 2).map((group) => (
                <span
                  key={group}
                  className="rounded-full border border-lime-400/30 bg-lime-300/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-lime-300"
                >
                  {group}
                </span>
              ))}
            </div>
            <span className="text-xs font-medium text-slate-300">★ {exercise.rating.toFixed(1)}</span>
          </div>

          <div>
            <h3 className="line-clamp-2 text-lg font-bold uppercase tracking-tight text-white">
              {exercise.name}
            </h3>
            <p className="mt-2 text-sm text-slate-400">{exercise.equipment}</p>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>⏱ {exercise.duration} min</span>
            <span>🔥 {exercise.caloriesBurned} kcal</span>
            <span>★ {exercise.rating.toFixed(1)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
