import { chromium } from 'playwright';
import fs from 'fs';
const out='/workspace/reverbex-site/shots/v7';
const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const ctx=await b.newContext({viewport:{width:1440,height:900},recordVideo:{dir:out+'/raw',size:{width:1280,height:800}}});
const p=await ctx.newPage();
await p.goto('http://localhost:3123/',{waitUntil:'load'}); await p.waitForTimeout(3500);
await p.mouse.move(720,450);
const H=900, end=H*3.4, step=80; const frames=[];
await p.evaluate(()=>{window.__ft=[];let l=performance.now();const f=t=>{window.__ft.push(t-l);l=t;requestAnimationFrame(f)};requestAnimationFrame(f)});
let y=0,i=0;
while(y<=end){ const buf=await p.screenshot({type:'png'}); const n=String(i).padStart(3,'0'); fs.writeFileSync(`${out}/f-${n}.png`,buf);
  frames.push({i,y,sy:await p.evaluate(()=>scrollY)}); await p.mouse.wheel(0,step); await p.waitForTimeout(450); y+=step;i++; }
const ft=await p.evaluate(()=>window.__ft.slice(5));
ft.sort((a,b)=>a-b); const med=ft[ft.length>>1], p95=ft[Math.floor(ft.length*.95)];
fs.writeFileSync(out+'/frames.json',JSON.stringify({frames,frameTimes:{n:ft.length,median:med,p95,avgFps:1000/(ft.reduce((a,b)=>a+b,0)/ft.length)}},null,1));
await ctx.close(); await b.close();
