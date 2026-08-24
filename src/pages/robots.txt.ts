import type { APIContext } from 'astro';

export const prerender = true;

export function GET({ site }: APIContext) {
  const body = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${site!.origin}/sitemap.xml
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
