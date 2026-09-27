// Eventos que no necesitan tocar cada página: clics de contacto y redes,
// enlaces salientes, lectura de artículos y el juego.
import { track } from './analytics';

const NETWORKS: [string, RegExp][] = [
  ['linkedin', /(^|\.)linkedin\.com$/],
  ['x', /(^|\.)(x|twitter)\.com$/],
  ['github', /(^|\.)github\.com$/],
  ['medium', /(^|\.)medium\.com$/],
  ['substack', /(^|\.)substack\.com$/],
];

export function autotrack() {
  document.addEventListener('click', (e) => {
    const link = (e.target as Element).closest?.('a[href]') as HTMLAnchorElement | null;
    if (!link) return;
    // data-track="evento" en un enlace manda ese evento en lugar del automático.
    if (link.dataset.track) return void track(link.dataset.track, { link_url: link.href, link_text: link.textContent?.trim() });
    const url = new URL(link.href, location.href);
    if (url.protocol === 'mailto:') return void track('contact_click', { method: 'email' });
    if (url.host === location.host) return;
    const network = NETWORKS.find(([, re]) => re.test(url.hostname))?.[0];
    if (network) track('social_click', { network, link_url: url.href });
    else track('outbound_click', { link_url: url.href, link_domain: url.hostname });
  });

  trackReading();

  window.addEventListener('game:room', (e) => track('game_house_enter', { house: (e as CustomEvent<string>).detail }));
  window.addEventListener('game:win', (e) => track('game_complete', { coins: (e as CustomEvent<number>).detail }));
}

// post_read: el lector ha llegado al 75 % del artículo.
function trackReading() {
  const prose = document.querySelector<HTMLElement>('[data-read-slug]');
  if (!prose) return;
  const start = performance.now();
  const onScroll = () => {
    const { top, height } = prose.getBoundingClientRect();
    if (innerHeight - top < height * 0.75) return;
    removeEventListener('scroll', onScroll);
    track('post_read', {
      post_slug: prose.dataset.readSlug,
      post_lang: document.documentElement.lang,
      seconds_to_read: Math.round((performance.now() - start) / 1000),
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
}
