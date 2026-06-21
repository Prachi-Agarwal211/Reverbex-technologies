"use client";

import { useRef, useEffect } from "react";

export default function MouseDistortion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    let time = 0;
    const animate = () => {
      time += 0.008;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, w, h);

      // Draw subtle light orbs that follow mouse
      const gradient1 = ctx.createRadialGradient(
        mx * w, my * h, 0,
        mx * w, my * h, 300
      );
      gradient1.addColorStop(0, "rgba(234, 179, 8, 0.06)");
      gradient1.addColorStop(1, "rgba(234, 179, 8, 0)");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, w, h);

      // Floating particles
      for (let i = 0; i < 30; i++) {
        const px = (Math.sin(time + i * 0.7) * 0.5 + 0.5) * w;
        const py = (Math.cos(time * 0.8 + i * 0.5) * 0.5 + 0.5) * h;
        const dist = Math.sqrt(
          Math.pow((px / w - mx) * 2, 2) + Math.pow((py / h - my) * 2, 2)
        );
        const size = Math.max(1, 3 - dist * 3);
        const alpha = Math.max(0, 0.3 - dist * 0.4);

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(234, 179, 8, ${alpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-[1]"
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
}
