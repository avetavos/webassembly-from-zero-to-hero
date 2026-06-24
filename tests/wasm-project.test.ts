import { describe, it, expect } from 'vitest';
import { buildJsSrcdoc, buildWasmProject } from '../src/components/wasm-project';

describe('buildJsSrcdoc', () => {
  it('embeds the user code and an output sink', () => {
    const doc = buildJsSrcdoc("console.log('hi')");
    expect(doc).toContain("console.log('hi')");
    expect(doc).toContain('__out');
    expect(doc).toContain('console.log');
  });
  it('neutralizes a nested </script> in user code', () => {
    expect(buildJsSrcdoc("var s='</script>'")).not.toContain("'</script>'");
  });
  it('injects the wabt/compileWat module preamble before the user code', () => {
    const doc = buildJsSrcdoc('await window.compileWat("(module)")');
    expect(doc).toContain('window.compileWat');
    expect(doc).toContain('wabt@1.0.36');
    expect(doc.indexOf('window.compileWat')).toBeLessThan(doc.indexOf('await window.compileWat'));
    expect(doc).toContain('type="module"');
  });
});

describe('buildWasmProject', () => {
  it('puts the snippet at index.js with an AssemblyScript node template', () => {
    const p = buildWasmProject("console.log(1)");
    expect(p.files['index.js']).toBe('console.log(1)');
    expect(p.template).toBe('node');
    expect(p.files['package.json']).toContain('"type": "module"');
    expect(p.files['package.json']).toContain('assemblyscript');
    expect(p.files['assembly/index.ts']).toContain('export function add');
    expect(p.files['index.html']).toContain('WebAssembly.instantiate');
  });
});
