import type { APIRoute } from 'astro';

// Alta en la newsletter de Substack. Substack no tiene API pública: esto usa el
// mismo endpoint que su formulario incrustado, así que puede cambiar sin aviso.
// Si falla, el formulario manda a la página de suscripción de Substack.
export const prerender = false;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const POST: APIRoute = async ({ request, url }) => {
  const substack = process.env.SUBSTACK_URL?.replace(/\/$/, '');
  if (!substack) return Response.json({ ok: false, error: 'not_configured' }, { status: 503 });

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  // Campo trampa: los humanos no lo ven, los bots lo rellenan.
  if (body?.website) return Response.json({ ok: true });
  if (!EMAIL.test(email) || email.length > 254) return Response.json({ ok: false, error: 'invalid_email' }, { status: 400 });

  const page = typeof body?.page === 'string' ? new URL(body.page, url).href : url.origin;
  const res = await fetch(`${substack}/api/v1/free?nojs=true`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      email,
      first_url: page,
      first_referrer: '',
      current_url: page,
      current_referrer: '',
      referral_code: '',
      source: 'embed',
    }),
  }).catch(() => null);

  if (!res?.ok) {
    console.error('substack subscribe failed', res?.status);
    return Response.json({ ok: false, error: 'upstream', fallback: `${substack}/subscribe` }, { status: 502 });
  }
  return Response.json({ ok: true });
};
