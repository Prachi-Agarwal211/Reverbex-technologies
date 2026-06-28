"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Skip animation — just ensure container is hidden
      gsap.set(containerRef.current, { zIndex: -1, pointerEvents: "none" });
      return;
    }

    // Page Entrance GSAP Morph Wipe Animation
    // This perfectly mimics the SVG Morphing logic used in the menu!
    
    const fullPath = "M 0 0 L 0 1000 Q 500 1000 1000 1000 L 1000 0 Z"; // Covers entire screen
    const bulgeUpPath = "M 0 0 L 0 1000 Q 500 0 1000 1000 L 1000 0 Z"; // Middle curves upward like a mountain
    const hiddenPath = "M 0 0 L 0 0 Q 500 0 1000 0 L 1000 0 Z"; // Hidden at the top
    
    // Reset path immediately to block the screen
    gsap.set(pathRef.current, { attr: { d: fullPath } });
    gsap.set(containerRef.current, { zIndex: 9999, pointerEvents: "all" });

    // Animate the curtain opening up
    const tl = gsap.timeline();
    tl.to(pathRef.current, {
      attr: { d: bulgeUpPath },
      duration: 0.4,
      ease: "power2.in",
      delay: 0.1 // tiny delay to let next.js paint
    }).to(pathRef.current, {
      attr: { d: hiddenPath },
      duration: 0.5,
      ease: "power2.out"
    }).set(containerRef.current, { zIndex: -1, pointerEvents: "none" });

  }, [pathname]);

  return (
    <>
      {/* 
        This div sits at the very top z-index during route changes. 
        It blocks the screen with a solid dark grey/black background, 
        then uses GSAP to morph the SVG path upwards to reveal the new page.
      */}
      <div 
        ref={containerRef} 
        className="fixed top-0 left-0 w-full h-screen pointer-events-none" 
        style={{ zIndex: 9999 }}
      >
        <svg 
          className="absolute top-0 left-0 w-full h-[110vh]" 
          viewBox="0 0 1000 1000" 
          preserveAspectRatio="none"
        >
          <path 
            ref={pathRef}
            fill="#050505" 
            d="M 0 0 L 0 1000 Q 500 1000 1000 1000 L 1000 0 Z"
          ></path>
        </svg>
      </div>

      {children}
    </>
  );
}
