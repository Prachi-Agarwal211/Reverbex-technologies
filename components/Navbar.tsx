"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { name: "Home", to: "home" },
  { name: "Services", to: "services" },
  { name: "Capabilities", to: "capabilities" },
  { name: "Founders", to: "founders" },
  { name: "Contact", to: "contact" },
];

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });
  }
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 cursor-pointer"
            aria-label="Reverbex Technologies - Home"
          >
            <Image
              src="/logo.PNG"
              alt="Reverbex"
              width={36}
              height={36}
              className="h-9 w-auto object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span
              className="text-2xl text-white font-bold"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Reverbex
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.to)}
                className="text-white/80 hover:text-white text-sm font-medium cursor-pointer transition-colors"
                aria-label={`Navigate to ${link.name} section`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-white transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 md:hidden"
          role="dialog"
          aria-label="Mobile navigation menu"
          aria-modal="true"
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                scrollToSection(link.to);
                setMobileMenuOpen(false);
              }}
              className="text-white text-2xl font-medium cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
