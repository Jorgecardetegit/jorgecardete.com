// Avisa a Bing, Yandex, Seznam y Naver (IndexNow) de todas las URLs del sitemap.
// Uso: SITE_URL=https://tudominio.com node scripts/indexnow.mjs
// La clave es pública por diseño: el archivo public/<clave>.txt demuestra que el dominio es tuyo.
const KEY = '0ad2094110d854314fbd91fe06172fe1';
const site = process.env.SITE_URL?.replace(/\/$/, '');
if (!site) throw new Error('Falta SITE_URL');

const xml = async (url) => (await fetch(url)).text();
const locs = (text) => [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const index = await xml(`${site}/sitemap-index.xml`);
const urls = (await Promise.all(locs(index).map(async (s) => locs(await xml(s))))).flat();

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(site).host, key: KEY, keyLocation: `${site}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${urls.length} URLs → ${res.status} ${res.statusText}`);
if (!res.ok && res.status !== 202) process.exit(1);
