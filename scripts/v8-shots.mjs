import { chromium } from 'playwright';
const out = '/workspace/reverbex-site/shots/v8';
const b = await chromium.launch({ executablePath: '/home/box/.cache/ms-playwright/chromium-1140/chrome-linux/chrome', args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
for (const [tag, vp, mob] of [['desktop', { width: 1440, height: 900 }, false], ['mobile', { width: 390, height: 844 }, true]]) {
  const ctx = await b.newContext({ viewport: vp, isMobile: mob, hasTouch: mob, deviceScaleFactor: mob ? 2 : 1 });
  const p = await ctx.newPage(); await p.goto('http://localhost:3123/', { waitUntil: 'load' }); await p.waitForTimeout(3000);
  const secs = await p.evaluate(() => [...document.querySelectorAll('[data-scene]')].map((s) => [s.dataset.scene, s.getBoundingClientRect().top + scrollY, s.offsetHeight]));
  for (const [n, top, h] of secs) {
    for (const [k, f] of [['mid', -0.45], ['in', 0]]) {   // mid = section entering (top at 55% of viewport) → animations mid-scrub
      await p.evaluate((y) => scrollTo(0, Math.max(0, y)), top + f * vp.height + (k === 'in' ? Math.min(h * .15, 120) : 0)); await p.waitForTimeout(1800);
      await p.screenshot({ path: `${out}/${tag}-${n}-${k}.png` });
    }
  }
  await ctx.close();
}
await b.close();
