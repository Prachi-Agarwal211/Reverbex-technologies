"use client";

import React, { useRef, useMemo, useEffect } from "react";
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

const InteractiveFluid = () => {
    const { gl, size } = useThree();

    // Simulation parameters
    const simRes = 256;
    const dyeRes = 1024;
    // Smudge Effect: High dissipation keeps trails lingering
    const densityDissipation = 0.99;
    const velocityDissipation = 0.99;
    const pressureIterations = 20;
    const curl = 30; // Reduced curl for smoother, less chaotic flow
    // Small size as requested
    const splatRadius = 0.008;
    // Reduced force for gentle "smudging" rather than shooting
    const splatForce = 4000;

    // Mouse state
    const mouse = useRef(new THREE.Vector2(0, 0));
    const prevMouse = useRef(new THREE.Vector2(0, 0));
    const isMoved = useRef(false);

    // Auto-movement state
    const prevAutoMouse = useRef(new THREE.Vector2(0.5, 0.5));

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

    useFrame(({ clock }) => {
        const dt = 0.016;
        const time = clock.getElapsedTime();

        // 1. AUTOMATIC MOVEMENT (The continuous background smudge)
        const autoX = 0.5 + 0.35 * Math.sin(time * 0.4) + 0.15 * Math.cos(time * 0.9);
        const autoY = 0.5 + 0.25 * Math.cos(time * 0.5) + 0.15 * Math.sin(time * 1.2);

        const autoDx = autoX - prevAutoMouse.current.x;
        const autoDy = autoY - prevAutoMouse.current.y;

        const autoHue = (time * 0.05) % 1;
        // Dark, deep colors (Lightness 0.2)
        const autoColor = new THREE.Color().setHSL(autoHue, 0.9, 0.2);
        // Very low intensity (0.15) for subtle background
        autoColor.multiplyScalar(0.15);

        splat(autoX, autoY, autoDx * splatForce * 0.5, autoDy * splatForce * 0.5, autoColor);
        prevAutoMouse.current.set(autoX, autoY);

        // 2. MOUSE INTERACTION
        if (isMoved.current) {
            const dx = mouse.current.x - prevMouse.current.x;
            const dy = mouse.current.y - prevMouse.current.y;

            if (Math.abs(dx) > 0 || Math.abs(dy) > 0) {
                const hue = (time * 0.2) % 1;
                const color = new THREE.Color().setHSL(hue, 0.9, 0.25); // Keeps it dark

                // Low intensity (0.25) - visible but definitely not bright
                color.multiplyScalar(0.25);

                splat(mouse.current.x, mouse.current.y, dx * splatForce, dy * splatForce, color);
            }
            prevMouse.current.copy(mouse.current);
        }

        // Curl
        materials.curl.uniforms.uVelocity.value = velocity.read.texture;
        materials.curl.uniforms.texelSize.value.set(1 / simRes, 1 / simRes);
        simScene.mesh.material = materials.curl;
        gl.setRenderTarget(curlTex);
        gl.render(simScene.scene, new THREE.Camera());

        // Vorticity
        materials.vorticity.uniforms.uVelocity.value = velocity.read.texture;
        materials.vorticity.uniforms.uCurl.value = curlTex.texture;
        materials.vorticity.uniforms.curl.value = curl;
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

        // Advection (Density/Dye)
        materials.advection.uniforms.uVelocity.value = velocity.read.texture;
        materials.advection.uniforms.uSource.value = density.read.texture;
        materials.advection.uniforms.texelSize.value.set(1 / dyeRes, 1 / dyeRes);
        materials.advection.uniforms.dissipation.value = densityDissipation;
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

export default function InteractiveFluidBackground() {
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
                    powerPreference: 'high-performance',
                    stencil: false,
                    depth: false
                }}
                dpr={[1, 2]} // Quality scaling
                style={{ opacity: isLoaded ? 1 : 0 }}
            >
                <InteractiveFluid />
            </Canvas>
        </div>
    );
}
