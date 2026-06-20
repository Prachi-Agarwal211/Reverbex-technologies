"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once globally at module level (ONLY place in the app)
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Skip Lenis on mobile — native momentum scrolling is better
    const isMobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    if (isMobile) return;

    // Initialize Lenis for desktop only
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Expose lenis globally for programmatic scrolling
    (window as any).lenis = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // CRITICAL FIX: Store the callback function in a variable
    // This ensures the same reference is passed to both add() and remove()
    const gsapTickerCb = (time: number) => lenis.raf(time * 1000);

    // Add Lenis to GSAP's ticker
    gsap.ticker.add(gsapTickerCb);

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
      // Use the same callback reference for removal
      gsap.ticker.remove(gsapTickerCb);
    };
  }, []);

  return <>{children}</>;
}
