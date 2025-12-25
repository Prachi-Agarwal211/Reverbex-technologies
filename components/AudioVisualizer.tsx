"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudioSafe } from "./AudioContext";

export default function AudioVisualizer() {
    const audio = useAudioSafe();
    const [mounted, setMounted] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
    const hasAttemptedAutoplay = useState(false); // Ref refactored to state to force render if needed, but actually ref is better for logic. Let's stick to the plan.
    // actually, let's use a ref for the "has attempted" flag so we don't re-render unnecessarily
    const autoplayAttempted = useRef(false);

    useEffect(() => {
        setMounted(true);
        // Load autoplay preference
        const stored = localStorage.getItem("audio_autoplay");
        if (stored !== null) {
            setAutoPlayEnabled(stored === "true");
        }
    }, []);

    // Autoplay logic
    useEffect(() => {
        if (mounted && audio && !audio.isPlaying && !autoplayAttempted.current) {
            autoplayAttempted.current = true; // Mark as attempted immediately

            if (autoPlayEnabled) {
                // Small delay to ensure audio context is ready
                const timer = setTimeout(() => {
                    audio.togglePlay();
                }, 1500);
                return () => clearTimeout(timer);
            }
        }
    }, [mounted, audio, autoPlayEnabled]);

    const toggleAutoplay = () => {
        const newValue = !autoPlayEnabled;
        setAutoPlayEnabled(newValue);
        localStorage.setItem("audio_autoplay", String(newValue));
    };

    if (!mounted || !audio) return null;

    const {
        isPlaying,
        volume,
        frequencyData,
        togglePlay,
        setVolume,
        isBeat,
        bassIntensity
    } = audio;

    // Calculate pulse intensity based on bass
    const pulseScale = 1 + (bassIntensity / 255) * 0.15;

    return (
        <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
        >
            {/* Expanded Panel */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-20 right-0 w-64 p-4 rounded-2xl border border-white/20"
                        style={{
                            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                            backdropFilter: "blur(20px)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
                        }}
                    >
                        {/* Song Info */}
                        <div className="mb-4">
                            <div className="text-sm font-semibold text-white truncate">What A Life</div>
                            <div className="text-xs text-white/50 truncate">John Summit, Guz ft. Stevie Appleton</div>
                        </div>

                        {/* Autoplay Toggle */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs text-white/60">Autoplay</span>
                            <button
                                onClick={toggleAutoplay}
                                className={`w-8 h-4 rounded-full transition-colors duration-200 relative ${autoPlayEnabled ? 'bg-cyan-400' : 'bg-white/20'
                                    }`}
                            >
                                <div
                                    className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform duration-200 ${autoPlayEnabled ? 'left-4.5 translate-x-0' : 'left-0.5'
                                        }`}
                                    style={{ left: autoPlayEnabled ? '1.125rem' : '0.125rem' }}
                                />
                            </button>
                        </div>

                        {/* Volume Slider */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-white/40">
                                <span>Volume</span>
                                <span>{Math.round(volume * 100)}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(90deg, 
                                        rgba(255,255,255,0.8) 0%, 
                                        rgba(200,200,220,0.6) ${volume * 100}%, 
                                        rgba(255,255,255,0.1) ${volume * 100}%, 
                                        rgba(255,255,255,0.1) 100%)`
                                }}
                            />
                        </div>

                        {/* Mini Visualizer */}
                        <div className="mt-4 h-8 flex items-end justify-center gap-[2px]">
                            {frequencyData.slice(0, 24).map((value, index) => (
                                <div
                                    key={index}
                                    className="w-[8px] rounded-t-sm"
                                    style={{
                                        height: `${Math.max(2, (value / 255) * 100)}%`,
                                        background: "linear-gradient(to top, rgba(255,255,255,0.4), rgba(255,255,255,0.8))",
                                        opacity: 0.5 + (value / 255) * 0.5
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Play/Pause Button - Pearl Theme */}
            <motion.button
                onClick={togglePlay}
                onContextMenu={(e) => { e.preventDefault(); setExpanded(!expanded); }}
                className="relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer group"
                style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(220,220,230,0.9) 50%, rgba(255,255,255,0.85) 100%)",
                    boxShadow: isBeat
                        ? "0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(34,211,238,0.4), inset 3px 3px 6px rgba(255,255,255,1), inset -3px -3px 6px rgba(0,0,0,0.3)"
                        : "0 6px 12px -2px rgba(0,0,0,0.4), inset 3px 3px 6px rgba(255,255,255,1), inset -3px -3px 6px rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.5)"
                }}
                animate={{
                    scale: isPlaying ? pulseScale : 1,
                }}
                transition={{ duration: 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Pearl shimmer overlay */}
                <div
                    className="absolute inset-0 rounded-full opacity-50 pointer-events-none"
                    style={{
                        background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
                    }}
                />

                {/* Icon */}
                {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1a1a2e" viewBox="0 0 16 16">
                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1a1a2e" viewBox="0 0 16 16">
                        <path d="M6.271 5.055a.5.5 0 0 1 .52.038l4 3a.5.5 0 0 1 0 .814l-4 3A.5.5 0 0 1 6 11.5v-6a.5.5 0 0 1 .271-.445z" />
                    </svg>
                )}

                {/* Expand hint */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] text-white/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Right-click for options
                </div>
            </motion.button>

            {/* Audio reactive ring */}
            {isPlaying && (
                <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                        border: "2px solid rgba(255,255,255,0.3)",
                    }}
                    animate={{
                        scale: [1, 1.3, 1.5],
                        opacity: [0.5, 0.2, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut"
                    }}
                />
            )}
        </motion.div>
    );
}