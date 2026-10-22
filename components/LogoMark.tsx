/** Vector re-draw of the real Reverbex mark (hexagon + waveform), traced from https://www.reverbex.in/reverbex%20logo.png.
 *  TODO(Anurag): replace with the official SVG master if available. */
export const HEX_PATH = 'M95 305 V192 L322 62 L548 192 V470 L322 600 L95 470 V375';
export const WAVE_PATH = 'M20 352 C90 350 150 345 180 300 C205 252 222 226 245 230 C292 240 300 392 360 382 C410 374 420 300 462 300 C500 300 508 330 548 328';
export function LogoMark({ size = 28, className = '', drawClass = '' }: { size?: number; className?: string; drawClass?: string }) {
  return (
    <svg viewBox="0 0 623 663" width={size} height={Math.round(size * 663 / 623)} className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="30" strokeLinecap="round" strokeLinejoin="miter">
      <path d={HEX_PATH} className={drawClass} pathLength={1600} />
      <path d={WAVE_PATH} className={drawClass ? `${drawClass} w` : ''} pathLength={1600} />
    </svg>
  );
}
