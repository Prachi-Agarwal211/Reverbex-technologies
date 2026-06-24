"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollDirection } from "@/lib/hooks/useScrollDirection";

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const isVisible = useScrollDirection();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-transform duration-500 pointer-events-none ${
        isVisible ? "translate-y-0" : "-translate-y-full"
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
            src="/reverbex logo.png"
            alt="Reverbex"
            width={140}
            height={40}
            className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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
