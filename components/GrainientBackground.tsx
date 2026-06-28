"use client";

import { useEffect, useRef } from "react";
import "./GrainientBackground.css";

// ponytail: inline WebGL2 renderer — no OGL/Three.js dependency. ~80 lines of GL wrapper + shader does all the work.

const VERTEX_SHADER = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uSpeed;
uniform float uGrainAmount;
uniform float uZoom;
out vec4 fragColor;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(2127.1, 81.17)), dot(p, vec2(1269.5, 283.37)));
  return fract(sin(p) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(-1.0 + 2.0 * hash(i), f),
        dot(-1.0 + 2.0 * hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(-1.0 + 2.0 * hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(-1.0 + 2.0 * hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  ) * 0.5 + 0.5;
}

void mainImage(out vec4 o, vec2 C) {
  float t = iTime * uSpeed;
  vec2 uv = C / iResolution.xy;
  float ratio = iResolution.x / iResolution.y;
  vec2 tuv = uv - 0.5;
  tuv /= max(uZoom, 0.001);

  float degree = noise(vec2(t * 0.1, tuv.x * tuv.y) * 2.0);
  tuv.y *= 1.0 / ratio;
  float angle = (degree - 0.5) * 500.0 + 180.0;
  float s = sin(radians(angle));
  float c = cos(radians(angle));
  tuv = mat2(c, -s, s, c) * tuv;
  tuv.y *= ratio;

  float freq = 5.0;
  tuv.x += sin(tuv.y * freq + t * 2.0) / 50.0;
  tuv.y += sin(tuv.x * freq * 1.5 + t * 2.0) / 25.0;

  float blendX = tuv.x;
  vec3 layer1 = mix(uColor3, uColor2, smoothstep(-0.3, 0.2, blendX));
  vec3 layer2 = mix(uColor2, uColor1, smoothstep(-0.3, 0.2, blendX));
  vec3 col = mix(layer1, layer2, smoothstep(0.5, -0.3, tuv.y));

  float grain = fract(sin(dot(uv * 2.0, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * uGrainAmount;

  col = (col - 0.5) * 1.5 + 0.5;
  col = pow(max(col, 0.0), vec3(1.0));
  col = clamp(col, 0.0, 1.0);
  o = vec4(col, 1.0);
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  fragColor = o;
}`;

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
}

interface GrainientProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  grainAmount?: number;
  zoom?: number;
  className?: string;
}

export default function GrainientBackground({
  color1 = "#EAB308",
  color2 = "#1D4ED8",
  color3 = "#050505",
  speed = 0.15,
  grainAmount = 0.08,
  zoom = 0.85,
  className = "",
}: GrainientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip WebGL entirely on mobile for performance
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      container.style.background = `linear-gradient(180deg, ${color3} 0%, ${color2} 50%, ${color3} 100%)`;
      return;
    }

    // WebGL2 check
    const testCanvas = document.createElement("canvas");
    const gl = testCanvas.getContext("webgl2");
    if (!gl) {
      container.style.background = `linear-gradient(135deg, ${color3} 0%, ${color2} 50%, ${color3} 100%)`;
      return;
    }

    // prefers-reduced-motion → static gradient
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      container.style.background = `linear-gradient(135deg, ${color3} 0%, ${color2} 50%, ${color3} 100%)`;
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2);
    container.appendChild(canvas);

    // Compile shader
    function compileShader(type: number, source: string): WebGLShader | null {
      const shader = ctx!.createShader(type);
      if (!shader) return null;
      ctx!.shaderSource(shader, source);
      ctx!.compileShader(shader);
      if (!ctx!.getShaderParameter(shader, ctx!.COMPILE_STATUS)) {
        ctx!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(ctx.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(ctx.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = ctx.createProgram();
    if (!program) return;
    ctx.attachShader(program, vs);
    ctx.attachShader(program, fs);
    ctx.linkProgram(program);
    if (!ctx.getProgramParameter(program, ctx.LINK_STATUS)) {
      return;
    }
    ctx.useProgram(program);

    // Full-screen triangle
    const buf = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, buf);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), ctx.STATIC_DRAW);
    const posLoc = ctx.getAttribLocation(program, "position");
    ctx.enableVertexAttribArray(posLoc);
    ctx.vertexAttribPointer(posLoc, 2, ctx.FLOAT, false, 0, 0);

    // Uniforms
    const uResolution = ctx.getUniformLocation(program, "iResolution");
    const uTime = ctx.getUniformLocation(program, "iTime");
    const uColor1 = ctx.getUniformLocation(program, "uColor1");
    const uColor2 = ctx.getUniformLocation(program, "uColor2");
    const uColor3 = ctx.getUniformLocation(program, "uColor3");
    const uSpeed = ctx.getUniformLocation(program, "uSpeed");
    const uGrainAmount = ctx.getUniformLocation(program, "uGrainAmount");
    const uZoom = ctx.getUniformLocation(program, "uZoom");

    // Set static uniforms once
    ctx.uniform3fv(uColor1, hexToRgb(color1));
    ctx.uniform3fv(uColor2, hexToRgb(color2));
    ctx.uniform3fv(uColor3, hexToRgb(color3));
    ctx.uniform1f(uSpeed, speed);
    ctx.uniform1f(uGrainAmount, grainAmount);
    ctx.uniform1f(uZoom, zoom);

    // Resize
    function setSize() {
      const rect = container!.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        ctx!.viewport(0, 0, w, h);
        ctx!.uniform2f(uResolution, w, h);
      }
    }
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(container);

    // Animation loop with pause logic
    let raf = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    const t0 = performance.now();

    function loop() {
      const t = (performance.now() - t0) * 0.001;
      ctx!.uniform1f(uTime, t);
      ctx!.drawArrays(ctx!.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    }

    function tryStart() {
      if (isVisible && isPageVisible && raf === 0) raf = requestAnimationFrame(loop);
    }
    function tryStop() {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    // Pause when offscreen
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        isVisible ? tryStart() : tryStop();
      },
      { threshold: 0 }
    );
    io.observe(container);

    // Pause when tab hidden
    function onVisibility() {
      isPageVisible = !document.hidden;
      isPageVisible ? tryStart() : tryStop();
    }
    document.addEventListener("visibilitychange", onVisibility);

    tryStart();

    return () => {
      tryStop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      try {
        container.removeChild(canvas);
      } catch {
        /* already removed */
      }
      ctx.deleteProgram(program);
      ctx.deleteShader(vs);
      ctx.deleteShader(fs);
      ctx.deleteBuffer(buf);
      const loseCtx = ctx.getExtension("WEBGL_lose_context");
      if (loseCtx) loseCtx.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update uniforms on prop change (no re-init needed)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const canvas = container.querySelector("canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("webgl2");
    if (!ctx) return;

    const program = ctx.getParameter(ctx.CURRENT_PROGRAM) as WebGLProgram;
    if (!program) return;

    const uColor1 = ctx.getUniformLocation(program, "uColor1");
    const uColor2 = ctx.getUniformLocation(program, "uColor2");
    const uColor3 = ctx.getUniformLocation(program, "uColor3");
    const uSpeed = ctx.getUniformLocation(program, "uSpeed");
    const uGrainAmount = ctx.getUniformLocation(program, "uGrainAmount");
    const uZoom = ctx.getUniformLocation(program, "uZoom");

    ctx.useProgram(program);
    if (uColor1) ctx.uniform3fv(uColor1, hexToRgb(color1));
    if (uColor2) ctx.uniform3fv(uColor2, hexToRgb(color2));
    if (uColor3) ctx.uniform3fv(uColor3, hexToRgb(color3));
    if (uSpeed) ctx.uniform1f(uSpeed, speed);
    if (uGrainAmount) ctx.uniform1f(uGrainAmount, grainAmount);
    if (uZoom) ctx.uniform1f(uZoom, zoom);
  }, [color1, color2, color3, speed, grainAmount, zoom]);

  return <div ref={containerRef} className={`grainient-container ${className}`.trim()} aria-hidden="true" />;
}
