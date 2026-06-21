"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToSection } from "@/lib/scrollToSection";

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) return null;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 pointer-events-none ${
        isScrolled ? "bg-black/0" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 py-6 md:py-8 flex items-center justify-between pointer-events-auto">
        {/* Logo ONLY - The Menu button is handled by MorphingMenu.tsx */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="Reverbex Technologies - Home"
        >
          <Image
            src="/logo.PNG"
            alt="Reverbex"
            width={32}
            height={32}
            className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <span
            className="text-lg text-white font-semibold tracking-tight"
          >
            REVERBEX
          </span>
        </Link>
      </div>
    </nav>
  );
}
