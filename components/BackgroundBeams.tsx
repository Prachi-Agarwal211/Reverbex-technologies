"use client";

import { useEffect, useRef } from "react";

export default function BackgroundBeams() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const beams = Array.from({ length: 8 }, (_, i) => ({
      x: (canvas.offsetWidth / 8) * i + Math.random() * 100,
      speed: 0.2 + Math.random() * 0.3,
      width: 1 + Math.random() * 2,
      opacity: 0.03 + Math.random() * 0.05,
    }));

    const animate = () => {
      time += 0.01;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      beams.forEach((beam) => {
        const x = beam.x + Math.sin(time * beam.speed) * 50;

        const gradient = ctx.createLinearGradient(x, 0, x, h);
        gradient.addColorStop(0, "rgba(234, 179, 8, 0)");
        gradient.addColorStop(0.3, `rgba(234, 179, 8, ${beam.opacity})`);
        gradient.addColorStop(0.7, `rgba(234, 179, 8, ${beam.opacity})`);
        gradient.addColorStop(1, "rgba(234, 179, 8, 0)");

        ctx.beginPath();
        ctx.moveTo(x - beam.width / 2, 0);
        ctx.lineTo(x + beam.width / 2, 0);
        ctx.lineTo(x + beam.width / 2 + Math.sin(time) * 20, h);
        ctx.lineTo(x - beam.width / 2 + Math.sin(time) * 20, h);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
