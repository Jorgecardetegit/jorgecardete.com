import type { APIRoute } from 'astro';

// Todos los bots entran, incluidos los de IA: los que buscan y citan
// (OAI-SearchBot, PerplexityBot, ChatGPT-User…) y los que entrenan modelos
// (GPTBot, ClaudeBot, Google-Extended). Para cerrar el paso a uno concreto:
//   User-agent: GPTBot
//   Disallow: /
export const GET: APIRoute = ({ site }) =>
  new Response(
    ['User-agent: *', 'Allow: /', 'Disallow: /api/', '', `Sitemap: ${new URL('/sitemap-index.xml', site)}`, ''].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
