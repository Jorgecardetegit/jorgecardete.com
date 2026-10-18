// Genera src/data/politica/diputados.json a partir de los datos abiertos del Congreso
// (https://www.congreso.es/es/opendata/diputados). Uso:
//   node scripts/aprende/diputados.mjs <DiputadosActivos.json> <DiputadosDeBaja.json> <Diput.json> <fecha-disolución dd/mm/aaaa>
// Al disolverse las Cortes, los diputados de la Diputación Permanente siguen «activos» y el
// resto causa baja ese día: unos y otros son los 350 de la legislatura que termina.
import { readFileSync, writeFileSync } from 'node:fs';

const [activosPath, bajasPath, historicoPath, disolucion] = process.argv.slice(2);
if (!disolucion) {
  console.error('Uso: node scripts/aprende/diputados.mjs <activos> <bajas> <histórico> <dd/mm/aaaa>');
  process.exit(1);
}
const read = (p) => JSON.parse(readFileSync(p, 'utf8').replace(/^﻿/, ''));

// Partido de cada diputado según su candidatura. En el Grupo Mixto hay quien se presentó en
// otra lista: los diputados de Podemos (elegidos con Sumar) se nombran a mano.
const porFormacion = {
  PP: 'pp', 'PSOE': 'psoe', 'PSC-PSOE': 'psoe', 'PsdeG-PSOE': 'psoe', 'PSE-EE (PSOE)': 'psoe', 'PSIB-PSOE': 'psoe', 'PSN-PSOE': 'psoe',
  VOX: 'vox', SUMAR: 'sumar', ERC: 'erc', 'JxCAT-JUNTS': 'junts', 'EH Bildu': 'bildu', 'EAJ-PNV': 'pnv', BNG: 'bng', CCa: 'cc', UPN: 'upn',
};
const podemos = new Set(['Belarra Urteaga, Ione', 'Sánchez Serna, Javier', 'Santana Perera, Noemí', 'Velarde Gómez, Martina']);

function partidoDe(d) {
  if (podemos.has(d.NOMBRE)) return 'podemos';
  const p = porFormacion[d.FORMACIONELECTORAL] ?? null;
  // Elegido en una lista y ahora en el Mixto sin ser de los casos anteriores: sin partido asignado.
  const mixto = d.GRUPOPARLAMENTARIO.includes('Mixto');
  if (mixto && !['bng', 'cc', 'upn'].includes(p)) return null;
  return p;
}

const slug = (s) =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const legislaturas = new Map();
for (const r of read(historicoPath)) {
  const key = `${r.APELLIDOS}, ${r.NOMBRE}`;
  const leg = r.LEGISLATURA.replace(/^Leg\.\s*/, '');
  if (!legislaturas.has(key)) legislaturas.set(key, new Set());
  legislaturas.get(key).add(leg);
}
const romanos = ['Constituyente', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];

const activos = read(activosPath);
const disueltos = read(bajasPath).filter((d) => d.FECHABAJA === disolucion);
const anteriores = read(bajasPath).filter((d) => d.FECHABAJA !== disolucion);

const ficha = (d) => {
  const [apellidos, nombre] = d.NOMBRE.split(', ');
  const legs = [...(legislaturas.get(d.NOMBRE) ?? [])].sort((a, b) => romanos.indexOf(a) - romanos.indexOf(b));
  return {
    id: slug(`${nombre} ${apellidos}`),
    nombre: `${nombre} ${apellidos}`,
    clave: d.NOMBRE,
    partido: partidoDe(d),
    formacion: d.FORMACIONELECTORAL,
    grupo: d.GRUPOPARLAMENTARIO.replace(/^Grupo Parlamentario /, ''),
    provincia: d.CIRCUNSCRIPCION,
    alta: d.FECHAALTA,
    ...(d.FECHABAJA && d.FECHABAJA !== disolucion && { baja: d.FECHABAJA }),
    legislaturas: legs.length ? legs : ['XV'],
    // Biografía oficial tal cual, troceada por los espacios con que la separa el Congreso.
    bio: (d.BIOGRAFIA ?? '').split(/\s{2,}/).map((s) => s.trim()).filter(Boolean),
  };
};

const diputados = [...activos, ...disueltos].map(ficha).sort((a, b) => a.clave.localeCompare(b.clave, 'es'));
if (diputados.length !== 350) throw new Error(`Se esperaban 350 diputados y hay ${diputados.length}`);
const ids = new Set(diputados.map((d) => d.id));
if (ids.size !== diputados.length) throw new Error('Hay identificadores repetidos');

const out = {
  fuente: 'Congreso de los Diputados, datos abiertos',
  url: 'https://www.congreso.es/es/opendata/diputados',
  disolucion,
  diputados,
  // Quienes dejaron el escaño durante la legislatura (sustituidos por el siguiente de su lista).
  bajas: anteriores.map(ficha).sort((a, b) => a.clave.localeCompare(b.clave, 'es')),
};
writeFileSync(new URL('../../src/data/politica/diputados.json', import.meta.url), `${JSON.stringify(out, null, 1)}\n`);
console.log(`${diputados.length} diputados, ${out.bajas.length} bajas anteriores`);
