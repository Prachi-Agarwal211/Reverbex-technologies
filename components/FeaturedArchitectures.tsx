"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    title: "MAAC Animation Jaipur",
    tagline: "Education • Web Design • Meta Ads",
    result: "500+ qualified leads",
    highlight: "200+ leads in first month",
    image: "/maac animation jaipur.png",
    href: "/work/maac-animation-jaipur",
    stack: ["Next.js SSR", "Meta Ads", "GEO/SEO"],
    color: "#3B82F6",
    stat: "500+",
    statLabel: "Leads Generated",
  },
  {
    title: "Aarya Clothing",
    tagline: "E-Commerce • CRM • Payments",
    result: "₹4L+ revenue in 1 month",
    highlight: "2500+ happy customers",
    image: "/aarya clothing.png",
    href: "/work/aarya-clothing",
    stack: ["Next.js", "FastAPI", "Razorpay"],
    color: "#EAB308",
    stat: "₹4L+",
    statLabel: "Revenue, Month 1",
  },
  {
    title: "Khemji Wire Co.",
    tagline: "Corporate • B2B • Rebranding",
    result: "Complete digital transformation",
    highlight: "200% B2B inquiry increase",
    image: "/khemji wire.png",
    href: "/work/khemji-wire-company",
    stack: ["Next.js", "Parallax", "SEO"],
    color: "#10B981",
    stat: "200%",
    statLabel: "More B2B Inquiries",
  },
  {
    title: "Shipbridge",
    tagline: "Logistics ERP • AI Platform",
    result: "AI-first logistics system",
    highlight: "Automated dispatch & tracking",
    image: "/shipbridge.png",
    href: "/work/shipbridge",
    stack: ["Next.js", "Node API", "AI/ML"],
    color: "#0EA5E9",
    stat: "AI",
    statLabel: "First Logistics ERP",
  },
];

export default function FeaturedArchitectures() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Normal scroll reveal for each project row, no pinning!
    const rows = sectionRef.current.querySelectorAll(".project-row");
    rows.forEach((row) => {
      const img = row.querySelector(".project-img-wrapper");
      const text = row.querySelector(".project-text");

      gsap.fromTo(img,
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: row, start: "top 80%" } }
      );

      gsap.fromTo(text,
        { opacity: 0, x: row.classList.contains("reverse") ? 30 : -30 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.2, scrollTrigger: { trigger: row, start: "top 80%" } }
      );
    });

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full overflow-hidden py-24 md:py-32 z-40"
      aria-label="Featured work"
      style={{
        background: "#030A12",
        backgroundImage: `
          radial-gradient(ellipse 70% 55% at 75% 15%, rgba(14,165,233,0.10) 0%, transparent 55%),
          radial-gradient(ellipse 55% 55% at 15% 65%, rgba(59,130,246,0.08) 0%, transparent 50%)
        `,
      }}
    >
      <div className="absolute inset-0 grid-lines-blue opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
        
        {/* Section header */}
        <div className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-4 h-[1px] bg-blue-400/50" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-blue-400/60">Featured Work</span>
            </div>
            <h2
              className="font-black text-white leading-[0.9]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.04em", fontFamily: "var(--font-heading)" }}
            >
              Real projects.<br />
              <span style={{ color: "#EAB308" }}>Real results.</span>
            </h2>
          </div>
          <Link
            href="/work"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white transition-colors duration-200 shrink-0"
          >
            View all work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Editorial alternating list (No pinning, no horizontal scroll) */}
        <div className="flex flex-col gap-24 md:gap-40">
          {cases.map((item, i) => {
            const isReverse = i % 2 !== 0;

            return (
              <div
                key={i}
                className={`project-row flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isReverse ? "md:flex-row-reverse reverse" : ""}`}
              >
                {/* Image side */}
                <Link href={item.href} className="project-img-wrapper group relative w-full md:w-3/5 aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden block shrink-0"
                  style={{ border: `1px solid ${item.color}20`, boxShadow: `0 20px 60px rgba(0,0,0,0.5)` }}>
                  
                  <Image
                    src={item.image}
                    alt={`${item.title} — Reverbex project`}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to top, ${item.color}30 0%, transparent 50%)` }} />
                </Link>

                {/* Text side */}
                <div className="project-text w-full md:w-2/5 flex flex-col items-start">
                  
                  {/* Big stat */}
                  <div className="mb-6">
                    <div
                      className="font-black leading-none tabular-nums tracking-tight"
                      style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", color: item.color, fontFamily: "var(--font-heading)", filter: `drop-shadow(0 0 20px ${item.color}40)` }}
                    >
                      {item.stat}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest text-white/40 mt-2">
                      {item.statLabel}
                    </div>
                  </div>

                  {/* Title & tags */}
                  <h3 className="text-2xl md:text-4xl font-black text-white mb-3 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/50 mb-8 max-w-sm leading-relaxed">
                    {item.tagline}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {item.stack.map((tech, j) => (
                      <span key={j} className="px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider"
                        style={{ background: `${item.color}10`, color: `${item.color}90` }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link href={item.href} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 group"
                    style={{ color: item.color }}>
                    Read Case Study
                    <span className="w-8 h-[1px] group-hover:w-12 transition-all duration-300" style={{ background: item.color }} />
                  </Link>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
