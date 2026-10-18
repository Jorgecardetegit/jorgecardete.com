// Cómo ha ido la economía desde 2011: qué mide cada indicador, qué parte depende del Gobierno y
// qué hay que tener en cuenta al leerlo. Las cifras salen de Eurostat (economia.json, generado con
// scripts/aprende/economia.mjs) salvo el salario mínimo, que se fija cada año por real decreto.
// Criterio: los mismos indicadores para todos los periodos, con la media de la UE al lado para
// separar lo que pasó en España de lo que pasó en toda Europa. Sin juicios sobre quién lo hizo mejor.
import datos from './economia.json';

export type Grupo = 'crecimiento' | 'empleo' | 'precios' | 'cuentas' | 'pobreza';

export const grupos: Record<Grupo, string> = {
  crecimiento: 'Crecimiento y nivel de vida',
  empleo: 'Empleo y salarios',
  precios: 'Precios y vivienda',
  cuentas: 'Cuentas públicas',
  pobreza: 'Pobreza',
};

export interface Indicador {
  id: string;
  grupo: Grupo;
  titulo: string;
  /** Unidad tal como se lee junto al número: «%», «% del PIB», «€/mes»... */
  unidad: string;
  decimales: number;
  /** Hacia dónde es mejor para la mayoría; null si depende (precio de la vivienda). */
  mejor: 'sube' | 'baja' | null;
  que: string;
  gobierno: string;
  ojo?: string;
  /** Nombre de la serie de comparación. */
  ref?: string;
  /** Línea horizontal de referencia (0 %, la media UE = 100, el objetivo del 2 %...). */
  linea?: { valor: number; texto: string };
  fuente: { titulo: string; url: string };
  es: Record<string, number>;
  comparacion: Record<string, number> | null;
}

const eurostat = (dataset: string) => ({ titulo: `Eurostat (${dataset})`, url: `https://ec.europa.eu/eurostat/databrowser/view/${dataset}/default/table?lang=es` });
const serie = (id: keyof typeof datos.indicadores) => {
  const s = datos.indicadores[id];
  return { fuente: eurostat(s.dataset), es: s.es as Record<string, number>, comparacion: s.ref as Record<string, number> | null };
};

// Salario mínimo interprofesional en euros al mes, 14 pagas. En 2021 subió en septiembre (de 950 a
// 965); se toma la cifra con la que acabó el año.
const smi: Record<string, number> = {
  2011: 641.4, 2012: 641.4, 2013: 645.3, 2014: 645.3, 2015: 648.6, 2016: 655.2, 2017: 707.7, 2018: 735.9,
  2019: 900, 2020: 950, 2021: 965, 2022: 1000, 2023: 1080, 2024: 1134, 2025: 1184, 2026: 1221,
};

// Salario mínimo descontada la inflación (IPCA de España), en euros del último año con inflación anual.
const inflacion = datos.indicadores.inflacion.es as Record<string, number>;
const ultimoIpc = Object.keys(inflacion).sort().at(-1)!;
const smiReal = Object.fromEntries(
  Object.keys(smi).filter((a) => a <= ultimoIpc).map((a) => {
    let f = 1;
    for (let y = Number(a) + 1; y <= Number(ultimoIpc); y++) f *= 1 + inflacion[y] / 100;
    return [a, Math.round(smi[a] * f)];
  }),
);

export const indicadores: Indicador[] = [
  {
    id: 'pib', grupo: 'crecimiento', titulo: 'Crecimiento de la economía', unidad: '%', decimales: 1, mejor: 'sube', ref: 'UE',
    que: 'Cuánto aumenta cada año todo lo que se produce en España (el PIB), descontada la subida de precios.',
    gobierno: 'Influye con el gasto público, los impuestos y las reformas, pero pesan más el ciclo europeo, los tipos de interés del Banco Central Europeo, el turismo y crisis como la pandemia.',
    ojo: 'Crecer mucho tras una caída grande es en parte rebote: 2021 y 2022 recuperan lo perdido en 2020.',
    linea: { valor: 0, texto: '0 %: ni crece ni cae' },
    ...serie('pib'),
  },
  {
    id: 'pibpc', grupo: 'crecimiento', titulo: 'Riqueza por habitante frente a la UE', unidad: '(UE = 100)', decimales: 0, mejor: 'sube',
    que: 'El PIB por habitante en poder de compra (corrigiendo que los precios no son iguales en todos los países), con la media de la UE igual a 100. Por debajo de 100, España produce menos por persona que la media.',
    gobierno: 'Es el resultado de décadas: productividad, educación, tamaño de las empresas, población. Un Gobierno lo mueve poco en una legislatura.',
    ojo: 'Si la población crece deprisa (como desde 2022 por la inmigración), el PIB total puede subir mucho y el PIB por habitante bastante menos.',
    linea: { valor: 100, texto: 'Media de la UE' },
    ...serie('pibpc'),
  },
  {
    id: 'renta', grupo: 'crecimiento', titulo: 'Renta de los hogares por persona', unidad: '(2008 = 100)', decimales: 0, mejor: 'sube', ref: 'UE',
    que: 'El dinero del que disponen los hogares por persona (sueldos, pensiones, rentas, menos impuestos) descontada la inflación, con 2008, antes de la crisis, igual a 100. Mide mejor que el PIB lo que nota la gente en el bolsillo.',
    gobierno: 'Le afectan directamente los impuestos, las pensiones, las prestaciones y el salario mínimo; y, indirectamente, el empleo y la inflación.',
    linea: { valor: 100, texto: 'Nivel de 2008' },
    ...serie('renta'),
  },
  {
    id: 'paro', grupo: 'empleo', titulo: 'Paro', unidad: '%', decimales: 1, mejor: 'baja', ref: 'UE',
    que: 'Porcentaje de las personas que quieren trabajar y buscan empleo pero no lo tienen. Es la Encuesta de Población Activa (la del INE), armonizada con el resto de Europa.',
    gobierno: 'Lo mueven sobre todo el crecimiento de la economía y las leyes laborales (reformas de 2012 y 2021). España tiene desde hace décadas un paro más alto que la media europea con cualquier Gobierno.',
    ...serie('paro'),
  },
  {
    id: 'paroJoven', grupo: 'empleo', titulo: 'Paro de los menores de 25 años', unidad: '%', decimales: 1, mejor: 'baja', ref: 'UE',
    que: 'El mismo indicador, solo para los jóvenes de 15 a 24 años que buscan empleo. Muchos de esa edad estudian y no cuentan.',
    gobierno: 'Depende del crecimiento, de los contratos para jóvenes y de la formación profesional, que comparten Estado y comunidades.',
    ...serie('paroJoven'),
  },
  {
    id: 'empleo', grupo: 'empleo', titulo: 'Tasa de empleo', unidad: '%', decimales: 1, mejor: 'sube', ref: 'UE',
    que: 'Porcentaje de las personas de 20 a 64 años que tienen trabajo. Complementa al paro: no depende de cuántos buscan empleo.',
    gobierno: 'Igual que el paro: crecimiento y leyes laborales, además de la conciliación y las pensiones (cuándo se jubila la gente).',
    ...serie('empleo'),
  },
  {
    id: 'temporal', grupo: 'empleo', titulo: 'Contratos temporales', unidad: '% de los asalariados', decimales: 1, mejor: 'baja', ref: 'UE',
    que: 'De cada cien personas que trabajan por cuenta ajena, cuántas tienen un contrato con fecha de fin.',
    gobierno: 'Es de lo que más depende de las leyes: la reforma laboral de diciembre de 2021 limitó los contratos temporales y extendió el fijo discontinuo.',
    ojo: 'Los fijos discontinuos cuentan como indefinidos aunque no trabajen todo el año. Hay debate sobre cuánto de la bajada desde 2022 es empleo más estable y cuánto un cambio de tipo de contrato.',
    ...serie('temporal'),
  },
  {
    id: 'smi', grupo: 'empleo', titulo: 'Salario mínimo', unidad: '€/mes', decimales: 0, mejor: 'sube', ref: `Descontada la inflación (€ de ${ultimoIpc})`,
    que: 'El sueldo más bajo que se puede pagar por una jornada completa, en euros brutos al mes en 14 pagas. La línea discontinua lo traduce a euros de hoy para ver cuánto ha subido de verdad.',
    gobierno: 'Lo fija directamente el Gobierno cada año por real decreto, tras consultar a sindicatos y patronal. No necesita al Congreso.',
    ojo: 'Mide el suelo, no el salario medio. Hay debate entre economistas sobre si las subidas grandes frenan la contratación en algunas zonas y sectores.',
    fuente: { titulo: 'Reales decretos del salario mínimo (BOE)', url: 'https://www.boe.es/buscar/boe.php?campo%5B0%5D=TIT&dato%5B0%5D=salario+m%C3%ADnimo+interprofesional' },
    es: smi, comparacion: smiReal,
  },
  {
    id: 'inflacion', grupo: 'precios', titulo: 'Subida de los precios', unidad: '%', decimales: 1, mejor: null, ref: 'UE',
    que: 'Cuánto suben de media los precios de lo que se consume en un año (el IPC armonizado europeo, muy parecido al IPC del INE).',
    gobierno: 'Poco: lo deciden sobre todo el precio de la energía y los tipos de interés del Banco Central Europeo. El Gobierno puede frenarla o adelantarla con rebajas de impuestos, topes y ayudas.',
    ojo: 'Ni mucha ni negativa es buena noticia: el Banco Central Europeo busca un 2 %.',
    linea: { valor: 2, texto: 'Objetivo del BCE: 2 %' },
    ...serie('inflacion'),
  },
  {
    id: 'vivienda', grupo: 'precios', titulo: 'Precio de la vivienda', unidad: '(2015 = 100)', decimales: 0, mejor: null, ref: 'UE',
    que: 'Cuánto cuesta comprar una casa (nueva o usada) respecto a 2015, que vale 100. Sin descontar la inflación.',
    gobierno: 'Lo mueven los tipos de interés, la población y la construcción. El suelo y el urbanismo son de comunidades y ayuntamientos; el Estado regula alquileres, hipotecas e impuestos.',
    ojo: 'Que suba es bueno para quien ya tiene vivienda y malo para quien quiere comprar. El alquiler no aparece aquí.',
    linea: { valor: 100, texto: 'Nivel de 2015' },
    ...serie('vivienda'),
  },
  {
    id: 'deficit', grupo: 'cuentas', titulo: 'Déficit público', unidad: '% del PIB', decimales: 1, mejor: 'sube', ref: 'UE',
    que: 'Lo que gastan todas las administraciones (Estado, comunidades, ayuntamientos, Seguridad Social) menos lo que ingresan en un año. Negativo es déficit: se gasta más de lo que entra y la diferencia se pide prestada.',
    gobierno: 'Depende de los presupuestos, pero también del ciclo: en una crisis caen los ingresos y suben las prestaciones solas. En 2012 suma además el rescate de la banca.',
    ojo: 'Las reglas europeas piden no pasar del −3 %; se suspendieron de 2020 a 2023 por la pandemia.',
    linea: { valor: -3, texto: 'Límite europeo: −3 %' },
    ...serie('deficit'),
  },
  {
    id: 'deuda', grupo: 'cuentas', titulo: 'Deuda pública', unidad: '% del PIB', decimales: 1, mejor: 'baja', ref: 'UE',
    que: 'Todo lo que deben las administraciones, comparado con lo que produce el país en un año.',
    gobierno: 'Sube cada año que hay déficit y baja como porcentaje cuando la economía crece más deprisa que la deuda.',
    ojo: 'Las reglas europeas fijan como referencia el 60 % del PIB, que España no cumple desde 2010.',
    linea: { valor: 60, texto: 'Referencia europea: 60 %' },
    ...serie('deuda'),
  },
  {
    id: 'bono', grupo: 'cuentas', titulo: 'Lo que cuesta pedir prestado', unidad: '% de interés', decimales: 2, mejor: 'baja', ref: 'Alemania',
    que: 'El interés que pide el mercado por prestar al Estado a 10 años. La distancia con Alemania es la «prima de riesgo».',
    gobierno: 'Lo deciden sobre todo el Banco Central Europeo y la confianza de los inversores en que se devolverá la deuda. En 2012 la prima de riesgo superó los 600 puntos (6 %).',
    ...serie('bono'),
  },
  {
    id: 'pobreza', grupo: 'pobreza', titulo: 'Riesgo de pobreza o exclusión', unidad: '% de la población', decimales: 1, mejor: 'baja', ref: 'UE',
    que: 'Porcentaje de personas con ingresos muy por debajo de la mediana, que no pueden pagar gastos básicos o que viven en hogares donde casi no se trabaja (la tasa AROPE).',
    gobierno: 'Le afectan las prestaciones (como el ingreso mínimo vital desde 2020), las pensiones, el salario mínimo y el empleo.',
    ojo: 'Eurostat cambió la definición en 2015 y no publica la serie nueva antes; por eso empieza ahí. Las cifras de cada año se refieren a los ingresos del año anterior.',
    ...serie('pobreza'),
  },
];

// Las cifras más recientes (mensuales o trimestrales), con la media de la UE.
export const ahora = [
  { id: 'paro', titulo: 'Paro', unidad: '%', ...datos.ahora.paro, nota: 'desestacionalizado' },
  { id: 'inflacion', titulo: 'Subida de los precios', unidad: '%', ...datos.ahora.inflacion, nota: 'en un año' },
  { id: 'pib', titulo: 'Crecimiento del PIB', unidad: '%', ...datos.ahora.pib, nota: 'frente al mismo trimestre del año anterior' },
];

// Lo que pasó fuera del control de cualquier Gobierno y se ve en casi todas las series.
export const sacudidas = [
  { anio: 2012, texto: 'Crisis del euro' },
  { anio: 2020, texto: 'Pandemia' },
  { anio: 2022, texto: 'Guerra de Ucrania' },
];

export const generado = datos.generado;
