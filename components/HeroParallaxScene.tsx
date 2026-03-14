"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function HeroParallaxScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for the image layers
  const baseRef = useRef<HTMLImageElement>(null);
  const midRef = useRef<HTMLImageElement>(null);
  const frontRef = useRef<HTMLImageElement>(null);

  // Ref for the dynamic lighting glow
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create quick setters for optimal performance with GSAP
    const xBase = gsap.quickTo(baseRef.current, "x", { duration: 0.8, ease: "power3" });
    const yBase = gsap.quickTo(baseRef.current, "y", { duration: 0.8, ease: "power3" });

    const xMid = gsap.quickTo(midRef.current, "x", { duration: 0.5, ease: "power3" });
    const yMid = gsap.quickTo(midRef.current, "y", { duration: 0.5, ease: "power3" });

    const xFront = gsap.quickTo(frontRef.current, "x", { duration: 0.3, ease: "power4" });
    const yFront = gsap.quickTo(frontRef.current, "y", { duration: 0.3, ease: "power4" });

    // Light effect quick setters
    const xLight = gsap.quickTo(lightRef.current, "x", { duration: 0.2, ease: "power2" });
    const yLight = gsap.quickTo(lightRef.current, "y", { duration: 0.2, ease: "power2" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate normalized mouse coordinates (-1 to 1) relative to center
      const xPos = (clientX / innerWidth) * 2 - 1;
      const yPos = (clientY / innerHeight) * 2 - 1;

      // Base layer moves slightly in the opposite direction
      xBase(xPos * -10);
      yBase(yPos * -5);

      // Mid layer moves slightly with the cursor
      xMid(xPos * 30);
      yMid(yPos * 15);

      // Front layer (monolith) pops a lot with the cursor
      xFront(xPos * 80);
      yFront(yPos * 40);

      // Dynamic light directly tracks mouse with an offset to center the glow
      xLight(clientX - 300); // 300 is half the width/height of the light div
      yLight(clientY - 300);
    };

    const handleMouseLeave = () => {
      // Reset positions to center when mouse leaves
      xBase(0); yBase(0);
      xMid(0); yMid(0);
      xFront(0); yFront(0);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto"
      style={{ zIndex: 0 }}
    >
      {/* Dynamic Lighting Glow */}
      <div 
        ref={lightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-teal-500/20 blur-[120px] pointer-events-none mix-blend-screen"
        style={{ transform: "translate(-1000px, -1000px)" }} // Start off-screen
      />

      {/* Layer 1: Base (parallax-mid.png / earlier "Untitled (1).png") */}
      <div className="absolute inset-[-5%] w-[110%] h-[110%]">
        <Image
          ref={baseRef}
          src="/parallax-mid.png"
          alt="Background Layer"
          fill
          className="object-cover opacity-60 pointer-events-none origin-bottom"
          priority
        />
      </div>

      {/* Layer 2: Mid (parallax-front.png / earlier "Untitled.png") */}
      <div className="absolute inset-[-5%] w-[110%] h-[110%]">
        <Image
          ref={midRef}
          src="/parallax-front.png"
          alt="Middle Layer"
          fill
          className="object-cover opacity-80 pointer-events-none origin-bottom"
          priority
        />
      </div>

      {/* Layer 3: Front (monolith.png) */}
      <div className="absolute inset-[5%] w-[90%] h-[90%] flex items-center justify-center">
        <Image
          ref={frontRef}
          src="/monolith.png"
          alt="Monolith Foreground"
          fill
          className="object-contain pointer-events-none origin-bottom drop-shadow-[0_20px_50px_rgba(34,211,238,0.2)]"
          priority
        />
      </div>
      
      {/* Ground fog/gradient to blend the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
    </div>
  );
}
