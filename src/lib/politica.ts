// Rutas y utilidades del panel de Política en España.
import diputadosData from '../data/politica/diputados.json';
import votacionesData from '../data/politica/votaciones.json';
import { partidos, type Partido } from '../data/politica/partidos';

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

/** ¿Votó dividido? Más de una opción entre los presentes. */
export const dividido = (r: number[] | undefined) => !!r && [r[0], r[1], r[2]].filter((x) => x > 0).length > 1;

export const fecha = (iso: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) =>
  new Intl.DateTimeFormat('es-ES', { timeZone: 'UTC', ...opts }).format(new Date(`${iso}T00:00:00Z`));

/** «dd/mm/aaaa» del Congreso a «12 ago. 2023». */
export const fechaCongreso = (s: string) => {
  const [d, m, y] = s.split('/');
  return fecha(`${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`);
};

/** Título corto de una iniciativa: sin «Votación del dictamen del», «Proyecto de Ley» se queda. */
export const tituloCorto = (t: string) =>
  t
    .replace(/^Votaci[oó]n (del|de la|de) (nuevo )?(dictamen|conjunto)( del texto)?( del| de la)? /i, '')
    .replace(/^Votaci[oó]n de la enmienda a la totalidad de (devolución|texto alternativo) (al|a la) /i, '')
    .replace(/^Del Grupo Parlamentario [^,]+, /, '')
    .replace(/^Proposición de Ley del Grupo Parlamentario [^,]+, /, 'Proposición de Ley ')
    .replace(/\.$/, '')
    .replace(/^./, (c) => c.toUpperCase());

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
  const institucion = t.match(/(?:Del|de la|del) (Parlamento de [A-ZÁÉÍÓÚ][\wáéíóú]+(?: [A-ZÁÉÍÓÚ][\wáéíóú]+)?|Asamblea (?:Regional )?de [A-ZÁÉÍÓÚ][\wáéíóú]+)/);
  if (institucion) return { partidos: [], texto: institucion[1] };
  if (/Rufián Romero y otros/.test(t)) return { partidos: [], texto: 'Diputados de varios grupos' };
  return { partidos: [], texto: 'Iniciativa legislativa popular u otra' };
}
