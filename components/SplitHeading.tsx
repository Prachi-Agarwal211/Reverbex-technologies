"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface SplitHeadingProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

/**
 * SplitHeading - Character-split animated heading
 * Each character is wrapped in a span for individual animation
 */
export default function SplitHeading({ text, className = "", style, onComplete }: SplitHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = charRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (chars.length === 0) return;

    // Entrance animation: staggered fade up with clip-path reveal
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      },
    });

    tl.fromTo(
      chars,
      {
        y: 80,
        opacity: 0,
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
        rotateX: -45,
      },
      {
        y: 0,
        opacity: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        rotateX: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: "power4.out",
      }
    );

    return () => {
      tl.kill();
    };
  }, [onComplete, text]);

  // Split text into words, then characters
  const words = text.split(" ");

  return (
    <h2 ref={containerRef} className={className} style={style}>
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-block whitespace-nowrap mr-[0.3em] overflow-hidden p-1 -m-1"
        >
          {word.split("").map((char, charIndex) => (
            <span
              key={`${wordIndex}-${charIndex}`}
              ref={(el) => {
                charRefs.current[wordIndex * 10 + charIndex] = el;
              }}
              className="hero-char inline-block"
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}
