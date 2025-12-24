"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrambleTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export default function ScrambleText({ text, className = "", delay = 0 }: ScrambleTextProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });

    return (
        <motion.h2
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay }}
        >
            {text}
        </motion.h2>
    );
}
