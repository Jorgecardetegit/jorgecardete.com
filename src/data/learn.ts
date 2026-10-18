// Áreas de /aprende/ y los bloques de cada una. Las lecciones viven en
// knowledge/<área>/*.mdx y dicen en su frontmatter a qué bloque pertenecen.
export type SectionStatus = 'ready' | 'soon';

export interface LearnSection {
  id: string;
  title: string;
  description: string;
  status: SectionStatus;
}

export interface LearnArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  // Color del área en tarjetas y cabeceras (variable de global.css).
  color: string;
  sections: LearnSection[];
}

export const areas: LearnArea[] = [
  {
    id: 'politica',
    title: 'Política en España',
    description:
      'Cómo funciona el país explicado desde cero: quién hace las leyes, cómo se elige al Gobierno, qué decide cada administración y qué pasa con tu voto.',
    icon: '🏛️',
    color: 'var(--red)',
    sections: [
      {
        id: 'como-funciona',
        title: 'Cómo funciona',
        description: 'Las reglas del juego: Constitución, Cortes, Gobierno, leyes, justicia, comunidades, Europa y elecciones.',
        status: 'ready',
      },
      {
        id: 'partidos',
        title: 'Los partidos',
        description: 'Qué propone cada uno, qué ha votado de verdad y quién va en sus listas. Con la misma plantilla para todos.',
        status: 'soon',
      },
      {
        id: 'historia',
        title: 'Qué ha pasado',
        description: 'Línea temporal de España desde 1978, con detalle desde 2011.',
        status: 'soon',
      },
    ],
  },
];

export const getArea = (id: string) => areas.find((a) => a.id === id);
