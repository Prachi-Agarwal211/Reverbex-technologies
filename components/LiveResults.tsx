"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function CounterItem({
  value,
  label,
  subtext,
  suffix = "",
  prefix = ""
}: {
  value: number;
  label: string;
  subtext: string;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 1500;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
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
  }, [value]);

  return (
    <div
      ref={elementRef}
      className="flex flex-col items-start p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308]/20 transition-all duration-300"
    >
      <span
        className="text-[#EAB308] text-5xl md:text-6xl font-black mb-3 tracking-tighter tabular-nums"
        style={{ fontFamily: "var(--font-heading), sans-serif" }}
      >
        {prefix}{count.toLocaleString()}{suffix}
      </span>
      <h3
        className="text-white text-lg font-bold mb-1"
        style={{ fontFamily: "var(--font-heading), sans-serif" }}
      >
        {label}
      </h3>
      <p
        className="text-[#666666] text-sm font-medium"
        style={{ fontFamily: "var(--font-body), sans-serif" }}
      >
        {subtext}
      </p>
    </div>
  );
}

export default function LiveResults() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".results-reveal",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="results"
      className="w-full py-24 bg-[#050505] border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16 md:mb-20 max-w-2xl">
          <span
            className="results-reveal text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            Proof
          </span>
          <h2
            className="results-reveal text-white text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.0] mb-6"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            Real Results. Real Numbers.
          </h2>
          <p
            className="results-reveal text-[#A0A0A0] text-lg font-normal leading-relaxed"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            Updated monthly. No vanity metrics. Just direct business impact generated for our clients.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <CounterItem
            value={500}
            label="Leads Generated"
            subtext="For MAAC Animation Jaipur"
            suffix="+"
          />

          <CounterItem
            value={300000}
            label="Revenue Generated"
            subtext="For Aarya Clothing"
            prefix="₹"
            suffix="+"
          />

          {/* Text-based item */}
          <div className="flex flex-col items-start p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308]/20 transition-all duration-300">
            <span
              className="text-[#EAB308] text-5xl md:text-6xl font-black mb-3 tracking-tighter"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              Complete
            </span>
            <h3
              className="text-white text-lg font-bold mb-1"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              Digital Transformation
            </h3>
            <p
              className="text-[#666666] text-sm font-medium"
              style={{ fontFamily: "var(--font-body), sans-serif" }}
            >
              For Khemji Wire Company
            </p>
          </div>

          <CounterItem
            value={1000000}
            label="Ad Spend Managed"
            subtext="Across Meta & Google Ads"
            prefix="₹"
            suffix="+"
          />

          <div className="flex flex-col items-start p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308]/20 transition-all duration-300">
            <span
              className="text-[#EAB308] text-5xl md:text-6xl font-black mb-3 tracking-tighter"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              100%
            </span>
            <h3
              className="text-white text-lg font-bold mb-1"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              PageSpeed Scores
            </h3>
            <p
              className="text-[#666666] text-sm font-medium"
              style={{ fontFamily: "var(--font-body), sans-serif" }}
            >
              Always 100/100 performance
            </p>
          </div>

          <div className="flex flex-col items-start p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308]/20 transition-all duration-300">
            <span
              className="text-[#EAB308] text-5xl md:text-6xl font-black mb-3 tracking-tighter"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              24/7
            </span>
            <h3
              className="text-white text-lg font-bold mb-1"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              WhatsApp Support
            </h3>
            <p
              className="text-[#666666] text-sm font-medium"
              style={{ fontFamily: "var(--font-body), sans-serif" }}
            >
              Direct founder availability
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
