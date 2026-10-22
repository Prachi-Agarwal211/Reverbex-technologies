import type { Config } from 'tailwindcss';
/* Reverbex palette v2: Cobalt / Glow / Void / Off-white (see reverbex/brand/palette-v3.md)
   Theme-aware tokens (bg/fg/mute/accent) flip between NIGHT and DAY via CSS vars on <html data-mode>. */
const v = (n: string) => `rgb(var(--${n}) / <alpha-value>)`;
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: {
      ink: v('bg'), paper: v('fg'), mute: v('mute'), moss: v('accent'), signal: v('accent'), bone: v('bg2'),
      eclipse: '#07080B', carbon: '#0A0F2C', surface: '#0A1A4A', ivory: '#F5F7FA', mist: '#FFF6D6', brand: '#FFF3C4', lime: '#FFF3C4', glow: '#FFF3C4', glowlt: '#FFF6D6', glowdk: '#F2D88A', navy: '#0A1A4A', ice: '#5EE7FF', icelt: '#7FD4FF', amber: '#FFB547', gold: '#F2D88A', electric: '#3D8BFF', midnight: '#0A0F2C', nexus: '#2F6BFF', cobalt: '#2F6BFF', cobaltlt: '#5B8CFF', cobaltdk: '#1E4FD6', cobaltdeep: '#0A1A4A', nexuslt: '#5B8CFF', titanium: '#7FD4FF', slate: '#1E4FD6', branddeep: '#1E4FD6',
    },
    fontFamily: { sans: ['var(--font-sans)'], mono: ['var(--font-mono)'], display: ['var(--font-display)'] },
  } },
  plugins: [],
} satisfies Config;
