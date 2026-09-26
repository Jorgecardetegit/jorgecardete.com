export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

// Texto que cambia según el idioma, para datos como proyectos o startups.
export type Localized = Record<Lang, string>;
export const l = (text: Localized, lang: Lang) => text[lang];

const routes = {
  home: { es: '/', en: '/en/' },
  blog: { es: '/blog/', en: '/en/blog/' },
  projects: { es: '/proyectos/', en: '/en/projects/' },
  startups: { es: '/startups/', en: '/en/startups/' },
  academic: { es: '/academico/', en: '/en/academic/' },
  about: { es: '/sobre-mi/', en: '/en/about/' },
} as const;
export type Route = keyof typeof routes;

export const path = (route: Route, lang: Lang) => routes[route][lang];
export const postPath = (slug: string, lang: Lang) => `${routes.blog[lang]}${slug}/`;

export function getLang(url: URL): Lang {
  return url.pathname === '/en' || url.pathname.startsWith('/en/') ? 'en' : 'es';
}

/** La misma página en el otro idioma, o la portada si no tiene equivalente. */
export function translatePath(pathname: string, to: Lang): string {
  const from: Lang = pathname.startsWith('/en/') || pathname === '/en' ? 'en' : 'es';
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  for (const r of Object.values(routes)) {
    if (r[from] === normalized) return r[to];
  }
  const blog = routes.blog[from];
  if (normalized.startsWith(blog)) return routes.blog[to] + normalized.slice(blog.length);
  return routes.home[to];
}

export const dateFormat = (lang: Lang, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', { timeZone: 'UTC', ...options });

const ui = {
  es: {
    'site.description': 'Programador y Growth Engineer. Notas, proyectos y startups.',
    'nav.label': 'Principal',
    'nav.blog': 'Blog',
    'nav.projects': 'Proyectos',
    'nav.startups': 'Startups',
    'nav.academic': 'Académico',
    'nav.about': 'Sobre mí',
    'sidebar.intro': 'Soy {name}, programador y Growth Engineer. Esto es mi jardín digital: notas, proyectos y cosas a medio terminar.',
    'sidebar.map': 'EL MAPA',
    'sidebar.mapHint': 'Pulsa una casa · o {link}',
    'sidebar.mapHintLink': 'juega el mapa entero',
    'sidebar.language': 'Idioma',
    'footer.social': 'Redes',
    'footer.madeWith': 'Hecho con {heart} por Jorge Cardete',
  },
  en: {
    'site.description': 'Software engineer and Growth Engineer. Notes, projects and startups.',
    'nav.label': 'Main',
    'nav.blog': 'Blog',
    'nav.projects': 'Projects',
    'nav.startups': 'Startups',
    'nav.academic': 'Academic',
    'nav.about': 'About me',
    'sidebar.intro': "I'm {name}, a software engineer and Growth Engineer. This is my digital garden: notes, projects and half-finished things.",
    'sidebar.map': 'THE MAP',
    'sidebar.mapHint': 'Click a house · or {link}',
    'sidebar.mapHintLink': 'play the whole map',
    'sidebar.language': 'Language',
    'footer.social': 'Social',
    'footer.madeWith': 'Made with {heart} by Jorge Cardete',
  },
} satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)['es'];

export function useTranslations(lang: Lang) {
  return (key: UIKey) => ui[lang][key] ?? ui[defaultLang][key];
}
