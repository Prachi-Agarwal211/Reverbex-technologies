// Copies user-supplied assets from /workspace/reverbex/assets (A1..A16.*) into public/assets and writes lib/assets.json.
import fs from 'node:fs'; import path from 'node:path';
const SRC = process.env.ASSET_SRC || '/workspace/reverbex/assets', DST = 'public/assets';
fs.mkdirSync(DST, { recursive: true });
if (fs.existsSync(SRC)) for (const f of fs.readdirSync(SRC)) if (/^A\d+.*\.(webp|avif|jpe?g|png|mp4|webm)$/i.test(f)) fs.copyFileSync(path.join(SRC, f), path.join(DST, f));
const map = {}; const rank = (f) => (/placeholder/.test(f) ? 1 : 0);
for (const f of fs.readdirSync(DST).sort((a, b) => rank(a) - rank(b))) { const m = f.match(/^(A\d+)[^.]*\.(webp|avif|jpe?g|png)$/i); if (m && !map[m[1]]) map[m[1]] = '/assets/' + f; }
const vids = {}; for (const f of fs.readdirSync(DST)) { const m = f.match(/^(A\d+)[^.]*\.(mp4|webm)$/i); if (m) vids[m[1]] = '/assets/' + f; }
fs.writeFileSync('lib/assets.json', JSON.stringify({ images: map, videos: vids }, null, 1));
console.log('assets:', Object.keys(map).length, 'images,', Object.keys(vids).length, 'videos');
