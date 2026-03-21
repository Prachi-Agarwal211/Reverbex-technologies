export default function Loading() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white relative z-50 overflow-hidden">
      {/* Static elegant loader */}
      <div className="flex flex-col items-center gap-6">
        {/* Pulsing dot - uses CSS keyframe animation */}
        <div className="loading-dot w-3 h-3 rounded-full bg-white" />

        {/* Loading text */}
        <div className="text-xs font-mono tracking-[0.3em] text-white/40">
          LOADING
        </div>
      </div>

      {/* Ambient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-yellow-900/10" />
    </div>
  );
}
