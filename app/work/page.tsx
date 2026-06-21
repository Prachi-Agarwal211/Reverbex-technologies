import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import StickyProjects from "../../components/StickyProjects";

export const metadata: Metadata = {
  title: "Our Work & Case Studies | Reverbex Technologies",
  description: "Real numbers. Real businesses. Real impact. See how we've engineered growth for our clients.",
  openGraph: {
    title: "Our Work & Case Studies | Reverbex Technologies",
    description: "Real numbers. Real businesses. Real impact. See how we've engineered growth for our clients.",
    type: "website",
    url: "https://reverbex.in/work",
  }
};

export default function WorkIndexPage() {
  return (
    <main className="w-full text-white min-h-screen pt-32 pb-0 selection:bg-[#EAB308]/30">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <div className="text-center md:text-left">
          <span className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block" style={{ fontFamily: "var(--font-body), sans-serif" }}>
            The Portfolio
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.0] mb-6" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
            Results That Speak.
          </h1>
          <p className="text-[#A0A0A0] text-xl font-light leading-relaxed max-w-2xl mx-auto md:mx-0" style={{ fontFamily: "var(--font-body), sans-serif" }}>
            We don't count visitors or lines of code. We count leads generated, costs reduced, and revenue increased.
          </p>
        </div>
      </div>

      {/* The 3D Sticky Peeling Cards Section */}
      <StickyProjects />

      {/* Outro section to allow scrolling past the pinned cards */}
      <div className="w-full h-[50vh] flex items-center justify-center border-t border-[#1A1A1A] bg-[#0A0A0A]">
        <h2 className="text-[#A0A0A0] text-2xl font-light tracking-widest uppercase">End of Portfolio</h2>
      </div>
    </main>
  );
}
