import { escanosPorProvincia } from './escanos';

// Las 52 circunscripciones como mosaico: cada provincia es una casilla colocada más o
// menos donde está en el mapa (columna, fila). Canarias, Ceuta y Melilla van abajo.
// Senadores: 4 por provincia peninsular; en islas, Ceuta y Melilla, los de la LOREG (art. 165).
// `ine` es el código de provincia del INE (el del mapa) y `congreso`, cómo la escribe el Congreso.
interface Casilla { nombre: string; abbr: string; col: number; fila: number; ccaa: string; senadores: number; ine: string; congreso: string }

const casillas: Casilla[] = [
  { nombre: 'A Coruña', abbr: 'ACO', col: 0, fila: 0, ccaa: 'Galicia', senadores: 4, ine: '15', congreso: 'Coruña (A)' },
  { nombre: 'Lugo', abbr: 'LUG', col: 1, fila: 0, ccaa: 'Galicia', senadores: 4, ine: '27', congreso: 'Lugo' },
  { nombre: 'Asturias', abbr: 'AST', col: 2, fila: 0, ccaa: 'Asturias', senadores: 4, ine: '33', congreso: 'Asturias' },
  { nombre: 'Cantabria', abbr: 'CAN', col: 3, fila: 0, ccaa: 'Cantabria', senadores: 4, ine: '39', congreso: 'Cantabria' },
  { nombre: 'Bizkaia', abbr: 'BIZ', col: 4, fila: 0, ccaa: 'País Vasco', senadores: 4, ine: '48', congreso: 'Bizkaia' },
  { nombre: 'Gipuzkoa', abbr: 'GIP', col: 5, fila: 0, ccaa: 'País Vasco', senadores: 4, ine: '20', congreso: 'Gipuzkoa' },
  { nombre: 'Pontevedra', abbr: 'PON', col: 0, fila: 1, ccaa: 'Galicia', senadores: 4, ine: '36', congreso: 'Pontevedra' },
  { nombre: 'Ourense', abbr: 'OUR', col: 1, fila: 1, ccaa: 'Galicia', senadores: 4, ine: '32', congreso: 'Ourense' },
  { nombre: 'León', abbr: 'LEÓ', col: 2, fila: 1, ccaa: 'Castilla y León', senadores: 4, ine: '24', congreso: 'León' },
  { nombre: 'Palencia', abbr: 'PAL', col: 3, fila: 1, ccaa: 'Castilla y León', senadores: 4, ine: '34', congreso: 'Palencia' },
  { nombre: 'Burgos', abbr: 'BUR', col: 4, fila: 1, ccaa: 'Castilla y León', senadores: 4, ine: '09', congreso: 'Burgos' },
  { nombre: 'Álava', abbr: 'ÁLA', col: 5, fila: 1, ccaa: 'País Vasco', senadores: 4, ine: '01', congreso: 'Araba/Álava' },
  { nombre: 'Navarra', abbr: 'NAV', col: 6, fila: 1, ccaa: 'Navarra', senadores: 4, ine: '31', congreso: 'Navarra' },
  { nombre: 'Huesca', abbr: 'HUE', col: 7, fila: 1, ccaa: 'Aragón', senadores: 4, ine: '22', congreso: 'Huesca' },
  { nombre: 'Lleida', abbr: 'LLE', col: 8, fila: 1, ccaa: 'Cataluña', senadores: 4, ine: '25', congreso: 'Lleida' },
  { nombre: 'Girona', abbr: 'GIR', col: 9, fila: 1, ccaa: 'Cataluña', senadores: 4, ine: '17', congreso: 'Girona' },
  { nombre: 'Zamora', abbr: 'ZAM', col: 1, fila: 2, ccaa: 'Castilla y León', senadores: 4, ine: '49', congreso: 'Zamora' },
  { nombre: 'Valladolid', abbr: 'VLL', col: 2, fila: 2, ccaa: 'Castilla y León', senadores: 4, ine: '47', congreso: 'Valladolid' },
  { nombre: 'Segovia', abbr: 'SEG', col: 3, fila: 2, ccaa: 'Castilla y León', senadores: 4, ine: '40', congreso: 'Segovia' },
  { nombre: 'Soria', abbr: 'SOR', col: 4, fila: 2, ccaa: 'Castilla y León', senadores: 4, ine: '42', congreso: 'Soria' },
  { nombre: 'La Rioja', abbr: 'RIO', col: 5, fila: 2, ccaa: 'La Rioja', senadores: 4, ine: '26', congreso: 'Rioja (La)' },
  { nombre: 'Zaragoza', abbr: 'ZAR', col: 6, fila: 2, ccaa: 'Aragón', senadores: 4, ine: '50', congreso: 'Zaragoza' },
  { nombre: 'Tarragona', abbr: 'TAR', col: 8, fila: 2, ccaa: 'Cataluña', senadores: 4, ine: '43', congreso: 'Tarragona' },
  { nombre: 'Barcelona', abbr: 'BCN', col: 9, fila: 2, ccaa: 'Cataluña', senadores: 4, ine: '08', congreso: 'Barcelona' },
  { nombre: 'Salamanca', abbr: 'SAL', col: 1, fila: 3, ccaa: 'Castilla y León', senadores: 4, ine: '37', congreso: 'Salamanca' },
  { nombre: 'Ávila', abbr: 'ÁVI', col: 2, fila: 3, ccaa: 'Castilla y León', senadores: 4, ine: '05', congreso: 'Ávila' },
  { nombre: 'Madrid', abbr: 'MAD', col: 3, fila: 3, ccaa: 'Comunidad de Madrid', senadores: 4, ine: '28', congreso: 'Madrid' },
  { nombre: 'Guadalajara', abbr: 'GUA', col: 4, fila: 3, ccaa: 'Castilla-La Mancha', senadores: 4, ine: '19', congreso: 'Guadalajara' },
  { nombre: 'Teruel', abbr: 'TER', col: 6, fila: 3, ccaa: 'Aragón', senadores: 4, ine: '44', congreso: 'Teruel' },
  { nombre: 'Castellón', abbr: 'CAS', col: 7, fila: 3, ccaa: 'Comunidad Valenciana', senadores: 4, ine: '12', congreso: 'Castellón/Castelló' },
  { nombre: 'Baleares', abbr: 'BAL', col: 9, fila: 4, ccaa: 'Illes Balears', senadores: 5, ine: '07', congreso: 'Balears (Illes)' },
  { nombre: 'Cáceres', abbr: 'CÁC', col: 1, fila: 4, ccaa: 'Extremadura', senadores: 4, ine: '10', congreso: 'Cáceres' },
  { nombre: 'Toledo', abbr: 'TOL', col: 2, fila: 4, ccaa: 'Castilla-La Mancha', senadores: 4, ine: '45', congreso: 'Toledo' },
  { nombre: 'Cuenca', abbr: 'CUE', col: 4, fila: 4, ccaa: 'Castilla-La Mancha', senadores: 4, ine: '16', congreso: 'Cuenca' },
  { nombre: 'Valencia', abbr: 'VAL', col: 6, fila: 4, ccaa: 'Comunidad Valenciana', senadores: 4, ine: '46', congreso: 'Valencia/València' },
  { nombre: 'Badajoz', abbr: 'BAD', col: 1, fila: 5, ccaa: 'Extremadura', senadores: 4, ine: '06', congreso: 'Badajoz' },
  { nombre: 'Ciudad Real', abbr: 'CRE', col: 2, fila: 5, ccaa: 'Castilla-La Mancha', senadores: 4, ine: '13', congreso: 'Ciudad Real' },
  { nombre: 'Albacete', abbr: 'ALB', col: 4, fila: 5, ccaa: 'Castilla-La Mancha', senadores: 4, ine: '02', congreso: 'Albacete' },
  { nombre: 'Murcia', abbr: 'MUR', col: 5, fila: 5, ccaa: 'Región de Murcia', senadores: 4, ine: '30', congreso: 'Murcia' },
  { nombre: 'Alicante', abbr: 'ALI', col: 6, fila: 5, ccaa: 'Comunidad Valenciana', senadores: 4, ine: '03', congreso: 'Alicante/Alacant' },
  { nombre: 'Huelva', abbr: 'HUV', col: 0, fila: 6, ccaa: 'Andalucía', senadores: 4, ine: '21', congreso: 'Huelva' },
  { nombre: 'Sevilla', abbr: 'SEV', col: 1, fila: 6, ccaa: 'Andalucía', senadores: 4, ine: '41', congreso: 'Sevilla' },
  { nombre: 'Córdoba', abbr: 'CÓR', col: 2, fila: 6, ccaa: 'Andalucía', senadores: 4, ine: '14', congreso: 'Córdoba' },
  { nombre: 'Jaén', abbr: 'JAÉ', col: 3, fila: 6, ccaa: 'Andalucía', senadores: 4, ine: '23', congreso: 'Jaén' },
  { nombre: 'Granada', abbr: 'GRA', col: 4, fila: 6, ccaa: 'Andalucía', senadores: 4, ine: '18', congreso: 'Granada' },
  { nombre: 'Almería', abbr: 'ALM', col: 5, fila: 6, ccaa: 'Andalucía', senadores: 4, ine: '04', congreso: 'Almería' },
  { nombre: 'Cádiz', abbr: 'CÁD', col: 1, fila: 7, ccaa: 'Andalucía', senadores: 4, ine: '11', congreso: 'Cádiz' },
  { nombre: 'Málaga', abbr: 'MÁL', col: 2, fila: 7, ccaa: 'Andalucía', senadores: 4, ine: '29', congreso: 'Málaga' },
  { nombre: 'Ceuta', abbr: 'CEU', col: 1, fila: 8, ccaa: 'Ciudad autónoma', senadores: 2, ine: '51', congreso: 'Ceuta' },
  { nombre: 'Melilla', abbr: 'MEL', col: 3, fila: 8, ccaa: 'Ciudad autónoma', senadores: 2, ine: '52', congreso: 'Melilla' },
  { nombre: 'S. C. de Tenerife', abbr: 'TFE', col: 6, fila: 8, ccaa: 'Canarias', senadores: 6, ine: '38', congreso: 'S/C Tenerife' },
  { nombre: 'Las Palmas', abbr: 'LPA', col: 7, fila: 8, ccaa: 'Canarias', senadores: 5, ine: '35', congreso: 'Palmas (Las)' },
];

const diputados = new Map(escanosPorProvincia);

export const provincias = casillas.map((c) => {
  const n = diputados.get(c.nombre);
  if (n === undefined) throw new Error(`Sin escaños para ${c.nombre}`);
  return { ...c, diputados: n };
});

export type Provincia = (typeof provincias)[number];
