import Image from "next/image";

export function LoadingScreen() {
  return (
    <main
      aria-live="polite"
      aria-label="Loading FitLog"
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 py-16"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ccff00]/10 blur-3xl" />
      <div className="relative flex flex-col items-center text-center">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#ccff00]/30 bg-[#141822] shadow-[0_0_55px_rgba(204,255,0,0.14)]">
          <span className="absolute inset-0 animate-ping rounded-[28px] border border-[#ccff00]/20" />
          <Image
            src="/logo.png"
            alt=""
            width={56}
            height={56}
            className="relative h-14 w-14 object-contain"
            priority
          />
        </div>
        <p className="mt-7 font-display text-2xl font-black uppercase tracking-[0.18em] text-white">
          Fit<span className="text-[#ccff00]">Log</span>
        </p>
        <div className="mt-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ccff00]" />
          Preparing your workout floor
        </div>
        <div className="mt-5 h-1 w-32 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-[loading-bar_1.2s_ease-in-out_infinite] rounded-full bg-[#ccff00]" />
        </div>
      </div>
    </main>
  );
}

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-white/8 ${className}`} />;
}

function ExerciseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/8 bg-[#141821]">
      <SkeletonBlock className="h-56 w-full rounded-none" />
      <div className="space-y-4 p-5">
        <div className="flex gap-2">
          <SkeletonBlock className="h-5 w-20 rounded-full" />
          <SkeletonBlock className="h-5 w-24 rounded-full" />
        </div>
        <div className="space-y-2">
          <SkeletonBlock className="h-5 w-3/4" />
          <SkeletonBlock className="h-3 w-1/3" />
        </div>
        <div className="flex justify-between border-t border-white/6 pt-3">
          <SkeletonBlock className="h-3 w-16" />
          <SkeletonBlock className="h-3 w-16" />
          <SkeletonBlock className="h-3 w-10" />
        </div>
      </div>
    </div>
  );
}

export function ExerciseGridSkeleton() {
  return (
    <div
      aria-label="Loading workouts"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 6 }, (_, index) => (
        <ExerciseCardSkeleton key={index} />
      ))}
    </div>
  );
}
