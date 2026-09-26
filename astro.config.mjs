import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Repo "Jorgecardetegit.github.io" => se sirve en la raíz, sin base.
export default defineConfig({
  site: 'https://jorgecardetegit.github.io',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-ES', en: 'en-US' } },
    }),
  ],
});
