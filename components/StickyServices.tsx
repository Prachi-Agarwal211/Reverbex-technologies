"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { slug: "website-development", num: "01", name: "Custom Websites",     line: "Sub-second. Built to convert.",         accent: "#EAB308" },
  { slug: "e-commerce",          num: "02", name: "E-Commerce",           line: "Custom stores. Zero platform fees.",     accent: "#EAB308" },
  { slug: "mobile-apps",         num: "03", name: "Mobile Apps",          line: "Native iOS & Android.",                 accent: "#EAB308" },
  { slug: "meta-ads",            num: "04", name: "Meta Ads",             line: "Facebook & Instagram → customers.",     accent: "#EAB308" },
  { slug: "google-ads",          num: "05", name: "Google Ads",           line: "Search & Display. Built for ROI.",      accent: "#EAB308" },
  { slug: "lead-generation",     num: "06", name: "Lead Generation",      line: "High-converting funnels. 24/7.",        accent: "#EAB308" },
  { slug: "erp-systems",         num: "07", name: "ERP & CRM",            line: "Automate operations. Own your data.",   accent: "#EAB308" },
  { slug: "whatsapp-automation", num: "08", name: "WhatsApp",             line: "Official API. Instant lead routing.",   accent: "#EAB308" },
  { slug: "ai-solutions",        num: "09", name: "AI Solutions",         line: "Trained on your data.",                 accent: "#EAB308" },
  { slug: "seo",                 num: "10", name: "SEO + AI",             line: "Ranked on Google AND by ChatGPT.",      accent: "#EAB308" },
  { slug: "logo-branding",       num: "11", name: "Branding",             line: "Identity systems that stand out.",      accent: "#EAB308" },
  { slug: "rebranding",          num: "12", name: "Rebranding",           line: "Complete refresh. Strategy to deploy.", accent: "#EAB308" },
];

export default function StickyServices() {
  const containerRef = useRef<HTMLElement>(null);
  const totalCards = services.length;

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".srv-card");
    if (!cards.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = window.innerWidth < 768;
    const yStep = isMobile ? 4 : 5;
    const scaleStep = 0.028;

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
      end: () => `+=${window.innerHeight * (totalCards - 1) + window.innerHeight}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        let activeIndex = Math.floor(progress * (totalCards - 1));
        activeIndex = Math.min(activeIndex, totalCards - 2);
        const segProg = progress * (totalCards - 1) - activeIndex;

        cards.forEach((card, i) => {
          if (i < activeIndex) {
            gsap.set(card, { yPercent: -320, scale: 0.9, opacity: 0 });
          } else if (i === activeIndex) {
            gsap.set(card, {
              yPercent: gsap.utils.interpolate(-50, -320, segProg),
              scale: 1,
              opacity: gsap.utils.interpolate(1, 0, Math.min(segProg * 2.2, 1)),
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
      style={{ background: "rgba(4,8,16,0.35)" }}
      aria-label="Our services"
    >
      {/* Section label */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20">
          Capabilities
        </span>
      </div>

      {services.map((service, index) => (
        <div
          key={service.slug}
          className="srv-card absolute will-change-transform"
          style={{
            top: "50%",
            left: "50%",
            width: "min(95vw, 1000px)",
            height: "clamp(280px, 58vh, 540px)",
            background: "#050810",
            borderTop: "1px solid rgba(234,179,8,0.12)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <Link
            href={`/services/${service.slug}`}
            className="w-full h-full flex items-stretch relative overflow-hidden"
          >
            {/* Left — service number */}
            <div
              className="flex-shrink-0 flex flex-col justify-between p-6 md:p-10 border-r border-white/5"
              style={{ width: "clamp(60px, 8vw, 100px)" }}
            >
              <span
                className="font-black tabular-nums text-white/10 leading-none"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
                  letterSpacing: "-0.02em",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  transform: "rotate(180deg)",
                }}
              >
                {service.num} / {String(totalCards).padStart(2, "0")}
              </span>

              <div
                className="w-[1px] flex-1 my-4"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(234,179,8,0.3), transparent)" }}
              />
            </div>

            {/* Center — giant service name */}
            <div className="flex-1 flex flex-col justify-between p-8 md:p-12 relative">
              {/* Ghost watermark */}
              <div
                className="absolute bottom-0 right-0 pointer-events-none select-none leading-none"
                aria-hidden="true"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(8rem, 22vw, 18rem)",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.025)",
                  letterSpacing: "-0.07em",
                  lineHeight: 0.8,
                  overflow: "hidden",
                }}
              >
                {service.num}
              </div>

              {/* Service label */}
              <div className="flex items-center gap-3 z-10">
                <div className="w-2 h-[1px] bg-[#EAB308]/40" />
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#EAB308]/50">
                  Service
                </span>
              </div>

              {/* Giant name in Cormorant */}
              <div className="z-10">
                <h3
                  className="leading-[0.88] tracking-tight text-white"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(3rem, 9vw, 7.5rem)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {service.name}
                </h3>
              </div>

              {/* One-line tagline */}
              <div className="z-10">
                <p
                  className="text-white/35 font-medium tracking-wide"
                  style={{ fontSize: "clamp(11px, 1.2vw, 14px)" }}
                >
                  {service.line}
                </p>
              </div>
            </div>

            {/* Right — arrow CTA */}
            <div
              className="flex-shrink-0 flex items-end p-6 md:p-10 border-l border-white/5"
              style={{ width: "clamp(50px, 7vw, 90px)" }}
            >
              <div className="flex flex-col items-center gap-2 text-white/20 hover:text-[#EAB308] transition-colors duration-300 group-hover:text-[#EAB308]">
                <div className="w-[1px] h-16 bg-current" />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
}
