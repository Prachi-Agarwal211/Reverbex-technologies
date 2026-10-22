'use client';
import { useEffect, useRef } from 'react';

/** Particle interlude: the Reverbex hexagon+waveform mark sampled into ~20k additive points.
 *  Scroll through the sticky section: nebula → crisp logo (hold) → dissolves into a wave field.
 *  Soft exp-falloff sprites + a halo pass fake bloom cheaply; cursor gently repels points. */
export default function PointCloud() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current; if (!host) return;
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const mobile = matchMedia('(max-width: 767px), (pointer: coarse)').matches;
    const lowEnd = ((navigator as unknown as { hardwareConcurrency?: number }).hardwareConcurrency ?? 8) <= 4 || ((navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8) <= 4;
    let dead = false; let raf = 0; let cleanup = () => {};
    (async () => {
      const THREE = await import('three');
      const img = new Image(); img.src = '/brand/mark-white.webp'; await img.decode();
      if (dead) return;
      const S = 320, cv = document.createElement('canvas'); cv.width = cv.height = S;
      const cx = cv.getContext('2d')!; const sc = Math.min(S / img.width, S / img.height) * .92;
      cx.drawImage(img, (S - img.width * sc) / 2, (S - img.height * sc) / 2, img.width * sc, img.height * sc);
      const d = cx.getImageData(0, 0, S, S).data; const pts: number[] = [];
      for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) if (d[(y * S + x) * 4 + 3] > 140) pts.push((x / S - .5) * 4.4, -(y / S - .5) * 4.4);
      const N = Math.min(pts.length / 2, mobile ? (lowEnd ? 3000 : 4500) : 14000);
      const logo = new Float32Array(N * 3), cloud = new Float32Array(N * 3), wave = new Float32Array(N * 3), seed = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        const k = Math.floor(Math.random() * (pts.length / 2));
        logo.set([pts[k * 2] + (Math.random() - .5) * .012, pts[k * 2 + 1] + (Math.random() - .5) * .012, (Math.random() - .5) * .08], i * 3);
        const r = 2.2 + Math.pow(Math.random(), .6) * 4.5, th = Math.random() * 6.283, ph = Math.acos(2 * Math.random() - 1);
        cloud.set([r * Math.sin(ph) * Math.cos(th) * 1.7, r * Math.cos(ph) * .9, r * Math.sin(ph) * Math.sin(th)], i * 3);
        const cols = 180, gx = (i % cols) / cols - .5, gz = Math.floor(i / cols) / (N / cols) - .5;
        wave.set([gx * 12, -1.6, gz * 8], i * 3); seed[i] = Math.random();
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(logo, 3));
      geo.setAttribute('aCloud', new THREE.BufferAttribute(cloud, 3));
      geo.setAttribute('aWave', new THREE.BufferAttribute(wave, 3));
      geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
      const vs = `attribute vec3 aCloud; attribute vec3 aWave; attribute float aSeed; uniform float uT,uA,uB,uSize,uPR; uniform vec2 uM; varying float vS; varying float vForm;
        void main(){ vec3 p=mix(aCloud,position,uA); p=mix(p,aWave,uB);
          p+=(0.05*(1.-uA)+0.012)*vec3(sin(uT*.8+aSeed*40.),cos(uT*.7+aSeed*30.),sin(uT*.5+aSeed*20.));
          p.y+=uB*(sin(p.x*.9+uT*.9)*.5+cos(p.z*1.3+uT*.6)*.3);
          vec2 dm=p.xy-uM; float dl=length(dm); p.xy+=normalize(dm+1e-4)*.35*exp(-dl*dl*3.)*uA*(1.-uB);
          vS=aSeed; vForm=uA*(1.-uB);
          vec4 mv=modelViewMatrix*vec4(p,1.); gl_Position=projectionMatrix*mv;
          float big=aSeed>.975?2.6:1.; gl_PointSize=uSize*big*uPR*(9./-mv.z); }`;
      const fs = `varying float vS; varying float vForm; uniform float uFade,uGain; void main(){ float d=length(gl_PointCoord-.5)*2.; if(d>1.) discard;
          float core=exp(-d*d*6.); vec3 hot=vec3(.85,.95,1.); vec3 cob=vec3(.18,.42,1.); vec3 ele=vec3(.24,.55,1.); vec3 ice=vec3(.5,.83,1.); vec3 crm=vec3(1.,.95,.77);
          vec3 base=vS<.45?cob:(vS<.7?ele:(vS<.9?ice:crm)); vec3 c=mix(base,hot,core*(.3+.45*vForm));
          if(vS>.975) c=vec3(1.,.85,.54)*(1.2+core);
          float k=core*uGain*uFade; vec3 o=min(c*k,vec3(1.)); gl_FragColor=vec4(o,max(o.r,max(o.g,o.b))); }`;
      const mk = (size: number, gain: number) => new THREE.ShaderMaterial({ transparent: true, depthWrite: false, depthTest: false, blending: THREE.CustomBlending, blendEquation: THREE.AddEquation, blendSrc: THREE.OneFactor, blendDst: THREE.OneFactor,
        uniforms: { uT: { value: 0 }, uA: { value: 0 }, uB: { value: 0 }, uFade: { value: 0 }, uSize: { value: size }, uGain: { value: gain }, uPR: { value: 1 }, uM: { value: new THREE.Vector2(99, 99) } },
        vertexShader: vs, fragmentShader: fs });
      const core = mk(mobile ? 6 : 5.8, mobile ? 1.1 : .95), halo = mk(mobile ? 11 : 13, .14);
      const scene = new THREE.Scene(); const pm = new THREE.Group();
      // mobile: skip the halo pass (halves fill-rate cost)
      if (mobile) pm.add(new THREE.Points(geo, core)); else pm.add(new THREE.Points(geo, halo), new THREE.Points(geo, core)); scene.add(pm);
      const ren = new THREE.WebGLRenderer({ alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: mobile ? 'low-power' : 'high-performance' });
      const pr = Math.min(devicePixelRatio, mobile ? 1 : 1.5); ren.setPixelRatio(pr); core.uniforms.uPR.value = halo.uniforms.uPR.value = pr;
      const cam = new THREE.PerspectiveCamera(40, 1, .1, 100); cam.position.z = 9;
      const size = () => { const w = innerWidth, h = innerHeight; cam.aspect = w / h; cam.position.z = w < h ? 13 : 9; cam.updateProjectionMatrix(); ren.setSize(w, h); };
      size(); host.appendChild(ren.domElement); addEventListener('resize', size);
      let a = 0, b = 0, f = 0, mx = 0, my = 0, tmx = 99, tmy = 99;
      const onM = (e: PointerEvent) => { const r = host.getBoundingClientRect(); const nx = (e.clientX - r.left) / r.width - .5, ny = (e.clientY - r.top) / r.height - .5;
        const hh = Math.tan(20 * Math.PI / 180) * cam.position.z; tmx = nx * 2 * hh * cam.aspect; tmy = -ny * 2 * hh; mx = nx; my = ny; };
      if (!mobile) addEventListener('pointermove', onM);
      let vis = true; const onVis = () => { vis = !document.hidden; }; document.addEventListener('visibilitychange', onVis);
      const ms = core.uniforms.uM.value;
      // One shared fixed canvas spanning hero → core → top of services. Progress is pure scroll position in viewport heights,
      // so there is no section boundary at which the canvas mounts, unmounts or snaps.
      const cl = (x: number) => Math.max(0, Math.min(1, x)), sm = (x: number) => x * x * (3 - 2 * x);
      let rendered = true;
      const loop = (t: number) => {
        const p = scrollY / innerHeight;
        const fade = cl(.18 + p * .9) * (1 - sm(cl((p - 2.35) / .9)));      // faint nebula already inside the hero → full → fades behind services
        const ta = cl((p - .35) / .85), tb = cl((p - 1.6) / .7);            // form logo across hero exit, dissolve to wave during the core screen
        a += (ta - a) * .1; b += (tb - b) * .1; f += (fade - f) * .12;
        if (vis && (f > .003 || rendered)) {
          ms.x += (tmx - ms.x) * .12; ms.y += (tmy - ms.y) * .12;
          for (const m of [core, halo]) { const u = m.uniforms; u.uT.value = t / 1000; u.uA.value = sm(a); u.uB.value = sm(b); u.uFade.value = f; u.uM.value = ms; }
          const form = a * (1 - b);
          pm.rotation.y += ((mx * .35 * form + (1 - form) * Math.sin(t / 4000) * .6) - pm.rotation.y) * .05;
          pm.rotation.x += ((my * .2 * form) - pm.rotation.x) * .05;
          pm.position.y = -1.7 * sm(b) - .8 * cl(p - 2);                        // wave sinks and keeps flowing under services
          ren.render(scene, cam); rendered = f > .003;
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      cleanup = () => { removeEventListener('resize', size); removeEventListener('pointermove', onM); document.removeEventListener('visibilitychange', onVis); ren.dispose(); geo.dispose(); core.dispose(); halo.dispose(); ren.domElement.remove(); };
    })();
    return () => { dead = true; cancelAnimationFrame(raf); cleanup(); };
  }, []);
  return <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[1] [&>canvas]:!h-full [&>canvas]:!w-full" />;
}
