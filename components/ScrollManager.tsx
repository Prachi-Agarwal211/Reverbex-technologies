"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

interface ScrollManagerProps {
    children: React.ReactNode[];
}

export default function ScrollManager({ children }: ScrollManagerProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const totalSlides = children.length;
    const touchStartY = useRef<number | null>(null);

    // Constants
    const SCROLL_COOLDOWN = 1200; // Slower cooldown for cinematic feel

    // Variants for the "Cinematic Stack" effect
    const variants = {
        // The slide is waiting below the screen (Next)
        enter: {
            y: "100%",
            scale: 1,
            opacity: 1,
            zIndex: 20,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        },
        // The slide is fully visible (Active)
        center: {
            y: 0,
            scale: 1,
            opacity: 1,
            zIndex: 10,
            filter: "brightness(1) blur(0px)",
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        },
        // The slide has moved up and RECEDED into the background (Previous)
        exit: {
            y: -100, // Slight parallax move up
            scale: 0.9, // Recede depth
            opacity: 0, // Fade out to black/transparent
            zIndex: 0,
            filter: "brightness(0.4) blur(10px)", // Cinematic blurring
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const scrollToSlide = useCallback((index: number) => {
        if (index < 0 || index >= totalSlides) return;

        setIsScrolling(true);
        setCurrentSlide(index);

        // Unlock after animation
        setTimeout(() => {
            setIsScrolling(false);
        }, SCROLL_COOLDOWN);
    }, [totalSlides]);

    // Wheel Handler
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            if (isScrolling) return;
            if (Math.abs(e.deltaY) < 30) return; // Threshold

            if (e.deltaY > 0) {
                scrollToSlide(currentSlide + 1);
            } else if (e.deltaY < 0) {
                scrollToSlide(currentSlide - 1);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isScrolling) return;
            if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
                e.preventDefault();
                scrollToSlide(currentSlide + 1);
            } else if (e.key === "ArrowUp" || e.key === "PageUp") {
                e.preventDefault();
                scrollToSlide(currentSlide - 1);
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentSlide, isScrolling, scrollToSlide]);

    // Touch Handler
    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            // Allow native scrolling, just track for end event
        };

        const isScrollable = (element: HTMLElement | null, direction: 'up' | 'down'): boolean => {
            if (!element || element === document.body) return false;

            const style = window.getComputedStyle(element);
            const overflowY = style.overflowY;
            const isScrollContainer = overflowY === 'auto' || overflowY === 'scroll';

            if (isScrollContainer) {
                if (direction === 'down') { // swiping up to scroll down
                    // Check if can scroll more down
                    return element.scrollTop + element.clientHeight < element.scrollHeight - 1;
                } else { // swiping down to scroll up
                    // Check if can scroll more up
                    return element.scrollTop > 0;
                }
            }

            return isScrollable(element.parentElement, direction);
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!touchStartY.current || isScrolling) return;

            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY.current - touchEndY;
            const SWIPE_THRESHOLD = 50;

            if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
                const direction = deltaY > 0 ? 'down' : 'up'; // 'down' means content moves up (swipe up)

                // START SMART LOGIC: Check if we are scrolling internal content
                // We pass the inverse direction to isScrollable because:
                // Swipe UP (deltaY > 0) -> we want to scroll DOWN the content
                const target = e.target as HTMLElement;
                const scrollingContent = isScrollable(target, direction);

                if (!scrollingContent) {
                    if (deltaY > 0) {
                        scrollToSlide(currentSlide + 1);
                    } else {
                        scrollToSlide(currentSlide - 1);
                    }
                }
            }
            touchStartY.current = null;
        };

        // Use passive: false to allow preventing default if we wanted to block scroll, 
        // but here we WANT native scroll, so passive: true is fine.
        // We rely on the fact that if native scroll happens, we don't switch slides (logic above).
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [currentSlide, isScrolling, scrollToSlide]);

    // Logic to determine which variant a slide should have
    const getSlideVariant = (index: number) => {
        if (index === currentSlide) return "center";
        if (index > currentSlide) return "enter";
        return "exit";
    };

    return (
        <div className="fixed inset-0 overflow-hidden bg-transparent text-white">
            {children.map((child, i) => (
                <motion.div
                    key={i}
                    custom={i}
                    initial="enter" // Start all slides as "entered" (below screen)
                    animate={getSlideVariant(i)}
                    variants={variants}
                    className="absolute inset-0 w-full h-full will-change-transform overflow-y-auto md:overflow-hidden overscroll-contain"
                    style={{
                        // Only render meaningful content for nearby slides to save GPU
                        display: Math.abs(currentSlide - i) <= 1 ? 'block' : 'none'
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </div>
    );
}
