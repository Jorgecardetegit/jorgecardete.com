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
  game: { es: '/juego/', en: '/en/game/' },
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
    'sidebar.intro': 'Soy {name}, programador. Este es mi blog personal.',
    'sidebar.map': 'EL MAPA',
    'sidebar.mapHint': 'Pulsa una casa para visitarla',
    'sidebar.play': '¡Jugar!',
    'sidebar.playSub': 'Recorre el pueblo',
    'sidebar.language': 'Idioma',
    'sidebar.menu': 'Menú',
    'footer.social': 'Redes',
    'footer.madeWith': 'Hecho con {heart} por Jorge Cardete',
    'game.title': 'Juego',
    'game.description': 'Un pueblo en pixel art: camina de casa en casa para visitar cada sección de la web.',
    'game.welcome': 'Bienvenido al pueblo',
    'game.help': '← → caminar · espacio saltar · ↑ entrar',
    'game.helpTouch': 'Usa los botones para moverte y entrar en las casas',
    'game.enter': 'Entrar',
    'game.visit': 'Ir a {section}',
    'game.keepPlaying': 'Seguir jugando',
    'game.exit': 'Salir',
    'game.coins': 'Monedas',
    'game.noscript': 'El juego necesita JavaScript. Puedes navegar con los carteles de las casas.',
  },
  en: {
    'site.description': 'Software engineer and Growth Engineer. Notes, projects and startups.',
    'nav.label': 'Main',
    'nav.blog': 'Blog',
    'nav.projects': 'Projects',
    'nav.startups': 'Startups',
    'nav.academic': 'Academic',
    'nav.about': 'About me',
    'sidebar.intro': "I'm {name}, a software engineer. This is my personal blog.",
    'sidebar.map': 'THE MAP',
    'sidebar.mapHint': 'Click a house to visit it',
    'sidebar.play': 'Play!',
    'sidebar.playSub': 'Walk the village',
    'sidebar.language': 'Language',
    'sidebar.menu': 'Menu',
    'footer.social': 'Social',
    'footer.madeWith': 'Made with {heart} by Jorge Cardete',
    'game.title': 'Game',
    'game.description': 'A pixel-art village: walk from house to house to visit each section of the site.',
    'game.welcome': 'Welcome to the village',
    'game.help': '← → walk · space jump · ↑ enter',
    'game.helpTouch': 'Use the buttons to move and enter the houses',
    'game.enter': 'Enter',
    'game.visit': 'Go to {section}',
    'game.keepPlaying': 'Keep playing',
    'game.exit': 'Exit',
    'game.coins': 'Coins',
    'game.noscript': 'The game needs JavaScript. You can still browse with the house signs.',
  },
} satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)['es'];

export function useTranslations(lang: Lang) {
  return (key: UIKey) => ui[lang][key] ?? ui[defaultLang][key];
}
