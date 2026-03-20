"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * CustomCursor - Awwwards-style custom cursor with magnetic effects
 * - Small dot that follows mouse with smooth interpolation
 * - Expands on hoverable elements
 * - Hidden on touch devices
 * - GPU-accelerated for 60fps performance
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Detect touch devices
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    if (isTouch) return;

    // Cursor state
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      setIsVisible(true);

      // Immediate dot movement
      gsap.to(cursorDotRef.current, {
        x: cursorX - 8,
        y: cursorY - 8,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    // Hide cursor when leaving window
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Show cursor when entering window
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest(".cursor-pointer");

      setIsHovering(!!isHoverable);
    };

    // Attach event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    // Animate outer cursor with lag
    const animateCursor = () => {
      if (cursorRef.current) {
        const scale = isHovering ? 2.5 : 1;
        const opacity = isHovering ? 0.5 : 1;

        gsap.to(cursorRef.current, {
          x: cursorX - 20,
          y: cursorY - 20,
          scale,
          opacity,
          duration: 0.3,
          ease: "power3.out",
        });
      }
      requestAnimationFrame(animateCursor);
    };

    animateCursor();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isHovering]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      <style jsx global>{`
        /* Hide default cursor on desktop */
        @media (hover: hover) {
          body {
            cursor: none !important;
          }
          body * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Outer cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border border-white/40 pointer-events-none z-[9999] mix-blend-difference transition-colors duration-300 ${
          isHovering ? "bg-white/20 border-white/60" : "bg-transparent"
        }`}
        style={{
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
      />

      {/* Inner cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference"
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />
    </>
  );
}
