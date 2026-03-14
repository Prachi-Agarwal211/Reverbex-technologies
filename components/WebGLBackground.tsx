"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Delay initialization to not block first paint
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    // Skip if already initialized
    if (canvasRef.current?.getContext("webgl")) {
      // Already initialized, just ensure canvas is visible
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_opacity;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = uv * 2.0 - 1.0;
        float aspect = u_resolution.x / u_resolution.y;
        p.x *= aspect;

        // --- THEME SPLIT: Left (Blue) | Right (Yellow/Gold) ---
        // Brighter Obsidian Base
        vec3 col = vec3(0.005, 0.01, 0.02);
        
        // Define Theme Colors - HIGH VIBRANCY
        vec3 themeBlue = vec3(0.0, 0.5, 1.0);
        vec3 themeYellow = vec3(1.0, 0.8, 0.1);
        
        // Horizontal split
        float splitEdge = smoothstep(-0.8, 0.8, p.x);
        vec3 ambientColor = mix(themeBlue * 0.1, themeYellow * 0.1, splitEdge);
        col += ambientColor;

        // Dynamic Volumetric Rays - MAX INTENSITY
        float rays = 0.0;
        vec2 rayOrigin = vec2(0.0, 2.5);
        
        for(float i = 0.0; i < 8.0; i++) {
            float t = u_time * 0.12 + i * 1.2;
            float angle = 0.4 * sin(t) + 0.05 * cos(t * 1.6);
            vec2 dir = vec2(cos(angle + 1.57), sin(angle + 1.57));
            
            float dist = length(p - rayOrigin);
            float ray = max(0.0, 1.0 - abs(dot(normalize(p - rayOrigin), dir)));
            rays += pow(ray, 50.0) * (0.6 / (dist + 0.1));
        }
        
        vec3 rayColor = mix(themeBlue, themeYellow, splitEdge);
        col += rays * rayColor * 1.8;
        
        // Nebula Dust
        float dust = noise(p * 2.5 + u_time * 0.15) * noise(p * 5.0 - u_time * 0.08);
        col += dust * rayColor * 0.2;
        
        // Strong Center Glow
        float glow = 1.0 - length(p * 0.35);
        col += mix(themeBlue * 0.05, themeYellow * 0.05, splitEdge) * pow(max(0.0, glow), 1.5);

        // Softer Vignette
        col *= 1.0 - smoothstep(0.5, 4.0, length(uv * 2.0 - 1.0));

        gl_FragColor = vec4(col * u_opacity, 1.0);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = (gl as WebGLRenderingContext).createShader(type);
      if(!shader) return null;
      (gl as WebGLRenderingContext).shaderSource(shader, source);
      (gl as WebGLRenderingContext).compileShader(shader);
      if (!(gl as WebGLRenderingContext).getShaderParameter(shader, (gl as WebGLRenderingContext).COMPILE_STATUS)) {
        console.error("Shader compile failed:", (gl as WebGLRenderingContext).getShaderInfoLog(shader));
        (gl as WebGLRenderingContext).deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader((gl as WebGLRenderingContext).VERTEX_SHADER, vsSource);
    const fragmentShader = compileShader((gl as WebGLRenderingContext).FRAGMENT_SHADER, fsSource);

    if(!vertexShader || !fragmentShader) return;

    const program = (gl as WebGLRenderingContext).createProgram();
    if(!program) return;
    (gl as WebGLRenderingContext).attachShader(program, vertexShader);
    (gl as WebGLRenderingContext).attachShader(program, fragmentShader);
    (gl as WebGLRenderingContext).linkProgram(program);

    if (!(gl as WebGLRenderingContext).getProgramParameter(program, (gl as WebGLRenderingContext).LINK_STATUS)) {
      console.error("Program link failed", (gl as WebGLRenderingContext).getProgramInfoLog(program));
      return;
    }

    (gl as WebGLRenderingContext).useProgram(program);

    const positionBuffer = (gl as WebGLRenderingContext).createBuffer();
    (gl as WebGLRenderingContext).bindBuffer((gl as WebGLRenderingContext).ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
      -1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
    ]);
    (gl as WebGLRenderingContext).bufferData((gl as WebGLRenderingContext).ARRAY_BUFFER, positions, (gl as WebGLRenderingContext).STATIC_DRAW);

    const positionLocation = (gl as WebGLRenderingContext).getAttribLocation(program, "a_position");
    (gl as WebGLRenderingContext).enableVertexAttribArray(positionLocation);
    (gl as WebGLRenderingContext).vertexAttribPointer(positionLocation, 2, (gl as WebGLRenderingContext).FLOAT, false, 0, 0);

    const timeLocation = (gl as WebGLRenderingContext).getUniformLocation(program, "u_time");
    const resolutionLocation = (gl as WebGLRenderingContext).getUniformLocation(program, "u_resolution");
    const opacityLocation = (gl as WebGLRenderingContext).getUniformLocation(program, "u_opacity");

    let animationFrameId: number;
    let startTime = Date.now();
    let opacityValue = { val: 0 };

    gsap.to(opacityValue, {
        val: 1,
        duration: 1.5,
        ease: "power2.out"
    });

    const resize = () => {
      const isMobile = window.innerWidth < 768;
      const scale = isMobile ? 0.7 : 1.0;
      const width = Math.floor(window.innerWidth * scale);
      const height = Math.floor(window.innerHeight * scale);
      
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        (gl as WebGLRenderingContext).viewport(0, 0, width, height);
      }
    };

    const render = () => {
      resize();
      const currentTime = (Date.now() - startTime) * 0.001;
      
      (gl as WebGLRenderingContext).uniform1f(timeLocation, currentTime);
      (gl as WebGLRenderingContext).uniform2f(resolutionLocation, canvas.width, canvas.height);
      (gl as WebGLRenderingContext).uniform1f(opacityLocation, opacityValue.val);

      (gl as WebGLRenderingContext).drawArrays((gl as WebGLRenderingContext).TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full bg-[#030610] overflow-hidden pointer-events-none z-0">
      
      {/* Static gradient - shown immediately */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-yellow-600/20 opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#1e40af_0%,transparent_70%)] opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,#854d0e_0%,transparent_70%)] opacity-50" />
      
      {/* WebGL Canvas - loads after mount */}
      {isMounted && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block mix-blend-screen" />
      )}
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-black/70" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#030610] to-transparent opacity-80" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030610] to-transparent opacity-80" />
    </div>
  );
}
