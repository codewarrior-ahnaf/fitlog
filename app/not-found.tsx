import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center text-white">
      <p className="mb-3 text-sm uppercase tracking-[0.25em] text-lime-300">
        404
      </p>
      <h1 className="text-4xl font-black">Exercise not found</h1>
      <p className="mt-3 max-w-md text-slate-400">
        The workout you were looking for is not available right now.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-lime-300 px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#0b0d10]"
      >
        Back to library
      </Link>
    </main>
  );
}
