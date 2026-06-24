import { chromium } from 'playwright';
const BASE='http://localhost:4321/webassembly-from-zero-to-hero';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:1400,height:900}});
const page=await ctx.newPage(); const errs=[]; page.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,60));});
// run a control-flow lesson (sumTo loop) and check output
await page.goto(BASE+'/en/control-flow-functions/loops/',{waitUntil:'networkidle'});
await page.locator('.nr__run').first().click();
let txt=''; for(let i=0;i<30;i++){ await page.waitForTimeout(500); try{ txt=await page.frameLocator('iframe.nr__out').locator('body').innerText(); }catch(e){} if(txt&&txt.trim())break; }
console.log('loops runner output:', JSON.stringify((txt||'').trim().slice(0,80)));
// mermaid + theme + read mode on stack-machine-model
const p2=await ctx.newPage(); await p2.goto(BASE+'/en/intro-what-is-wasm/stack-machine-model/',{waitUntil:'networkidle'});
let svg=0; for(let i=0;i<24;i++){svg=await p2.locator('pre.mermaid svg').count(); if(svg)break; await p2.waitForTimeout(500);}
console.log('mermaid svg:', svg);
await p2.evaluate(()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==='light'?'dark':'light';});
await p2.waitForTimeout(1200);
console.log('mermaid after theme:', await p2.locator('pre.mermaid svg').count());
const sbB=await p2.evaluate(()=>{const e=document.querySelector('.sidebar');return e?getComputedStyle(e).display:'?';});
await p2.locator('.readmode-toggle').click(); await p2.waitForTimeout(250);
const sbA=await p2.evaluate(()=>{const e=document.querySelector('.sidebar');return e?getComputedStyle(e).display:'?';});
console.log('read-mode sidebar:', sbB,'->',sbA);
const pt=p2.locator('button.pt'); await pt.scrollIntoViewIfNeeded(); await p2.waitForTimeout(200); await pt.click();
const a=(await pt.innerText()).trim(); await p2.reload({waitUntil:'networkidle'}); await p2.locator('button.pt').scrollIntoViewIfNeeded(); await p2.waitForTimeout(200);
console.log('progress persist:', JSON.stringify(a),'->',JSON.stringify((await p2.locator('button.pt').innerText()).trim()));
const p3=await ctx.newPage(); await p3.goto(BASE+'/th/linear-memory/passing-strings/',{waitUntil:'domcontentloaded'}); console.log('TH title:', await p3.title());
console.log('errors:', errs.length?errs.join(';'):'none');
await b.close();
