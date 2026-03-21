export default function FractalGlassBackground() {
  return (
    <>
      {/* Desktop: Heavy SVG effects - GPU handles this */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block"
        style={{
          backgroundColor: '#050505',
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15' style='mix-blend-mode: overlay;'/%3E%3C/svg%3E"),
            repeating-linear-gradient(90deg,
              rgba(0,0,0,0.15) 0px,
              rgba(0,0,0,0.15) 2px,
              transparent 2px,
              transparent 6px
            ),
            repeating-linear-gradient(90deg,
              rgba(255,255,255,0.03) 0px,
              rgba(255,255,255,0.01) 2px,
              transparent 2px,
              transparent 12px
            ),
            radial-gradient(ellipse 80% 150% at 20% -10%, rgba(6, 182, 212, 0.45) 0%, transparent 70%),
            radial-gradient(ellipse 80% 150% at 80% 110%, rgba(234, 179, 8, 0.35) 0%, transparent 70%)
          `,
          backgroundBlendMode: 'overlay, normal, normal, screen, screen',
          backgroundSize: '150px 150px, 100% 100%, 100% 100%, 100% 100%, 100% 100%'
        }}
      >
        <style>{`
          @keyframes subtle-pan {
            0% { background-position: 0 0, 0 0, 0 0, 0 0, 0 0; }
            100% { background-position: 150px 150px, 0 0, 0 0, 0 0, 0 0, 0 0; }
          }
          .animate-shimmer {
            animation: subtle-pan 20s linear infinite;
            will-change: background-position;
          }
        `}</style>
        <div className="absolute inset-0 w-full h-full animate-shimmer pointer-events-none" style={{ background: 'inherit' }} />
      </div>

      {/* Mobile: Static baked gradient - zero CPU/GPU cost */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0 block md:hidden"
        style={{
          background: `
            linear-gradient(180deg, #050505 0%, #050a15 50%, #050505 100%),
            radial-gradient(ellipse 100% 80% at 20% -10%, rgba(6, 182, 212, 0.25) 0%, transparent 60%),
            radial-gradient(ellipse 100% 80% at 80% 110%, rgba(234, 179, 8, 0.15) 0%, transparent 60%)
          `,
          backgroundBlendMode: 'normal, screen, screen'
        }}
      />
    </>
  );
}
