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

export function NotFoundLoader() {
  return (
    <div
      aria-label="Loading route status"
      className="mb-6 flex flex-col items-center"
    >
      <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-[#ccff00]/30 bg-[#141822] shadow-[0_0_35px_rgba(204,255,0,0.12)]">
        <span className="absolute inset-0 animate-ping rounded-3xl border border-[#ccff00]/20" />
        <Image
          src="/logo.png"
          alt=""
          width={42}
          height={42}
          className="relative h-10 w-10 object-contain"
        />
      </div>
      <div className="mt-4 h-1 w-24 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-1/2 animate-[loading-bar_1.2s_ease-in-out_infinite] rounded-full bg-[#ccff00]" />
      </div>
    </div>
  );
}

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-white/8 ${className}`} />;
}

export function HomeHeroSkeleton() {
  return (
    <div
      aria-label="Loading workout library"
      className="min-h-97.5 sm:min-h-97.5 lg:min-h-101"
    >
      <div className="grid h-full items-center gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <SkeletonBlock className="h-6 w-40 rounded-full" />
          <div className="space-y-3">
            <SkeletonBlock className="h-11 w-full max-w-xl sm:h-14" />
            <SkeletonBlock className="h-11 w-4/5 max-w-lg sm:h-14" />
          </div>
          <div className="space-y-2">
            <SkeletonBlock className="h-4 w-full max-w-xl" />
            <SkeletonBlock className="h-4 w-4/5 max-w-lg" />
          </div>
          <SkeletonBlock className="h-12 w-48 rounded-full" />
        </div>
        <div className="flex justify-center lg:col-span-5">
          <SkeletonBlock className="h-70 w-70 rounded-4xl sm:h-85 sm:w-85 lg:h-95 lg:w-95" />
        </div>
      </div>
    </div>
  );
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

export function ExerciseDetailSkeleton() {
  return (
    <main
      aria-label="Loading exercise"
      className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8"
    >
      <SkeletonBlock className="mb-6 h-4 w-36" />

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <SkeletonBlock className="aspect-square w-full rounded-[26px] lg:col-span-6" />

        <div className="space-y-6 lg:col-span-6">
          <div className="space-y-4">
            <SkeletonBlock className="h-10 w-3/4 sm:h-12" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-5/6" />
          </div>

          <div className="flex gap-2">
            <SkeletonBlock className="h-6 w-20 rounded-full" />
            <SkeletonBlock className="h-6 w-24 rounded-full" />
          </div>

          <div className="space-y-2 rounded-[20px] border border-white/8 bg-[#141822] p-5">
            {Array.from({ length: 7 }, (_, index) => (
              <div key={index} className="flex justify-between py-2.5">
                <SkeletonBlock className="h-3 w-20" />
                <SkeletonBlock className="h-3 w-24" />
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <SkeletonBlock className="h-5 w-32" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-11/12" />
            <SkeletonBlock className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    </main>
  );
}

export function MyPlanSkeleton() {
  return (
    <main
      aria-label="Loading your plan"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10"
    >
      <div className="mb-8 space-y-3">
        <SkeletonBlock className="h-10 w-52 sm:h-12" />
        <SkeletonBlock className="h-4 w-full max-w-md" />
        <p className="pt-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#ccff00]">
          Loading workouts…
        </p>
      </div>

      <section className="mb-8 rounded-[22px] border border-white/8 bg-[#141822] p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="space-y-3">
              <SkeletonBlock className="h-3 w-20" />
              <SkeletonBlock className="h-12 w-16" />
            </div>
          ))}
        </div>
      </section>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SkeletonBlock className="h-11 w-64 rounded-full" />
        <SkeletonBlock className="h-9 w-32 rounded-full" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 rounded-[22px] border border-white/8 bg-[#141822] p-4 sm:p-5 md:flex-row md:items-center"
          >
            <SkeletonBlock className="h-28 w-full rounded-2xl md:w-44" />
            <div className="flex-1 space-y-3">
              <SkeletonBlock className="h-5 w-2/3" />
              <SkeletonBlock className="h-3 w-1/4" />
              <div className="flex gap-4">
                <SkeletonBlock className="h-3 w-16" />
                <SkeletonBlock className="h-3 w-16" />
                <SkeletonBlock className="h-3 w-10" />
              </div>
            </div>
            <div className="flex gap-2">
              <SkeletonBlock className="h-9 w-24 rounded-full" />
              <SkeletonBlock className="h-9 w-28 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
