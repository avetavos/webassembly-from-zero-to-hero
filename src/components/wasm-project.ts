export type StackBlitzProject = {
  title: string;
  description: string;
  template: 'node';
  files: Record<string, string>;
};

export function buildJsSrcdoc(code: string): string {
  const safe = code.replace(/<\/script/gi, '<\\/script');
  return (
    '<!doctype html><html><head><meta charset="utf-8">' +
    '<style>body{font-family:ui-monospace,SFMono-Regular,monospace;font-size:.85rem;margin:.6rem;white-space:pre-wrap;color:#111;background:#fff}</style></head>' +
    '<body><pre id="__out"></pre>' +
    // console -> output-pane wiring (runs first, classic script)
    '<script>(function(){' +
    'var o=document.getElementById("__out");' +
    'function f(a){try{return typeof a==="object"?JSON.stringify(a):String(a)}catch(e){return String(a)}}' +
    'function w(){o.textContent+=Array.prototype.map.call(arguments,f).join(" ")+"\\n";}' +
    'console.log=w;console.info=w;console.warn=w;console.error=w;console.debug=w;' +
    'window.onerror=function(m){w("Error: "+m);return true;};' +
    'window.onunhandledrejection=function(e){w("Error: "+((e&&e.reason&&e.reason.message)||(e&&e.reason)||e));};' +
    '})();</script>' +
    // wabt/compileWat preamble — defines window.compileWat BEFORE user code
    '<script type="module">\n' +
    "  import WabtModule from 'https://esm.sh/wabt@1.0.36';\n" +
    '  const wabtReady = WabtModule();\n' +
    '  window.__wabtReady = wabtReady;\n' +
    '  window.compileWat = async (wat) => {\n' +
    "    const w = await wabtReady;\n" +
    "    const m = w.parseWat('module.wat', wat);\n" +
    '    const { buffer } = m.toBinary({});\n' +
    '    m.destroy();\n' +
    '    return buffer;\n' +
    '  };\n' +
    '</script>' +
    // user code — module, runs AFTER the preamble so it can await window.compileWat
    '<script type="module">\n' +
    'try{\n' + safe + '\n}catch(e){console.error("Error: "+((e&&e.message)||e));}' +
    '\n</script>' +
    '</body></html>'
  );
}

export function buildWasmProject(code: string): StackBlitzProject {
  return {
    title: 'AssemblyScript example',
    description: 'WebAssembly — From Zero to Hero — runnable AssemblyScript example',
    template: 'node',
    files: {
      'package.json': JSON.stringify(
        {
          name: 'assemblyscript-example',
          type: 'module',
          scripts: {
            asbuild: 'asc assembly/index.ts --outFile build/module.wasm --bindings raw',
            start: 'npm run asbuild && node index.js',
          },
          devDependencies: { assemblyscript: '^0.27.31' },
        },
        null, 2,
      ),
      'assembly/index.ts': 'export function add(a: i32, b: i32): i32 {\n  return a + b;\n}\n',
      'index.js': code,
      'index.html':
        '<!doctype html>\n<html>\n  <head><meta charset="utf-8" /><title>AssemblyScript</title></head>\n' +
        '  <body>\n    <pre id="out"></pre>\n' +
        '    <script type="module">\n' +
        "      const out = document.getElementById('out');\n" +
        "      const res = await WebAssembly.instantiateStreaming(fetch('build/module.wasm'), {});\n" +
        "      const { add } = res.instance.exports;\n" +
        "      out.textContent = 'add(40, 2) = ' + add(40, 2);\n" +
        '    </script>\n  </body>\n</html>\n',
    },
  };
}
