import { escanosPorProvincia } from './escanos';

// Las 52 circunscripciones como mosaico: cada provincia es una casilla colocada más o
// menos donde está en el mapa (columna, fila). Canarias, Ceuta y Melilla van abajo.
// Senadores: 4 por provincia peninsular; en islas, Ceuta y Melilla, los de la LOREG (art. 165).
interface Casilla { nombre: string; abbr: string; col: number; fila: number; ccaa: string; senadores: number }

const casillas: Casilla[] = [
  { nombre: 'A Coruña', abbr: 'ACO', col: 0, fila: 0, ccaa: 'Galicia', senadores: 4 },
  { nombre: 'Lugo', abbr: 'LUG', col: 1, fila: 0, ccaa: 'Galicia', senadores: 4 },
  { nombre: 'Asturias', abbr: 'AST', col: 2, fila: 0, ccaa: 'Asturias', senadores: 4 },
  { nombre: 'Cantabria', abbr: 'CAN', col: 3, fila: 0, ccaa: 'Cantabria', senadores: 4 },
  { nombre: 'Bizkaia', abbr: 'BIZ', col: 4, fila: 0, ccaa: 'País Vasco', senadores: 4 },
  { nombre: 'Gipuzkoa', abbr: 'GIP', col: 5, fila: 0, ccaa: 'País Vasco', senadores: 4 },
  { nombre: 'Pontevedra', abbr: 'PON', col: 0, fila: 1, ccaa: 'Galicia', senadores: 4 },
  { nombre: 'Ourense', abbr: 'OUR', col: 1, fila: 1, ccaa: 'Galicia', senadores: 4 },
  { nombre: 'León', abbr: 'LEÓ', col: 2, fila: 1, ccaa: 'Castilla y León', senadores: 4 },
  { nombre: 'Palencia', abbr: 'PAL', col: 3, fila: 1, ccaa: 'Castilla y León', senadores: 4 },
  { nombre: 'Burgos', abbr: 'BUR', col: 4, fila: 1, ccaa: 'Castilla y León', senadores: 4 },
  { nombre: 'Álava', abbr: 'ÁLA', col: 5, fila: 1, ccaa: 'País Vasco', senadores: 4 },
  { nombre: 'Navarra', abbr: 'NAV', col: 6, fila: 1, ccaa: 'Navarra', senadores: 4 },
  { nombre: 'Huesca', abbr: 'HUE', col: 7, fila: 1, ccaa: 'Aragón', senadores: 4 },
  { nombre: 'Lleida', abbr: 'LLE', col: 8, fila: 1, ccaa: 'Cataluña', senadores: 4 },
  { nombre: 'Girona', abbr: 'GIR', col: 9, fila: 1, ccaa: 'Cataluña', senadores: 4 },
  { nombre: 'Zamora', abbr: 'ZAM', col: 1, fila: 2, ccaa: 'Castilla y León', senadores: 4 },
  { nombre: 'Valladolid', abbr: 'VLL', col: 2, fila: 2, ccaa: 'Castilla y León', senadores: 4 },
  { nombre: 'Segovia', abbr: 'SEG', col: 3, fila: 2, ccaa: 'Castilla y León', senadores: 4 },
  { nombre: 'Soria', abbr: 'SOR', col: 4, fila: 2, ccaa: 'Castilla y León', senadores: 4 },
  { nombre: 'La Rioja', abbr: 'RIO', col: 5, fila: 2, ccaa: 'La Rioja', senadores: 4 },
  { nombre: 'Zaragoza', abbr: 'ZAR', col: 6, fila: 2, ccaa: 'Aragón', senadores: 4 },
  { nombre: 'Tarragona', abbr: 'TAR', col: 8, fila: 2, ccaa: 'Cataluña', senadores: 4 },
  { nombre: 'Barcelona', abbr: 'BCN', col: 9, fila: 2, ccaa: 'Cataluña', senadores: 4 },
  { nombre: 'Salamanca', abbr: 'SAL', col: 1, fila: 3, ccaa: 'Castilla y León', senadores: 4 },
  { nombre: 'Ávila', abbr: 'ÁVI', col: 2, fila: 3, ccaa: 'Castilla y León', senadores: 4 },
  { nombre: 'Madrid', abbr: 'MAD', col: 3, fila: 3, ccaa: 'Comunidad de Madrid', senadores: 4 },
  { nombre: 'Guadalajara', abbr: 'GUA', col: 4, fila: 3, ccaa: 'Castilla-La Mancha', senadores: 4 },
  { nombre: 'Teruel', abbr: 'TER', col: 6, fila: 3, ccaa: 'Aragón', senadores: 4 },
  { nombre: 'Castellón', abbr: 'CAS', col: 7, fila: 3, ccaa: 'Comunidad Valenciana', senadores: 4 },
  { nombre: 'Baleares', abbr: 'BAL', col: 9, fila: 4, ccaa: 'Illes Balears', senadores: 5 },
  { nombre: 'Cáceres', abbr: 'CÁC', col: 1, fila: 4, ccaa: 'Extremadura', senadores: 4 },
  { nombre: 'Toledo', abbr: 'TOL', col: 2, fila: 4, ccaa: 'Castilla-La Mancha', senadores: 4 },
  { nombre: 'Cuenca', abbr: 'CUE', col: 4, fila: 4, ccaa: 'Castilla-La Mancha', senadores: 4 },
  { nombre: 'Valencia', abbr: 'VAL', col: 6, fila: 4, ccaa: 'Comunidad Valenciana', senadores: 4 },
  { nombre: 'Badajoz', abbr: 'BAD', col: 1, fila: 5, ccaa: 'Extremadura', senadores: 4 },
  { nombre: 'Ciudad Real', abbr: 'CRE', col: 2, fila: 5, ccaa: 'Castilla-La Mancha', senadores: 4 },
  { nombre: 'Albacete', abbr: 'ALB', col: 4, fila: 5, ccaa: 'Castilla-La Mancha', senadores: 4 },
  { nombre: 'Murcia', abbr: 'MUR', col: 5, fila: 5, ccaa: 'Región de Murcia', senadores: 4 },
  { nombre: 'Alicante', abbr: 'ALI', col: 6, fila: 5, ccaa: 'Comunidad Valenciana', senadores: 4 },
  { nombre: 'Huelva', abbr: 'HUV', col: 0, fila: 6, ccaa: 'Andalucía', senadores: 4 },
  { nombre: 'Sevilla', abbr: 'SEV', col: 1, fila: 6, ccaa: 'Andalucía', senadores: 4 },
  { nombre: 'Córdoba', abbr: 'CÓR', col: 2, fila: 6, ccaa: 'Andalucía', senadores: 4 },
  { nombre: 'Jaén', abbr: 'JAÉ', col: 3, fila: 6, ccaa: 'Andalucía', senadores: 4 },
  { nombre: 'Granada', abbr: 'GRA', col: 4, fila: 6, ccaa: 'Andalucía', senadores: 4 },
  { nombre: 'Almería', abbr: 'ALM', col: 5, fila: 6, ccaa: 'Andalucía', senadores: 4 },
  { nombre: 'Cádiz', abbr: 'CÁD', col: 1, fila: 7, ccaa: 'Andalucía', senadores: 4 },
  { nombre: 'Málaga', abbr: 'MÁL', col: 2, fila: 7, ccaa: 'Andalucía', senadores: 4 },
  { nombre: 'Ceuta', abbr: 'CEU', col: 1, fila: 8, ccaa: 'Ciudad autónoma', senadores: 2 },
  { nombre: 'Melilla', abbr: 'MEL', col: 3, fila: 8, ccaa: 'Ciudad autónoma', senadores: 2 },
  { nombre: 'S. C. de Tenerife', abbr: 'TFE', col: 6, fila: 8, ccaa: 'Canarias', senadores: 6 },
  { nombre: 'Las Palmas', abbr: 'LPA', col: 7, fila: 8, ccaa: 'Canarias', senadores: 5 },
];

const diputados = new Map(escanosPorProvincia);

export const provincias = casillas.map((c) => {
  const n = diputados.get(c.nombre);
  if (n === undefined) throw new Error(`Sin escaños para ${c.nombre}`);
  return { ...c, diputados: n };
});

export type Provincia = (typeof provincias)[number];
