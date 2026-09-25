import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-white/8 bg-[#0c0d10] py-8 text-slate-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ccff00]/10 p-0.5">
            <Image
              src="/logo.png"
              alt="FITLOG Logo"
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
          </div>
          <span className="font-display text-sm font-black uppercase tracking-wider text-white">
            FITLOG
          </span>
        </div>

        {/* Right: Copyright line */}
        <p className="text-xs text-slate-400">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
