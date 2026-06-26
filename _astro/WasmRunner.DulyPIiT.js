import{_ as b}from"./preload-helper.BYYL7Ane.js";import{d as r}from"./hooks.module.BflLFCwM.js";import{u as e}from"./jsxRuntime.module.BZPHMOh1.js";function f(t){return`<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:ui-monospace,SFMono-Regular,monospace;font-size:.85rem;margin:.6rem;white-space:pre-wrap;color:#111;background:#fff}</style></head><body><pre id="__out"></pre><script>(function(){var o=document.getElementById("__out");function f(a){try{return typeof a==="object"?JSON.stringify(a):String(a)}catch(e){return String(a)}}function w(){o.textContent+=Array.prototype.map.call(arguments,f).join(" ")+"\\n";}console.log=w;console.info=w;console.warn=w;console.error=w;console.debug=w;window.onerror=function(m){w("Error: "+m);return true;};window.onunhandledrejection=function(e){w("Error: "+((e&&e.reason&&e.reason.message)||(e&&e.reason)||e));};})();<\/script><script type="module">
  import WabtModule from 'https://esm.sh/wabt@1.0.36';
  const wabtReady = WabtModule();
  window.__wabtReady = wabtReady;
  window.compileWat = async (wat) => {
    const w = await wabtReady;
    const m = w.parseWat('module.wat', wat);
    const { buffer } = m.toBinary({});
    m.destroy();
    return buffer;
  };
<\/script><script type="module">
try{
`+t.replace(/<\/script/gi,"<\\/script")+`
}catch(e){console.error("Error: "+((e&&e.message)||e));}
<\/script></body></html>`}function y(t){return{title:"AssemblyScript example",description:"WebAssembly — From Zero to Hero — runnable AssemblyScript example",template:"node",files:{"package.json":JSON.stringify({name:"assemblyscript-example",type:"module",scripts:{asbuild:"asc assembly/index.ts --outFile build/module.wasm --bindings raw",start:"npm run asbuild && node index.js"},devDependencies:{assemblyscript:"^0.27.31"}},null,2),"assembly/index.ts":`export function add(a: i32, b: i32): i32 {
  return a + b;
}
`,"index.js":t,"index.html":`<!doctype html>
<html>
  <head><meta charset="utf-8" /><title>AssemblyScript</title></head>
  <body>
    <pre id="out"></pre>
    <script type="module">
      const out = document.getElementById('out');
      const res = await WebAssembly.instantiateStreaming(fetch('build/module.wasm'), {});
      const { add } = res.instance.exports;
      out.textContent = 'add(40, 2) = ' + add(40, 2);
    <\/script>
  </body>
</html>
`}}}let s=null;function w(){return s||(s=b(()=>import("https://esm.sh/@stackblitz/sdk"),[]).then(t=>t.default??t)),s}function x({code:t,stackblitz:n=!1}){const[o,i]=r(t),[c,l]=r(""),[d,u]=r(!1);function p(){l(f(o)),u(!0)}async function m(){try{(await w()).openProject(y(o),{openFile:"index.js",newWindow:!0})}catch{navigator.clipboard.writeText(o),window.open("https://stackblitz.com/fork/node","_blank","noopener")}}return e("div",{class:"nr",children:[e("div",{class:"nr__bar",children:[e("span",{class:"nr__label",children:n?"AssemblyScript":"WebAssembly"}),e("span",{class:"nr__actions",children:[!n&&e("button",{class:"nr__run",onClick:p,children:"Run ▸"}),e("button",{class:"nr__open",onClick:m,children:"Open in StackBlitz ▸"})]})]}),e("textarea",{class:"nr__code",spellcheck:!1,value:o,onInput:a=>i(a.target.value)}),n?e("p",{class:"nr__hint",children:"Needs the AssemblyScript toolchain — open in StackBlitz to build & run."}):d&&e("iframe",{class:"nr__out",sandbox:"allow-scripts",srcdoc:c,title:"Output"})]})}export{x as default};
