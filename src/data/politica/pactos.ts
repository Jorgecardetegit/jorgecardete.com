// Qué ha dicho cada partido sobre a quién apoyaría tras el 29-N. Solo declaraciones públicas con
// fecha y fuente, contadas con sus palabras cuando las hay; nada deducido de lo que «se espera».
// Un partido sin declaración clara va en `sinDeclaracion` en vez de suponerle una postura.
// Se revisa en cada actualización: cambia rápido durante la campaña.
export const revisadoPactos = '2026-10-18';

export interface Declaracion {
  partido: string;
  quien: string;
  fecha: string;
  /** Lo dicho, en una o dos frases y sin interpretar. */
  texto: string;
  cita?: string;
  fuente: { titulo: string; url: string };
}

export const declaraciones: Declaracion[] = [
  {
    partido: 'pp', quien: 'Alberto Núñez Feijóo', fecha: '2026-10-18',
    texto: 'No descarta gobernar con Vox y rechaza fijar líneas rojas antes de votar: las detallará después si le toca formar gobierno. Cualquier acuerdo, dice, se ajustará al documento marco que el PP usa para pactar con Vox en las comunidades.',
    cita: 'Ni cordón umbilical ni cordón sanitario.',
    fuente: { titulo: 'Entrevista en El Periódico, recogida por CatalunyaPress', url: 'https://www.catalunyapress.es/articulo/politica-nacional/2026-10-18/6055998-feijoo-abre-puerta-gobernar-vox-fija-prioridades-catalunya' },
  },
  {
    partido: 'vox', quien: 'Santiago Abascal', fecha: '2026-10-18',
    texto: 'Dice que se presenta para presidir el Gobierno, no para una vicepresidencia, y deja la fórmula de un pacto con el PP para después del 29-N. Pone tres condiciones para cualquier acuerdo: «prioridad nacional», «remigración» y desregulación con rebajas de impuestos.',
    fuente: { titulo: 'Entrevista en La Razón, recogida por Demócrata', url: 'https://www.democrata.es/elecciones-generales-espana/abascal-advierte-elecciones-29n-no-seran-limpias-fija-tres-condiciones-pactar-con-feijoo/' },
  },
  {
    partido: 'junts', quien: 'Jordi Turull y Míriam Nogueras', fecha: '2026-10-07',
    texto: 'Turull descarta volver a investir a Sánchez porque, según Junts, no cumplió el pacto de 2023. Nogueras descarta «absolutamente» pactar con un gobierno de PP y Vox.',
    cita: 'A Pedro Sánchez no le investiremos. Hemos salido escarmentados.',
    fuente: { titulo: 'Qué!', url: 'https://www.que.es/2026/10/07/junts-investidura-sanchez-29n/' },
  },
  {
    partido: 'pnv', quien: 'Aitor Esteban', fecha: '2026-10-18',
    texto: 'Descarta repetir la legislatura con el PSOE tal como ha sido («o sería en otras condiciones y de otra manera») y dice que no quiere un gobierno de PP y Vox. Recuerda que el PNV votó no a la investidura de Feijóo en 2023 porque dependía de Vox.',
    cita: 'No querría, me preocupa.',
    fuente: { titulo: 'Demócrata (agencias)', url: 'https://www.democrata.es/en/politics/the-pnv-sees-it-as-unfeasible-to-repeat-a-very-complicated-legislature-and-believes-that-not-even-the-psoe-is-interested-without-other-conditions/' },
  },
];

/** Partidos de los que no hemos encontrado una declaración clara sobre a quién apoyarían. */
export const sinDeclaracion = ['psoe', 'sumar', 'erc', 'bildu', 'podemos', 'bng', 'cc', 'upn', 'salf'];
