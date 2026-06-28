"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import PageCTA from "../../components/PageCTA";

// Each service gets its own distinct accent color — no two look alike
const services = [
  { slug: "website-development",  num: "01", name: "Custom Website Development",  tag: "Next.js · Sub-second · 100/100",    accent: "#EAB308" },
  { slug: "e-commerce",           num: "02", name: "E-Commerce Development",       tag: "Zero fees · Custom checkout",        accent: "#F59E0B" },
  { slug: "mobile-apps",          num: "03", name: "Mobile App Development",        tag: "iOS & Android · React Native",      accent: "#0EA5E9" },
  { slug: "meta-ads",             num: "04", name: "Meta Ads Management",           tag: "Facebook & Instagram → customers",  accent: "#8B5CF6" },
  { slug: "google-ads",           num: "05", name: "Google Ads Management",         tag: "Search & Display · Built for ROI",  accent: "#3B82F6" },
  { slug: "lead-generation",      num: "06", name: "Lead Generation",               tag: "High-converting funnels · 24/7",    accent: "#EC4899" },
  { slug: "erp-systems",          num: "07", name: "ERP System Development",        tag: "Automate operations · Own data",    accent: "#10B981" },
  { slug: "whatsapp-automation",  num: "08", name: "WhatsApp Automation",           tag: "Official API · Instant routing",    accent: "#22C55E" },
  { slug: "ai-solutions",         num: "09", name: "AI Solutions & Automation",     tag: "Trained on your data",              accent: "#67E8F9" },
  { slug: "logo-branding",        num: "10", name: "Logo Design & Branding",        tag: "Identity · Stand out · Scale",      accent: "#EAB308" },
  { slug: "rebranding",           num: "11", name: "Complete Rebranding",           tag: "Strategy → refresh → deploy",       accent: "#A78BFA" },
  { slug: "seo",                  num: "12", name: "SEO Services",                  tag: "Google + ChatGPT + Gemini ranked",  accent: "#34D399" },
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      ".svc-header > *",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
    );
    gsap.fromTo(
      ".svc-row",
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.04, ease: "power3.out", delay: 0.5 }
    );
  }, { scope: containerRef });

  return (
    <main
      ref={containerRef}
      className="w-full text-white min-h-screen pt-32 pb-24 overflow-hidden relative"
      style={{ background: "#040810" }}
    >
      {/* Breadcrumb Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reverbex.in" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://reverbex.in/services" }
        ]
      })}} />
      {/* Active accent ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-700"
        style={{
          background: hoveredIdx !== null
            ? `radial-gradient(ellipse 60% 50% at 80% 40%, ${services[hoveredIdx].accent}08 0%, transparent 60%)`
            : "none",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="svc-header mb-20 md:mb-28">
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#EAB308]/50 mb-5">
            Capabilities Catalog
          </p>
          <h1
            className="leading-none tracking-tight text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "-0.04em",
            }}
          >
            Everything you need
            <br />
            <span style={{ fontWeight: 600, fontStyle: "normal", color: "#EAB308" }}>
              to scale.
            </span>
          </h1>
          <p className="text-white/50 font-medium mt-6 max-w-md text-shadow-body" style={{ fontSize: "14px" }}>
            12 capabilities. All engineered in-house. No outsourcing. No templates.
          </p>
        </div>

        {/* Service rows */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {services.map((svc, idx) => (
            <Link
              key={idx}
              href={`/services/${svc.slug}`}
              className="svc-row group block relative overflow-hidden"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Background slide on hover */}
              <div
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                style={{ background: `${svc.accent}07` }}
              />

              {/* Left accent bar that slides in */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] scale-y-0 group-hover:scale-y-100 transition-transform duration-400 ease-out origin-top"
                style={{ background: svc.accent }}
              />

              <div className="relative flex items-center justify-between py-7 md:py-9 px-4 md:px-8">

                {/* Left side — number + name */}
                <div className="flex items-center gap-6 md:gap-10 flex-1 min-w-0">
                  <span
                    className="flex-shrink-0 tabular-nums font-black transition-colors duration-400"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(0.65rem, 1vw, 0.8rem)",
                      letterSpacing: "-0.02em",
                      color: hoveredIdx === idx ? svc.accent : "rgba(255,255,255,0.15)",
                    }}
                  >
                    {svc.num}
                  </span>

                  <div className="flex-1 min-w-0">
                    <h3
                      className="leading-none tracking-tight transition-colors duration-400 truncate"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)",
                        fontWeight: hoveredIdx === idx ? 500 : 300,
                        fontStyle: hoveredIdx === idx ? "normal" : "italic",
                        letterSpacing: "-0.03em",
                        color: hoveredIdx === idx ? "#ffffff" : "rgba(255,255,255,0.55)",
                      }}
                    >
                      {svc.name}
                    </h3>
                    <p
                      className="mt-1 font-bold uppercase tracking-[0.18em] transition-opacity duration-400"
                      style={{
                        fontSize: "8px",
                        color: svc.accent,
                        opacity: hoveredIdx === idx ? 0.7 : 0,
                      }}
                    >
                      {svc.tag}
                    </p>
                  </div>
                </div>

                {/* Right — arrow */}
                <div
                  className="flex-shrink-0 flex items-center gap-3 transition-all duration-400 ml-6"
                  style={{ color: hoveredIdx === idx ? svc.accent : "rgba(255,255,255,0.15)" }}
                >
                  <span
                    className="hidden md:block text-[9px] font-bold uppercase tracking-widest transition-opacity duration-400"
                    style={{ opacity: hoveredIdx === idx ? 1 : 0 }}
                  >
                    Explore
                  </span>
                  <svg
                    width="14" height="14"
                    viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2"
                    style={{
                      transform: hoveredIdx === idx ? "translate(4px, -4px)" : "none",
                      transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <PageCTA />

      </div>
    </main>
  );
}
