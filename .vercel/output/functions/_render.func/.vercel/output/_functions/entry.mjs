import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_Cp7gnQrR.mjs';
import { manifest } from './manifest_RXAl88cx.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/lead.astro.mjs');
const _page2 = () => import('./pages/robots.txt.astro.mjs');
const _page3 = () => import('./pages/sitemap.xml.astro.mjs');
const _page4 = () => import('./pages/_lang_/casos.astro.mjs');
const _page5 = () => import('./pages/_lang_/contacto.astro.mjs');
const _page6 = () => import('./pages/_lang_/el-motor.astro.mjs');
const _page7 = () => import('./pages/_lang_/equipo.astro.mjs');
const _page8 = () => import('./pages/_lang_/metodo.astro.mjs');
const _page9 = () => import('./pages/_lang_/privacidad.astro.mjs');
const _page10 = () => import('./pages/_lang_/que-hacemos/_service_.astro.mjs');
const _page11 = () => import('./pages/_lang_/que-hacemos.astro.mjs');
const _page12 = () => import('./pages/_lang_/recursos/_slug_.astro.mjs');
const _page13 = () => import('./pages/_lang_/recursos.astro.mjs');
const _page14 = () => import('./pages/_lang_.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/lead.ts", _page1],
    ["src/pages/robots.txt.ts", _page2],
    ["src/pages/sitemap.xml.ts", _page3],
    ["src/pages/[lang]/casos.astro", _page4],
    ["src/pages/[lang]/contacto.astro", _page5],
    ["src/pages/[lang]/el-motor.astro", _page6],
    ["src/pages/[lang]/equipo.astro", _page7],
    ["src/pages/[lang]/metodo.astro", _page8],
    ["src/pages/[lang]/privacidad.astro", _page9],
    ["src/pages/[lang]/que-hacemos/[service].astro", _page10],
    ["src/pages/[lang]/que-hacemos/index.astro", _page11],
    ["src/pages/[lang]/recursos/[slug].astro", _page12],
    ["src/pages/[lang]/recursos/index.astro", _page13],
    ["src/pages/[lang]/index.astro", _page14],
    ["src/pages/index.astro", _page15]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "05c5e1ea-0a48-46c1-a7ad-f7a943ca1383",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
