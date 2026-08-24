import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'hybrid',
  site: 'https://ilbirade.com',
  integrations: [tailwind(), mdx()],
  adapter: vercel(),
});
