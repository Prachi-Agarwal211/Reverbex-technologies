import React from "react";
import Navbar from "../../components/Navbar";

const cases = [
  { slug: "maac-animation", name: "MAAC Animation Jaipur", metric: "500+ leads generated" },
  { slug: "aarya-clothing", name: "Aarya Clothing", metric: "₹3+ lakh revenue generated" },
  { slug: "khemji-wire", name: "Khemji Wire Company", metric: "Complete digital rebranding" }
];

export default function WorkPage() {
  return (
    <main className="w-full bg-[#050505] text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6">
        <span
          className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Case Studies Portfolio
        </span>
        <h1
          className="text-white text-[clamp(2.5rem,6vw,5.5rem)] font-black tracking-tighter leading-tight mb-16"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          Our Work.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#1A1A1A] pt-12">
          {cases.map((item, idx) => (
            <a
              key={idx}
              href={`/work/${item.slug}`}
              className="group flex flex-col justify-between p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308] transition-colors duration-300"
            >
              <div>
                <span className="text-[#EAB308] text-xs font-semibold tracking-widest uppercase block mb-4">
                  Outcome: {item.metric}
                </span>
                <h3
                  className="text-white text-3xl font-bold group-hover:text-[#EAB308] transition-colors duration-300 mb-2"
                  style={{ fontFamily: "var(--font-syne), sans-serif" }}
                >
                  {item.name}
                </h3>
              </div>
              <div className="text-[#666666] group-hover:text-white transition-colors duration-300 text-xs font-semibold uppercase tracking-wider mt-12">
                Read documentary story →
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
