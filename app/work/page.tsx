import type { Metadata } from "next";
import StickyProjects from "../../components/StickyProjects";
import PageCTA from "../../components/PageCTA";

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
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <div className="text-center md:text-left">
          <span className="font-body text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
            The Portfolio
          </span>
          <h1 className="font-heading text-5xl md:text-7xl font-black tracking-tighter leading-[1.0] mb-6">
            Results That Speak.
          </h1>
          <p className="font-body text-[#D0D0D0] text-xl font-medium leading-relaxed max-w-2xl mx-auto md:mx-0 text-shadow-body">
            Every project tells a story. Browse our case studies.
          </p>
        </div>
      </div>

      {/* The 3D Sticky Peeling Cards Section */}
      <StickyProjects />

      {/* Outro section to allow scrolling past the pinned cards */}
      <div className="w-full border-t border-[#1A1A1A] bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <PageCTA />
        </div>
      </div>
    </main>
  );
}
