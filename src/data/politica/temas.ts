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
  /** Qué abarca el tema y en qué se diferencian los partidos, en una o dos frases y sin tomar partido. */
  descripcion: string;
  patron: string;
  /** Quién decide de verdad sobre esto: qué parte depende del Congreso. */
  quienDecide: string;
  lecciones: { texto: string; slug: string }[];
  propuestas: Record<string, { texto: string; fuente: string }>;
}

export const temas: Tema[] = [
  {
    id: 'vivienda', nombre: 'Vivienda', icono: '🏠',
    descripcion: 'Alquiler, compra y vivienda pública. El debate es sobre todo si limitar los precios del alquiler y obligar a los grandes propietarios, o dar más seguridad jurídica y suelo para que se construya más.',
    patron: 'vivienda|alquiler|arrendamiento|desahucio|hipotec|inquilin',
    quienDecide: 'Es competencia de las comunidades (vivienda protegida, ayudas) y los ayuntamientos (suelo y urbanismo). El Estado regula los contratos de alquiler, los impuestos y una ley básica.',
    lecciones: [{ texto: 'Quién se encarga de qué', slug: 'territorio' }], propuestas: {},
  },
  {
    id: 'pensiones', nombre: 'Pensiones', icono: '👵',
    descripcion: 'Cuánto cobran los jubilados, cómo suben cada año y cómo se paga el sistema. Los partidos discuten cómo financiarlo: más cotizaciones, más impuestos, más años de trabajo o planes privados.',
    patron: 'pension|jubilacion|seguridad social|cotizacion',
    quienDecide: 'Casi todo es del Estado: la Seguridad Social, la cuantía y la revalorización de las pensiones se deciden en el Congreso.',
    lecciones: [{ texto: 'Los presupuestos', slug: 'presupuestos' }], propuestas: {},
  },
  {
    id: 'trabajo', nombre: 'Trabajo y salarios', icono: '💼',
    descripcion: 'Contratos, despido, jornada, salario mínimo y paro. Unos priorizan más protección y sueldos más altos; otros, menos costes para que las empresas contraten.',
    patron: 'laboral|trabajador|jornada|empleo|salario|desempleo|subsidio|autonomos|despido|convenio|retribucion',
    quienDecide: 'Las leyes laborales, el salario mínimo y el paro son del Estado. Las oficinas de empleo y la formación, de las comunidades.',
    lecciones: [{ texto: 'Quién se encarga de qué', slug: 'territorio' }], propuestas: {},
  },
  {
    id: 'economia', nombre: 'Impuestos y economía', icono: '💶',
    descripcion: 'Qué impuestos se pagan y cuánto, y en qué se gasta. La división principal es entre subir impuestos a las rentas y empresas más altas para financiar servicios, o bajarlos para que la economía crezca.',
    patron: 'impuesto|tributar|fiscal|gravamen|presupuest|deuda|estabilidad presupuestaria|financiacion autonomica|banca|arancel|credito|cliente|consumidor|economia social',
    quienDecide: 'El Estado regula los grandes impuestos (IRPF, IVA, Sociedades), pero parte se cede a las comunidades, que también fijan Sucesiones y Patrimonio. Las reglas de déficit vienen de la UE.',
    lecciones: [{ texto: 'Los presupuestos', slug: 'presupuestos' }, { texto: 'España en la UE', slug: 'europa' }], propuestas: {},
  },
  {
    id: 'inmigracion', nombre: 'Inmigración', icono: '🧳',
    descripcion: 'Quién puede entrar, quedarse y trabajar en España, la frontera y la acogida. Las posturas van de facilitar la regularización y la acogida a endurecer las entradas y las expulsiones.',
    patron: 'extranjer|migra|asilo|regularizacion|frontera|refugiad|nacionalidad',
    quienDecide: 'La ley de extranjería, el asilo y las fronteras son del Estado, dentro de las normas europeas. La acogida de menores la gestionan las comunidades.',
    lecciones: [{ texto: 'España en la UE', slug: 'europa' }], propuestas: {},
  },
  {
    id: 'territorio', nombre: 'Cataluña y modelo territorial', icono: '🗺️',
    descripcion: 'Cuánto poder tienen las comunidades, cómo se financian y qué encaje tienen Cataluña y el País Vasco. Va desde recentralizar competencias hasta reconocer el derecho a decidir.',
    patron: 'amnistia|cataluna|catalan|estatuto de autonomia|plurilingu|lengua|cooficial|transferencia|autopista|concierto|cupo|unidad de espana',
    quienDecide: 'Se decide en el Congreso, pero muchos cambios exigen leyes orgánicas (176 votos) o reformar la Constitución (3/5 o 2/3 de las cámaras).',
    lecciones: [{ texto: 'Las comunidades autónomas', slug: 'territorio' }, { texto: 'La Constitución', slug: 'constitucion' }], propuestas: {},
  },
  {
    id: 'instituciones', nombre: 'Justicia e instituciones', icono: '⚖️',
    descripcion: 'Cómo se eligen los jueces, la Fiscalía, la lucha contra la corrupción y las reglas del Congreso y de las elecciones. El choque suele ser sobre quién nombra a los órganos que vigilan al poder.',
    patron: 'poder judicial|fiscal general|ministerio fiscal|codigo penal|enjuiciamiento|tribunal|corrupcion|transparencia|reglamento del congreso|derecho de defensa|servicio publico de justicia|regimen electoral|constitucion|grupos de interes|radio y television',
    quienDecide: 'Del Estado. Las reglas de los jueces y la Fiscalía y el sistema electoral exigen ley orgánica, con mayoría absoluta.',
    lecciones: [{ texto: 'La justicia', slug: 'justicia' }, { texto: 'Cómo se hace una ley', slug: 'leyes' }], propuestas: {},
  },
  {
    id: 'igualdad', nombre: 'Igualdad y derechos', icono: '🟰',
    descripcion: 'Igualdad entre mujeres y hombres, violencia de género, aborto, eutanasia, derechos LGTBI y discapacidad. Los partidos discrepan sobre cuánto debe intervenir la ley y en qué casos.',
    patron: 'igualdad|mujer|violencia|paridad|paritaria|lgtb|discapacidad|eutanasia|morir dignamente|aborto|libertad sexual|vicaria|infancia|menores|accesibilidad',
    quienDecide: 'Los derechos fundamentales se regulan por ley orgánica del Estado. Muchos servicios (atención a víctimas, discapacidad) los prestan las comunidades.',
    lecciones: [{ texto: 'La Constitución', slug: 'constitucion' }], propuestas: {},
  },
  {
    id: 'medioambiente', nombre: 'Energía, transporte y medio ambiente', icono: '🌱',
    descripcion: 'Energía, cambio climático, trenes, carreteras, agua y campo. El debate enfrenta el ritmo de la transición a renovables con su coste para la industria, el campo y el bolsillo.',
    patron: 'energ|clima|incendio|forestal|agua|sequia|dana|emision|movilidad|residuo|desperdicio|electric|nuclear|ambiental|transporte|ferroviari|lobo|navegacion',
    quienDecide: 'Compartido: gran parte de las normas vienen de la UE, el Estado fija las bases y lleva trenes y aeropuertos, y las comunidades gestionan espacios naturales y transporte interurbano.',
    lecciones: [{ texto: 'Quién se encarga de qué', slug: 'territorio' }, { texto: 'España en la UE', slug: 'europa' }], propuestas: {},
  },
  {
    id: 'sanidad', nombre: 'Sanidad y servicios sociales', icono: '🏥',
    descripcion: 'Hospitales, atención primaria, listas de espera, dependencia y ayudas sociales. Se discute cuánto dinero dedicar y qué papel dar a la gestión pública y a la privada.',
    patron: 'sanidad|sanitari|salud|medicamento|dependencia|servicios sociales|enfermer|cribado|\\bela\\b|esclerosis|hospital|farmac|donante|cuidados',
    quienDecide: 'La sanidad y la dependencia las gestionan las comunidades. El Estado fija lo básico común y autoriza los medicamentos.',
    lecciones: [{ texto: 'Quién se encarga de qué', slug: 'territorio' }], propuestas: {},
  },
  {
    id: 'educacion', nombre: 'Educación y cultura', icono: '🎓',
    descripcion: 'Colegios, universidad, becas, lenguas en la escuela y cultura. Las diferencias más visibles son la enseñanza concertada, la religión y el peso de las lenguas cooficiales.',
    patron: 'educacion|ensenanza|universidad|cine|cultura|becas|escuela|formacion profesional|artisticas|derechos de autor|patrimonio',
    quienDecide: 'Las comunidades gestionan colegios, institutos y universidades. El Estado fija los títulos y las enseñanzas mínimas.',
    lecciones: [{ texto: 'Quién se encarga de qué', slug: 'territorio' }], propuestas: {},
  },
  {
    id: 'exterior', nombre: 'Defensa y política exterior', icono: '🌍',
    descripcion: 'Ejército, gasto en defensa, OTAN, Unión Europea y relaciones con otros países. Se discute cuánto gastar en defensa y qué posición tomar en conflictos como Ucrania, Gaza o el Sáhara.',
    patron: 'defensa nacional|militar|armas|otan|ucrania|palestina|israel|embargo|fuerzas armadas|material de defensa|guerra|oriente|ratificacion|sahara|saharaui',
    quienDecide: 'Exclusiva del Estado. Los tratados internacionales importantes necesitan autorización de las Cortes.',
    lecciones: [{ texto: 'España en la UE', slug: 'europa' }], propuestas: {},
  },
  {
    id: 'memoria', nombre: 'Memoria y terrorismo', icono: '🕯️',
    descripcion: 'Cómo se recuerda la Guerra Civil y el franquismo, y la atención a las víctimas del terrorismo. El debate es si revisar el pasado con nuevas leyes o dejarlo atrás.',
    patron: 'memoria democratica|eta\\b|terroris|victimas del terror',
    quienDecide: 'Del Estado: la ley de memoria democrática y la de víctimas del terrorismo se aprueban en las Cortes.',
    lecciones: [{ texto: 'Cómo se hace una ley', slug: 'leyes' }], propuestas: {},
  },
];

const normalizar = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

/**
 * Temas de una votación según su título y detalle. Quién la propone no cuenta: una proposición
 * «del Parlamento de Cataluña» no es por eso del tema territorial.
 */
export function temasDe(texto: string): string[] {
  const t = normalizar(texto).replace(/\b(parlamento|asamblea(?: regional)?) de [a-z]+(?: [a-z]+)?/g, '');
  return temas.filter((tema) => new RegExp(tema.patron).test(t)).map((tema) => tema.id);
}
