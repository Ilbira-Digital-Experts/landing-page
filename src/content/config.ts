import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    slug: z.string(),
    lang: z.enum(['es', 'en']).default('es'),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string(),
    tags: z.array(z.string()).default([]),
    canonical: z.string().url().optional(),
    ogImage: z.string().optional(),
    robots: z.string().default('index, follow'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
