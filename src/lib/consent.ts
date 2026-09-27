// Consentimiento de cookies: lo que eligió el visitante y cómo se traduce a
// Consent Mode v2 de Google (que GTM propaga al resto de etiquetas).
// El valor por defecto (todo denegado) lo fija el script inline de
// Analytics.astro antes de que cargue GTM; aquí solo se actualiza.

export type Consent = { analytics: boolean; ads: boolean };

// Si cambian las finalidades del banner, subir la versión vuelve a preguntar.
const KEY = 'jorge.dev:consent';
const VERSION = 1;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function readConsent(): Consent | null {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (saved?.v !== VERSION) return null;
    return { analytics: !!saved.analytics, ads: !!saved.ads };
  } catch {
    return null;
  }
}

export function saveConsent(consent: Consent) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ v: VERSION, ...consent, ts: new Date().toISOString() }));
  } catch {}
  window.gtag('consent', 'update', googleConsent(consent));
  window.dataLayer.push({ event: 'consent_update', consent_analytics: consent.analytics, consent_ads: consent.ads });
  window.dispatchEvent(new CustomEvent<Consent>('consent:change', { detail: consent }));
}

export const googleConsent = ({ analytics, ads }: Consent) => ({
  analytics_storage: analytics ? 'granted' : 'denied',
  ad_storage: ads ? 'granted' : 'denied',
  ad_user_data: ads ? 'granted' : 'denied',
  ad_personalization: ads ? 'granted' : 'denied',
});
