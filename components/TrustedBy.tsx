"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

interface Partner {
  name: string;
  src: string;
}

const basePartners: Partner[] = [
  { name: "Aarya Clothing", src: "/aarya clothing logo.png" },
  { name: "Shipbridge", src: "/shipbridge logo.png" },
  { name: "Khemji Wire Co.", src: "/khemji logo.png" },
  { name: "MAAC Animation", src: "/maac logo.png" },
];

// Duplicate for seamless marquee (mobile) and for 3D ring (desktop)
const marqueePartners = [...basePartners, ...basePartners, ...basePartners];
const ringPartners = [...basePartners, ...basePartners, ...basePartners];

export default function TrustedBy() {
  const containerRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ringRef.current || typeof window === "undefined") return;

    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const logos = gsap.utils.toArray(".partner-card") as HTMLElement[];
    const totalLogos = logos.length;
    const radius = 700;
    const angleIncrement = 360 / totalLogos;

    gsap.set(ringRef.current, { transformStyle: "preserve-3d" });

    logos.forEach((logo, i) => {
      gsap.set(logo, {
        rotationY: i * angleIncrement,
        z: radius,
        transformOrigin: `50% 50% ${-radius}px`,
      });
    });

    // Continuous rotation — never pauses
    gsap.to(ringRef.current, {
      rotationY: -360,
      duration: 35,
      ease: "none",
      repeat: -1,
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-transparent"
      aria-label="Trusted by partners"
    >
      {/* Section heading */}
      <div className="text-center pt-20 md:pt-28 pb-8 md:pb-0 px-6 z-10 relative">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          Trusted By <span className="font-heading">Visionaries</span>
        </h2>
      </div>

      {/* ===== DESKTOP: 3D Ring ===== */}
      <div
        className="hidden md:flex relative w-full h-[70vh] lg:h-[85vh] items-center justify-center"
        style={{ perspective: "1500px" }}
      >
        <div
          ref={ringRef}
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {ringPartners.map((partner, i) => (
            <div
              key={i}
              className="partner-card absolute top-1/2 left-1/2 flex flex-col items-center justify-center"
              style={{
                width: "280px",
                height: "320px",
                marginTop: "-160px",
                marginLeft: "-140px",
              }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-8 transition-transform duration-500 hover:scale-110">
                <div className="relative w-full h-[60%] pointer-events-none flex items-center justify-center">
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    sizes="280px"
                  />
                </div>
                <span className="mt-8 text-white/50 text-xs font-bold tracking-[0.3em] uppercase">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== MOBILE: CSS Marquee (no 3D transforms = no overflow bug) ===== */}
      <div className="flex md:hidden w-full py-12 overflow-hidden">
        <div
          className="flex items-center gap-10 animate-marquee-left"
          style={{ minWidth: "max-content" }}
        >
          {marqueePartners.map((partner, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 px-4 shrink-0"
            >
              <div className="relative w-24 h-16">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>
              <span className="text-white/40 text-[9px] font-bold tracking-[0.2em] uppercase whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
