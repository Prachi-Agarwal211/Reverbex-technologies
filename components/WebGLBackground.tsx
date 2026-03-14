"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use alpha: false for better performance if no transparency is needed
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false }) || 
               canvas.getContext("experimental-webgl", { alpha: false, antialias: false });
    if (!gl) return;

    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // PERFORMANCE FIX: Use mediump for mobile performance
    const fsSource = `
      precision mediump float;
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
        p.x *= u_resolution.x / u_resolution.y;

        vec3 col = vec3(0.005, 0.01, 0.02);
        vec3 themeBlue = vec3(0.0, 0.5, 1.0);
        vec3 themeYellow = vec3(1.0, 0.8, 0.1);
        
        float splitEdge = smoothstep(-0.8, 0.8, p.x);
        vec3 rayColor = mix(themeBlue, themeYellow, splitEdge);

        // Dynamic Volumetric Rays
        float rays = 0.0;
        vec2 rayOrigin = vec2(0.0, 2.5);
        
        for(float i = 0.0; i < 6.0; i++) { // Reduced iterations for speed
            float t = u_time * 0.1 + i * 1.2;
            float angle = 0.4 * sin(t) + 0.05 * cos(t * 1.6);
            vec2 dir = vec2(cos(angle + 1.57), sin(angle + 1.57));
            float dist = length(p - rayOrigin);
            float ray = max(0.0, 1.0 - abs(dot(normalize(p - rayOrigin), dir)));
            rays += pow(ray, 50.0) * (0.4 / (dist + 0.1));
        }
        
        col += rays * rayColor * 1.5;
        
        // Simplified noise for mobile
        float n = noise(p * 3.0 + u_time * 0.1);
        col += n * rayColor * 0.1;
        
        col *= 1.0 - smoothstep(0.5, 4.0, length(uv * 2.0 - 1.0));
        gl_FragColor = vec4(col * u_opacity, 1.0);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = (gl as WebGLRenderingContext).createShader(type);
      if(!shader) return null;
      (gl as WebGLRenderingContext).shaderSource(shader, source);
      (gl as WebGLRenderingContext).compileShader(shader);
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
    (gl as WebGLRenderingContext).useProgram(program);

    const positionBuffer = (gl as WebGLRenderingContext).createBuffer();
    (gl as WebGLRenderingContext).bindBuffer((gl as WebGLRenderingContext).ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    (gl as WebGLRenderingContext).bufferData((gl as WebGLRenderingContext).ARRAY_BUFFER, positions, (gl as WebGLRenderingContext).STATIC_DRAW);

    const posLoc = (gl as WebGLRenderingContext).getAttribLocation(program, "a_position");
    (gl as WebGLRenderingContext).enableVertexAttribArray(posLoc);
    (gl as WebGLRenderingContext).vertexAttribPointer(posLoc, 2, (gl as WebGLRenderingContext).FLOAT, false, 0, 0);

    const tLoc = (gl as WebGLRenderingContext).getUniformLocation(program, "u_time");
    const rLoc = (gl as WebGLRenderingContext).getUniformLocation(program, "u_resolution");
    const oLoc = (gl as WebGLRenderingContext).getUniformLocation(program, "u_opacity");

    let animId: number;
    let start = Date.now();
    let opacity = { val: 0 };

    gsap.to(opacity, { val: 1, duration: 1.5, ease: "power2.out" });

    const render = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isMobile = w < 768;
      const scale = isMobile ? 0.5 : 1.0; // Lower resolution on mobile for high FPS
      
      if (canvas.width !== w * scale || canvas.height !== h * scale) {
        canvas.width = w * scale;
        canvas.height = h * scale;
        (gl as WebGLRenderingContext).viewport(0, 0, canvas.width, canvas.height);
      }

      (gl as WebGLRenderingContext).uniform1f(tLoc, (Date.now() - start) * 0.001);
      (gl as WebGLRenderingContext).uniform2f(rLoc, canvas.width, canvas.height);
      (gl as WebGLRenderingContext).uniform1f(oLoc, opacity.val);
      (gl as WebGLRenderingContext).drawArrays((gl as WebGLRenderingContext).TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full bg-[#030610] overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-yellow-600/10" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60" />
    </div>
  );
}
