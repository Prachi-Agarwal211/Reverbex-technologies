"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once globally at module level
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isTouchDevice = typeof window !== "undefined" && (
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    );

    if (isTouchDevice) {
      console.log("SmoothScroll: Touch device detected - skipping Lenis initialization");
      // On touch devices, GSAP ScrollTrigger still works natively
      // Just refresh after fonts load to ensure correct positions
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
      return;
    }

    console.log("SmoothScroll mounted - initializing Lenis for pointer device");

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Expose lenis globally for programmatic scrolling
    (window as any).lenis = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's default lag smoothing for smoother animations
    gsap.ticker.lagSmoothing(0);

    // CRITICAL: Refresh ScrollTrigger after fonts and images load
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
      // Extra refresh after 300ms for late assets
      setTimeout(() => ScrollTrigger.refresh(), 300);
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      console.log("SmoothScroll unmounted - Lenis destroyed");
    };
  }, []);

  return <>{children}</>;
}
