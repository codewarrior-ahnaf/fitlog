import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-7xl flex-col items-center justify-center px-4 py-16 text-center text-white sm:px-6">
      <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-[#141822] shadow-[0_0_35px_rgba(204,255,0,0.12)]">
        <span className="font-display text-4xl font-black text-[#ccff00]">404</span>
      </div>

      <h1 className="font-display text-3xl font-black uppercase tracking-wide sm:text-5xl">
        PAGE NOT FOUND
      </h1>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
        The lift, page, or workout route you are looking for does not exist or has been moved.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-7 py-3.5 text-xs font-black uppercase tracking-wider text-[#0b0c10] shadow-[0_4px_20px_rgba(204,255,0,0.25)] transition hover:bg-[#b8e600] active:scale-95"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Library</span>
        </Link>

        <Link
          href="/my-plan"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:border-white/40 hover:bg-white/10 active:scale-95"
        >
          <span>View My Plan</span>
        </Link>
      </div>
    </main>
  );
}
