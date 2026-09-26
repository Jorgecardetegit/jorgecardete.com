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
    // Imagen de portada en /public (p. ej. /blog/covers/<slug>.jpg).
    cover: z.string().optional(),
    // Posición fija al principio del listado del blog; el resto va por fecha.
    order: z.number().optional(),
  }),
});

export const collections = { blog };
