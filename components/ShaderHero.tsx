'use client';
import { useEffect, useRef } from 'react';
/** Custom GLSL shader-gradient (Scheme-Engine-style living field), raw WebGL, ~3KB, no three.js.
 *  Domain-warped fbm in the Reverbex brand palette (Void / Cobalt / Glow spark) + film grain + cursor gravity. */
const FRAG = `precision highp float;
uniform vec2 r; uniform float t; uniform vec2 m; uniform float day;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.02;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r; vec2 p=uv*vec2(r.x/r.y,1.)*1.6;
  vec2 mm=(m-uv)*vec2(r.x/r.y,1.); float g=exp(-dot(mm,mm)*5.);
  vec2 q=vec2(fbm(p+t*.05),fbm(p+vec2(5.2,1.3)-t*.04));
  vec2 w=vec2(fbm(p+3.*q+vec2(1.7,9.2)+t*.07+g*.6),fbm(p+3.*q+vec2(8.3,2.8)-t*.05));
  float f=fbm(p+2.5*w);
  vec3 eclipse=vec3(.027,.031,.043), slate=vec3(.043,.102,.29), green=vec3(.184,.42,1.), orange=vec3(1.,.953,.769), teal=vec3(.06,.16,.45);
  vec3 c=mix(eclipse,slate,smoothstep(.2,.6,f));
  c=mix(c,teal,smoothstep(.45,.9,w.y)*.8);
  c=mix(c,green,smoothstep(.62,.95,f*w.x*1.6)*.75);
  c=mix(c,orange,smoothstep(.86,1.,q.x*f*1.8)*.35);
  c+=green*g*.10;
  c*=smoothstep(1.25,.25,length(uv-vec2(.62,.45)))*.85+.25;   // vignette, brighter right side
  c=mix(c,eclipse,smoothstep(.55,.0,uv.y)*.55);                // darker bottom for the H1
  c+=(h(gl_FragCoord.xy+t)-.5)*.06;                           // grain
  gl_FragColor=vec4(c,1.);
}`;
export default function ShaderHero() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!; const gl = cv.getContext('webgl', { antialias: false, powerPreference: 'low-power' }); if (!gl) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = matchMedia('(max-width: 767px)').matches;
    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const pr = gl.createProgram()!; gl.attachShader(pr, sh(gl.VERTEX_SHADER, 'attribute vec2 a;void main(){gl_Position=vec4(a,0,1);}')); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(pr); gl.useProgram(pr);
    const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(pr, n);
    const scale = mobile ? 0.35 : 0.6; // shader is soft, render at reduced res, upscale with CSS
    const resize = () => { cv.width = Math.max(2, cv.clientWidth * scale); cv.height = Math.max(2, cv.clientHeight * scale); gl.viewport(0, 0, cv.width, cv.height); };
    resize(); addEventListener('resize', resize);
    let mx = 0.7, my = 0.5, tx = mx, ty = my, raf = 0, vis = true; const t0 = performance.now();
    const mv = (e: PointerEvent) => { const rc = cv.getBoundingClientRect(); tx = (e.clientX - rc.left) / rc.width; ty = 1 - (e.clientY - rc.top) / rc.height; };
    addEventListener('pointermove', mv, { passive: true });
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis && !reduce) loop(); }); io.observe(cv);
    const frame = () => { mx += (tx - mx) * .05; my += (ty - my) * .05;
      gl.uniform2f(U('r'), cv.width, cv.height); gl.uniform1f(U('t'), reduce ? 12 : (performance.now() - t0) / 1000); gl.uniform2f(U('m'), mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 3); cv.style.opacity = '1'; };
    function loop() { cancelAnimationFrame(raf); const f = () => { if (!vis) return; frame(); raf = requestAnimationFrame(f); }; f(); }
    if (reduce) frame(); else loop();
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener('resize', resize); removeEventListener('pointermove', mv); };
  }, []);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000" />;
}
