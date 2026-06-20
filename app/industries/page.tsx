import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { industriesData } from "../../lib/industriesData";

export const metadata: Metadata = {
  title: "Industries We Serve | Reverbex Technologies",
  description: "Specialized engineering and digital marketing solutions tailored for specific industry bottlenecks.",
  openGraph: {
    title: "Industries We Serve | Reverbex Technologies",
    description: "Specialized engineering and digital marketing solutions tailored for specific industry bottlenecks.",
    type: "website",
    url: "https://reverbex.in/industries",
  }
};

export default function IndustriesIndexPage() {
  const industries = Object.entries(industriesData);

  return (
    <main className="w-full bg-[#050505] text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <span className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block" style={{ fontFamily: "var(--font-body), sans-serif" }}>
            Industry Sectors
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.0] mb-6" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
            Built for Your Vertical.
          </h1>
          <p className="text-[#A0A0A0] text-xl font-light leading-relaxed max-w-2xl" style={{ fontFamily: "var(--font-body), sans-serif" }}>
            Generic solutions don't work in specialized markets. We build engineering systems and marketing engines tailored to the exact challenges of your industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map(([slug, industry]) => (
            <Link 
              key={slug} 
              href={`/industries/${slug}`}
              className="group block p-10 bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#EAB308] hover:bg-[#111111] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#EAB308] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-[#EAB308] transition-colors duration-300" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
                {industry.name}
              </h2>
              
              <p className="text-[#A0A0A0] text-base leading-relaxed mb-8 h-20">
                {industry.tagline}
              </p>

              <div className="flex justify-between items-center border-t border-[#1A1A1A] pt-6">
                 <div className="text-sm font-semibold tracking-wider uppercase text-[#666666] group-hover:text-white transition-colors duration-300">
                   Explore Solutions
                 </div>
                 <span className="text-[#666666] group-hover:text-[#EAB308] transition-colors duration-300 transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
