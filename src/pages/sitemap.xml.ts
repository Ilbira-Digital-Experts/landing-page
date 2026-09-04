import type { APIContext } from 'astro';
import { getAllPublishedPosts } from '../lib/posts';
import { LANGS, type Lang } from '../i18n/ui';

export const prerender = false;

// Rutas estáticas del sitio, mismo slug en ambos idiomas. Al añadir una
// página nueva fuera del blog (ilbira_posts en Supabase), regístrala aquí.
const staticSlugs = [
  { path: '', changefreq: 'weekly', priority: 1.0 },
  { path: '/que-hacemos', changefreq: 'monthly', priority: 0.8 },
  { path: '/que-hacemos/auditoria-agentops', changefreq: 'monthly', priority: 0.8 },
  { path: '/que-hacemos/implementacion-de-agentes', changefreq: 'monthly', priority: 0.8 },
  { path: '/que-hacemos/agentops-gestionado', changefreq: 'monthly', priority: 0.8 },
  { path: '/metodo', changefreq: 'monthly', priority: 0.7 },
  { path: '/casos', changefreq: 'weekly', priority: 0.7 },
  { path: '/el-motor', changefreq: 'monthly', priority: 0.6 },
  { path: '/equipo', changefreq: 'monthly', priority: 0.5 },
  { path: '/contacto', changefreq: 'monthly', priority: 0.6 },
  { path: '/privacidad', changefreq: 'yearly', priority: 0.2 },
];

function escapeXml(value: string) {
  return value.replace(/&/g, '&amp;');
}

function renderUrl(SITE_URL: string, path: string, lastmod: string, changefreq: string, priority: number, alternates: { lang: string; path: string }[]) {
  const altLinks = alternates
    .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${escapeXml(SITE_URL + a.path)}" />`)
    .join('\n');
  return `  <url>
    <loc>${escapeXml(SITE_URL + path)}</loc>
${altLinks}
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET({ site }: APIContext) {
  const SITE_URL = site!.origin;
  const buildDate = new Date().toISOString();

  // Las entradas del blog se leen de Supabase (ilbira_posts) en cada
  // request — publicar un post es instantáneo, sin rebuild.
  const posts = await getAllPublishedPosts();

  const staticEntries = staticSlugs.flatMap((route) =>
    LANGS.map((lang) => {
      const path = `/${lang}${route.path}`;
      const alternates = [
        ...LANGS.map((l) => ({ lang: l, path: `/${l}${route.path}` })),
        { lang: 'x-default', path: `/es${route.path}` },
      ];
      return renderUrl(SITE_URL, path, buildDate, route.changefreq, route.priority, alternates);
    })
  );

  // /recursos solo se incluye para los idiomas que ya tienen algún post
  // publicado — con la lista vacía, la página devuelve 404 y no debe indexarse.
  const langsWithPosts = LANGS.filter((lang) => posts.some((p) => p.lang === lang));
  const recursosEntries = langsWithPosts.map((lang) => {
    const path = `/${lang}/recursos`;
    const alternates = langsWithPosts.map((l) => ({ lang: l, path: `/${l}/recursos` }));
    return renderUrl(SITE_URL, path, buildDate, 'daily', 0.7, alternates);
  });

  const postEntries = posts.map((post) => {
    const path = `/${post.lang}/recursos/${post.slug}`;
    const lastmod = (post.updatedAt ?? post.publishedAt).toISOString();
    // Solo enlazamos como alternates posts con el mismo slug publicados en el otro idioma.
    const counterpart = posts.find((p) => p.slug === post.slug && p.lang !== post.lang);
    const alternates = counterpart
      ? [
          { lang: post.lang, path },
          { lang: counterpart.lang, path: `/${counterpart.lang}/recursos/${counterpart.slug}` },
        ]
      : [{ lang: post.lang, path }];
    return renderUrl(SITE_URL, path, lastmod, 'monthly', 0.6, alternates);
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...staticEntries, ...recursosEntries, ...postEntries].join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
