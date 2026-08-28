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
let js = readFileSync(join(assets, jsFile), 'utf8');
const favicon = readFileSync(join(dist, 'favicon.svg'), 'utf8');

// Embed /img/* assets as data URIs so the single file works offline.
const MIME = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
const imgDir = join(dist, 'img');
let embedded = 0;
for (const name of readdirSync(imgDir)) {
  const ext = name.slice(name.lastIndexOf('.'));
  const mime = MIME[ext];
  if (!mime) continue;
  const dataUri = `data:${mime};base64,${readFileSync(join(imgDir, name)).toString('base64')}`;
  const ref = `/img/${name}`;
  if (js.includes(ref)) {
    js = js.split(ref).join(dataUri);
    embedded += 1;
  }
}
console.log(`Embedded ${embedded} image(s) as data URIs.`);
if (js.includes('/img/')) {
  throw new Error('An /img/ reference survived inlining.');
}

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
  )
  // Image preloads earn their keep on the hosted build, but point at paths that
  // do not exist beside a single file — and the images are already inlined.
  .replace(/\s*<link rel="preload" as="image"[^>]*\/?>/g, '');

if (cssTag.test(html) || jsTag.test(html) || html.includes('src="/assets/')) {
  throw new Error('Inlining failed — an external asset reference is still present.');
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const out = join(root, 'willow-street-dental-invisalign-lp.html');
writeFileSync(out, html);
console.log(`Wrote ${out} (${(html.length / 1024).toFixed(0)} KB)`);
