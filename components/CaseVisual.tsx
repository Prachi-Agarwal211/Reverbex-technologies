/** Procedural "screen" visual per case: code-drawn, no photos. */
export function CaseVisual({ slug }: { slug: string }) {
  const seed = [...slug].reduce((a, c) => a + c.charCodeAt(0), 0);
  const bars = Array.from({ length: 14 }, (_, i) => 20 + ((seed * (i + 3)) % 70));
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" aria-hidden>
      <rect width="400" height="260" rx="10" fill="#0A0F2C" />
      <rect x="0" y="0" width="400" height="26" rx="10" fill="#07080B" />
      {[16, 30, 44].map((x) => <circle key={x} cx={x} cy="13" r="4" fill="#F5F7FA" opacity=".25" />)}
      <rect x="70" y="8" width="200" height="10" rx="5" fill="#F5F7FA" opacity=".08" />
      {bars.map((h, i) => <rect key={i} x={24 + i * 25} y={230 - h * 2} width="14" height={h * 2} rx="2" fill={i === bars.length - 1 ? '#FFF3C4' : i % 3 === 0 ? '#2F6BFF' : '#F5F7FA'} opacity={i === bars.length - 1 ? 1 : 0.22} />)}
      <path d={`M24 ${200 - (seed % 30)} ${bars.map((h, i) => `L${31 + i * 25} ${226 - h * 2.2}`).join(' ')}`} fill="none" stroke="#FFF3C4" strokeWidth="2" />
      <rect x="24" y="44" width="120" height="14" rx="3" fill="#F5F7FA" opacity=".85" /><rect x="24" y="64" width="80" height="8" rx="3" fill="#F5F7FA" opacity=".3" />
    </svg>
  );
}
