// Quién se encarga de qué. Simplificado: casi todo tiene matices y excepciones por
// comunidad; aquí va lo que vale para la mayoría y las excepciones más conocidas.
export type Nivel = 'ue' | 'estado' | 'ccaa' | 'ayto';

// `text` es el color de la etiqueta encima de su fondo, para que se lea bien.
export const niveles: Record<Nivel, { label: string; color: string; text: string }> = {
  ue: { label: 'UE', color: 'var(--gold)', text: '#1f1d1a' },
  estado: { label: 'Estado', color: 'var(--green)', text: '#1f1d1a' },
  ccaa: { label: 'Comunidad', color: 'var(--purple)', text: '#ffffff' },
  ayto: { label: 'Ayuntamiento', color: 'var(--terracotta)', text: '#1f1d1a' },
};

export interface Competencia {
  tema: string;
  icono: string;
  quien: Nivel[];
  detalle: string;
}

export const competencias: Competencia[] = [
  { tema: 'Sanidad', icono: '🏥', quien: ['estado', 'ccaa'], detalle: 'Las comunidades gestionan hospitales, centros de salud y listas de espera. El Estado fija las bases comunes y autoriza los medicamentos.' },
  { tema: 'Educación', icono: '🎓', quien: ['estado', 'ccaa', 'ayto'], detalle: 'Las comunidades llevan colegios, institutos, profesores y universidades públicas. El Estado fija los títulos y las enseñanzas mínimas. Los ayuntamientos mantienen los colegios de infantil y primaria.' },
  { tema: 'Pensiones', icono: '👵', quien: ['estado'], detalle: 'Las paga la Seguridad Social, que es estatal. Las pensiones no contributivas las gestionan las comunidades.' },
  { tema: 'Paro y empleo', icono: '💼', quien: ['estado', 'ccaa'], detalle: 'La prestación por desempleo la paga el Estado (SEPE). Las oficinas de empleo, la formación y las políticas para encontrar trabajo son de las comunidades.' },
  { tema: 'Vivienda', icono: '🏠', quien: ['estado', 'ccaa', 'ayto'], detalle: 'Es competencia de las comunidades: vivienda protegida y ayudas. Los ayuntamientos deciden el urbanismo y el suelo. El Estado regula los contratos de alquiler y los impuestos, y aprobó una ley de vivienda en 2023.' },
  { tema: 'Impuestos', icono: '💶', quien: ['estado', 'ccaa', 'ayto'], detalle: 'El Estado regula el IRPF, el IVA y Sociedades. Las comunidades fijan su tramo del IRPF, Sucesiones, Patrimonio y Transmisiones. Los ayuntamientos cobran el IBI, el impuesto de circulación y la plusvalía.' },
  { tema: 'Policía', icono: '👮', quien: ['estado', 'ccaa', 'ayto'], detalle: 'Policía Nacional y Guardia Civil son estatales. Cataluña (Mossos), País Vasco (Ertzaintza) y Navarra (Policía Foral) tienen policía propia. Cada ayuntamiento puede tener Policía Local.' },
  { tema: 'Transporte', icono: '🚆', quien: ['estado', 'ccaa', 'ayto'], detalle: 'Trenes de larga distancia, la mayoría de Cercanías, aeropuertos y autovías del Estado. Carreteras y autobuses interurbanos de las comunidades. Autobús urbano de los ayuntamientos.' },
  { tema: 'Basura, agua y calles', icono: '🗑️', quien: ['ayto'], detalle: 'Recogida de residuos, agua potable, alcantarillado, alumbrado, limpieza, parques y asfaltado son de los ayuntamientos.' },
  { tema: 'Servicios sociales y dependencia', icono: '🤝', quien: ['estado', 'ccaa', 'ayto'], detalle: 'Las comunidades gestionan las ayudas a la dependencia y las residencias. El Estado pone un nivel mínimo de financiación. Los ayuntamientos atienden los servicios sociales básicos.' },
  { tema: 'Justicia', icono: '⚖️', quien: ['estado', 'ccaa'], detalle: 'Las leyes y los jueces son del Estado. En la mayoría de comunidades, los edificios, los medios y el personal de los juzgados los pone la comunidad.' },
  { tema: 'Prisiones', icono: '🔐', quien: ['estado', 'ccaa'], detalle: 'Son del Estado, salvo en Cataluña y el País Vasco, que gestionan las suyas.' },
  { tema: 'Medio ambiente', icono: '🌳', quien: ['ue', 'estado', 'ccaa'], detalle: 'Gran parte de las normas vienen de la UE. El Estado fija las bases y las comunidades las desarrollan y gestionan los espacios protegidos.' },
  { tema: 'Agricultura y pesca', icono: '🌾', quien: ['ue', 'estado', 'ccaa'], detalle: 'La Política Agrícola Común y las cuotas de pesca se deciden en la UE. Las comunidades gestionan las ayudas.' },
  { tema: 'Moneda y comercio exterior', icono: '💱', quien: ['ue'], detalle: 'El euro y los tipos de interés (Banco Central Europeo), los aranceles y los acuerdos comerciales con otros países son de la UE.' },
  { tema: 'Defensa y política exterior', icono: '🛡️', quien: ['estado'], detalle: 'Ejército, embajadas, tratados internacionales y nacionalidad son exclusivos del Estado.' },
  { tema: 'Leyes penales, laborales y mercantiles', icono: '📕', quien: ['estado'], detalle: 'El Código Penal, el Estatuto de los Trabajadores y las leyes de empresas son iguales en toda España.' },
];
