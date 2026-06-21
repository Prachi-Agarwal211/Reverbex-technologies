"use client";

import { useRef, useEffect } from "react";

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const img = new Image();
    img.src = "/ambient-bg.png";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    img.onload = () => {
      resize();
      window.addEventListener("resize", resize);
      animate();
    };

    const animate = () => {
      time += 0.003;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      // Draw the ambient image with wave distortion
      const sliceCount = 60;
      const sliceHeight = h / sliceCount;

      for (let i = 0; i < sliceCount; i++) {
        const y = i * sliceHeight;
        // Sine wave offset per slice
        const offset = Math.sin(time * 2 + i * 0.15) * 8;
        // Subtle vertical scale pulse
        const scaleY = 1 + Math.sin(time * 1.5 + i * 0.1) * 0.003;

        ctx.save();
        ctx.beginPath();
        ctx.rect(0, y, w, sliceHeight + 1);
        ctx.clip();

        ctx.drawImage(
          img,
          offset,
          y - (sliceHeight * scaleY - sliceHeight) / 2,
          w,
          sliceHeight * scaleY
        );

        ctx.restore();
      }

      // Subtle vignette overlay
      const gradient = ctx.createRadialGradient(
        w / 2, h / 2, w * 0.2,
        w / 2, h / 2, w * 0.8
      );
      gradient.addColorStop(0, "rgba(5, 5, 5, 0)");
      gradient.addColorStop(1, "rgba(5, 5, 5, 0.4)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(animate);
    };

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full object-cover z-[-2]"
      style={{ imageRendering: "auto" }}
      aria-hidden="true"
    />
  );
}
