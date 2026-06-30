// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site. Update `site` to your GitHub username and `base`
  // to your repo name if they differ.
  site: 'https://web-platform.avetavos.com',
  base: '/webassembly',
  output: 'static',
  integrations: [starlight({
      title: 'WebAssembly — From Zero to Hero',
      head: [
        { tag: 'script', attrs: { type: 'module', src: '/webassembly/enhance.js' } },
        { tag: 'link', attrs: { rel: 'manifest', href: '/webassembly/manifest.webmanifest' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/webassembly/apple-touch-icon.png' } },
        { tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/webassembly/icon-192.png' } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#654FF0' } },
        { tag: 'meta', attrs: { name: 'mobile-web-app-capable', content: 'yes' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-capable', content: 'yes' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-title', content: "WebAssembly" } },
        { tag: 'script', content: "if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/webassembly/sw.js',{scope:'/webassembly/'}).catch(function(){})})}" },
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