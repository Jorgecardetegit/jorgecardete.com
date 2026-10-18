// Esquema interactivo de las instituciones: dónde va cada una en el lienzo (viewBox
// 1000×600, centro de la caja), qué contar de ella y con qué lecciones enlaza.
export interface Institucion {
  id: string;
  nombre: string;
  icono: string;
  etiqueta: string;
  x: number;
  y: number;
  color: string;
  resumen: string;
  hechos: string[];
  lecciones: string[];
}

export const instituciones: Institucion[] = [
  {
    id: 'partidos', nombre: 'Partidos', icono: '🤝', etiqueta: 'Hacen las listas', x: 160, y: 60, color: 'gold',
    resumen: 'Son el canal por el que se presenta casi todo el mundo a las elecciones. Deciden quién va en las listas y en qué orden.',
    hechos: ['Desde 2024, las listas al Congreso alternan mujer y hombre.', 'Se financian sobre todo con dinero público según votos y escaños.', 'Las donaciones de empresas están prohibidas desde 2015.'],
    lecciones: ['partidos', 'elecciones'],
  },
  {
    id: 'ciudadania', nombre: 'Ciudadanía', icono: '🗳️', etiqueta: 'Tú votas', x: 500, y: 60, color: 'gold',
    resumen: 'De aquí sale todo el poder. Votas a tus diputados y senadores, a tu parlamento autonómico, a tus concejales y a los eurodiputados.',
    hechos: ['No votas al presidente: lo elige el Congreso.', 'Cada provincia elige a sus propios diputados.', 'El voto en blanco cuenta como válido pero no va a nadie.'],
    lecciones: ['mapa', 'elecciones'],
  },
  {
    id: 'ue', nombre: 'Unión Europea', icono: '🇪🇺', etiqueta: '27 países', x: 840, y: 60, color: 'gold',
    resumen: 'Decide sobre la moneda, el comercio, la competencia y buena parte de la agricultura y el medio ambiente. En esas materias, sus normas están por encima de las españolas.',
    hechos: ['España es miembro desde 1986.', 'España elige 61 de los 720 eurodiputados.', 'Un reglamento se aplica tal cual; una directiva hay que incorporarla con una ley.'],
    lecciones: ['europa'],
  },
  {
    id: 'congreso', nombre: 'Congreso', icono: '🏛️', etiqueta: '350 diputados', x: 395, y: 205, color: 'green',
    resumen: 'La cámara principal. Elige al presidente del Gobierno, puede echarlo y tiene la última palabra sobre las leyes.',
    hechos: ['La mayoría absoluta son 176 diputados.', 'Desde 2011 ningún partido la tiene.', 'Convalida o deroga los decretos-ley en 30 días.'],
    lecciones: ['cortes', 'gobierno', 'leyes'],
  },
  {
    id: 'senado', nombre: 'Senado', icono: '🗂️', etiqueta: '266 senadores', x: 605, y: 205, color: 'green',
    resumen: 'La cámara territorial. Revisa las leyes, puede enmendarlas o vetarlas, pero el Congreso puede imponerse.',
    hechos: ['208 se votan en las urnas, con listas abiertas.', '58 los designan los parlamentos autonómicos.', 'Autoriza el artículo 155.'],
    lecciones: ['cortes', 'elecciones'],
  },
  {
    id: 'tc', nombre: 'Constitucional', icono: '📜', etiqueta: '12 magistrados', x: 130, y: 205, color: 'red',
    resumen: 'El guardián de la Constitución. Anula las leyes que van contra ella y protege los derechos fundamentales.',
    hechos: ['8 los eligen las Cortes, 2 el Gobierno y 2 el CGPJ.', 'Mandato de 9 años.', 'No forma parte del poder judicial.'],
    lecciones: ['justicia', 'constitucion'],
  },
  {
    id: 'rey', nombre: 'El Rey', icono: '👑', etiqueta: 'Jefe del Estado', x: 870, y: 205, color: 'purple',
    resumen: 'Representa al Estado y firma las leyes y los nombramientos, pero no decide: cada acto suyo lo refrenda el Gobierno o el Congreso.',
    hechos: ['Felipe VI reina desde 2014.', 'No puede negarse a firmar una ley.', 'Propone el candidato a presidente tras consultar a los partidos.'],
    lecciones: ['corona'],
  },
  {
    id: 'judicial', nombre: 'Jueces', icono: '⚖️', etiqueta: 'Poder judicial', x: 130, y: 360, color: 'terracotta',
    resumen: 'Aplican las leyes en cada caso concreto. Son independientes: ni el Gobierno ni las Cortes pueden darles órdenes.',
    hechos: ['Acceden a la carrera judicial por oposición.', 'El CGPJ, su órgano de gobierno, lo eligen las Cortes por 3/5.', 'El Tribunal Supremo es el más alto.'],
    lecciones: ['justicia'],
  },
  {
    id: 'gobierno', nombre: 'Gobierno', icono: '🏢', etiqueta: 'Presidente y ministros', x: 395, y: 360, color: 'purple',
    resumen: 'Gobierna, dirige la Administración, propone las leyes y los presupuestos. Depende de la confianza del Congreso.',
    hechos: ['Investidura: 176 votos, o mayoría simple en la segunda votación.', 'El presidente elige y cesa a los ministros.', 'Puede disolver las Cortes y convocar elecciones.'],
    lecciones: ['gobierno', 'presupuestos', 'leyes'],
  },
  {
    id: 'ccaa', nombre: 'Comunidades', icono: '🗺️', etiqueta: '17 autonomías', x: 605, y: 360, color: 'purple',
    resumen: 'Gestionan la sanidad, la educación, los servicios sociales y la vivienda, cada una con su parlamento y su gobierno.',
    hechos: ['Cada parlamento designa senadores.', 'País Vasco y Navarra recaudan sus propios impuestos.', 'El 155 se ha aplicado una vez, en 2017.'],
    lecciones: ['territorio'],
  },
  {
    id: 'control', nombre: 'Control', icono: '🔍', etiqueta: 'Vigilan al poder', x: 870, y: 360, color: 'red',
    resumen: 'Tribunal de Cuentas, Defensor del Pueblo, AIReF, Junta Electoral, CNMC... Revisan las cuentas, atienden quejas y vigilan las elecciones.',
    hechos: ['Muchos de sus miembros los eligen las Cortes por 3/5.', 'Puedes pedir información a cualquier administración.', 'Quejarte al Defensor del Pueblo es gratis.'],
    lecciones: ['control'],
  },
  {
    id: 'aytos', nombre: 'Ayuntamientos', icono: '🏘️', etiqueta: 'Más de 8.100', x: 605, y: 515, color: 'terracotta',
    resumen: 'El gobierno más cercano: calles, basura, agua, transporte urbano, licencias e IBI. Los concejales eligen al alcalde.',
    hechos: ['Municipales cada cuatro años en mayo: la próxima en 2027.', 'Si nadie tiene mayoría absoluta, gobierna la lista más votada.', 'Umbral del 5 % para tener concejales.'],
    lecciones: ['ayuntamientos'],
  },
];

// Conexiones: puntos del trazo (en ángulo recto) y una etiqueta en el punto indicado.
export interface Conexion { de: string; a: string; puntos: [number, number][]; etiqueta: string; en: [number, number] }

export const conexiones: Conexion[] = [
  { de: 'partidos', a: 'ciudadania', puntos: [[250, 60], [410, 60]], etiqueta: 'presentan listas', en: [330, 50] },
  { de: 'ciudadania', a: 'ue', puntos: [[590, 60], [750, 60]], etiqueta: 'vota eurodiputados', en: [670, 50] },
  { de: 'ciudadania', a: 'congreso', puntos: [[460, 92], [460, 120], [395, 120], [395, 173]], etiqueta: 'vota', en: [420, 112] },
  { de: 'ciudadania', a: 'senado', puntos: [[540, 92], [540, 120], [605, 120], [605, 173]], etiqueta: 'vota', en: [580, 112] },
  { de: 'ue', a: 'congreso', puntos: [[840, 92], [840, 140], [700, 140]], etiqueta: 'sus normas prevalecen', en: [770, 132] },
  { de: 'congreso', a: 'gobierno', puntos: [[395, 237], [395, 328]], etiqueta: 'inviste y controla', en: [400, 290] },
  { de: 'congreso', a: 'tc', puntos: [[305, 205], [220, 205]], etiqueta: 'eligen 8', en: [262, 196] },
  { de: 'senado', a: 'rey', puntos: [[695, 205], [780, 205]], etiqueta: 'firma leyes', en: [737, 196] },
  { de: 'congreso', a: 'judicial', puntos: [[330, 237], [330, 285], [130, 285], [130, 328]], etiqueta: 'eligen el CGPJ', en: [230, 277] },
  { de: 'ccaa', a: 'senado', puntos: [[605, 328], [605, 237]], etiqueta: 'designan 58', en: [612, 290] },
  { de: 'control', a: 'gobierno', puntos: [[870, 392], [870, 440], [440, 440], [440, 392]], etiqueta: 'vigilan', en: [760, 432] },
];
