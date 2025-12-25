"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
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

const Fluid = () => {
    const { gl, size, viewport } = useThree();

    // Constants
    const densityDissipation = 0.985;
    const velocityDissipation = 0.992;
    const curl = 40;
    const splatRadius = 0.002;
    const splatForce = 6000;

    // Mouse state
    const mouse = useRef(new THREE.Vector2(0, 0));
    const prevMouse = useRef(new THREE.Vector2(0, 0));
    const lastMouseChange = useRef(0);
    const isMoved = useRef(false);

    // Dynamic quality settings based on device capability
    const [quality, setQuality] = useState({ simRes: 128, dyeRes: 512, iterations: 20 });

    useEffect(() => {
        const checkMobile = () => {
            const isMobile = window.innerWidth < 768;
            setQuality({
                simRes: isMobile ? 128 : 256,         // Bumped up mobile res for visibility (64 was too low)
                dyeRes: isMobile ? 256 : 512,
                iterations: isMobile ? 12 : 20        // Reduced iterations for performance
            });
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const simRes = quality.simRes;
    const dyeRes = quality.dyeRes;
    const pressureIterations = quality.iterations;

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

    // Double buffering helper
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

    // Initialize FBOs with dynamic resolution
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

    // Mesh for full screen quad
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

    // Higher radius for mobile visibility (simRes is lower)
    const activeSplatRadius = window.innerWidth < 768 ? 0.01 : 0.003;

    const splat = (x: number, y: number, dx: number, dy: number, color: THREE.Color) => {
        // Velocity splat
        materials.splat.uniforms.uTarget.value = velocity.read.texture;
        materials.splat.uniforms.aspectRatio.value = size.width / size.height;
        materials.splat.uniforms.point.value.set(x, y);
        materials.splat.uniforms.color.value.set(dx, dy, 0.0);
        materials.splat.uniforms.radius.value = activeSplatRadius;

        simScene.mesh.material = materials.splat;
        gl.setRenderTarget(velocity.write);
        gl.render(simScene.scene, new THREE.Camera());
        velocity.swap();

        // Dye splat
        materials.splat.uniforms.uTarget.value = density.read.texture;
        materials.splat.uniforms.color.value.set(color.r, color.g, color.b);

        simScene.mesh.material = materials.splat;
        gl.setRenderTarget(density.write);
        gl.render(simScene.scene, new THREE.Camera());
        density.swap();
    };

    useFrame(({ clock }) => {
        const dt = 0.016;
        const time = clock.getElapsedTime();

        // Auto splats for entrance animation
        if (time < 3.5) {
            if (Math.random() < 0.1) { // Increased frequency
                const angle = Math.random() * Math.PI * 2;
                const radius = 0.1 + Math.random() * 0.25;
                const x = 0.5 + Math.cos(angle) * radius;
                const y = 0.5 + Math.sin(angle) * radius;

                const force = 1000;
                const dx = (0.5 - x) * force + (Math.random() - 0.5) * 200;
                const dy = (0.5 - y) * force + (Math.random() - 0.5) * 200;

                const brandColors = [0x22d3ee, 0x818cf8, 0xe879f9, 0xffffff];
                const hex = brandColors[Math.floor(Math.random() * brandColors.length)];
                const color = new THREE.Color(hex).multiplyScalar(0.4);

                splat(x, y, dx, dy, color);
            }
        } else {
            // Enhanced Ambient Motion
            const t = time * 0.5;
            // Main orb
            const x = 0.5 + Math.sin(t) * 0.3;
            const y = 0.5 + Math.cos(t * 1.2) * 0.3;
            const dx = Math.sin(t * 2.5) * 800;
            const dy = Math.cos(t * 1.5) * 800;
            const color = new THREE.Color().setHSL((t * 0.1) % 1, 0.8, 0.25).multiplyScalar(0.4);
            splat(x, y, dx, dy, color);

            // Secondary orb for more life
            const t2 = time * 0.3 + 2;
            const x2 = 0.5 + Math.sin(t2 * 1.1) * 0.4;
            const y2 = 0.5 + Math.cos(t2 * 0.9) * 0.4;
            const dx2 = Math.cos(t2 * 2.1) * 600;
            const dy2 = Math.sin(t2 * 1.8) * 600;
            const color2 = new THREE.Color().setHSL((t2 * 0.15 + 0.5) % 1, 0.8, 0.25).multiplyScalar(0.3);
            splat(x2, y2, dx2, dy2, color2);
        }

        // --- Inputs ---
        if (isMoved.current && (Date.now() - lastMouseChange.current < 100)) {
            const dx = mouse.current.x - prevMouse.current.x;
            const dy = mouse.current.y - prevMouse.current.y;
            const color = new THREE.Color().setHSL((Date.now() % 10000) / 10000, 0.9, 0.35).multiplyScalar(0.4);

            splat(mouse.current.x, mouse.current.y, dx * splatForce, dy * splatForce, color);
            prevMouse.current.copy(mouse.current);
        }

        // --- Curl ---
        materials.curl.uniforms.uVelocity.value = velocity.read.texture;
        materials.curl.uniforms.texelSize.value.set(1 / simRes, 1 / simRes);
        simScene.mesh.material = materials.curl;
        gl.setRenderTarget(curlTex);
        gl.render(simScene.scene, new THREE.Camera());

        // --- Vorticity ---
        materials.vorticity.uniforms.uVelocity.value = velocity.read.texture;
        materials.vorticity.uniforms.uCurl.value = curlTex.texture;
        materials.vorticity.uniforms.curl.value = curl;
        materials.vorticity.uniforms.dt.value = dt;
        materials.vorticity.uniforms.texelSize.value.set(1 / simRes, 1 / simRes);
        simScene.mesh.material = materials.vorticity;
        gl.setRenderTarget(velocity.write);
        gl.render(simScene.scene, new THREE.Camera());
        velocity.swap();

        // --- Divergence ---
        materials.divergence.uniforms.uVelocity.value = velocity.read.texture;
        materials.divergence.uniforms.texelSize.value.set(1 / simRes, 1 / simRes);
        simScene.mesh.material = materials.divergence;
        gl.setRenderTarget(divergence);
        gl.render(simScene.scene, new THREE.Camera());

        // --- Pressure (Jacobi) ---
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

        // --- Gradient Subtract ---
        materials.gradientSubtract.uniforms.uPressure.value = pressure.read.texture;
        materials.gradientSubtract.uniforms.uVelocity.value = velocity.read.texture;
        materials.gradientSubtract.uniforms.texelSize.value.set(1 / simRes, 1 / simRes);
        simScene.mesh.material = materials.gradientSubtract;
        gl.setRenderTarget(velocity.write);
        gl.render(simScene.scene, new THREE.Camera());
        velocity.swap();

        // --- Advection (Velocity) ---
        materials.advection.uniforms.uVelocity.value = velocity.read.texture;
        materials.advection.uniforms.uSource.value = velocity.read.texture;
        materials.advection.uniforms.texelSize.value.set(1 / simRes, 1 / simRes);
        materials.advection.uniforms.dt.value = dt;
        materials.advection.uniforms.dissipation.value = velocityDissipation;
        simScene.mesh.material = materials.advection;
        gl.setRenderTarget(velocity.write);
        gl.render(simScene.scene, new THREE.Camera());
        velocity.swap();

        // --- Advection (Density/Dye) ---
        materials.advection.uniforms.uVelocity.value = velocity.read.texture;
        materials.advection.uniforms.uSource.value = density.read.texture;
        materials.advection.uniforms.texelSize.value.set(1 / dyeRes, 1 / dyeRes);
        materials.advection.uniforms.dissipation.value = densityDissipation;
        simScene.mesh.material = materials.advection;
        gl.setRenderTarget(density.write);
        gl.render(simScene.scene, new THREE.Camera());
        density.swap();

        // --- Display ---
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

export default function FluidBackground() {
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        // Set loaded after a short delay to ensure canvas is ready
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
                camera={{ position: [0, 0, 1] }}
                gl={{
                    alpha: false,
                    antialias: false,
                    preserveDrawingBuffer: false,
                    powerPreference: 'high-performance'
                }}
                dpr={[1, 2]}
                style={{ opacity: isLoaded ? 1 : 0 }}
            >
                <Fluid />
            </Canvas>
        </div>
    );
}
