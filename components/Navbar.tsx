"use client";

import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence, useScroll } from "framer-motion";

const navLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Services", to: "services" },
    { name: "Tech Stack", to: "tech" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const handleScroll = () => {
            // Track active section
            const sections = ["home", "projects", "about", "services", "tech", "contact"];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 pearl-bg origin-left z-[60]"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Static Navbar - Scrolls with page */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full z-50 bg-transparent py-6"
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

                    {/* Logo */}
                    <a href="#" className="text-xl md:text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
                        Reverbex Technologies
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <ScrollLink
                                key={link.name}
                                to={link.to}
                                smooth={true}
                                duration={500}
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
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-bold text-white/80 hover:text-white cursor-pointer"
                            >
                                {link.name}
                            </ScrollLink>
                        ))}
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="mt-8 text-sm uppercase tracking-widest text-white/40 hover:text-white"
                        >
                            Close
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
