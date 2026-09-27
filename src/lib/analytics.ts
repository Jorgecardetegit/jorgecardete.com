// Capa de medición del navegador. Cada evento sale por dos vías con el mismo
// event_id:
//  - dataLayer → GTM, que lo reparte a GA4, Google Ads, Meta, LinkedIn…
//    (y el mismo event_id deduplica píxel y API de conversiones en servidor);
//  - PostHog, la fuente de verdad propia (funnels, experimentos, SQL).
// Nombres de eventos en snake_case y sin atarlos a la web: sirven igual en una app.
import posthog from 'posthog-js';
import { persistTouch, sessionTouch, type Touch } from './attribution';
import { readConsent, type Consent } from './consent';

const POSTHOG_KEY = import.meta.env.PUBLIC_POSTHOG_KEY;
let consent: Consent = readConsent() ?? { analytics: false, ads: false };
let touch: Touch;
let started = false;

export function initAnalytics() {
  if (started) return;
  started = true;
  touch = sessionTouch(consent.analytics);

  if (POSTHOG_KEY) {
    posthog.init(POSTHOG_KEY, {
      // Proxy en vercel.json: mismo dominio, menos bloqueos.
      api_host: '/ingest',
      ui_host: 'https://eu.posthog.com',
      defaults: '2026-08-30',
      // Sin cookies hasta que se aceptan; si no, se cuenta con un hash anónimo en servidor.
      cookieless_mode: 'on_reject',
      person_profiles: 'identified_only',
    });
    applyPostHogConsent();
    posthog.register(touchProperties());
  }

  window.addEventListener('consent:change', (e) => {
    consent = (e as CustomEvent<Consent>).detail;
    if (consent.analytics) persistTouch();
    if (POSTHOG_KEY) applyPostHogConsent();
  });
}

// Mientras no haya decisión se trata como rechazo: se mide, pero sin guardar nada.
function applyPostHogConsent() {
  if (consent.analytics) posthog.opt_in_capturing();
  else posthog.opt_out_capturing();
}

const touchProperties = () => ({
  channel: touch.channel,
  traffic_source: touch.source,
  traffic_medium: touch.medium,
  traffic_campaign: touch.campaign,
  ai_source: touch.ai_source,
  landing_page: touch.landing_page,
  paid_click: Object.keys(touch.click_ids).join(',') || undefined,
});

type UserData = { email?: string };

/** Registra un evento en GTM y PostHog. `user` solo viaja a GTM, cifrado y con consentimiento de publicidad. */
export async function track(event: string, props: Record<string, unknown> = {}, user?: UserData) {
  if (!started) initAnalytics();
  const event_id = crypto.randomUUID();
  const user_data = user?.email && consent.ads ? { sha256_email_address: await sha256(user.email.trim().toLowerCase()) } : undefined;

  window.dataLayer.push({
    event,
    event_id,
    ...props,
    attribution: { ...touch, click_ids: consent.ads ? touch.click_ids : {} },
    ...(user_data && { user_data }),
  });
  if (POSTHOG_KEY) posthog.capture(event, { ...props, event_id });
}

async function sha256(text: string) {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
