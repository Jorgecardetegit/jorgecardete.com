// ¿Me citan los asistentes de IA? Lanza cada pregunta de ai-visibility-prompts.json
// a Claude con búsqueda web y anota si aparece la web: entre los resultados de la
// búsqueda, citada en la respuesta o mencionada por nombre. Cada resultado se envía
// a PostHog como evento ai_visibility_check para seguir la evolución semana a semana.
//
// Uso: SITE_URL=https://tudominio.com ANTHROPIC_API_KEY=… [POSTHOG_KEY=…] node scripts/ai-visibility.mjs
import Anthropic from '@anthropic-ai/sdk';
import { readFile } from 'node:fs/promises';

const MODEL = 'claude-opus-5';
const site = process.env.SITE_URL;
if (!site) throw new Error('Falta SITE_URL');
const host = new URL(site).hostname.replace(/^www\./, '');
const ours = (url) => { try { return new URL(url).hostname.replace(/^www\./, '') === host; } catch { return false; } };

const prompts = JSON.parse(await readFile(new URL('./ai-visibility-prompts.json', import.meta.url), 'utf8'));
const client = new Anthropic();

async function ask(prompt) {
  const messages = [{ role: 'user', content: prompt }];
  const content = [];
  // pause_turn: la búsqueda se ha pausado a mitad; se reenvía para que continúe.
  for (let turn = 0; turn < 4; turn++) {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 16000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      tools: [{ type: 'web_search_20260209', name: 'web_search', max_uses: 5 }],
      messages,
    });
    content.push(...response.content);
    if (response.stop_reason === 'refusal') return { content, refused: true };
    if (response.stop_reason !== 'pause_turn') return { content, refused: false };
    messages.push({ role: 'assistant', content: response.content });
  }
  return { content, refused: false };
}

function analyse(content) {
  const results = content
    .filter((b) => b.type === 'web_search_tool_result' && Array.isArray(b.content))
    .flatMap((b) => b.content.map((r) => r.url));
  const texts = content.filter((b) => b.type === 'text');
  const citations = texts.flatMap((b) => (b.citations ?? []).map((c) => c.url).filter(Boolean));
  const answer = texts.map((b) => b.text).join('');
  return {
    in_results: results.some(ours),
    cited: citations.some(ours),
    mentioned: answer.includes(host) || /jorge cardete/i.test(answer),
    our_urls: [...new Set([...results, ...citations].filter(ours))],
    results_count: results.length,
  };
}

async function report(prompt, data) {
  if (!process.env.POSTHOG_KEY) return;
  await fetch(`${process.env.POSTHOG_HOST ?? 'https://eu.i.posthog.com'}/i/v0/e/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: process.env.POSTHOG_KEY,
      event: 'ai_visibility_check',
      distinct_id: 'ai-visibility-bot',
      properties: { prompt, provider: 'anthropic', model: MODEL, ...data },
    }),
  });
}

let hits = 0;
for (const prompt of prompts) {
  try {
    const { content, refused } = await ask(prompt);
    const data = { ...analyse(content), refused };
    if (data.cited || data.mentioned) hits++;
    console.log(`${data.cited ? '✅ citada ' : data.in_results ? '🔎 vista  ' : '·  no     '} ${prompt}${data.our_urls.length ? `\n   ${data.our_urls.join('\n   ')}` : ''}`);
    await report(prompt, data);
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) console.error(`⏳ límite de uso en: ${prompt}`);
    else if (error instanceof Anthropic.APIError) console.error(`❌ ${error.status} en: ${prompt}: ${error.message}`);
    else throw error;
  }
}
console.log(`\n${hits}/${prompts.length} respuestas citan o mencionan ${host}`);
