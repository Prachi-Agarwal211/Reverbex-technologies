"use client";

import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";

const navLinks = [
  { name: "Home", to: "home" },
  { name: "Services", to: "services" },
  { name: "Capabilities", to: "capabilities" },
  { name: "Founders", to: "founders" },
  { name: "Contact", to: "contact" },
];

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
          <ScrollLink
            to="home"
            smooth={true}
            duration={500}
            className="flex items-center gap-2 cursor-pointer"
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
          </ScrollLink>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.name}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-80}
                className="text-white/80 hover:text-white text-sm font-medium cursor-pointer transition-colors"
              >
                {link.name}
              </ScrollLink>
            ))}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
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
        <div className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              offset={-80}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-2xl font-medium cursor-pointer"
            >
              {link.name}
            </ScrollLink>
          ))}
        </div>
      )}
    </>
  );
}