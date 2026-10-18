// Genera src/data/politica/votaciones.json a partir de los JSON de votaciones del Congreso
// (https://www.congreso.es/es/opendata/votaciones), descomprimidos en una carpeta. Uso:
//   node scripts/aprende/votaciones.mjs <carpeta-con-los-json>
// Necesita antes src/data/politica/diputados.json (scripts/aprende/diputados.mjs) y usa
// src/data/politica/votaciones-manuales.json para las votaciones clave publicadas solo como imagen.
//
// Qué se calcula, con criterios mecánicos para no elegir a mano:
// - Votaciones clave: votación final de cada ley (dictamen o votación de conjunto), vetos del
//   Senado, convalidación de decretos-ley y enmiendas a la totalidad.
// - Propuestas: tomas en consideración de proposiciones de ley, con el grupo que las presenta.
// - Afinidad: en qué porcentaje de votaciones coincide la posición mayoritaria de dos partidos.
// - Cohesión: votaciones en que todos los diputados presentes de un partido votan lo mismo.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2];
if (!dir) {
  console.error('Uso: node scripts/aprende/votaciones.mjs <carpeta-con-los-json>');
  process.exit(1);
}
const dataUrl = new URL('../../src/data/politica/', import.meta.url);
const { diputados, bajas } = JSON.parse(readFileSync(new URL('diputados.json', dataUrl), 'utf8'));

const partidoDe = new Map([...diputados, ...bajas].map((d) => [d.clave, d.partido]));
const indice = new Map(diputados.map((d, i) => [d.clave, i]));

function* jsonFiles(d) {
  for (const name of readdirSync(d)) {
    const p = join(d, name);
    if (statSync(p).isDirectory()) yield* jsonFiles(p);
    else if (name.endsWith('.json')) yield p;
  }
}

const codigo = { 'Sí': 'S', No: 'N', 'Abstención': 'A', 'No vota': '-' };
const votaciones = [];
for (const file of jsonFiles(dir)) {
  const raw = JSON.parse(readFileSync(file, 'utf8').replace(/^﻿/, ''));
  const i = raw.informacion;
  const [d, m, y] = i.fecha.split('/').map(Number);
  votaciones.push({
    id: `${i.sesion}-${i.numeroVotacion}`,
    fecha: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
    sesion: i.sesion,
    numero: i.numeroVotacion,
    seccion: (i.titulo ?? '').trim(),
    expediente: (i.textoExpediente ?? '').trim(),
    subgrupo: [i.tituloSubGrupo, i.textoSubGrupo].filter(Boolean).join(' ').trim(),
    asentimiento: raw.totales.asentimiento === 'Sí',
    totales: { si: raw.totales.afavor, no: raw.totales.enContra, abs: raw.totales.abstenciones, nv: raw.totales.noVotan },
    votos: raw.votaciones.map((v) => ({ clave: v.diputado, voto: codigo[v.voto] ?? '-' })),
  });
}
votaciones.sort((a, b) => a.fecha.localeCompare(b.fecha) || a.sesion - b.sesion || a.numero - b.numero);

// Recuento por partido y posición mayoritaria (entre quienes votan).
const partidos = [...new Set(diputados.map((d) => d.partido).filter(Boolean))];
function recuento(v) {
  const r = Object.fromEntries(partidos.map((p) => [p, { S: 0, N: 0, A: 0, '-': 0 }]));
  for (const { clave, voto } of v.votos) {
    const p = partidoDe.get(clave);
    if (p && r[p]) r[p][voto]++;
  }
  return r;
}
const mayoria = (c) => {
  const opciones = ['S', 'N', 'A'].filter((k) => c[k] > 0).sort((a, b) => c[b] - c[a]);
  return opciones[0] ?? null;
};

// Afinidad y cohesión sobre todas las votaciones nominales.
const coinciden = {};
const comparables = {};
const cohesion = Object.fromEntries(partidos.map((p) => [p, { unanimes: 0, total: 0 }]));
const porDiputado = new Map(diputados.map((d) => [d.clave, { total: 0, presentes: 0, conPartido: 0, comparables: 0 }]));

for (const v of votaciones) {
  if (v.asentimiento) continue;
  const r = recuento(v);
  const pos = Object.fromEntries(partidos.map((p) => [p, mayoria(r[p])]));
  for (const p of partidos) {
    const c = r[p];
    const presentes = c.S + c.N + c.A;
    if (presentes > 0) {
      cohesion[p].total++;
      if (Math.max(c.S, c.N, c.A) === presentes) cohesion[p].unanimes++;
    }
    for (const q of partidos) {
      if (p >= q || !pos[p] || !pos[q]) continue;
      const k = `${p}|${q}`;
      comparables[k] = (comparables[k] ?? 0) + 1;
      if (pos[p] === pos[q]) coinciden[k] = (coinciden[k] ?? 0) + 1;
    }
  }
  for (const { clave, voto } of v.votos) {
    const s = porDiputado.get(clave);
    if (!s) continue;
    s.total++;
    if (voto !== '-') s.presentes++;
    const p = partidoDe.get(clave);
    if (voto !== '-' && p && pos[p]) {
      s.comparables++;
      if (voto === pos[p]) s.conPartido++;
    }
  }
}

const pct = (a, b) => (b ? Math.round((a / b) * 1000) / 10 : null);
const afinidad = Object.fromEntries(partidos.map((p) => [p, {}]));
for (const [k, n] of Object.entries(comparables)) {
  const [p, q] = k.split('|');
  afinidad[p][q] = afinidad[q][p] = pct(coinciden[k] ?? 0, n);
}

// Clasificación de las votaciones que interesan.
function tipo(v) {
  const s = v.seccion.toLowerCase();
  const e = v.expediente.toLowerCase();
  const g = v.subgrupo.toLowerCase();
  // Trámites sin debate de fondo: tramitar un decreto como ley o llevar una ley al Pleno.
  if (e.startsWith('tramitación') || /avocación/.test(e + g)) return null;
  if (s.startsWith('convalidación o derogación de reales decretos-leyes')) return 'decreto';
  if (s.startsWith('debates de totalidad de iniciativas legislativas')) return 'totalidad';
  if (s.startsWith('veto del senado')) return 'veto';
  if (s.startsWith('toma en consideración de proposiciones de ley')) return 'propuesta';
  // Votación final de una ley en el Congreso: el dictamen entero o la votación de conjunto.
  const final = /votaci[oó]n (del|de) (nuevo )?dictamen|votaci[oó]n de conjunto/;
  if ((final.test(g) || final.test(e)) && !/art[ií]culo|disposici[oó]n|enmienda/.test(g)) return 'ley';
  return null;
}

function resultado(v, t) {
  const { si, no } = v.totales;
  const organica = /ley orgánica|reforma constitucional/i.test(v.expediente) && /conjunto/i.test(v.subgrupo);
  if (organica) return si >= 176 ? 'aprobada' : 'rechazada';
  if (t === 'veto') return si >= 176 ? 'aprobada' : 'rechazada';
  return si > no ? 'aprobada' : 'rechazada';
}

// Quién presenta una proposición: «Del Grupo Parlamentario X, ...» o «del Grupo ... (Sr./Sra. ...)».
function proponente(expediente) {
  const m = expediente.match(/Grupos? Parlamentarios? ([^,.]+?)(?:,| y |\.|$)/i);
  return m ? m[1].trim() : null;
}

const resumenPartidos = (r) =>
  Object.fromEntries(partidos.map((p) => [p, [r[p].S, r[p].N, r[p].A, r[p]['-']]]));

const clave = [];
const propuestas = [];
for (const v of votaciones) {
  const t = tipo(v);
  if (!t || v.asentimiento) continue;
  // Un empate se repite: el resultado que cuenta es el de la repetición.
  if (v.totales.si === v.totales.no) continue;
  const r = recuento(v);
  const item = {
    id: v.id,
    fecha: v.fecha,
    tipo: t,
    titulo: v.expediente,
    detalle: v.subgrupo || undefined,
    resultado: resultado(v, t),
    totales: v.totales,
    partidos: resumenPartidos(r),
  };
  if (t === 'propuesta') {
    propuestas.push({ ...item, proponente: proponente(v.expediente) });
  } else {
    const votos = Array(diputados.length).fill('·');
    for (const { clave: c, voto } of v.votos) if (indice.has(c)) votos[indice.get(c)] = voto;
    clave.push({ ...item, votos: votos.join('') });
  }
}

// Votaciones manuales: el voto de cada diputado sale de la posición de su candidatura, solo
// si quien era diputado entonces cuadra con los totales oficiales.
const porFormacion = {
  PP: 'pp', PSOE: 'psoe', 'PSC-PSOE': 'psoe', 'PsdeG-PSOE': 'psoe', 'PSE-EE (PSOE)': 'psoe', 'PSIB-PSOE': 'psoe', 'PSN-PSOE': 'psoe',
  VOX: 'vox', SUMAR: 'sumar', ERC: 'erc', 'JxCAT-JUNTS': 'junts', 'EH Bildu': 'bildu', 'EAJ-PNV': 'pnv', BNG: 'bng', CCa: 'cc', UPN: 'upn',
};
const isoCongreso = (s) => s.split('/').reverse().join('-');
const manuales = JSON.parse(readFileSync(new URL('votaciones-manuales.json', dataUrl), 'utf8')).votaciones;
for (const m of manuales) {
  let votos = null;
  let recuentoManual = null;
  if (m.posiciones) {
    const v = diputados.map((d) => (isoCongreso(d.alta) > m.fecha ? '·' : (m.posiciones[porFormacion[d.formacion]] ?? '·')));
    const si = v.filter((x) => x === 'S').length;
    const no = v.filter((x) => x === 'N').length;
    if (si <= m.totales.si && no <= m.totales.no) {
      votos = v.join('');
      recuentoManual = Object.fromEntries(partidos.map((p) => [p, [0, 0, 0, 0]]));
      diputados.forEach((d, i) => {
        const k = { S: 0, N: 1, A: 2 }[v[i]];
        if (d.partido && k !== undefined) recuentoManual[d.partido][k]++;
      });
    } else {
      console.warn(`Votación manual ${m.id}: las posiciones no cuadran con los totales; se publica sin desglose.`);
    }
  }
  const item = {
    id: m.id, fecha: m.fecha, tipo: m.tipo, titulo: m.titulo, detalle: m.detalle, resultado: m.resultado,
    totales: m.totales, partidos: recuentoManual, nota: m.nota, fuente: m.fuente, manual: true,
  };
  if (m.tipo === 'propuesta') propuestas.push({ ...item, proponente: m.proponente });
  else clave.push({ ...item, votos: votos ?? '·'.repeat(diputados.length) });
}

// En las leyes orgánicas se vota el dictamen y después el conjunto: cuenta el conjunto, que es
// el que exige mayoría absoluta (la amnistía pasó el dictamen el 30/1/2024 y cayó en el conjunto).
const leyBase = (c) => c.titulo.replace(/^Votaci[oó]n (del|de) (nuevo )?(dictamen|conjunto)( del texto)?( del| de la)? /i, '').toLowerCase().replace(/\.$/, '');
const conConjunto = new Set(clave.filter((c) => c.tipo === 'ley' && /conjunto/i.test(`${c.titulo} ${c.detalle ?? ''}`)).map((c) => `${c.fecha}|${leyBase(c)}`));
for (let i = clave.length - 1; i >= 0; i--) {
  const c = clave[i];
  if (c.tipo === 'ley' && !/conjunto/i.test(`${c.titulo} ${c.detalle ?? ''}`) && conConjunto.has(`${c.fecha}|${leyBase(c)}`)) clave.splice(i, 1);
}
// Por fecha y, dentro del día, por sesión y número (las manuales sin número van al final del día).
const num = (id, i) => Number(id.split('-')[i]) || 9999;
const orden = (a, b) => a.fecha.localeCompare(b.fecha) || num(a.id, 0) - num(b.id, 0) || num(a.id, 1) - num(b.id, 1) || a.id.localeCompare(b.id);
clave.sort(orden);
propuestas.sort(orden);

const out = {
  fuente: 'Congreso de los Diputados, datos abiertos de votaciones',
  url: 'https://www.congreso.es/es/opendata/votaciones',
  desde: votaciones[0]?.fecha,
  hasta: votaciones.at(-1)?.fecha,
  total: votaciones.filter((v) => !v.asentimiento).length,
  partidos: Object.fromEntries(
    partidos.map((p) => [p, { afinidad: afinidad[p], cohesion: pct(cohesion[p].unanimes, cohesion[p].total), votaciones: cohesion[p].total }]),
  ),
  diputados: Object.fromEntries(
    diputados.map((d) => {
      const s = porDiputado.get(d.clave);
      return [d.id, { votaciones: s.total, presencia: pct(s.presentes, s.total), conPartido: pct(s.conPartido, s.comparables) }];
    }),
  ),
  clave,
  propuestas,
};
writeFileSync(new URL('votaciones.json', dataUrl), `${JSON.stringify(out)}\n`);
console.log(`${out.total} votaciones nominales, ${clave.length} clave, ${propuestas.length} propuestas (${out.desde} a ${out.hasta})`);
