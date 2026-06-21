"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const comparisons = [
  {
    number: "01",
    title: "FASTER WEBSITES",
    desc: "Our sites load in under 1 second. Template sites take 3-5 seconds. Google ranks faster sites higher.",
    metric: "100/100 PageSpeed guaranteed",
  },
  {
    number: "02",
    title: "BETTER SEO",
    desc: "Optimized for Google AND AI search engines. We don't just do traditional SEO — we optimize for ChatGPT, Gemini, and Perplexity too.",
    metric: "AEO + GEO optimized",
  },
  {
    number: "03",
    title: "HIGHER CONVERSIONS",
    desc: "Every page is designed around one goal: turning visitors into customers. No wasted space, no confusing navigation.",
    metric: "Built for business results",
  },
  {
    number: "04",
    title: "NO TEMPLATE LIMITATIONS",
    desc: "Custom code means custom everything. Unlimited design, unlimited features, unlimited integrations.",
    metric: "Your vision, not a theme",
  },
  {
    number: "05",
    title: "ZERO TRANSACTION FEES",
    desc: "Unlike platforms that charge 2-5% on every sale, we build custom e-commerce with zero platform fees.",
    metric: "You keep more of your revenue",
  },
  {
    number: "06",
    title: "LONG-TERM PARTNER",
    desc: "We don't disappear after launch. We're your digital growth partner for the long term.",
    metric: "Ongoing support and growth",
  },
];

export default function WhyReverbex() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Header entrance
    const header = containerRef.current.querySelector(".why-header");
    if (header) {
      gsap.fromTo(
        header.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // List items stagger in from left
    const items = containerRef.current.querySelectorAll(".why-item");
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Scroll-reveal line (always runs once on scroll — no hover CSS conflict)
      const line = item.querySelector(".why-line");
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 0.3,       // reveals to 30% on scroll
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover: GSAP expands/shrinks the line — no CSS conflict because
        // we removed group-hover:scale-x-100 from the JSX below
        item.addEventListener("mouseenter", () => {
          gsap.to(line, { scaleX: 1, duration: 0.4, ease: "power3.out" });
        });
        item.addEventListener("mouseleave", () => {
          gsap.to(line, { scaleX: 0.3, duration: 0.4, ease: "power3.in" });
        });
      }
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="why-reverbex"
      className="w-full py-24 md:py-32 bg-transparent border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header — left-aligned, MASSIVE */}
        <div className="why-header text-left mb-16 md:mb-24 max-w-4xl">
          <span className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-6 block">
            The Difference
          </span>
          <h2 className="display-text text-white mb-6">
            Why Businesses
            <br />
            Choose Reverbex.
          </h2>
          <p className="text-[#A0A0A0] text-base md:text-lg font-normal leading-relaxed max-w-xl">
            We don&apos;t build template websites. We build systems that grow your business.
          </p>
        </div>

        {/* Editorial list layout — not cards */}
        <div className="flex flex-col">
          {comparisons.map((item, index) => (
            <div
              key={index}
              className="why-item group py-8 md:py-10 border-t border-[#1A1A1A] last:border-b cursor-default"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                {/* Number */}
                <span className="text-[#EAB308] text-sm font-bold tracking-[0.15em] shrink-0 md:w-16">
                  {item.number}
                </span>

                {/* Title */}
                <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight md:w-64 shrink-0 group-hover:text-[#EAB308] transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[#A0A0A0] text-base font-normal leading-relaxed flex-1 max-w-xl">
                  {item.desc}
                </p>

                {/* Metric */}
                <span className="text-[#EAB308]/70 text-sm font-semibold tracking-wide shrink-0 md:text-right md:w-48">
                  {item.metric}
                </span>
              </div>

              {/* Accent line — GSAP-only, no CSS hover class (removes conflict) */}
              <div className="why-line h-[1px] bg-[#EAB308]/40 mt-8 md:mt-10 origin-left" style={{ transform: "scaleX(0)" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
