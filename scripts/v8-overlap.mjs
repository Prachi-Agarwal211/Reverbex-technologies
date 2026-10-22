import { chromium } from 'playwright';
import fs from 'fs';
const out = '/workspace/reverbex-site/shots/v8';
const widths = (process.env.W || '360,390,768,1024,1280,1440,1920').split(',').map(Number);
const pages = (process.env.P || '/').split(',');
const b = await chromium.launch({ executablePath: '/home/box/.cache/ms-playwright/chromium-1140/chrome-linux/chrome', args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const report = [];
const check = () => {
  const owners = 'p,h1,h2,h3,h4,li,a,button,label,summary,text,figcaption,dt,dd';
  const eff = (el) => { let o = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || cs.display === 'none') return 0; o *= +cs.opacity; } return o; };
  const boxes = [];
  const tw = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT);
  for (let n; (n = tw.nextNode());) {
    if (!n.textContent.trim()) continue;
    const el = n.parentElement; if (!el.checkVisibility()) continue; if (el.closest('[aria-hidden="true"],.sr-only,script,style,noscript')) continue;
    if (eff(el) < .15) continue;
    const owner = el.closest(owners) || el;
    const r = document.createRange(); r.selectNodeContents(n);
    for (const q of r.getClientRects()) { if (q.width < 2 || q.height < 2 || q.bottom < 0 || q.top > innerHeight) continue;
      // trim line-box leading: use 70% of height centred (glyph core)
      const pad = q.height * .15; boxes.push({ owner, t: n.textContent.trim().slice(0, 40), x1: q.left, x2: q.right, y1: q.top + pad, y2: q.bottom - pad }); }
  }
  const hits = [];
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
    const A = boxes[i], B = boxes[j];
    if (A.owner === B.owner || A.owner.contains(B.owner) || B.owner.contains(A.owner)) continue;
    const w = Math.min(A.x2, B.x2) - Math.max(A.x1, B.x1), h = Math.min(A.y2, B.y2) - Math.max(A.y1, B.y1);
    if (w > 2 && h > 2) hits.push(`${JSON.stringify(A.t)} × ${JSON.stringify(B.t)} (${w.toFixed(0)}x${h.toFixed(0)})`);
  }
  const hs = document.documentElement.scrollWidth > innerWidth + 1;
  return { hits: [...new Set(hits)], hscroll: hs, sw: document.documentElement.scrollWidth };
};
for (const path of pages) for (const w of widths) {
  const ctx = await b.newContext({ viewport: { width: w, height: w < 768 ? 844 : w < 1280 ? 1024 : 900 }, hasTouch: w < 1024, isMobile: w < 768 });
  const p = await ctx.newPage();
  await p.goto('http://localhost:3123' + path, { waitUntil: 'load' }); await p.waitForTimeout(2500);
  const H = await p.evaluate(() => innerHeight); const total = await p.evaluate(() => document.documentElement.scrollHeight);
  const res = { path, w, steps: 0, hits: [], hscroll: false };
  for (let y = 0; y < await p.evaluate(() => document.documentElement.scrollHeight - innerHeight + 10); y += Math.round(H * .4)) {
    await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(1300);
    const r = await p.evaluate(check); res.steps++;
    if (r.hscroll) res.hscroll = r.sw;
    r.hits.forEach((h) => res.hits.push(`y=${y}: ${h}`));
  }
  report.push(res); console.log(path, w, 'steps', res.steps, 'hits', res.hits.length, 'hscroll', res.hscroll); res.hits.slice(0, 8).forEach((h) => console.log('   ', h));
  await ctx.close();
}
fs.writeFileSync(out + `/overlap-${process.env.TAG || 'home'}.json`, JSON.stringify(report, null, 1));
await b.close();
