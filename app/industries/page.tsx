import React from "react";
import Navbar from "../../components/Navbar";

const industries = [
  { slug: "education", name: "Education" },
  { slug: "manufacturing", name: "Manufacturing" },
  { slug: "ecommerce", name: "E-Commerce" },
  { slug: "logistics", name: "Logistics" },
  { slug: "startups", name: "Startups" },
  { slug: "retail", name: "Retail" }
];

export default function IndustriesPage() {
  return (
    <main className="w-full bg-[#050505] text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6">
        <span
          className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Industry Verticals
        </span>
        <h1
          className="text-white text-[clamp(2.5rem,6vw,5.5rem)] font-black tracking-tighter leading-tight mb-16"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          Industries We Serve.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 border-t border-[#1A1A1A] pt-12">
          {industries.map((item, idx) => (
            <a
              key={idx}
              href={`/industries/${item.slug}`}
              className="group flex flex-col justify-between p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308] transition-colors duration-300"
            >
              <div>
                <h3
                  className="text-white text-2xl font-bold group-hover:text-[#EAB308] transition-colors duration-300 mb-2"
                  style={{ fontFamily: "var(--font-syne), sans-serif" }}
                >
                  {item.name}
                </h3>
              </div>
              <div className="text-[#666666] group-hover:text-white transition-colors duration-300 text-xs font-semibold uppercase tracking-wider mt-12">
                Explore Solutions →
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
