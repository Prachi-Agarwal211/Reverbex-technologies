/** Fixed aurora background that evolves through the homepage. Motion.tsx sets html[data-scene]; CSS crossfades the blobs.
 *  Blobs are radial gradients (no CSS filter) so they are cheap to composite; the inner layer drifts slower than the page. */
export default function Aurora() {
  return (
    <div aria-hidden className="aurora pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="aurora-drift absolute inset-x-0 -top-[10%] h-[130%]"><i className="a1" /><i className="a2" /><i className="a3" /><i className="a4" /><i className="a5" /><i className="a6" /></div>
    </div>
  );
}
