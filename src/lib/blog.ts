import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

type BlogPost = CollectionEntry<'blog'>;

export const getBlogSlug = (post: BlogPost) =>
  post.id.replace(/^[a-z]{2}\//, '');

// Los originales viven en la raíz (inglés). Las traducciones usan
// src/content/blog/<idioma>/<slug>.md, de modo que ambas versiones comparten URL.
const isOriginal = (post: BlogPost) => !post.id.includes('/');

export async function getBlogPosts(lang: Lang): Promise<BlogPost[]> {
  const entries = await getCollection('blog');
  const originals = entries.filter(isOriginal);

  if (lang === 'en') return originals;

  const translations = new Map(
    entries
      .filter((post) => post.id.startsWith(`${lang}/`))
      .map((post) => [post.id.slice(lang.length + 1), post])
  );

  // Hasta que una traducción esté lista, se conserva el original: nunca hay
  // enlaces rotos ni artículos que desaparezcan del índice.
  return originals.map((post) => translations.get(post.id) ?? post);
}
