'use client';
import dynamic from 'next/dynamic';
const ShaderHero = dynamic(() => import('./ShaderHero'), { ssr: false });
export default function HeroShader() { return <ShaderHero />; }
