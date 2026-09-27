import type { APIRoute } from 'astro';
import { path, postPath, useTranslations } from '../i18n';
import { getBlogPosts, getBlogSlug } from '../lib/blog';

// Resumen de la web para modelos de lenguaje (https://llmstxt.org).
export const GET: APIRoute = async ({ site }) => {
  const url = (p: string) => new URL(p, site).href;
  const posts = (await getBlogPosts('es')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const t = useTranslations('es');
  const pages = ([
    ['about', t('nav.about')],
    ['projects', t('nav.projects')],
    ['startups', t('nav.startups')],
    ['academic', t('nav.academic')],
    ['resume', t('footer.resume')],
  ] as const).map(([route, label]) => `- [${label}](${url(path(route, 'es'))}) · [en](${url(path(route, 'en'))})`);

  const body = [
    '# jorge.dev',
    '',
    `> ${t('site.description')} Blog de Jorge Cardete sobre machine learning, visión por computador, IA y growth, en español e inglés.`,
    '',
    '## Páginas',
    '',
    ...pages,
    '',
    '## Blog',
    '',
    ...posts.map((post) => {
      const slug = getBlogSlug(post);
      return `- [${post.data.title}](${url(postPath(slug, 'es'))}): ${post.data.description} · [en](${url(postPath(slug, 'en'))})`;
    }),
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
