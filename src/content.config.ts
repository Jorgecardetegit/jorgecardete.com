import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    icon: z.string().default('💾'),
    // Temática con la que se agrupa en el listado del blog (etiquetas en src/i18n/topics.ts).
    topic: z.enum(['vision', 'ml', 'ai', 'practice']),
    // Imagen de portada en /public (p. ej. /blog/covers/<slug>.jpg).
    cover: z.string().optional(),
    // Posición fija al principio del listado del blog; el resto va por fecha.
    order: z.number().optional(),
  }),
});

// Lecciones de /aprende/: una carpeta por área en /knowledge (knowledge/politica/cortes.mdx
// se publica en /aprende/politica/cortes/). Áreas y bloques en src/data/learn.ts.
const lessons = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './knowledge' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Bloque del área al que pertenece y posición dentro de él.
    section: z.string(),
    order: z.number(),
    icon: z.string(),
    // «En una frase»: lo que debería quedarte aunque no leas nada más.
    summary: z.string(),
    keyPoints: z.array(z.string()).min(1),
    sources: z.array(z.object({ title: z.string(), url: z.string().url() })).default([]),
    updated: z.coerce.date(),
  }),
});

export const collections = { blog, lessons };
