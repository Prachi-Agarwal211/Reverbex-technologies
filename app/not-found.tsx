import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <span className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
          404
        </span>
        <h1
          className="text-white text-4xl font-black tracking-tighter mb-4"
         
        >
          Page Not Found.
        </h1>
        <p className="text-[#A0A0A0] text-sm mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#EAB308] hover:bg-[#CA8A04] text-[#050505] text-sm font-bold rounded-full transition-colors duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
