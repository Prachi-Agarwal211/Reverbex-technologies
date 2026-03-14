"use client";

import { useState, useEffect, useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";

const navLinks = [
    { name: "Home", to: "home" },
    { name: "AI Solutions", to: "services" },
    { name: "Capabilities", to: "capabilities" },
    { name: "Founders", to: "founders" },
    { name: "Contact", to: "contact" },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
        const sections = ["home", "services", "capabilities", "founders", "contact"];
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px",
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActiveSection(entry.target.id);
            });
        }, observerOptions);

        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    // Prevent hydration mismatch by returning a simplified shell or null until mounted
    if (!isMounted) return null;

    return (
        <>
            {/* CORNER UI ARCHITECTURE - Minimizes clash with central monolith */}      
            <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 w-full z-50 pointer-events-none p-4 md:p-8"
            >
                <div className="w-full h-full flex items-start justify-between">        

                    {/* IDENTITY - Top Left Corner */}
                    <Magnetic>
                        <a href="#" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-all pointer-events-auto p-2">
                            <img src="/logo.PNG" alt="Reverbex" className="h-6 md:h-10 w-auto object-contain brightness-0 invert" />
                            <span className="text-lg md:text-xl font-light tracking-tighter text-white uppercase leading-none">
                                Reverbex
                            </span>
                        </a>
                    </Magnetic>

                    {/* ACTION & MENU - Top Right Corner */}
                    <div className="flex items-center gap-8 pointer-events-auto">
                        <Magnetic>
                            <ScrollLink
                                to="contact"
                                smooth={true}
                                duration={1000}
                                className="hidden lg:block border border-white/10 text-white px-6 py-2.5 rounded-full text-[9px] font-bold tracking-[0.2em] uppercase transition-all backdrop-blur-sm bg-white/05 hover:border-white hover:bg-white hover:text-black cursor-pointer"
                            >
                                Get Started
                            </ScrollLink>
                        </Magnetic>

                        <button
                            className="group flex flex-col gap-1.5 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            <span className={`block w-6 h-[1px] bg-white transition-all duration-500 ${mobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} aria-hidden="true" />
                            <span className={`block w-6 h-[1px] bg-white transition-all duration-500 ${mobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </motion.nav>
            {/* FULLSCREEN MINIMAL MENU */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center"
                    >
                        <div className="flex flex-col items-center gap-8 md:gap-12">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * idx, duration: 0.8, ease: "circOut" }}
                                >
                                    <ScrollLink
                                        to={link.to}
                                        smooth={true}
                                        duration={500}
                                        offset={-80}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-4xl md:text-7xl font-light tracking-tighter text-white/40 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg transition-colors cursor-pointer uppercase"
                                        tabIndex={0}
                                    >
                                        {link.name}
                                    </ScrollLink>
                                </motion.div>
                            ))}
                        </div>

                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close fullscreen menu"
                            className="absolute top-12 right-12 text-[10px] uppercase tracking-[0.5em] text-white/30 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm transition-colors p-2"
                        >
                            [ Close ]
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
