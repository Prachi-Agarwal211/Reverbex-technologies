export default function FractalGlassBackground() {
  return (
    <>
      {/* Desktop: Heavy SVG effects - GPU handles this */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block fractal-glass-desktop">
        <div className="absolute inset-0 w-full h-full animate-shimmer pointer-events-none" style={{ background: 'inherit' }} />
      </div>

      {/* Mobile: Static baked gradient - zero CPU/GPU cost */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 block md:hidden fractal-glass-mobile" />
    </>
  );
}
