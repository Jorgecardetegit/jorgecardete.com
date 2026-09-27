import rss from '@astrojs/rss';
import { useTranslations } from '../i18n';
import { getBlogPosts, getBlogSlug } from '../lib/blog';

export async function GET(context) {
  const posts = (await getBlogPosts('es')).sort((a, b) => b.data.date - a.data.date);
  return rss({
    title: 'jorge.dev',
    description: useTranslations('es')('site.description'),
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${getBlogSlug(post)}/`,
    })),
  });
}
