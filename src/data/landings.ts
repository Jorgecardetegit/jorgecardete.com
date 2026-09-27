import type { Lang } from '../i18n';

// Landings de campaña: /lp/<slug>/ en español y /en/lp/<slug>/ en inglés.
// Van con noindex, sin menú y con la newsletter como única acción. Enlaza los
// anuncios aquí con UTMs, p. ej. /lp/machine-learning/?utm_source=linkedin&utm_medium=paid_social&utm_campaign=ml-oct
//
// Test A/B: crea en PostHog un experimento con la clave de `experiment.flag` y
// variantes con los mismos nombres que aquí. `control` es el texto de arriba;
// el resto sobrescribe lo que definan. Resultado: newsletter_signup por variante.
export type LandingCopy = { title: string; lead: string; cta?: string };
export type Landing = LandingCopy & {
  slug: string;
  lang: Lang;
  /** Título de la pestaña y descripción para compartir. */
  meta: { title: string; description: string };
  bullets: string[];
  proof?: string;
  image?: string;
  experiment?: { flag: string; variants: Record<string, Partial<LandingCopy>> };
};

export const landings: Landing[] = [
  {
    slug: 'machine-learning',
    lang: 'es',
    meta: {
      title: 'Machine learning en español',
      description: 'Guías de machine learning, visión por computador e IA explicadas desde cero. Un email cuando publico algo nuevo.',
    },
    title: 'Aprende machine learning en español, un artículo cada vez',
    lead: 'Guías que explican desde cero cómo funcionan las redes neuronales, la visión por computador y los modelos de lenguaje. Te llega un email cuando publico algo nuevo.',
    cta: 'Quiero recibirlas',
    bullets: [
      'Redes convolucionales, YOLO y detección de objetos, con código.',
      'Cómo se entrenan y alinean los LLM: RLHF, Constitutional AI, state space models.',
      'Proyectos reales de principio a fin, no solo teoría.',
    ],
    proof: 'Fundé The Deep Hub, una publicación de machine learning en Medium con más de 570 artículos y unos 100 autores.',
    image: '/blog/covers/cnn-guia-completa.png',
    experiment: {
      flag: 'lp-machine-learning-headline',
      variants: {
        beneficio: { title: 'Entiende de verdad cómo funciona la IA, sin fórmulas imposibles' },
      },
    },
  },
];
