// Diputados que elige cada provincia en las generales del 29 de noviembre de 2026,
// según el anexo del Real Decreto 806/2026 (BOE-A-2026-20742). Suman 350.
export const escanosFuente = {
  title: 'Real Decreto 806/2026, de convocatoria de elecciones (BOE)',
  url: 'https://www.boe.es/buscar/doc.php?id=BOE-A-2026-20742',
};

export const escanosPorProvincia: [provincia: string, diputados: number][] = [
  ['Madrid', 38], ['Barcelona', 32], ['Valencia', 16], ['Alicante', 12], ['Sevilla', 12],
  ['Málaga', 11], ['Murcia', 10], ['Baleares', 8], ['Bizkaia', 8], ['Cádiz', 8],
  ['A Coruña', 8], ['Las Palmas', 8], ['Asturias', 7], ['Granada', 7], ['Pontevedra', 7],
  ['S. C. de Tenerife', 7], ['Zaragoza', 7], ['Almería', 6], ['Córdoba', 6], ['Gipuzkoa', 6],
  ['Girona', 6], ['Tarragona', 6], ['Toledo', 6], ['Badajoz', 5], ['Cantabria', 5],
  ['Castellón', 5], ['Ciudad Real', 5], ['Huelva', 5], ['Jaén', 5], ['Navarra', 5],
  ['Valladolid', 5], ['Albacete', 4], ['Álava', 4], ['Burgos', 4], ['Cáceres', 4],
  ['León', 4], ['Lleida', 4], ['Lugo', 4], ['Ourense', 4], ['La Rioja', 4],
  ['Salamanca', 4], ['Ávila', 3], ['Cuenca', 3], ['Guadalajara', 3], ['Huesca', 3],
  ['Palencia', 3], ['Segovia', 3], ['Teruel', 3], ['Zamora', 3], ['Soria', 2],
  ['Ceuta', 1], ['Melilla', 1],
];
