"use client";

import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Services", to: "services" },
    { name: "Tech Stack", to: "tech" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-4"
                    : "bg-transparent py-6"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

                    {/* Logo */}
                    <a href="#" className="font-syne text-xl md:text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
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
                                className="text-white/70 hover:text-white text-sm font-medium cursor-pointer transition-colors tracking-wide"
                            >
                                {link.name}
                            </ScrollLink>
                        ))}
                        <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
                            Get Started
                        </button>
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
                                className="text-2xl font-syne font-bold text-white/80 hover:text-white cursor-pointer"
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
