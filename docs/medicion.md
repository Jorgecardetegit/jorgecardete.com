# Medición y campañas

Cómo se mide la web y qué hay que configurar fuera del código.

## Arquitectura

```
Visitante ─► Banner propio (Consent Mode v2)          src/components/ConsentBanner.astro
               │
               ├─► dataLayer ─► GTM web ─► GA4 · Google Ads · Meta · LinkedIn · TikTok · Reddit · X · Microsoft
               │                   └─► (más adelante) GTM servidor en Stape ─► APIs de conversiones
               └─► PostHog (UE, sin cookies hasta aceptar, vía /ingest)   fuente de verdad propia
```

- Cada evento sale a la vez al `dataLayer` y a PostHog con el mismo `event_id` (`src/lib/analytics.ts`).
- Al aterrizar se clasifica el canal (`src/lib/attribution.ts`) y viaja en `attribution` con cada evento: `paid_search`, `paid_social`, `display`, `ai`, `organic_search`, `social`, `email`, `referral`, `direct` (o `unknown` si se navegó por la web sin consentimiento).
- Sin consentimiento de analítica, PostHog cuenta con un hash anónimo y no guarda nada en el navegador. Sin consentimiento de publicidad, no se envían ni los click IDs ni el email cifrado.

## Plan de eventos

| Evento | Cuándo | Propiedades |
|---|---|---|
| `newsletter_signup` | **Conversión principal**: alta confirmada en Substack | `form_placement`, `how_found`, `value` (1), `currency` (EUR); `user_data.sha256_email_address` con consentimiento de publicidad |
| `newsletter_form_start` | Primer foco en el formulario | `form_placement` |
| `newsletter_error` | Falla el alta | `form_placement`, `error` |
| `landing_view` | Se abre una landing `/lp/…` | `landing` |
| `post_read` | El lector llega al 75 % del artículo | `post_slug`, `post_lang`, `seconds_to_read` |
| `contact_click` | Clic en un `mailto:` | `method` |
| `social_click` | Clic a LinkedIn, X, GitHub, Medium o Substack | `network`, `link_url` |
| `outbound_click` | Cualquier otro enlace externo | `link_url`, `link_domain` |
| `game_house_enter` / `game_complete` | Juego del pueblo | `house` / `coins` |
| `consent_update` | Cambia el consentimiento (solo `dataLayer`) | `consent_analytics`, `consent_ads` |
| `ai_visibility_check` | Semanal, desde GitHub Actions | `prompt`, `cited`, `in_results`, `mentioned`, `our_urls` |

Un enlace con `data-track="nombre"` envía ese evento en lugar del automático.

## Puesta en marcha

### 1. Vercel
1. Importar el repo en Vercel (framework Astro; se detecta solo).
2. Variables de entorno: `PUBLIC_GTM_ID`, `PUBLIC_POSTHOG_KEY`, `SUBSTACK_URL` y, cuando haya dominio, `SITE_URL` (ver `.env.example`).
3. Añadir el dominio propio en *Settings → Domains*.
4. Bots de IA: *Firewall → Bot Management → AI Bots* en modo **Log**. Así se ve cuántas veces entran `ChatGPT-User`, `Perplexity-User`, `Claude-User`… sin bloquearlos.
5. Desactivar GitHub Pages en el repo (el workflow de despliegue ya no existe).

### 2. PostHog
1. Proyecto en la región **UE**.
2. *Settings → Web analytics / Cookieless*: activar **Cookieless server hash mode** (lo exige `cookieless_mode: 'on_reject'`).
3. Canal "IA": un *action* o *cohort* por `channel = ai`, o en SQL por `properties.ai_source`.
4. Funnel base: `$pageview` → `newsletter_form_start` → `newsletter_signup`, desglosado por `channel`.

### 3. Google Tag Manager (contenedor web)
- *Admin → Container settings*: activar **Consent overview**.
- Variables de capa de datos: `event_id`, `value`, `currency`, `form_placement`, `attribution.channel`, `user_data.sha256_email_address`.
- Etiquetas:
  - **Google tag (GA4)** en todas las páginas; requiere `analytics_storage`.
  - **GA4 event** con disparador de evento personalizado `newsletter_signup|post_read|contact_click|social_click|landing_view` (regex); nombre del evento `{{Event}}`. Marcar `newsletter_signup` como evento clave en GA4.
  - **Google Ads conversion** en `newsletter_signup` con `value`, `currency`, ID de transacción `{{event_id}}` y *user-provided data* `sha256_email_address` (conversiones mejoradas). Requiere `ad_storage` y `ad_user_data`.
  - **Meta Pixel** (plantilla de la galería) `Lead` en `newsletter_signup`, con `eventID = {{event_id}}` para deduplicar con la API de conversiones.
  - **LinkedIn Insight Tag**, **TikTok Pixel**, **Reddit Pixel**, **X Pixel** y **Microsoft UET** (plantillas de la galería), con su evento de *lead* en `newsletter_signup`. Todas requieren `ad_storage`.
- Enlazar GA4 con Google Ads e importar allí `newsletter_signup` solo si no se usa la etiqueta de conversión directa (una de las dos, no ambas).

### 4. Newsletter (Substack)
`SUBSTACK_URL` = `https://<publicación>.substack.com`. El alta usa el endpoint de su formulario incrustado, que no es una API pública: si deja de funcionar, el formulario ofrece su página de suscripción y registra `newsletter_error`.

### 5. Buscadores
- **Search Console**: propiedad de dominio (verificación por DNS) y enviar `/sitemap-index.xml`.
- **Bing Webmaster Tools**: importar desde Search Console.
- **IndexNow**: variable de repositorio `SITE_URL` en GitHub (*Settings → Variables*). El workflow `IndexNow` se lanza tras cada despliegue a producción.

### 6. Visibilidad en IA
Secretos de GitHub `ANTHROPIC_API_KEY` y `POSTHOG_KEY`, y la variable `SITE_URL`. Las preguntas están en `scripts/ai-visibility-prompts.json`.

## Campañas

- UTMs en minúsculas: `utm_source` (red: `linkedin`, `google`, `meta`…), `utm_medium` (`paid_social`, `cpc`, `social`, `email`), `utm_campaign` (`tema-mes`, p. ej. `cnn-oct26`), `utm_content` (variante del anuncio).
- Anuncios hacia las landings de `src/data/landings.ts` (`/lp/<slug>/`), que van sin menú y con noindex.
- Test A/B: experimento en PostHog con la clave `experiment.flag` de la landing y variantes con los mismos nombres; métrica `newsletter_signup`.

## Pendiente

- **GTM de servidor** (Stape) para las APIs de conversiones de Meta, LinkedIn, TikTok y Reddit. Cuando exista, añadir en `vercel.json` un rewrite de `/metrics/:path*` al contenedor de Stape y cambiar las etiquetas para que envíen allí.
- Otros asistentes en la comprobación semanal (ChatGPT, Perplexity, Gemini).
