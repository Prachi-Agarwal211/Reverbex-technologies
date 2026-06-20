"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <span className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
          Error
        </span>
        <h1
          className="text-white text-4xl font-black tracking-tighter mb-4"
          style={{ fontFamily: "var(--font-heading), sans-serif" }}
        >
          Something went wrong.
        </h1>
        <p className="text-[#A0A0A0] text-sm mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-[#EAB308] hover:bg-[#CA8A04] text-[#050505] text-sm font-bold rounded-full transition-colors duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
