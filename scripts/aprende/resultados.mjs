// Genera src/data/politica/resultados-2023.json con los resultados del Congreso por provincia
// a partir de los ficheros oficiales del Ministerio del Interior (02202307_TOTA.zip, en
// https://infoelectoral.interior.gob.es, área de descargas). Uso:
//   node scripts/aprende/resultados.mjs <carpeta con 03022307.DAT, 07022307.DAT y 08022307.DAT>
// Formato de ancho fijo descrito en el FICHEROS.doc que acompaña a los datos.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2];
if (!dir) {
  console.error('Uso: node scripts/aprende/resultados.mjs <carpeta>');
  process.exit(1);
}
const lines = (name) => new TextDecoder('latin1').decode(readFileSync(join(dir, name))).split(/\r?\n/).filter(Boolean);
const num = (l, a, b) => Number(l.slice(a - 1, b));

// 03: candidaturas. Código (9-14), siglas (15-64) y candidatura nacional en la que se acumula (227-232).
const candidaturas = new Map();
for (const l of lines('03022307.DAT')) {
  const codigo = l.slice(8, 14);
  const nacional = l.slice(226, 232);
  candidaturas.set(codigo, { siglas: l.slice(14, 64).trim(), nacional: nacional === '000000' ? codigo : nacional });
}
// Siglas de la candidatura nacional → partido del panel (PSC, PSdeG, etc. se acumulan en el PSOE).
const porSiglas = {
  PP: 'pp', PSOE: 'psoe', VOX: 'vox', SUMAR: 'sumar', ERC: 'erc', 'JxCAT - JUNTS': 'junts', 'EH Bildu': 'bildu',
  'EAJ-PNV': 'pnv', 'B.N.G.': 'bng', CCa: 'cc', 'U.P.N.': 'upn',
};
const partidoDe = (codigo) => {
  const c = candidaturas.get(codigo);
  return porSiglas[candidaturas.get(c?.nacional)?.siglas] ?? null;
};

// 07: totales por ámbito. Provincia (12-13; 99 = total), blanco (126-133), nulos (134-141), candidaturas (142-149).
const provincias = {};
for (const l of lines('07022307.DAT')) {
  const prov = l.slice(11, 13);
  if (prov === '99') continue;
  const blanco = num(l, 126, 133);
  const nulos = num(l, 134, 141);
  const aCandidaturas = num(l, 142, 149);
  const censo = num(l, 86, 93);
  provincias[prov] = {
    nombre: l.slice(14, 64).trim(),
    censo,
    validos: aCandidaturas + blanco,
    blanco,
    nulos,
    participacion: Math.round(((aCandidaturas + blanco + nulos) / censo) * 1000) / 10,
    candidaturas: [],
  };
}

// 08: votos y escaños por candidatura y provincia.
for (const l of lines('08022307.DAT')) {
  const prov = l.slice(11, 13);
  if (prov === '99' || !provincias[prov]) continue;
  const codigo = l.slice(14, 20);
  const votos = num(l, 21, 28);
  const escanos = num(l, 29, 33);
  if (!votos) continue;
  provincias[prov].candidaturas.push({ siglas: candidaturas.get(codigo)?.siglas ?? codigo, partido: partidoDe(codigo), votos, escanos });
}

// Por provincia: las candidaturas con escaño o al menos un 1 % de los votos; el resto, juntas en «otras».
let escanosTotales = 0;
for (const p of Object.values(provincias)) {
  p.candidaturas.sort((a, b) => b.votos - a.votos);
  const pct = (v) => Math.round((v / p.validos) * 1000) / 10;
  const visibles = p.candidaturas.filter((c) => c.escanos > 0 || c.votos / p.validos >= 0.01);
  const resto = p.candidaturas.filter((c) => !visibles.includes(c));
  p.candidaturas = visibles.map((c) => ({ ...c, pct: pct(c.votos) }));
  if (resto.length) {
    const votos = resto.reduce((s, c) => s + c.votos, 0);
    p.candidaturas.push({ siglas: 'Otras', partido: null, votos, escanos: 0, pct: pct(votos) });
  }
  escanosTotales += p.candidaturas.reduce((s, c) => s + c.escanos, 0);
}
if (escanosTotales !== 350) throw new Error(`Los escaños suman ${escanosTotales}, no 350`);

const out = {
  fuente: 'Ministerio del Interior, resultados de las elecciones generales del 23 de julio de 2023 (Congreso)',
  url: 'https://infoelectoral.interior.gob.es/',
  provincias,
};
writeFileSync(new URL('../../src/data/politica/resultados-2023.json', import.meta.url), `${JSON.stringify(out, null, 1)}\n`);
console.log(`${Object.keys(provincias).length} provincias, ${escanosTotales} escaños`);
