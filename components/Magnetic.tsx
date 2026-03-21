"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const boundingRect = ref.current?.getBoundingClientRect();
        if (boundingRect) {
            const { width, height, left, top } = boundingRect;
            const middleX = clientX - (left + width / 2);
            const middleY = clientY - (top + height / 2);
            
            gsap.to(ref.current, {
                x: middleX * 0.35,
                y: middleY * 0.35,
                duration: 0.6,
                ease: "power2.out",
                overwrite: "auto"
            });
        }
    };

    const reset = () => {
        gsap.to(ref.current, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
            overwrite: "auto"
        });
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            className="flex items-center justify-center magnetic-wrap bg-transparent"
        >
            {children}
        </div>
    );
}
