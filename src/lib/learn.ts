import { getCollection, type CollectionEntry } from 'astro:content';

export type Lesson = CollectionEntry<'lessons'>;

// /aprende/ solo existe en español: es política española para lectores de aquí.
export const learnPath = '/aprende/';
export const areaPath = (area: string) => `${learnPath}${area}/`;
export const lessonPath = (lesson: Lesson) => `${learnPath}${lesson.id}/`;

/** knowledge/politica/cortes.mdx → id «politica/cortes», área «politica». */
export const lessonArea = (lesson: Lesson) => lesson.id.split('/')[0];
export const lessonSlug = (lesson: Lesson) => lesson.id.split('/').slice(1).join('/');

/** Lecciones de un área, en el orden de lectura: por bloque y luego por `order`. */
export async function getLessons(area: string, sectionOrder: string[]): Promise<Lesson[]> {
  const lessons = (await getCollection('lessons')).filter((l) => lessonArea(l) === area);
  const rank = (l: Lesson) => sectionOrder.indexOf(l.data.section);
  return lessons.sort((a, b) => rank(a) - rank(b) || a.data.order - b.data.order);
}

/** Minutos de lectura a 200 palabras por minuto, sin contar etiquetas de componentes. */
export function readingMinutes(lesson: Lesson): number {
  const text = (lesson.body ?? '').replace(/<[^>]+>/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
