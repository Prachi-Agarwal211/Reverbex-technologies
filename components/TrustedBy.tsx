"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface Partner {
  name: string;
  src: string;
  accentColor: string;
}

const basePartners: Partner[] = [
  { name: "Aarya Clothing",  src: "/aarya clothing logo.png",  accentColor: "#EAB308" },
  { name: "Shipbridge",      src: "/shipbridge logo.png",      accentColor: "#0EA5E9" },
  { name: "Khemji Wire Co.", src: "/khemji logo.png",          accentColor: "#10B981" },
  { name: "MAAC Animation",  src: "/maac logo.png",            accentColor: "#3B82F6" },
];

const partners = [...basePartners, ...basePartners, ...basePartners];

export default function TrustedBy() {
  const [activeIndex, setActiveIndex] = useState(Math.floor(partners.length / 2));

  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + partners.length) % partners.length);

  const handleNext = useCallback(
    () => setActiveIndex((prev) => (prev + 1) % partners.length),
    []
  );

  useEffect(() => {
    const interval = setInterval(handleNext, 3200);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <section
      className="relative w-full h-full flex flex-col justify-center z-20"
      aria-label="Trusted by partners"
    >
      {/* Blue-tinted ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      {/* Section heading */}
      <div className="text-center px-6 z-10 relative mb-10 md:mb-14">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-5 h-[1.5px] rounded" style={{ background: "linear-gradient(to right, transparent, rgba(59,130,246,0.6))" }} />
          <p className="section-label text-blue-400">Trusted By</p>
          <div className="w-5 h-[1.5px] rounded" style={{ background: "linear-gradient(to left, transparent, rgba(59,130,246,0.6))" }} />
        </div>
        <h2 className="section-heading text-white mb-3">
          Built for{" "}
          <span className="text-gradient-gold">Visionaries</span>.
        </h2>
        <p className="text-xs text-white/40 max-w-sm mx-auto leading-relaxed">
          Partnering with bold brands to build, grow, and lead in the digital era.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative w-full max-w-6xl mx-auto px-4 md:px-12 flex items-center justify-center min-h-[320px] md:min-h-[360px]">
        {/* Prev arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous partner"
          className="absolute left-2 md:left-8 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
            color: "rgba(255,255,255,0.4)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.15)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.4)";
            (e.currentTarget as HTMLElement).style.color = "#60A5FA";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.10)";
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Card track */}
        <div className="relative w-full max-w-[820px] h-[300px] md:h-[340px] flex items-center justify-center" style={{ perspective: "1200px" }}>
          {partners.map((partner, index) => {
            let diff = index - activeIndex;
            if (diff > Math.floor(partners.length / 2)) diff -= partners.length;
            if (diff < -Math.floor(partners.length / 2)) diff += partners.length;
            const absDiff = Math.abs(diff);
            if (absDiff > 3) return null;

            const isActive = diff === 0;
            const translateX = diff * 145;
            const scale = isActive ? 1 : Math.max(0.65, 1 - absDiff * 0.16);
            const opacity = isActive ? 1 : Math.max(0.25, 0.75 - absDiff * 0.22);
            const rotateY = diff * -14;

            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 transition-all duration-500 ease-out"
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                  zIndex: 10 - absDiff,
                  opacity,
                }}
              >
                <div
                  className="relative flex flex-col items-center justify-center rounded-2xl overflow-hidden"
                  style={{
                    width: isActive ? "240px" : "200px",
                    height: isActive ? "280px" : "240px",
                    background: isActive
                      ? `linear-gradient(135deg, ${partner.accentColor}12 0%, rgba(3,5,15,0.92) 70%)`
                      : "rgba(255,255,255,0.025)",
                    border: `1px solid ${isActive ? `${partner.accentColor}35` : "rgba(255,255,255,0.07)"}`,
                    boxShadow: isActive ? `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${partner.accentColor}20` : "none",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    transition: "all 0.5s ease",
                  }}
                >
                  {/* Top accent */}
                  {isActive && (
                    <div
                      className="absolute top-0 left-6 right-6 h-[1.5px]"
                      style={{ background: `linear-gradient(90deg, transparent, ${partner.accentColor}60, transparent)` }}
                    />
                  )}
                  {/* Inner glass highlight */}
                  <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)" }} />

                  {/* Logo */}
                  <div
                    className="relative flex items-center justify-center"
                    style={{ width: "65%", height: "45%", marginBottom: isActive ? "12px" : "8px" }}
                  >
                    <Image
                      src={partner.src}
                      alt={partner.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 120px, 160px"
                    />
                  </div>

                  <span
                    className="text-center font-semibold tracking-[0.18em] uppercase text-xs transition-colors duration-300"
                    style={{ color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)" }}
                  >
                    {partner.name}
                  </span>

                  {/* Active color dot */}
                  {isActive && (
                    <div
                      className="absolute bottom-4 w-1.5 h-1.5 rounded-full"
                      style={{ background: partner.accentColor, boxShadow: `0 0 8px ${partner.accentColor}` }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Next arrow */}
        <button
          onClick={handleNext}
          aria-label="Next partner"
          className="absolute right-2 md:right-8 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
            color: "rgba(255,255,255,0.4)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.15)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.4)";
            (e.currentTarget as HTMLElement).style.color = "#60A5FA";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.10)";
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Dot indicator */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {basePartners.map((_, i) => {
          const activeDotIndex = activeIndex % basePartners.length;
          const isActiveDot = i === activeDotIndex;
          return (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: isActiveDot ? "24px" : "6px",
                height: "6px",
                background: isActiveDot ? "#EAB308" : "rgba(255,255,255,0.15)",
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
