"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CounterItem({
  value,
  label,
  subtext,
  suffix = "",
  prefix = "",
  delay = 0,
}: {
  value: number;
  label: string;
  subtext: string;
  suffix?: string;
  prefix?: string;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 1800;
          const startTime = performance.now() + delay;

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            if (elapsed < 0) {
              requestAnimationFrame(animate);
              return;
            }
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, delay]);

  return (
    <div
      ref={elementRef}
      className="results-card flex flex-col items-start p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308]/30 transition-all duration-300"
    >
      <span className="text-white text-4xl md:text-5xl font-black mb-3 tracking-[-0.03em] tabular-nums">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </span>
      <h3 className="text-white text-base md:text-lg font-bold mb-1">{label}</h3>
      <p className="text-[#666666] text-xs md:text-sm font-medium">{subtext}</p>
    </div>
  );
}

export default function LiveResults() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Clip-path wipe on heading
    const headingMask = containerRef.current.querySelector(".results-heading-mask");
    if (headingMask) {
      gsap.fromTo(
        headingMask,
        { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Eyebrow slide in
    const eyebrow = containerRef.current.querySelector(".results-eyebrow");
    if (eyebrow) {
      gsap.fromTo(
        eyebrow,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Cards stagger with rotateX perspective
    const cards = containerRef.current.querySelectorAll(".results-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, rotateX: -8 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Value strip wipe
    const strip = containerRef.current.querySelector(".results-strip");
    if (strip) {
      gsap.fromTo(
        strip,
        { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.0,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: strip,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="results"
      className="w-full py-24 md:py-32 bg-transparent border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header — left-aligned, MASSIVE */}
        <div className="text-left mb-16 md:mb-20 max-w-3xl">
          <div className="results-eyebrow flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#EAB308]" />
            <span className="text-white text-xs font-semibold tracking-[0.25em] uppercase">
              Proof
            </span>
          </div>
          <div className="results-heading-mask" style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}>
            <h2 className="display-text text-white mb-6">
              Real Results.
              <br />
              Real Numbers.
            </h2>
          </div>
          <p className="text-[#A0A0A0] text-base md:text-lg font-normal leading-relaxed">
            No vanity metrics. Just direct business impact generated for our clients.
          </p>
        </div>

        {/* Dashboard Grid — Hero stat + supporting cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
          style={{ perspective: "1000px" }}
        >
          {/* Hero Stat — spans full height, MASSIVE number */}
          <div className="results-card md:col-span-2 md:row-span-2 flex flex-col items-start p-10 md:p-12 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308]/30 transition-all duration-300">
            <span className="stat-number text-white">
              500+
            </span>
            <h3 className="text-white text-xl md:text-2xl font-bold mb-2 mt-4">
              Leads Generated
            </h3>
            <p className="text-[#666666] text-sm md:text-base font-medium">
              For MAAC Animation Jaipur
            </p>
          </div>

          <CounterItem
            value={300000}
            label="Revenue Generated"
            subtext="For Aarya Clothing"
            prefix="₹"
            suffix="+"
            delay={200}
          />

          <CounterItem
            value={1000000}
            label="Ad Spend Managed"
            subtext="Across Meta & Google Ads"
            prefix="₹"
            suffix="+"
            delay={400}
          />
        </div>

        {/* Secondary Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mt-5 md:mt-6">
          <div className="results-card flex flex-col items-start p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308]/30 transition-all duration-300">
            <span className="text-white text-5xl md:text-6xl font-black mb-3 tracking-[-0.04em]">
              100%
            </span>
            <h3 className="text-white text-lg font-bold mb-1">
              PageSpeed Scores
            </h3>
            <p className="text-[#666666] text-sm font-medium">
              Always 100/100 performance
            </p>
          </div>

          <div className="results-card flex flex-col items-start p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308]/30 transition-all duration-300">
            <span className="text-white text-5xl md:text-6xl font-black mb-3 tracking-[-0.04em]">
              24/7
            </span>
            <h3 className="text-white text-lg font-bold mb-1">
              WhatsApp Support
            </h3>
            <p className="text-[#666666] text-sm font-medium">
              Direct founder availability
            </p>
          </div>

          <div className="results-card flex flex-col items-start p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308]/30 transition-all duration-300">
            <span className="text-white text-5xl md:text-6xl font-black mb-3 tracking-[-0.04em]">
              Complete
            </span>
            <h3 className="text-white text-lg font-bold mb-1">
              Digital Transformation
            </h3>
            <p className="text-[#666666] text-sm font-medium">
              For Khemji Wire Company
            </p>
          </div>
        </div>

        {/* Value strip — clip-path masked */}
        <div className="results-strip mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-xl border border-[#1A1A1A]" style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}>
          {[
            { k: "<1s", v: "Load times" },
            { k: "0", v: "Platform fees" },
            { k: "100/100", v: "PageSpeed" },
            { k: "AEO+GEO", v: "AI-search ready" },
          ].map((s) => (
            <div key={s.v} className="px-6 py-5 bg-[#0A0A0A]">
              <div className="text-white text-lg md:text-2xl font-bold tracking-tight">{s.k}</div>
              <div className="text-white/50 text-[11px] md:text-xs uppercase tracking-wider mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
