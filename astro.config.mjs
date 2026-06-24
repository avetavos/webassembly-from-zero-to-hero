// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site. Update `site` to your GitHub username and `base`
  // to your repo name if they differ.
  site: 'https://avetavos.github.io',
  base: '/webassembly-from-zero-to-hero',
  output: 'static',
  integrations: [starlight({
      title: 'WebAssembly — From Zero to Hero',
      head: [
        { tag: 'script', attrs: { type: 'module', src: '/webassembly-from-zero-to-hero/enhance.js' } },
      ],
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        th: { label: 'ไทย', lang: 'th' },
      },
      customCss: ['./src/styles/custom.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/avetavos/webassembly-from-zero-to-hero' }],
      sidebar: [
        { label: 'Intro: What is Wasm?', items: [{ autogenerate: { directory: 'intro-what-is-wasm' } }] },
        { label: 'The WAT Text Format', items: [{ autogenerate: { directory: 'wat-text-format' } }] },
        { label: 'Control Flow & Functions', items: [{ autogenerate: { directory: 'control-flow-functions' } }] },
        { label: 'JS Interop & Loading', items: [{ autogenerate: { directory: 'js-interop' } }] },
        { label: 'Linear Memory & Data', items: [{ autogenerate: { directory: 'linear-memory' } }] },
        { label: 'Languages to Wasm', items: [{ autogenerate: { directory: 'languages-to-wasm' } }] },
        { label: 'Tooling', items: [{ autogenerate: { directory: 'tooling' } }] },
        { label: 'WASI & Beyond the Browser', items: [{ autogenerate: { directory: 'wasi-and-beyond' } }] },
      ],
      }), preact()],
});