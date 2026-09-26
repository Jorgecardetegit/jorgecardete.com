import type { Localized } from '.';

// Orden en el que salen las secciones del blog.
export const topics = {
  vision: { label: { es: 'Visión artificial', en: 'Computer vision' }, color: '#2b9476' },
  ml: { label: { es: 'Machine learning', en: 'Machine learning' }, color: '#6b5ea8' },
  ai: { label: { es: 'IA y lenguaje', en: 'AI & language' }, color: '#b5623c' },
  practice: { label: { es: 'Python y producción', en: 'Python & production' }, color: '#9a7b12' },
} satisfies Record<string, { label: Localized; color: string }>;

export type Topic = keyof typeof topics;
