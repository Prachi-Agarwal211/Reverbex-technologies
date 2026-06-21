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

// Duplicate to create a full continuous circle (12 items = 30 degree increments)
const partners = [...basePartners, ...basePartners, ...basePartners];

export default function TrustedBy() {
  const containerRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ringRef.current || typeof window === "undefined") return;

    // 1. Arrange logos in a 3D convex cylinder
    const logos = gsap.utils.toArray(".partner-card") as HTMLElement[];
    const totalLogos = logos.length;
    // Use a large radius for a gentle curve like the reference image
    const radius = window.innerWidth < 768 ? 400 : 700; 
    const angleIncrement = 360 / totalLogos;

    gsap.set(ringRef.current, { transformStyle: "preserve-3d" });

    logos.forEach((logo, i) => {
      // By setting transformOrigin to -radius on the Z axis, 
      // we push the rotation point behind the card.
      // This creates a perfect convex cylinder where the cards face outward.
      gsap.set(logo, {
        rotationY: i * angleIncrement,
        z: radius,
        transformOrigin: `50% 50% ${-radius}px`,
      });
    });

    // 2. Continuous infinite rotation
    gsap.to(ringRef.current, {
      rotationY: -360, // Rotate negatively so it spins left-to-right
      duration: 35,
      ease: "none",
      repeat: -1,
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[70vh] md:h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-transparent"
      // High perspective to make the 3D effect subtle and premium
      style={{ perspective: "1500px" }}
      aria-label="Trusted by partners"
    >
      {/* Title */}
      <div className="absolute top-24 text-center z-10 w-full px-6">
        <p className="text-[11px] tracking-[0.4em] text-[#EAB308]/80 font-medium uppercase mb-4">
          Trusted By
        </p>
        <h2 className="font-heading text-4xl md:text-6xl font-bold text-white tracking-tight">
          Visionaries
        </h2>
      </div>

      {/* 3D Ring */}
      <div 
        ref={ringRef} 
        className="relative w-full h-full flex items-center justify-center mt-20"
        style={{ transformStyle: "preserve-3d" }}
      >
        {partners.map((partner, i) => (
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
            {/* The Logo - mimicking the 3D curve layout but WITHOUT cards/backgrounds */}
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
      
      {/* Edge Gradients to smoothly blend the sides of the cylinder into the background */}
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#050505]/80 to-transparent pointer-events-none z-20 hidden md:block" />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#050505]/80 to-transparent pointer-events-none z-20 hidden md:block" />
    </section>
  );
}
