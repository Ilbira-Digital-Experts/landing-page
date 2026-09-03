# Ilbira — ilbirade.com

Web pública SEO/SEM/GEO-first, bilingüe (ES/EN), con automatización de contenido. Ilbira es un estudio de arquitectura de agentes de IA (consultoría de implementación): Auditoría AgentOps, Implementación de agentes y AgentOps gestionado, más Ilbira Core como showcase interno sin venta activa. Dominio: ilbirade.com. Hosting: Vercel.

## Stack

- **Framework:** Astro (`output: 'hybrid'` — estático por defecto, SSR por página vía `export const prerender = false`)
- **Estilos:** Tailwind CSS
- **Base de datos:** Supabase — **mismo proyecto que `fac`** (compartido para ahorrar costes), con tablas propias prefijadas `ilbira_*` en el schema `public` para no colisionar con las tablas de fac (`posts`, `comments`, etc.)
- **Contenido:** blog en tabla `ilbira_posts` (Supabase), servido vía SSR — publicar es instantáneo, sin rebuild
- **Hosting:** Vercel (`@astrojs/vercel/serverless` adapter)
- **Analytics:** Vercel Analytics + Google Analytics 4 (via GTM)

## Objetivos técnicos

- **SEO:** sitemap dinámico, robots.txt, metadata por página, Open Graph, JSON-LD (schema.org), canonical URLs, Core Web Vitals
- **SEM:** Google Tag Manager, tracking de conversiones
- **GEO:** `public/llms.txt`, schema FAQPage en posts, contenido estructurado para citabilidad en LLMs

## Internacionalización (ES/EN)

- Rutas con prefijo de idioma: `/es/...` (por defecto) y `/en/...`, implementado con un segmento dinámico `[lang]` (no con el `i18n` nativo de Astro) para evitar duplicar cada página en dos archivos.
- El español es el idioma fuente. El contenido nuevo se escribe primero en español y se traduce al inglés; si una traducción no está lista, se marca como pendiente en vez de inventarla.
- Textos de interfaz (nav, footer, CTA) centralizados en `src/i18n/ui.ts`. El contenido largo de cada página vive en un diccionario `{ es, en }` dentro del propio archivo de página/componente.
- El selector de idioma (en `Navbar.astro`) cambia solo el prefijo de idioma, manteniendo el resto de la ruta — mismos slugs en ambos idiomas.
- `Layout.astro` genera las etiquetas `hreflang` (es/en/x-default) automáticamente a partir de la ruta actual.

## Contenido y Supabase

- Blog en la tabla `public.ilbira_posts` (schema SQL en `supabase/ilbira_schema.sql`, aplicado a mano desde el SQL Editor del dashboard — mismo flujo manual que `fac`, sin CLI ni migraciones versionadas)
- Es el **mismo proyecto Supabase que `fac`**. Convención de aislamiento: tablas de Ilbira siempre prefijadas `ilbira_` en `public` (fac ya usa el mismo patrón de prefijos para dominios relacionados, ej. `client_*`). No usar nombres de tabla sin prefijo para evitar colisión con las tablas de fac (`posts`, `comments`, ...)
- Cliente Supabase en `src/lib/supabase.ts` (solo `anon` key — igual que fac, sin service role key; el control de acceso vive en RLS)
- Capa de datos en `src/lib/posts.ts` (`getPublishedPosts`, `getPostBySlug`, `getAllPublishedPosts`)
- RLS: lectura pública solo de `published = true`; usuarios `authenticated` tienen acceso total (modelo single-admin, igual que fac)
- Servidos bajo `/es/recursos` y `/en/recursos`, filtrando por `lang` (`es` | `en`) — páginas SSR (`export const prerender = false`), no estáticas
- Contenido de cada post almacenado como HTML (pensado para un editor rico tipo Tiptap, igual que el admin de fac), renderizado con `set:html`
- Env vars: `SUPABASE_URL`, `SUPABASE_ANON_KEY` (ver `.env.example`)

## Estructura de carpetas

```
src/
├── lib/
│   ├── supabase.ts       # cliente Supabase (anon key)
│   └── posts.ts          # capa de datos del blog (ilbira_posts)
├── i18n/
│   ├── ui.ts             # diccionario de textos de interfaz + helpers de rutas
│   └── paths.ts          # getStaticPaths compartido para rutas [lang]
├── layouts/
├── pages/
│   ├── [lang]/
│   │   ├── index.astro
│   │   ├── que-hacemos/
│   │   │   ├── index.astro
│   │   │   └── [service].astro   # auditoria-agentops | implementacion-de-agentes | agentops-gestionado
│   │   ├── metodo.astro
│   │   ├── casos.astro
│   │   ├── el-motor.astro
│   │   ├── equipo.astro
│   │   ├── contacto.astro
│   │   ├── privacidad.astro
│   │   └── recursos/
│   │       ├── index.astro   # SSR, lista posts publicados de Supabase
│   │       └── [slug].astro  # SSR, detalle de post
│   ├── index.astro       # redirect a /es/
│   ├── sitemap.xml.ts    # SSR, incluye posts de Supabase
│   └── robots.txt.ts
├── components/
└── styles/
public/
└── llms.txt           # GEO: contexto para modelos de IA
supabase/
└── ilbira_schema.sql   # tablas ilbira_* — aplicar a mano en el SQL Editor
```

## Columnas de `ilbira_posts`

`title`, `description` (< 160 chars), `slug`, `lang` (`es` | `en`), `content` (HTML), `category`, `tags` (`text[]`), `author`, `canonical`, `og_image`, `robots`, `published` (bool), `published_at`, `created_at`, `updated_at`. `unique (slug, lang)`.

## Convenciones

- Sin JS en cliente salvo necesidad explícita (filosofía Astro islands)
- Imágenes optimizadas con `<Image />` de `astro:assets`
- `Layout.astro` centraliza la metadata de cada página (SEO, Open Graph, hreflang) recibiendo `lang`, `title`, `description` como props
- JSON-LD inyectado en `<head>` vía componente `<JsonLd />`
- Un único CTA principal en todo el sitio ("Reservar auditoría AgentOps" / "Book AgentOps Audit"), disparado con `data-cta="main"`. "El motor" (Ilbira Core) usa un CTA distinto de lista de espera (`data-cta="core"`), sin botón de compra.
