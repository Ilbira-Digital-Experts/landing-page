# Ilbira — ilbirade.com

Web pública SEO/SEM/GEO-first, bilingüe (ES/EN), con automatización de contenido. Ilbira es un estudio de arquitectura de agentes de IA (consultoría de implementación): Auditoría AgentOps, Implementación de agentes y AgentOps gestionado, más Ilbira Core como showcase interno sin venta activa. Dominio: ilbirade.com. Hosting: Vercel.

## Stack

- **Framework:** Astro (SSG-first, Vite under the hood)
- **Estilos:** Tailwind CSS
- **Contenido:** MDX + Astro Content Collections (validación con Zod)
- **Hosting:** Vercel (`@astrojs/vercel` adapter)
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

## Contenido

- Posts en `src/content/blog/*.mdx`, con campo `lang` (`es` | `en`) en el frontmatter
- Frontmatter validado con Zod via Content Collections
- Servidos bajo `/es/recursos` y `/en/recursos`, filtrando la colección por `lang`
- Pipeline de automatización: generación externa (n8n + Anthropic API) → push MDX → Vercel rebuild via On-Demand Revalidation

## Estructura de carpetas

```
src/
├── content/
│   ├── config.ts       # schema Zod de la colección blog
│   └── blog/            # posts MDX (con campo lang)
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
│   │       ├── index.astro
│   │       └── [slug].astro
│   ├── index.astro       # redirect a /es/
│   ├── sitemap.xml.ts
│   └── robots.txt.ts
├── components/
└── styles/
public/
└── llms.txt           # GEO: contexto para modelos de IA
```

## Frontmatter estándar de post

```yaml
title: ""
description: ""        # < 160 chars
slug: ""
lang: "es"              # "es" | "en"
publishedAt: ""        # YYYY-MM-DD
updatedAt: ""
author: ""
tags: []
canonical: ""
ogImage: ""
robots: "index, follow"
draft: false
```

## Convenciones

- Sin JS en cliente salvo necesidad explícita (filosofía Astro islands)
- Imágenes optimizadas con `<Image />` de `astro:assets`
- `Layout.astro` centraliza la metadata de cada página (SEO, Open Graph, hreflang) recibiendo `lang`, `title`, `description` como props
- JSON-LD inyectado en `<head>` vía componente `<JsonLd />`
- Un único CTA principal en todo el sitio ("Reservar auditoría AgentOps" / "Book AgentOps Audit"), disparado con `data-cta="main"`. "El motor" (Ilbira Core) usa un CTA distinto de lista de espera (`data-cta="core"`), sin botón de compra.
