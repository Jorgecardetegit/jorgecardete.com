// De dónde viene la visita: se calcula al aterrizar y acompaña a todos los
// eventos de la sesión. Sin consentimiento de analítica solo vive en memoria
// (se pierde al cambiar de página); con él se guarda en sessionStorage.

export type Channel =
  | 'paid_search' | 'paid_social' | 'display' | 'ai' | 'organic_search'
  | 'social' | 'email' | 'referral' | 'direct'
  // Navegación interna sin toque guardado (sin consentimiento no se recuerda la entrada).
  | 'unknown';

export type Touch = {
  channel: Channel;
  source: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  ai_source?: string;
  referrer_domain?: string;
  landing_page: string;
  click_ids: Record<string, string>;
};

// Identificador de clic de cada red de anuncios (y a qué canal apunta).
const CLICK_IDS: Record<string, Channel | null> = {
  gclid: 'paid_search', gbraid: 'paid_search', wbraid: 'paid_search', msclkid: 'paid_search',
  li_fat_id: 'paid_social', ttclid: 'paid_social', rdt_cid: 'paid_social',
  // Meta, X y Pinterest los añaden también a enlaces orgánicos.
  fbclid: null, twclid: null, epik: null,
};

const AI: [string, RegExp][] = [
  ['chatgpt', /(^|\.)(chatgpt\.com|chat\.openai\.com)$/],
  ['perplexity', /(^|\.)perplexity\.ai$/],
  ['gemini', /^gemini\.google\.com$/],
  ['copilot', /^copilot\.microsoft\.com$/],
  ['claude', /(^|\.)claude\.ai$/],
  ['deepseek', /(^|\.)deepseek\.com$/],
  ['you', /(^|\.)you\.com$/],
  ['phind', /(^|\.)phind\.com$/],
];
const SEARCH = /(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com|search\.yahoo\.com|ecosia\.org|yandex\.[a-z]+|search\.brave\.com|startpage\.com)$/;
const SOCIAL = /(^|\.)(linkedin\.com|lnkd\.in|x\.com|t\.co|twitter\.com|facebook\.com|instagram\.com|reddit\.com|tiktok\.com|youtube\.com|news\.ycombinator\.com|threads\.net|bsky\.app|medium\.com|mastodon\.social)$/;
const MEDIUM: [RegExp, Channel][] = [
  [/^(cpc|ppc|paid[_-]?search|sem)$/, 'paid_search'],
  [/^(paid[_-]?social|paidsocial|cpm|cpv|paid)$/, 'paid_social'],
  [/^(display|banner)$/, 'display'],
  [/^(e-?mail|newsletter)$/, 'email'],
  [/^(social|organic[_-]?social)$/, 'social'],
  [/^(referral|affiliate|partner)$/, 'referral'],
];

const KEY = 'jorge.dev:touch';
let current: Touch | null = null;

const aiSource = (value?: string) => value && AI.find(([, re]) => re.test(value))?.[0];

export function classify(url: URL, referrer: string): Touch {
  const q = url.searchParams;
  const utm = (k: string) => q.get(`utm_${k}`)?.toLowerCase().trim() || undefined;
  const refHost = referrer ? new URL(referrer).hostname.replace(/^www\./, '') : undefined;
  const click_ids = Object.fromEntries(Object.keys(CLICK_IDS).flatMap((k) => (q.get(k) ? [[k, q.get(k)!]] : [])));

  const source = utm('source') ?? refHost ?? '(direct)';
  const medium = utm('medium');
  const ai = aiSource(utm('source')) ?? aiSource(refHost);

  let channel: Channel;
  const paidClick = Object.keys(click_ids).map((k) => CLICK_IDS[k]).find(Boolean);
  const byMedium = medium && MEDIUM.find(([re]) => re.test(medium))?.[1];
  if (paidClick) channel = paidClick;
  else if (byMedium) channel = byMedium;
  else if (ai) channel = 'ai';
  else if (refHost && SEARCH.test(refHost)) channel = 'organic_search';
  else if (refHost && SOCIAL.test(refHost)) channel = 'social';
  else if (click_ids.fbclid || click_ids.twclid) channel = 'social';
  else if (refHost || utm('source')) channel = 'referral';
  else channel = 'direct';

  return {
    channel,
    source,
    medium,
    campaign: utm('campaign'),
    content: utm('content'),
    term: utm('term'),
    ai_source: ai,
    referrer_domain: refHost,
    landing_page: url.pathname,
    click_ids,
  };
}

/** Toque de la sesión: el de la página de aterrizaje, o el guardado si seguimos navegando por la web. */
export function sessionTouch(persist: boolean): Touch {
  if (current) return current;
  const url = new URL(location.href);
  const internal = document.referrer && new URL(document.referrer).host === location.host;
  const hasCampaign = [...url.searchParams.keys()].some((k) => k.startsWith('utm_') || k in CLICK_IDS);
  let saved: Touch | null = null;
  try { saved = JSON.parse(sessionStorage.getItem(KEY) ?? 'null'); } catch {}
  // Una visita nueva con UTMs o clic de anuncio abre otro toque aunque la sesión siga viva.
  if (saved && (internal || !hasCampaign)) current = saved;
  else if (internal && !hasCampaign) current = { ...classify(url, ''), channel: 'unknown', source: '(unknown)' };
  else current = classify(url, document.referrer);
  if (persist) persistTouch();
  return current;
}

export function persistTouch() {
  try { if (current) sessionStorage.setItem(KEY, JSON.stringify(current)); } catch {}
}
