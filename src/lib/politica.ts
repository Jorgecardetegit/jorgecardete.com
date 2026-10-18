// Rutas y utilidades del panel de Política en España.
import diputadosData from '../data/politica/diputados.json';
import votacionesData from '../data/politica/votaciones.json';
import { partidos, type Partido } from '../data/politica/partidos';
import { titulosLlanos } from '../data/politica/titulos-llanos';

const base = '/aprende/politica/';
export const partidoPath = (id: string) => `${base}partidos/${id}/`;
export const diputadoPath = (id: string) => `${base}diputados/${id}/`;

export type Diputado = (typeof diputadosData.diputados)[number];
export const diputados = diputadosData.diputados;
export const votaciones = votacionesData;
export type VotacionClave = (typeof votacionesData.clave)[number];
export type Propuesta = (typeof votacionesData.propuestas)[number];

export const partidoById = new Map<string, Partido>(partidos.map((p) => [p.id, p]));

/** Siglas de tres o cuatro letras para las casillas pequeñas de voto. */
export const siglasCortas: Record<string, string> = {
  pp: 'PP', psoe: 'PSOE', vox: 'Vox', sumar: 'SUM', erc: 'ERC', junts: 'JxC', bildu: 'EHB', pnv: 'PNV', podemos: 'POD', bng: 'BNG', cc: 'CC', upn: 'UPN', salf: 'SALF',
};

/** Diputados de cada partido al disolverse las Cortes. */
export const escanosActuales = (id: string) => diputados.filter((d) => d.partido === id).length;

export const tipos = {
  ley: { label: 'Ley', plural: 'Leyes (votación final)' },
  decreto: { label: 'Decreto-ley', plural: 'Decretos-ley del Gobierno' },
  totalidad: { label: 'Enmienda a la totalidad', plural: 'Enmiendas a la totalidad' },
  veto: { label: 'Veto del Senado', plural: 'Vetos del Senado' },
  propuesta: { label: 'Proposición de ley', plural: 'Propuestas de los grupos' },
} as const;
export type Tipo = keyof typeof tipos;

/** Qué significa «aprobada» o «rechazada» en cada tipo de votación. */
export function resultadoTexto(tipo: string, resultado: string) {
  const ok = resultado === 'aprobada';
  switch (tipo) {
    case 'decreto': return ok ? 'Convalidado' : 'Derogado';
    case 'totalidad': return ok ? 'Enmienda aprobada' : 'Enmienda rechazada';
    case 'veto': return ok ? 'Veto levantado' : 'Veto mantenido';
    case 'propuesta': return ok ? 'Admitida a trámite' : 'Rechazada';
    default: return ok ? 'Aprobada' : 'Rechazada';
  }
}

export const votoTexto: Record<string, string> = { S: 'Sí', N: 'No', A: 'Abstención', '-': 'No votó', '·': 'No era diputado' };

/** Posición mayoritaria de un partido en una votación: [sí, no, abstención, no vota]. */
export function posicion(recuento: number[] | undefined): 'S' | 'N' | 'A' | null {
  if (!recuento) return null;
  const [s, n, a] = recuento;
  const max = Math.max(s, n, a);
  if (max === 0) return null;
  return s === max ? 'S' : n === max ? 'N' : 'A';
}

type Recuentos = Record<string, number[]> | null;

/**
 * Afinidad y cohesión con un subconjunto de votaciones (las de un tema, las disputadas): en qué
 * porcentaje coincidió la posición mayoritaria de cada par de partidos y cuántas veces votó cada
 * uno sin división interna. Con menos de tres votaciones comparables, null.
 */
export function afinidadDe(votos: { partidos: unknown }[], orden: string[]) {
  const pct = (a: number, b: number) => (b ? Math.round((a / b) * 1000) / 10 : null);
  const pos = votos.map((v) => Object.fromEntries(orden.map((id) => [id, posicion((v.partidos as Recuentos)?.[id])])));
  return Object.fromEntries(
    orden.map((p) => {
      const afinidad: Record<string, number | null> = {};
      for (const q of orden) {
        if (q === p) continue;
        const comparables = pos.filter((x) => x[p] && x[q]);
        afinidad[q] = comparables.length >= 3 ? pct(comparables.filter((x) => x[p] === x[q]).length, comparables.length) : null;
      }
      const conVoto = votos.map((v) => (v.partidos as Recuentos)?.[p]).filter((r): r is number[] => !!r && r[0] + r[1] + r[2] > 0);
      const unanimes = conVoto.filter((r) => [r[0], r[1], r[2]].filter((n) => n > 0).length === 1).length;
      return [p, { afinidad, cohesion: conVoto.length >= 3 ? pct(unanimes, conVoto.length) : null }];
    }),
  );
}

/** Votaciones en que no todos los partidos votaron lo mismo: las que separan a unos de otros. */
export const disputada = (v: { partidos: unknown }, orden: string[]) =>
  new Set(orden.map((id) => posicion((v.partidos as Recuentos)?.[id])).filter(Boolean)).size > 1;

/** ¿Votó dividido? Más de una opción entre los presentes. */
export const dividido = (r: number[] | undefined) => !!r && [r[0], r[1], r[2]].filter((x) => x > 0).length > 1;

export const fecha = (iso: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) =>
  new Intl.DateTimeFormat('es-ES', { timeZone: 'UTC', ...opts }).format(new Date(`${iso}T00:00:00Z`));

/** «dd/mm/aaaa» del Congreso a «12 ago. 2023». */
export const fechaCongreso = (s: string) => {
  const [d, m, y] = s.split('/');
  return fecha(`${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`);
};

const meses = 'enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre';

/** Limpia un título oficial: sin trámite, proponente, número y fecha de la norma ni referencias legales. */
function limpiarTitulo(t: string): string {
  let s = t
    .replace(/^Votaci[oó]n (conjunta )?de (la|las) enmiendas? a la totalidad de (devolución|texto alternativo) (al|a la) /i, '')
    .replace(/^Votaci[oó]n (del|de la|de) (nuevo )?(dictamen|conjunto)( del texto)?( del| de la)? /i, '')
    .replace(/,? presentadas? por (el|los) Grupos? Parlamentarios? .*$/i, '')
    .replace(/^Proposición de Ley (del|de los) (Grupos? Parlamentarios?|Parlamento|Asamblea|Sr\.|Sra\.) [^,]+, /i, 'Proposición de Ley ')
    .replace(/^(Del|De los) (Grupos? Parlamentarios?|Parlamento|Asamblea|Sr\.|Sra\.) [^,]+, /i, '')
    .replace(/,? (por tramitarse|teniendo en cuenta|por tener la misma).*$/i, '')
    .replace(/ \((antes denominad[ao]|corresponde a)[^)]*\)/gi, '')
    .replace(/ \(Orgánica\)/gi, '')
    .replace(/\.$/, '')
    .replace(/^Real Decreto-ley \d+\/\d{4}, de \d+ de \w+, /i, '')
    .replace(/^(Proyecto|Proposición) de Ley( Orgánica)?( básica)?\s*/i, '')
    .replace(/^Proposición de reforma (del|de la|de los) /i, 'Reforma $1 ');
  // «por la que se modifica la Ley X, para Y» → «Y».
  const para = s.match(/^(?:por (?:la|el) que se (?:modifica|modifican|reforma)|de (?:modificación|reforma) de)\b.*?,? para (?:su |la |el )?(.+)$/i);
  if (para && para[1].length > 25) s = para[1];
  s = s
    .replace(/^por (el|la) que se (aprueban?|adoptan?|establecen?|regulan?|crean?|declaran?|prorrogan?|garantiza|amplía|autoriza)\s+/i, (_m, _a, v: string) =>
      /prorrog/i.test(v) ? 'Prórroga de ' : /amplía/i.test(v) ? 'Ampliar ' : /autoriza/i.test(v) ? 'Autorizar ' : /crean?/i.test(v) ? 'Crear ' : '')
    .replace(/^por (el|la) que se modifica(n)? (el|la|los|las) /i, 'Reforma de $3 ')
    .replace(/^Orgánica /, '')
    .replace(/^(relativa a|sobre|de|para|del) (la |el |los |las )?/i, '')
    .replace(/^Reforma de el /, 'Reforma del ')
    .replace(new RegExp(`, de \\d+ de (${meses})( de \\d{4})?,?`, 'gi'), '')
    .replace(/\s+/g, ' ')
    .trim();
  return s.replace(/^./, (c) => c.toUpperCase());
}

/**
 * Titular llano de una votación: el escrito a mano en titulos-llanos.ts si lo hay; si no, el título
 * oficial limpio. El título oficial completo se sigue mostrando al desplegar.
 */
export const tituloCorto = (v: { id?: string; titulo: string }) => (v.id && titulosLlanos[v.id]) || limpiarTitulo(v.titulo);

export { partidos };

// Grupo parlamentario → partido, para saber quién presenta cada proposición de ley.
const grupoPartido: Record<string, string> = {
  'Popular en el Congreso': 'pp', Socialista: 'psoe', VOX: 'vox', 'Plurinacional SUMAR': 'sumar', Republicano: 'erc',
  'Junts per Catalunya': 'junts', 'Euskal Herria Bildu': 'bildu', 'Vasco (EAJ-PNV)': 'pnv', Mixto: 'mixto',
};

/**
 * Quién presenta una proposición: grupos parlamentarios (como partidos), un parlamento autonómico
 * o una iniciativa popular. El Grupo Mixto no dice qué diputado firma, así que queda como «mixto».
 */
export function proponentes(p: { titulo: string; proponente?: string | null }): { partidos: string[]; texto: string } {
  const t = p.titulo.replace(/\s+/g, ' ');
  // La lista de grupos acaba en la coma que da paso al objeto de la ley («, para...», «, de...»).
  const varios = t.match(/de los Grupos Parlamentarios (.+?), (?=(?:para|de|del|por|sobre|relativa|relativo|Orgánica|en|que|con)\b)/);
  const uno = t.match(/(?:del|el) Grupo Parlamentario (Popular en el Congreso|Socialista|VOX|Plurinacional SUMAR|Republicano|Junts per Catalunya|Euskal Herria Bildu|Vasco \(EAJ-PNV\)|Mixto)/);
  let grupos: string[] = [];
  if (varios) grupos = varios[1].split(/, | y /).map((g) => g.trim());
  else if (uno) grupos = [uno[1]];
  else if (p.proponente && grupoPartido[p.proponente]) grupos = [p.proponente];
  const ids = grupos.map((g) => grupoPartido[g]).filter(Boolean);
  if (ids.length) {
    const nombres = ids.map((id) => (id === 'mixto' ? 'Grupo Mixto' : partidoById.get(id)?.siglas ?? id));
    return { partidos: ids, texto: nombres.join(', ') };
  }
  const institucion = t.match(/(?:Del|de la|del) (Parlamento de \p{Lu}\p{L}+(?: \p{Lu}\p{L}+)?|Asamblea (?:Regional )?de \p{Lu}\p{L}+)/u);
  if (institucion) return { partidos: [], texto: institucion[1] };
  if (/Rufián Romero y otros/.test(t)) return { partidos: [], texto: 'Diputados de varios grupos' };
  return { partidos: [], texto: 'Iniciativa legislativa popular u otra' };
}
