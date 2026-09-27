import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Dominio público: SITE_URL si se define; si no, el de producción que Vercel
// expone al compilar (el dominio propio en cuanto se añada al proyecto).
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site = process.env.SITE_URL
  ?? (productionHost ? `https://${productionHost}` : 'https://jorgecardetegit.github.io');

export default defineConfig({
  site,
  // Todo se genera en estático; solo las rutas con `prerender = false` (src/pages/api) son funciones.
  adapter: vercel(),
  // El juego vivía en /quest/; los enlaces antiguos siguen funcionando (301 en Vercel).
  redirects: { '/quest': '/juego/' },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-ES', en: 'en-US' } },
      // Landings de campaña y páginas legales fuera del sitemap.
      filter: (page) => !/\/(lp|legal)\//.test(new URL(page).pathname),
    }),
  ],
});
