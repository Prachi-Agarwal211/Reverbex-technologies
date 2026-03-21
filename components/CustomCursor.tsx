"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type CursorVariant = "DEFAULT" | "HOVER" | "VIDEO" | "LINK" | "TEXT";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const currentVariantRef = useRef<CursorVariant>("DEFAULT");
  const isMountedRef = useRef(false);
  const [isClient, setIsClient] = useState(false);

  // Check if we should render - only on fine pointer devices
  const shouldRender = isClient && !window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!cursor || !dot || !ring) return;

    isMountedRef.current = true;

    // Initial setup
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { scale: 1 });
    gsap.set(dot, { scale: 1 });

    // Smooth cursor following with lag
    const moveCursor = (e: MouseEvent) => {
      if (!isMountedRef.current) return;
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    document.addEventListener("mousemove", moveCursor);

    // Cursor variant detection - only for elements with specific classes/data attributes
    const handleMouseOver = (e: MouseEvent) => {
      if (!isMountedRef.current) return;
      
      const target = e.target as HTMLElement;
      
      // Check for data-cursor attribute
      const cursorType = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      
      // Check for specific classes
      const isMagnetic = target.closest(".magnetic");
      const isVideo = target.closest("[data-cursor-video]");
      const isLink = target.closest("a[href^='http']");
      const isInteractive = target.closest("button, a, [role='button']");

      if (cursorType === "text") {
        setVariant("TEXT");
      } else if (isVideo) {
        setVariant("VIDEO");
      } else if (isLink) {
        setVariant("LINK");
      } else if (isMagnetic || isInteractive) {
        setVariant("HOVER");
      } else {
        setVariant("DEFAULT");
      }
    };

    const handleMouseOut = () => {
      if (!isMountedRef.current) return;
      setVariant("DEFAULT");
    };

    // Add listeners to document for delegated events
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // Variant setter
    function setVariant(variant: CursorVariant) {
      if (!isMountedRef.current) return;
      if (currentVariantRef.current === variant) return;
      currentVariantRef.current = variant;

      switch (variant) {
        case "DEFAULT":
          // 4px dot + 32px ring with border
          gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
          gsap.to(ring, { 
            scale: 1, 
            backgroundColor: "transparent",
            borderColor: "rgba(255, 255, 255, 0.3)",
            duration: 0.3, 
            ease: "power2.out" 
          });
          break;

        case "HOVER":
          // Ring expands to 56px, fills with rgba(255,255,255,0.08), dot shrinks to 0
          gsap.to(dot, { scale: 0, duration: 0.3, ease: "power2.out" });
          gsap.to(ring, { 
            scale: 1.75, // 32px * 1.75 = 56px
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            borderColor: "rgba(255, 255, 255, 0.2)",
            duration: 0.3, 
            ease: "power2.out" 
          });
          break;

        case "VIDEO":
          // Ring expands to 80px
          gsap.to(dot, { scale: 0.5, duration: 0.3, ease: "power2.out" });
          gsap.to(ring, { 
            scale: 2.5, // 32px * 2.5 = 80px
            backgroundColor: "transparent",
            borderColor: "rgba(255, 255, 255, 0.15)",
            duration: 0.3, 
            ease: "power2.out" 
          });
          break;

        case "LINK":
          // Ring gets yellow border
          gsap.to(dot, { scale: 0, duration: 0.3, ease: "power2.out" });
          gsap.to(ring, { 
            scale: 1.75,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            borderColor: "rgba(234, 179, 8, 0.6)",
            duration: 0.3, 
            ease: "power2.out" 
          });
          break;

        case "TEXT":
          // Vertical bar cursor (2px × 24px)
          gsap.to(dot, { 
            scale: 0, 
            duration: 0.2, 
            ease: "power2.out" 
          });
          gsap.to(ring, { 
            scale: 0,
            duration: 0.2, 
            ease: "power2.out" 
          });
          break;
      }
    }

    return () => {
      isMountedRef.current = false;
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [shouldRender]);

  // Don't render on coarse pointer devices (mobile/touch)
  if (!shouldRender) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
      style={{ willChange: "transform" }}
    >
      {/* 4px center dot */}
      <div
        ref={dotRef}
        className="w-1 h-1 bg-white rounded-full"
        style={{ transformOrigin: "center" }}
      />
      {/* 32px outer ring */}
      <div
        ref={ringRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/30"
        style={{ 
          transformOrigin: "center",
          willChange: "transform, background-color, border-color"
        }}
      />
    </div>
  );
}
