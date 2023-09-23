import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_7d642ebb.mjs';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import '@astrojs/internal-helpers/path';
import './chunks/astro_7afa4864.mjs';
import 'clsx';
import 'html-escaper';
import 'mime';
import 'path-to-regexp';

const _page0  = () => import('./chunks/image-endpoint_5b9843ad.mjs');
const _page1  = () => import('./chunks/index_4386c1cc.mjs');
const _page2  = () => import('./chunks/categories_188b6e6f.mjs');
const _page3  = () => import('./chunks/_.._ed783b12.mjs');
const _page4  = () => import('./chunks/authors_2e985f11.mjs');
const _page5  = () => import('./chunks/_.._6953e2ea.mjs');
const _page6  = () => import('./chunks/_.._7528a1d2.mjs');
const _page7  = () => import('./chunks/_.._95f1de4d.mjs');
const _page8  = () => import('./chunks/404_e2fbf7e6.mjs');const pageMap = new Map([["node_modules/astro/dist/assets/image-endpoint.js", _page0],["src/pages/index.astro", _page1],["src/pages/categories.astro", _page2],["src/pages/category/[...slug].astro", _page3],["src/pages/authors.astro", _page4],["src/pages/author/[...slug].astro", _page5],["src/pages/blog/[...page].astro", _page6],["src/pages/post/[...slug].astro", _page7],["src/pages/404.astro", _page8]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };
