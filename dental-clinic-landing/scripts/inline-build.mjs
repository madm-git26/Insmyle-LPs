/**
 * Bundles the Vite build output into one self-contained .html file so the
 * landing page can be opened or handed off without a server or asset folder.
 * Run after `npm run build`.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const assets = join(dist, 'assets');

const files = readdirSync(assets);
const cssFile = files.find((f) => f.endsWith('.css'));
const jsFile = files.find((f) => f.endsWith('.js'));

if (!cssFile || !jsFile) {
  throw new Error('Expected a .css and a .js file in dist/assets — run `npm run build` first.');
}

const css = readFileSync(join(assets, cssFile), 'utf8');
const js = readFileSync(join(assets, jsFile), 'utf8');
const favicon = readFileSync(join(dist, 'favicon.svg'), 'utf8');

let html = readFileSync(join(dist, 'index.html'), 'utf8');

// Escape any literal </script> inside the bundle so it can't close the tag early.
const safeJs = js.replace(/<\/script>/gi, '<\\/script>');

// Replacer functions (not strings) so `$&`, `$'` etc. inside the minified
// bundle are inserted literally rather than treated as substitution patterns.
const cssTag = new RegExp(`<link[^>]*href="/assets/${escapeRe(cssFile)}"[^>]*>`);
const jsTag = new RegExp(`<script[^>]*src="/assets/${escapeRe(jsFile)}"[^>]*></script>`);

if (!cssTag.test(html) || !jsTag.test(html)) {
  throw new Error('Could not locate the built asset tags in dist/index.html.');
}

html = html
  .replace(cssTag, () => `<style>${css}</style>`)
  .replace(jsTag, () => `<script type="module">${safeJs}</script>`)
  .replace(
    '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
    () =>
      `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,${Buffer.from(favicon).toString('base64')}" />`,
  );

if (cssTag.test(html) || jsTag.test(html) || html.includes('src="/assets/')) {
  throw new Error('Inlining failed — an external asset reference is still present.');
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const out = join(root, 'willow-street-dental-invisalign-lp.html');
writeFileSync(out, html);
console.log(`Wrote ${out} (${(html.length / 1024).toFixed(0)} KB)`);
