import { useState } from 'preact/hooks';
import { buildJsSrcdoc, buildWasmProject } from './wasm-project';

type SdkLike = { openProject: (p: unknown, o?: unknown) => void };
let sdkPromise: Promise<SdkLike> | null = null;
function loadSdk(): Promise<SdkLike> {
  if (!sdkPromise) sdkPromise = import(/* @vite-ignore */ 'https://esm.sh/@stackblitz/sdk').then((m) => (m.default ?? m) as SdkLike);
  return sdkPromise;
}

export default function WasmRunner({ code, stackblitz = false }: { code: string; stackblitz?: boolean }) {
  const [src, setSrc] = useState(code);
  const [doc, setDoc] = useState('');
  const [ran, setRan] = useState(false);

  function run() { setDoc(buildJsSrcdoc(src)); setRan(true); }
  async function openSb() {
    try {
      const sdk = await loadSdk();
      sdk.openProject(buildWasmProject(src), { openFile: 'index.js', newWindow: true });
    } catch {
      navigator.clipboard.writeText(src);
      window.open('https://stackblitz.com/fork/node', '_blank', 'noopener');
    }
  }

  return (
    <div class="nr">
      <div class="nr__bar">
        <span class="nr__label">{stackblitz ? 'AssemblyScript' : 'WebAssembly'}</span>
        <span class="nr__actions">
          {!stackblitz && <button class="nr__run" onClick={run}>Run ▸</button>}
          <button class="nr__open" onClick={openSb}>Open in StackBlitz ▸</button>
        </span>
      </div>
      <textarea class="nr__code" spellcheck={false} value={src}
        onInput={(e) => setSrc((e.target as HTMLTextAreaElement).value)} />
      {stackblitz
        ? <p class="nr__hint">Needs the AssemblyScript toolchain — open in StackBlitz to build &amp; run.</p>
        : ran && <iframe class="nr__out" sandbox="allow-scripts" srcdoc={doc} title="Output" />}
    </div>
  );
}
