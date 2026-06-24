"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollDirection({ threshold = 10 }: { threshold?: number } = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;

      // Always show near top
      if (scrollY < threshold) {
        setIsVisible(true);
      } else if (scrollY > lastScrollY.current && scrollY - lastScrollY.current > threshold) {
        // Scrolling down
        setIsVisible(false);
      } else if (lastScrollY.current - scrollY > threshold) {
        // Scrolling up
        setIsVisible(true);
      }

      lastScrollY.current = scrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return isVisible;
}
