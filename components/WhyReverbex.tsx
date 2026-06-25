"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  { stat: "100", unit: "/100", label: "PageSpeed",       line: "Score guaranteed on every project. Sub-second load — Google rewards speed.",                    color: "#3B82F6" },
  { stat: "5",   unit: "×",    label: "Faster Rankings", line: "AEO + GEO optimization. Your business cited by ChatGPT, Gemini, and Google AI.",                 color: "#EAB308" },
  { stat: "3",   unit: "×",    label: "More Conversions",line: "Conversion-first architecture. Every element exists to turn visitors into customers.",            color: "#10B981" },
  { stat: "0",   unit: "%",    label: "Platform Fees",   line: "No WordPress. No Shopify. Pure code ownership — the whole codebase is yours, forever.",          color: "#A78BFA" },
  { stat: "0",   unit: "",     label: "Templates",       line: "We charge once. No monthly fees, no transaction cuts. Pay once, own everything.",                 color: "#F472B6" },
  { stat: "247", unit: "",     label: "Support",         line: "Daily WhatsApp availability. Proactive monitoring. We don't disappear after launch.",             color: "#0EA5E9" },
];

function WhyRow({ r, index, visible }: { r: typeof reasons[0]; index: number; visible: boolean }) {
  const target = parseInt(r.stat) || 0;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const duration = 1000;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, target]);

  const displayStat = r.label === "Support" ? "24/7" : count;

  return (
    <div
      className="why-row flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 py-6 md:py-8 cursor-default"
      style={{ opacity: 0, transform: "translateY(20px)" }}
    >
      <div
        className="shrink-0 font-black leading-none tabular-nums"
        style={{
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          letterSpacing: "-0.05em",
          color: r.color,
          fontFamily: "var(--font-heading)",
          minWidth: "min(160px, 35vw)",
          filter: `drop-shadow(0 0 24px ${r.color}30)`,
        }}
      >
        {displayStat}
        {r.unit && (
          <span className="text-[55%] ml-0.5" style={{ color: `${r.color}80` }}>
            {r.unit}
          </span>
        )}
      </div>

      <div className="hidden sm:block w-px h-10 self-center" style={{ background: "rgba(255,255,255,0.07)" }} />

      <div className="flex-1">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-3 h-[1px]" style={{ background: r.color }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: `${r.color}90` }}>
            {r.label}
          </span>
        </div>
        <p className="text-sm text-white/40 leading-relaxed max-w-md">
          {r.line}
        </p>
      </div>

      <span className="hidden md:block shrink-0 text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.07)" }}>
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

export default function WhyReverbex() {
  const containerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Normal scroll reveal — no pinning!
    const rows = containerRef.current.querySelectorAll(".why-row");
    
    rows.forEach((row, i) => {
      gsap.to(row, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: row,
          start: "top 85%",
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="why-reverbex"
      className="relative w-full overflow-hidden py-24 md:py-32 z-20"
      style={{
        background: "#040810",
        backgroundImage: `
          radial-gradient(ellipse 80% 60% at 80% 20%, rgba(234,179,8,0.08) 0%, transparent 55%),
          radial-gradient(ellipse 60% 70% at 10% 60%, rgba(59,130,246,0.10) 0%, transparent 55%)
        `,
      }}
    >
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 md:px-10 relative z-10">
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-4 h-[1px] bg-yellow-400/50" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-yellow-400/60">Why Reverbex</span>
            </div>
            <h2
              className="font-black text-white leading-[0.92]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.04em", fontFamily: "var(--font-heading)" }}
            >
              Built different.<br />
              <span style={{ color: "#EAB308" }}>Priced honest.</span>
            </h2>
          </div>
          <p className="text-xs text-white/30 max-w-xs leading-relaxed md:text-right">
            We don't build websites. We engineer business growth systems — with no BS and no hidden fees.
          </p>
        </div>

        <div className="flex flex-col" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {reasons.map((r, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <WhyRow r={r} index={i} visible={visible} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
