"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// Each service card uses a different visual treatment — not all the same
const services = [
  { slug: "website-development",  num: "01", name: "Custom Websites",      tagline: "Next.js. Sub-second. Built to convert.",   accent: "#3B82F6",  size: "large"  },
  { slug: "e-commerce",           num: "02", name: "E-Commerce",           tagline: "Custom stores. Zero platform fees.",          accent: "#EAB308",  size: "normal" },
  { slug: "mobile-apps",          num: "03", name: "Mobile Apps",          tagline: "Native iOS & Android. React Native.",         accent: "#0EA5E9",  size: "normal" },
  { slug: "meta-ads",             num: "04", name: "Meta Ads",             tagline: "Facebook & Instagram → real customers.",      accent: "#A78BFA",  size: "normal" },
  { slug: "google-ads",           num: "05", name: "Google Ads",           tagline: "Search & Display. Configured for ROI.",       accent: "#34D399",  size: "normal" },
  { slug: "lead-generation",      num: "06", name: "Lead Generation",      tagline: "High-converting funnels. 24/7 leads.",        accent: "#F472B6",  size: "normal" },
  { slug: "erp-systems",          num: "07", name: "ERP & CRM",            tagline: "Automate operations. Own your data.",         accent: "#FCD34D",  size: "normal" },
  { slug: "whatsapp-automation",  num: "08", name: "WhatsApp Automation",  tagline: "Official API. Instant lead routing.",         accent: "#4ADE80",  size: "normal" },
  { slug: "ai-solutions",         num: "09", name: "AI Solutions",         tagline: "Trained on your data. Reduces overhead.",     accent: "#67E8F9",  size: "normal" },
  { slug: "seo",                  num: "10", name: "SEO + AI Ranking",     tagline: "Ranked on Google AND cited by ChatGPT.",     accent: "#3B82F6",  size: "normal" },
  { slug: "logo-branding",        num: "11", name: "Branding",             tagline: "Identity systems that make you stand out.",  accent: "#EAB308",  size: "normal" },
  { slug: "rebranding",           num: "12", name: "Rebranding",           tagline: "Complete refresh — strategy to deploy.",      accent: "#A78BFA",  size: "normal" },
];

export default function StickyServices() {
  const containerRef = useRef<HTMLElement>(null);
  const totalCards = services.length;

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".stacked-card");
    if (!cards.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = window.innerWidth < 768;
    const yStep = isMobile ? 4 : 6;
    const scaleStep = isMobile ? 0.03 : 0.035;
    const totalSegments = totalCards - 1;

    cards.forEach((card, i) => {
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50 + i * yStep,
        scale: 1 - i * scaleStep,
        zIndex: totalCards - i,
      });
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: () => `+=${window.innerHeight * totalSegments + window.innerHeight}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        let activeIndex = Math.floor(progress * totalSegments);
        activeIndex = Math.min(activeIndex, totalSegments - 1);
        const segProg = progress * totalSegments - activeIndex;

        cards.forEach((card, i) => {
          if (i < activeIndex) {
            gsap.set(card, { yPercent: -280, scale: 0.92, opacity: 0 });
          } else if (i === activeIndex) {
            gsap.set(card, {
              yPercent: gsap.utils.interpolate(-50, -280, segProg),
              scale: 1,
              opacity: gsap.utils.interpolate(1, 0, Math.min(segProg * 2.5, 1)),
            });
          } else {
            const behind = i - activeIndex;
            gsap.set(card, {
              yPercent: -50 + (behind * yStep - segProg * yStep),
              scale: 1 - (behind * scaleStep - segProg * scaleStep),
              opacity: 1,
            });
          }
        });
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="capabilities"
      className="relative w-full h-screen overflow-hidden flex justify-center items-center z-10"
      style={{
        background: "#030815",
        backgroundImage: `
          radial-gradient(ellipse 60% 60% at 15% 40%, rgba(59,130,246,0.12) 0%, transparent 55%),
          radial-gradient(ellipse 50% 50% at 85% 20%, rgba(234,179,8,0.06) 0%, transparent 50%)
        `,
      }}
      aria-label="Our services"
    >
      {/* Section count indicator */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-0 pointer-events-none flex items-center gap-2">
        <div className="w-1 h-1 rounded-full bg-blue-500/60" />
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-blue-400/60">Capabilities</span>
        <div className="w-1 h-1 rounded-full bg-blue-500/60" />
      </div>

      {services.map((service, index) => (
        <div
          key={service.slug}
          className="stacked-card absolute will-change-transform"
          style={{
            top: "50%",
            left: "50%",
            width: "min(92vw, 900px)",
            height: "clamp(300px, 60vh, 520px)",
            transformOrigin: "center bottom",
            borderRadius: "20px",
            overflow: "hidden",
            // Each card has slightly different dark bg with accent bleed
            background: `
              radial-gradient(ellipse 60% 80% at 100% 50%, ${service.accent}18 0%, transparent 55%),
              radial-gradient(ellipse 40% 60% at 0% 0%, ${service.accent}10 0%, transparent 45%),
              #07091A
            `,
            border: `1px solid ${service.accent}20`,
            boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px ${service.accent}12, inset 0 1px 0 ${service.accent}15`,
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 inset-x-0 h-[1px]"
            style={{ background: `linear-gradient(90deg, transparent 0%, ${service.accent}80 40%, ${service.accent}80 60%, transparent 100%)` }}
          />

          <Link href={`/services/${service.slug}`} className="w-full h-full flex flex-col justify-between p-7 md:p-10 relative">

            {/* Top row: number + name + arrow */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <span
                  className="text-[10px] font-black tracking-[0.3em] tabular-nums"
                  style={{ color: `${service.accent}70` }}
                >
                  {service.num}/{String(totalCards).padStart(2, "0")}
                </span>
                <div className="w-px h-3 bg-white/15" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                  Capability
                </span>
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: `${service.accent}15`,
                  border: `1px solid ${service.accent}30`,
                  color: service.accent,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </div>

            {/* Center: service name — large, editorial */}
            <div className="flex-1 flex items-center">
              <h3
                className="font-black leading-[0.9] tracking-tight text-white"
                style={{
                  fontSize: "clamp(2.2rem, 6vw, 5rem)",
                  letterSpacing: "-0.04em",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {service.name}
              </h3>
            </div>

            {/* Bottom: tagline + color indicator */}
            <div className="flex items-end justify-between gap-6">
              <p className="text-sm text-white/45 leading-snug max-w-xs">
                {service.tagline}
              </p>
              <div
                className="w-10 h-10 rounded-full shrink-0 opacity-80"
                style={{
                  background: `radial-gradient(circle, ${service.accent} 0%, ${service.accent}40 60%, transparent 100%)`,
                  filter: `blur(1px)`,
                }}
              />
            </div>

            {/* Giant watermark number — editorial texture */}
            <div
              className="absolute bottom-0 right-6 font-black leading-none select-none pointer-events-none"
              style={{
                fontSize: "clamp(5rem, 18vw, 12rem)",
                color: `${service.accent}06`,
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.06em",
                lineHeight: 0.85,
              }}
            >
              {service.num}
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
}
