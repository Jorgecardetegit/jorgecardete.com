import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Repo "Jorgecardetegit.github.io" => se sirve en la raíz, sin base.
export default defineConfig({
  site: 'https://jorgecardetegit.github.io',
  integrations: [sitemap()],
});
