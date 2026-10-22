import { chromium } from 'playwright';
import fs from 'fs';
const out = '/workspace/reverbex-site/shots/v8';
const b = await chromium.launch({ executablePath: '/home/box/.cache/ms-playwright/chromium-1140/chrome-linux/chrome', args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const stats = {};
for (const [tag, vp, mob, size] of [['desktop', { width: 1440, height: 900 }, false, { width: 1280, height: 800 }], ['mobile', { width: 390, height: 844 }, true, { width: 390, height: 844 }]]) {
  const ctx = await b.newContext({ viewport: vp, isMobile: mob, hasTouch: mob, recordVideo: { dir: `/tmp/pw/v8raw-${tag}`, size } });
  const p = await ctx.newPage(); await p.goto('http://localhost:3123/', { waitUntil: 'load' }); await p.waitForTimeout(3000);
  await p.evaluate(() => { window.__ft = []; let l = performance.now(); const f = (t) => { window.__ft.push(t - l); l = t; requestAnimationFrame(f); }; requestAnimationFrame(f); });
  const total = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  if (!mob) { for (let y = 0; y < total; y += 60) { await p.mouse.wheel(0, 60); await p.waitForTimeout(70); } }
  else { await p.evaluate(async (total) => { for (let y = 0; y < total; y += 14) { scrollTo(0, y); await new Promise((r) => requestAnimationFrame(r)); } }, total); }
  await p.waitForTimeout(1500);
  const ft = await p.evaluate(() => window.__ft.slice(5)); ft.sort((a, c) => a - c);
  stats[tag] = { frames: ft.length, medianMs: ft[ft.length >> 1], p95Ms: ft[Math.floor(ft.length * .95)] };
  await ctx.close();
}
fs.writeFileSync(out + '/frametimes-swiftshader.json', JSON.stringify(stats, null, 1)); console.log(stats);
await b.close();
