import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

// Datos estructurados schema.org (JSON-LD) para buscadores y asistentes de IA.

export const person = (site: URL) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': new URL('/#person', site).href,
  name: 'Jorge Cardete',
  url: site.href,
  image: new URL('/jorge.jpg', site).href,
  jobTitle: 'Growth Engineer',
  worksFor: { '@type': 'Organization', name: 'Bit2Me', url: 'https://bit2me.com/' },
  sameAs: [
    'https://github.com/Jorgecardetegit',
    'https://www.linkedin.com/in/jorgecardetellamas/',
    'https://x.com/JorgeCardete',
    'https://medium.com/@jorgecardete',
  ],
});

export const website = (site: URL, lang: Lang) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': new URL('/#website', site).href,
  name: 'jorge.dev',
  url: site.href,
  inLanguage: lang === 'es' ? 'es-ES' : 'en-US',
  author: { '@id': new URL('/#person', site).href },
});

export const blogPosting = (post: CollectionEntry<'blog'>, url: URL, site: URL, lang: Lang) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.data.title,
  description: post.data.description,
  datePublished: post.data.date.toISOString(),
  inLanguage: lang === 'es' ? 'es-ES' : 'en-US',
  keywords: post.data.tags.join(', '),
  url: url.href,
  mainEntityOfPage: url.href,
  ...(post.data.cover && { image: new URL(post.data.cover, site).href }),
  author: { '@id': new URL('/#person', site).href, '@type': 'Person', name: 'Jorge Cardete' },
});

export const breadcrumbs = (items: { name: string; url: URL }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.url.href,
  })),
});
