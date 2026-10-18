// Temas para comparar partidos. Las votaciones se asignan a cada tema con palabras clave sobre
// su título (sin acentos, en minúsculas): una regla fija, no una selección a mano. Una votación
// puede ser de varios temas y otras no encajan en ninguno (siguen en la pestaña Votaciones).
//
// `propuestas` se rellenará con los programas del 29-N, todos a la vez cuando estén publicados,
// para no comparar a unos partidos con su programa nuevo y a otros sin él.
export interface Tema {
  id: string;
  nombre: string;
  icono: string;
  patron: string;
  /** Quién decide de verdad sobre esto: qué parte depende del Congreso. */
  quienDecide: string;
  lecciones: { texto: string; slug: string }[];
  propuestas: Record<string, { texto: string; fuente: string }>;
}

export const temas: Tema[] = [
  {
    id: 'vivienda', nombre: 'Vivienda', icono: '🏠',
    patron: 'vivienda|alquiler|arrendamiento|desahucio|hipotec|inquilin',
    quienDecide: 'Es competencia de las comunidades (vivienda protegida, ayudas) y los ayuntamientos (suelo y urbanismo). El Estado regula los contratos de alquiler, los impuestos y una ley básica.',
    lecciones: [{ texto: 'Quién se encarga de qué', slug: 'territorio' }], propuestas: {},
  },
  {
    id: 'pensiones', nombre: 'Pensiones', icono: '👵',
    patron: 'pension|jubilacion|seguridad social|cotizacion',
    quienDecide: 'Casi todo es del Estado: la Seguridad Social, la cuantía y la revalorización de las pensiones se deciden en el Congreso.',
    lecciones: [{ texto: 'Los presupuestos', slug: 'presupuestos' }], propuestas: {},
  },
  {
    id: 'trabajo', nombre: 'Trabajo y salarios', icono: '💼',
    patron: 'laboral|trabajador|jornada|empleo|salario|desempleo|subsidio|autonomos|despido|convenio|retribucion',
    quienDecide: 'Las leyes laborales, el salario mínimo y el paro son del Estado. Las oficinas de empleo y la formación, de las comunidades.',
    lecciones: [{ texto: 'Quién se encarga de qué', slug: 'territorio' }], propuestas: {},
  },
  {
    id: 'economia', nombre: 'Impuestos y economía', icono: '💶',
    patron: 'impuesto|tributar|fiscal|gravamen|presupuest|deuda|estabilidad presupuestaria|financiacion autonomica|banca|arancel|credito|cliente|consumidor|economia social',
    quienDecide: 'El Estado regula los grandes impuestos (IRPF, IVA, Sociedades), pero parte se cede a las comunidades, que también fijan Sucesiones y Patrimonio. Las reglas de déficit vienen de la UE.',
    lecciones: [{ texto: 'Los presupuestos', slug: 'presupuestos' }, { texto: 'España en la UE', slug: 'europa' }], propuestas: {},
  },
  {
    id: 'inmigracion', nombre: 'Inmigración', icono: '🧳',
    patron: 'extranjer|migra|asilo|regularizacion|frontera|refugiad|nacionalidad',
    quienDecide: 'La ley de extranjería, el asilo y las fronteras son del Estado, dentro de las normas europeas. La acogida de menores la gestionan las comunidades.',
    lecciones: [{ texto: 'España en la UE', slug: 'europa' }], propuestas: {},
  },
  {
    id: 'territorio', nombre: 'Cataluña y modelo territorial', icono: '🗺️',
    patron: 'amnistia|cataluna|catalan|estatuto de autonomia|plurilingu|lengua|cooficial|transferencia|autopista|concierto|cupo|unidad de espana',
    quienDecide: 'Se decide en el Congreso, pero muchos cambios exigen leyes orgánicas (176 votos) o reformar la Constitución (3/5 o 2/3 de las cámaras).',
    lecciones: [{ texto: 'Las comunidades autónomas', slug: 'territorio' }, { texto: 'La Constitución', slug: 'constitucion' }], propuestas: {},
  },
  {
    id: 'instituciones', nombre: 'Justicia e instituciones', icono: '⚖️',
    patron: 'poder judicial|fiscal general|ministerio fiscal|codigo penal|enjuiciamiento|tribunal|corrupcion|transparencia|reglamento del congreso|derecho de defensa|servicio publico de justicia|regimen electoral|constitucion|grupos de interes|radio y television',
    quienDecide: 'Del Estado. Las reglas de los jueces y la Fiscalía y el sistema electoral exigen ley orgánica, con mayoría absoluta.',
    lecciones: [{ texto: 'La justicia', slug: 'justicia' }, { texto: 'Cómo se hace una ley', slug: 'leyes' }], propuestas: {},
  },
  {
    id: 'igualdad', nombre: 'Igualdad y derechos', icono: '🟰',
    patron: 'igualdad|mujer|violencia|paridad|paritaria|lgtb|discapacidad|eutanasia|aborto|libertad sexual|vicaria|infancia|menores|accesibilidad',
    quienDecide: 'Los derechos fundamentales se regulan por ley orgánica del Estado. Muchos servicios (atención a víctimas, discapacidad) los prestan las comunidades.',
    lecciones: [{ texto: 'La Constitución', slug: 'constitucion' }], propuestas: {},
  },
  {
    id: 'medioambiente', nombre: 'Energía, transporte y medio ambiente', icono: '🌱',
    patron: 'energ|clima|incendio|forestal|agua|sequia|dana|emision|movilidad|residuo|desperdicio|electric|nuclear|ambiental|transporte|ferroviari|lobo|navegacion',
    quienDecide: 'Compartido: gran parte de las normas vienen de la UE, el Estado fija las bases y lleva trenes y aeropuertos, y las comunidades gestionan espacios naturales y transporte interurbano.',
    lecciones: [{ texto: 'Quién se encarga de qué', slug: 'territorio' }, { texto: 'España en la UE', slug: 'europa' }], propuestas: {},
  },
  {
    id: 'sanidad', nombre: 'Sanidad y servicios sociales', icono: '🏥',
    patron: 'sanidad|sanitari|salud|medicamento|dependencia|servicios sociales|enfermer|cribado|\\bela\\b|esclerosis|hospital|farmac|donante|cuidados',
    quienDecide: 'La sanidad y la dependencia las gestionan las comunidades. El Estado fija lo básico común y autoriza los medicamentos.',
    lecciones: [{ texto: 'Quién se encarga de qué', slug: 'territorio' }], propuestas: {},
  },
  {
    id: 'educacion', nombre: 'Educación y cultura', icono: '🎓',
    patron: 'educacion|ensenanza|universidad|cine|cultura|becas|escuela|formacion profesional|artisticas|derechos de autor|patrimonio',
    quienDecide: 'Las comunidades gestionan colegios, institutos y universidades. El Estado fija los títulos y las enseñanzas mínimas.',
    lecciones: [{ texto: 'Quién se encarga de qué', slug: 'territorio' }], propuestas: {},
  },
  {
    id: 'exterior', nombre: 'Defensa y política exterior', icono: '🌍',
    patron: 'defensa nacional|militar|armas|otan|ucrania|palestina|israel|embargo|fuerzas armadas|material de defensa|guerra|oriente|ratificacion|sahara|saharaui',
    quienDecide: 'Exclusiva del Estado. Los tratados internacionales importantes necesitan autorización de las Cortes.',
    lecciones: [{ texto: 'España en la UE', slug: 'europa' }], propuestas: {},
  },
  {
    id: 'memoria', nombre: 'Memoria y terrorismo', icono: '🕯️',
    patron: 'memoria democratica|eta\\b|terroris|victimas del terror',
    quienDecide: 'Del Estado: la ley de memoria democrática y la de víctimas del terrorismo se aprueban en las Cortes.',
    lecciones: [{ texto: 'Cómo se hace una ley', slug: 'leyes' }], propuestas: {},
  },
];

const normalizar = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

/** Temas de una votación según su título y detalle. */
export function temasDe(texto: string): string[] {
  const t = normalizar(texto);
  return temas.filter((tema) => new RegExp(tema.patron).test(t)).map((tema) => tema.id);
}
