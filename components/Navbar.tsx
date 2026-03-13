"use client";

import { useState, useEffect, useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence, useScroll } from "framer-motion";

const navLinks = [
    { name: "Home", to: "home" },
    { name: "Solutions", to: "services" },
    { name: "Process", to: "process" },
    { name: "Experience", to: "experience" },
    { name: "Founders", to: "founders" },
    { name: "Contact", to: "contact" },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const { scrollYProgress } = useScroll();
    
    // THROTTLED SCROLL HANDLER - Prevents scroll jank
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const sections = ["home", "services", "process", "experience", "founders", "contact"];
        
        // Use IntersectionObserver instead of scroll event for better performance
        const observers = new Map();
        
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px", // Triggers when section is in the top 40% of viewport
            threshold: 0
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                observer.observe(element);
                observers.set(section, element);
            }
        });

        // Fallback polling to catch dynamically loaded sections
        const pollInterval = setInterval(() => {
            sections.forEach(section => {
                if (!observers.has(section)) {
                    const element = document.getElementById(section);
                    if (element) {
                        observer.observe(element);
                        observers.set(section, element);
                    }
                }
            });
        }, 1000);

        return () => {
            observer.disconnect();
            clearInterval(pollInterval);
        };
    }, []);

    return (
        <>
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 pearl-bg origin-left z-[60]"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Static Navbar - Fixed position to prevent layout shift */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 w-full z-50 bg-transparent py-6 mix-blend-difference"
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

                    {/* Logo */}
                    <a href="#" className="flex items-center gap-3 hover:opacity-80 transition-opacity z-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logo.PNG" alt="Reverbex Technologies Logo" className="h-10 md:h-14 w-auto object-contain" />
                        <span className="text-xl md:text-2xl font-bold tracking-tighter hidden sm:block text-white">
                            Reverbex Technologies
                        </span>
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <ScrollLink
                                key={link.name}
                                to={link.to}
                                smooth={true}
                                duration={500}
                                offset={-80}
                                className={`relative text-sm font-medium cursor-pointer transition-colors tracking-wide ${
                                    activeSection === link.to ? "text-white" : "text-white/70 hover:text-white"
                                }`}
                            >
                                {link.name}
                                {activeSection === link.to && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 pearl-bg rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </ScrollLink>
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(34, 211, 238, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="pearl-bg text-black px-6 py-2 rounded-full text-sm font-bold"
                        >
                            Get Started
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="space-y-1.5">
                            <span className={`block w-6 h-0.5 bg-white transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`block w-6 h-0.5 bg-white transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`block w-6 h-0.5 bg-white transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </div>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <ScrollLink
                                key={link.name}
                                to={link.to}
                                smooth={true}
                                duration={500}
                                offset={-80}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-bold text-white/80 hover:text-white cursor-pointer"
                            >
                                {link.name}
                            </ScrollLink>
                        ))}
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="mt-8 text-sm uppercase tracking-widest text-white/40 hover:text-white"
                            aria-label="Close menu"
                        >
                            Close
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
