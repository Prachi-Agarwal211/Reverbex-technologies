"use client";

import React, { useRef, useMemo, useEffect, useState, useContext, createContext } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
    baseVertex,
    clearShader,
    displayShader,
    splatShader,
    advectionShader,
    divergenceShader,
    curlShader,
    vorticityShader,
    pressureShader,
    gradientSubtractShader,
} from "./FluidSimulation/shaders";

// Audio data context for sharing between Three.js and React
const AudioDataContext = createContext<{
    frequencyData: number[];
    setFrequencyData: (data: number[]) => void;
} | null>(null);

// Legacy exports for backwards compatibility
export const setupAudioContext = (audioElement: HTMLAudioElement) => {
    console.warn("setupAudioContext is deprecated. Using AudioProvider instead.");
};

export const getAudioData = () => {
    return null; // Now handled by AudioContext
};

interface AudioReactiveFluidProps {
    frequencyData?: number[];
}

const AudioReactiveFluid = ({ frequencyData = [] }: AudioReactiveFluidProps) => {
    const { gl, size } = useThree();

    // Simulation parameters
    const simRes = 128;
    const dyeRes = 512;
    const densityDissipation = 0.985;
    const velocityDissipation = 0.992;
    const pressureIterations = 20;
    const curl = 40;
    const splatRadius = 0.002;
    const splatForce = 6000;

    // Mouse state
    const mouse = useRef(new THREE.Vector2(0, 0));
    const prevMouse = useRef(new THREE.Vector2(0, 0));
    const lastMouseChange = useRef(0);
    const isMoved = useRef(false);

    // FBO helper
    const createFBO = useMemo(() => (w: number, h: number, type: THREE.TextureDataType = THREE.HalfFloatType) => {
        return new THREE.WebGLRenderTarget(w, h, {
            type: type,
            format: THREE.RGBAFormat,
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            depthBuffer: false,
            stencilBuffer: false,
        });
    }, []);

    const createDoubleFBO = useMemo(() => (w: number, h: number, type: THREE.TextureDataType = THREE.HalfFloatType) => {
        return {
            read: createFBO(w, h, type),
            write: createFBO(w, h, type),
            swap: function () {
                const temp = this.read;
                this.read = this.write;
                this.write = temp;
            },
        };
    }, [createFBO]);

    // Initialize FBOs
    const density = useMemo(() => createDoubleFBO(dyeRes, dyeRes), [createDoubleFBO, dyeRes]);
    const velocity = useMemo(() => createDoubleFBO(simRes, simRes), [createDoubleFBO, simRes]);
    const divergence = useMemo(() => createFBO(simRes, simRes), [createFBO, simRes]);
    const curlTex = useMemo(() => createFBO(simRes, simRes), [createFBO, simRes]);
    const pressure = useMemo(() => createDoubleFBO(simRes, simRes), [createDoubleFBO, simRes]);

    // Materials
    const materials = useMemo(() => {
        const createMaterial = (fragmentShader: string) =>
            new THREE.ShaderMaterial({
                vertexShader: baseVertex,
                fragmentShader,
                uniforms: {
                    texelSize: { value: new THREE.Vector2() },
                    uVelocity: { value: null },
                    uSource: { value: null },
                    dt: { value: 0.016 },
                    dissipation: { value: 0 },
                    uTexture: { value: null },
                    uTarget: { value: null },
                    aspectRatio: { value: 1 },
                    color: { value: new THREE.Color() },
                    point: { value: new THREE.Vector2() },
                    radius: { value: 0 },
                    uCurl: { value: null },
                    curl: { value: 0 },
                    uPressure: { value: null },
                    uDivergence: { value: null },
                    value: { value: 0 },
                },
                depthWrite: false,
                depthTest: false,
            });

        return {
            advection: createMaterial(advectionShader),
            divergence: createMaterial(divergenceShader),
            curl: createMaterial(curlShader),
            vorticity: createMaterial(vorticityShader),
            pressure: createMaterial(pressureShader),
            gradientSubtract: createMaterial(gradientSubtractShader),
            splat: createMaterial(splatShader),
            clear: createMaterial(clearShader),
            display: createMaterial(displayShader),
        };
    }, []);

    const mesh = useRef<THREE.Mesh>(null);

    // Input handling
    useEffect(() => {
        const updateMouse = (e: MouseEvent | TouchEvent) => {
            let x, y;
            if ((e as TouchEvent).touches) {
                x = (e as TouchEvent).touches[0].clientX;
                y = (e as TouchEvent).touches[0].clientY;
            } else {
                x = (e as MouseEvent).clientX;
                y = (e as MouseEvent).clientY;
            }

            const ux = x / window.innerWidth;
            const uy = 1.0 - y / window.innerHeight;

            mouse.current.set(ux, uy);
            if (!isMoved.current) {
                prevMouse.current.set(ux, uy);
                isMoved.current = true;
            }
            lastMouseChange.current = Date.now();
        };

        window.addEventListener("mousemove", updateMouse);
        window.addEventListener("touchmove", updateMouse);
        window.addEventListener("touchstart", updateMouse);

        return () => {
            window.removeEventListener("mousemove", updateMouse);
            window.removeEventListener("touchmove", updateMouse);
            window.removeEventListener("touchstart", updateMouse);
        };
    }, []);

    const simScene = useMemo(() => {
        const scene = new THREE.Scene();
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), undefined);
        scene.add(plane);
        return { scene, mesh: plane };
    }, []);

    const splat = (x: number, y: number, dx: number, dy: number, color: THREE.Color) => {
        materials.splat.uniforms.uTarget.value = velocity.read.texture;
        materials.splat.uniforms.aspectRatio.value = size.width / size.height;
        materials.splat.uniforms.point.value.set(x, y);
        materials.splat.uniforms.color.value.set(dx, dy, 0.0);
        materials.splat.uniforms.radius.value = splatRadius;

        simScene.mesh.material = materials.splat;
        gl.setRenderTarget(velocity.write);
        gl.render(simScene.scene, new THREE.Camera());
        velocity.swap();

        materials.splat.uniforms.uTarget.value = density.read.texture;
        materials.splat.uniforms.color.value.set(color.r, color.g, color.b);

        simScene.mesh.material = materials.splat;
        gl.setRenderTarget(density.write);
        gl.render(simScene.scene, new THREE.Camera());
        density.swap();
    };

    // Get frequency band intensities from passed data
    const getBassIntensity = () => {
        if (!frequencyData || frequencyData.length < 5) return 0;
        return frequencyData.slice(0, 5).reduce((a, b) => a + b, 0) / 5;
    };

    const getMidIntensity = () => {
        if (!frequencyData || frequencyData.length < 20) return 0;
        return frequencyData.slice(5, 20).reduce((a, b) => a + b, 0) / 15;
    };

    const getHighIntensity = () => {
        if (!frequencyData || frequencyData.length < 40) return 0;
        return frequencyData.slice(20, 40).reduce((a, b) => a + b, 0) / 20;
    };

    const getAverageFrequency = () => {
        if (!frequencyData || frequencyData.length === 0) return 0;
        return frequencyData.reduce((a, b) => a + b, 0) / frequencyData.length;
    };

    useFrame(({ clock }) => {
        const dt = 0.016;
        const time = clock.getElapsedTime();

        const avgFreq = getAverageFrequency();
        const bass = getBassIntensity();
        const mid = getMidIntensity();
        const high = getHighIntensity();

        // Auto splats for entrance animation
        if (time < 3.5) {
            if (Math.random() < 0.05) {
                const angle = Math.random() * Math.PI * 2;
                const radius = 0.1 + Math.random() * 0.25;
                const x = 0.5 + Math.cos(angle) * radius;
                const y = 0.5 + Math.sin(angle) * radius;

                const force = 800;
                const dx = (0.5 - x) * force + (Math.random() - 0.5) * 200;
                const dy = (0.5 - y) * force + (Math.random() - 0.5) * 200;

                const brandColors = [0x22d3ee, 0x818cf8, 0xe879f9, 0xffffff];
                const hex = brandColors[Math.floor(Math.random() * brandColors.length)];
                const color = new THREE.Color(hex).multiplyScalar(0.35);

                splat(x, y, dx, dy, color);
            }
        } else {
            // Audio-reactive splats - SUPER INTENSE
            const t = time * 0.4;

            // Calculate intensity multiplier based on overall energy
            const energyMultiplier = 1 + (avgFreq / 128);

            // BASS - Deep cyan/blue explosions - VERY FREQUENT
            if (bass > 40) {
                const intensity = bass / 255;
                const probability = 0.3 + intensity * 0.5; // Up to 80% chance

                if (Math.random() < probability) {
                    const angle = Math.random() * Math.PI * 2;
                    const dist = 0.1 + Math.random() * 0.3;
                    const x = 0.5 + Math.cos(angle + t * 0.5) * dist;
                    const y = 0.5 + Math.sin(angle + t * 0.7) * dist;
                    const force = 1000 + bass * 8;
                    const dx = Math.cos(angle) * force * (Math.random() - 0.5) * 2;
                    const dy = Math.sin(angle) * force * (Math.random() - 0.5) * 2;

                    // Cyan to deep blue based on intensity
                    const hue = 0.5 + intensity * 0.1; // Cyan range
                    const color = new THREE.Color().setHSL(hue, 0.9, 0.4 + intensity * 0.3);
                    splat(x, y, dx, dy, color);
                }
            }

            // MIDS - Purple/violet swirls - FREQUENT
            if (mid > 30) {
                const intensity = mid / 255;
                const probability = 0.25 + intensity * 0.4;

                if (Math.random() < probability) {
                    const x = 0.5 + Math.sin(t * 1.5) * 0.4 + (Math.random() - 0.5) * 0.2;
                    const y = 0.5 + Math.cos(t * 1.8) * 0.4 + (Math.random() - 0.5) * 0.2;
                    const force = 600 + mid * 5;
                    const dx = Math.sin(t * 2.5 + Math.random()) * force;
                    const dy = Math.cos(t * 2.0 + Math.random()) * force;

                    // Purple to indigo
                    const hue = 0.75 + intensity * 0.08;
                    const color = new THREE.Color().setHSL(hue, 0.85, 0.35 + intensity * 0.25);
                    splat(x, y, dx, dy, color);
                }
            }

            // HIGHS - Pink/magenta sparkles - FREQUENT
            if (high > 25) {
                const intensity = high / 255;
                const probability = 0.2 + intensity * 0.4;

                if (Math.random() < probability) {
                    const x = Math.random();
                    const y = Math.random();
                    const force = 400 + high * 4;
                    const dx = (Math.random() - 0.5) * force * 2;
                    const dy = (Math.random() - 0.5) * force * 2;

                    // Pink to magenta
                    const hue = 0.85 + intensity * 0.1;
                    const color = new THREE.Color().setHSL(hue, 0.9, 0.4 + intensity * 0.2);
                    splat(x, y, dx, dy, color);
                }
            }

            // BEAT DROP - Massive multi-color explosion!
            if (bass > 120 && Math.random() < 0.8) {
                const numSplats = Math.floor(3 + (bass / 50));
                for (let i = 0; i < numSplats; i++) {
                    const angle = (i / numSplats) * Math.PI * 2 + Math.random() * 0.5;
                    const x = 0.5 + Math.cos(angle) * (0.1 + Math.random() * 0.25);
                    const y = 0.5 + Math.sin(angle) * (0.1 + Math.random() * 0.25);
                    const force = 1500 + bass * 5;
                    const dx = Math.cos(angle) * force;
                    const dy = Math.sin(angle) * force;

                    // Rainbow explosion - different color for each splat
                    const hue = (i / numSplats) + (time * 0.1) % 1;
                    const color = new THREE.Color().setHSL(hue, 0.95, 0.5);
                    splat(x, y, dx, dy, color);
                }
            }

            // CONSTANT AMBIENT when music is playing
            if (avgFreq > 20 && Math.random() < 0.15) {
                const x = Math.random();
                const y = Math.random();
                const dx = (Math.random() - 0.5) * 300;
                const dy = (Math.random() - 0.5) * 300;
                const hue = (time * 0.05) % 1;
                const color = new THREE.Color().setHSL(hue, 0.7, 0.25);
                splat(x, y, dx, dy, color);
            }
        }

        // Mouse interaction
        if (isMoved.current && (Date.now() - lastMouseChange.current < 100)) {
            const dx = mouse.current.x - prevMouse.current.x;
            const dy = mouse.current.y - prevMouse.current.y;
            const color = new THREE.Color().setHSL((Date.now() % 10000) / 10000, 0.9, 0.35).multiplyScalar(0.4);

            splat(mouse.current.x, mouse.current.y, dx * splatForce, dy * splatForce, color);
            prevMouse.current.copy(mouse.current);
        }

        // Curl
        materials.curl.uniforms.uVelocity.value = velocity.read.texture;
        materials.curl.uniforms.texelSize.value.set(1 / simRes, 1 / simRes);
        simScene.mesh.material = materials.curl;
        gl.setRenderTarget(curlTex);
        gl.render(simScene.scene, new THREE.Camera());

        // Vorticity - increase with audio
        materials.vorticity.uniforms.uVelocity.value = velocity.read.texture;
        materials.vorticity.uniforms.uCurl.value = curlTex.texture;
        materials.vorticity.uniforms.curl.value = curl + (avgFreq / 5);
        materials.vorticity.uniforms.dt.value = dt;
        materials.vorticity.uniforms.texelSize.value.set(1 / simRes, 1 / simRes);
        simScene.mesh.material = materials.vorticity;
        gl.setRenderTarget(velocity.write);
        gl.render(simScene.scene, new THREE.Camera());
        velocity.swap();

        // Divergence
        materials.divergence.uniforms.uVelocity.value = velocity.read.texture;
        materials.divergence.uniforms.texelSize.value.set(1 / simRes, 1 / simRes);
        simScene.mesh.material = materials.divergence;
        gl.setRenderTarget(divergence);
        gl.render(simScene.scene, new THREE.Camera());

        // Pressure (Jacobi)
        materials.pressure.uniforms.uDivergence.value = divergence.texture;
        materials.pressure.uniforms.texelSize.value.set(1 / simRes, 1 / simRes);
        let pRead = pressure.read;
        let pWrite = pressure.write;

        simScene.mesh.material = materials.pressure;
        for (let i = 0; i < pressureIterations; i++) {
            materials.pressure.uniforms.uPressure.value = pRead.texture;
            gl.setRenderTarget(pWrite);
            gl.render(simScene.scene, new THREE.Camera());

            const temp = pRead;
            pRead = pWrite;
            pWrite = temp;
        }
        pressure.read = pRead;
        pressure.write = pWrite;

        // Gradient Subtract
        materials.gradientSubtract.uniforms.uPressure.value = pressure.read.texture;
        materials.gradientSubtract.uniforms.uVelocity.value = velocity.read.texture;
        materials.gradientSubtract.uniforms.texelSize.value.set(1 / simRes, 1 / simRes);
        simScene.mesh.material = materials.gradientSubtract;
        gl.setRenderTarget(velocity.write);
        gl.render(simScene.scene, new THREE.Camera());
        velocity.swap();

        // Advection (Velocity)
        materials.advection.uniforms.uVelocity.value = velocity.read.texture;
        materials.advection.uniforms.uSource.value = velocity.read.texture;
        materials.advection.uniforms.texelSize.value.set(1 / simRes, 1 / simRes);
        materials.advection.uniforms.dt.value = dt;
        materials.advection.uniforms.dissipation.value = velocityDissipation;
        simScene.mesh.material = materials.advection;
        gl.setRenderTarget(velocity.write);
        gl.render(simScene.scene, new THREE.Camera());
        velocity.swap();

        // Advection (Density/Dye) - reduce dissipation with audio for longer trails
        materials.advection.uniforms.uVelocity.value = velocity.read.texture;
        materials.advection.uniforms.uSource.value = density.read.texture;
        materials.advection.uniforms.texelSize.value.set(1 / dyeRes, 1 / dyeRes);
        materials.advection.uniforms.dissipation.value = densityDissipation - (avgFreq / 3000);
        simScene.mesh.material = materials.advection;
        gl.setRenderTarget(density.write);
        gl.render(simScene.scene, new THREE.Camera());
        density.swap();

        // Display
        gl.setRenderTarget(null);
        if (mesh.current) {
            (mesh.current.material as THREE.ShaderMaterial).uniforms.uTexture.value = density.read.texture;
        }
    });

    return (
        <mesh ref={mesh}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={baseVertex}
                fragmentShader={displayShader}
                uniforms={{
                    uTexture: { value: density.read.texture },
                }}
                depthWrite={false}
                depthTest={false}
            />
        </mesh>
    );
};

// Wrapper that provides audio data from context
function AudioReactiveFluidWithContext() {
    // We need to get audio data from the global AudioContext
    // Since we're inside Canvas, we can't use React hooks directly
    // Instead, we'll use a polling approach
    const [frequencyData, setFrequencyData] = useState<number[]>([]);

    useEffect(() => {
        // Poll for audio data from the global audio element
        const pollAudio = () => {
            // Try to find the audio element and its analyser
            const audioElement = document.querySelector('audio');
            if (audioElement && (window as any).__audioAnalyser) {
                const analyser = (window as any).__audioAnalyser as AnalyserNode;
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(dataArray);
                setFrequencyData(Array.from(dataArray));
            }
        };

        const interval = setInterval(pollAudio, 16); // ~60fps
        return () => clearInterval(interval);
    }, []);

    return <AudioReactiveFluid frequencyData={frequencyData} />;
}

// 3D Audio-Reactive Pearl Sphere
const AudioReactiveMesh = ({ frequencyData }: { frequencyData: number[] }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // Custom shader for vertex displacement
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uFrequency: { value: 0 },
        uBass: { value: 0 },
        uMid: { value: 0 },
        uHigh: { value: 0 },
        uColor1: { value: new THREE.Color(0x22d3ee) }, // Cyan
        uColor2: { value: new THREE.Color(0xa855f7) }, // Purple
    }), []);

    useFrame(({ clock }) => {
        if (!meshRef.current || !materialRef.current) return;

        // Process audio data
        let bass = 0, mid = 0, high = 0, avg = 0;
        if (frequencyData.length > 0) {
            bass = frequencyData.slice(0, 5).reduce((a, b) => a + b, 0) / 5 / 255;
            mid = frequencyData.slice(5, 20).reduce((a, b) => a + b, 0) / 15 / 255;
            high = frequencyData.slice(20, 40).reduce((a, b) => a + b, 0) / 20 / 255;
            avg = frequencyData.reduce((a, b) => a + b, 0) / frequencyData.length / 255;
        }

        // Update uniforms
        materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
        materialRef.current.uniforms.uFrequency.value = THREE.MathUtils.lerp(materialRef.current.uniforms.uFrequency.value, avg, 0.1);
        materialRef.current.uniforms.uBass.value = THREE.MathUtils.lerp(materialRef.current.uniforms.uBass.value, bass, 0.2);
        materialRef.current.uniforms.uMid.value = THREE.MathUtils.lerp(materialRef.current.uniforms.uMid.value, mid, 0.1);
        materialRef.current.uniforms.uHigh.value = THREE.MathUtils.lerp(materialRef.current.uniforms.uHigh.value, high, 0.1);

        // Rotate mesh based on energy
        meshRef.current.rotation.x += 0.001 + bass * 0.01;
        meshRef.current.rotation.y += 0.002 + mid * 0.01;
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} scale={1.5}>
            <sphereGeometry args={[1, 128, 128]} />
            <shaderMaterial
                ref={materialRef}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                uniforms={uniforms}
                vertexShader={`
                    uniform float uTime;
                    uniform float uBass;
                    uniform float uMid;
                    uniform float uHigh;
                    
                    varying vec2 vUv;
                    varying float vDisplacement;
                    varying vec3 vNormal;

                    // Simplex noise function
                    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
                    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
                    float snoise(vec3 v) {
                        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
                        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
                        vec3 i  = floor(v + dot(v, C.yyy));
                        vec3 x0 = v - i + dot(i, C.xxx);
                        vec3 g = step(x0.yzx, x0.xyz);
                        vec3 l = 1.0 - g;
                        vec3 i1 = min( g.xyz, l.zxy );
                        vec3 i2 = max( g.xyz, l.zxy );
                        vec3 x1 = x0 - i1 + C.xxx;
                        vec3 x2 = x0 - i2 + C.yyy;
                        vec3 x3 = x0 - D.yyy;
                        i = mod289(i);
                        vec4 p = permute( permute( permute( 
                                    i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                                + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                                + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
                        float n_ = 0.142857142857;
                        vec3  ns = n_ * D.wyz - D.xzx;
                        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
                        vec4 x_ = floor(j * ns.z);
                        vec4 y_ = floor(j - 7.0 * x_ );
                        vec4 x = x_ *ns.x + ns.yyyy;
                        vec4 y = y_ *ns.x + ns.yyyy;
                        vec4 h = 1.0 - abs(x) - abs(y);
                        vec4 b0 = vec4( x.xy, y.xy );
                        vec4 b1 = vec4( x.zw, y.zw );
                        vec4 s0 = floor(b0)*2.0 + 1.0;
                        vec4 s1 = floor(b1)*2.0 + 1.0;
                        vec4 sh = -step(h, vec4(0.0));
                        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
                        vec3 p0 = vec3(a0.xy,h.x);
                        vec3 p1 = vec3(a0.zw,h.y);
                        vec3 p2 = vec3(a1.xy,h.z);
                        vec3 p3 = vec3(a1.zw,h.w);
                        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                        p0 *= norm.x;
                        p1 *= norm.y;
                        p2 *= norm.z;
                        p3 *= norm.w;
                        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                        m = m * m;
                        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                                    dot(p2,x2), dot(p3,x3) ) );
                    }

                    void main() {
                        vUv = uv;
                        vNormal = normal;
                        
                        // Displacement logic
                        float noise = snoise(position * 2.0 + uTime * 0.5);
                        float bassDisp = uBass * 0.5 * snoise(position * 1.0 + uTime * 2.0); // Large slow waves
                        float midDisp = uMid * 0.3 * snoise(position * 5.0 + uTime * 3.0);   // Medium details
                        float highDisp = uHigh * 0.1 * snoise(position * 10.0 + uTime * 5.0); // Fine jitter
                        
                        vDisplacement = bassDisp + midDisp + highDisp;
                        
                        vec3 newPosition = position + normal * (vDisplacement * 0.5);
                        
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
                    }
                `}
                fragmentShader={`
                    uniform vec3 uColor1;
                    uniform vec3 uColor2;
                    uniform float uBass;
                    
                    varying vec2 vUv;
                    varying float vDisplacement;
                    varying vec3 vNormal;

                    void main() {
                        // Pearl-like iridescence
                        vec3 viewDirection = normalize(cameraPosition - vNormal); // Approximation
                        float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                        
                        vec3 color = mix(uColor1, uColor2, vDisplacement * 2.0 + 0.5);
                        
                        // Add highlights based on displacement (energy)
                        color += vec3(1.0) * fresnel * 0.5;
                        color += vec3(1.0) * smoothstep(0.2, 0.3, vDisplacement) * uBass;
                        
                        // Central glow/transparency
                        float alpha = 0.1 + fresnel * 0.6 + uBass * 0.3;
                        
                        gl_FragColor = vec4(color, alpha);
                    }
                `}
            />
        </mesh>
    );
};

export default function AudioReactiveFluidBackground() {
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            background: "linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)",
            opacity: isLoaded ? 1 : 0.8,
            transition: "opacity 0.5s ease-in-out"
        }}>
            <Canvas
                camera={{ position: [0, 0, 1.5] }}
                gl={{
                    alpha: true,
                    antialias: true,
                    preserveDrawingBuffer: false,
                    powerPreference: 'high-performance'
                }}
                dpr={[1, 2]}
                style={{ opacity: isLoaded ? 1 : 0 }}
            >
                {/* Fluid Simulation Layer (Quad) */}
                <AudioReactiveFluidWithContext />

                {/* 3D Visualizer Overlay */}
                <pointLight position={[10, 10, 10]} intensity={1} />
                <group scale={0.4}> {/* Scale down to fit nicely */}
                    <AudioReactiveFluidWithContextWrapper />
                </group>
            </Canvas>
        </div>
    );
}

// Helper to bridge context to mesh
function AudioReactiveFluidWithContextWrapper() {
    const [frequencyData, setFrequencyData] = useState<number[]>([]);

    useEffect(() => {
        const pollAudio = () => {
            const audioElement = document.querySelector('audio');
            // Check for exposed analyser on window
            if (audioElement && (window as any).__audioAnalyser) {
                const analyser = (window as any).__audioAnalyser as AnalyserNode;
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(dataArray);
                setFrequencyData(Array.from(dataArray));
            }
        };

        const interval = setInterval(pollAudio, 16);
        return () => clearInterval(interval);
    }, []);

    return <AudioReactiveMesh frequencyData={frequencyData} />;
}