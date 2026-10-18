// Cómo ha ido la economía desde 2011, contado como las preguntas que se haría cualquiera. Cada
// pregunta tiene una respuesta en una frase (calculada con los datos, para que se actualice sola),
// tres cifras (el primer año, 2018 y hoy), la media de la UE al lado y la serie para la gráfica.
// Las cifras salen de Eurostat (economia.json, generado con scripts/aprende/economia.mjs) salvo el
// salario mínimo, que se fija cada año por real decreto. Sin juicios sobre quién lo hizo mejor.
import datos from './economia.json';

type Serie = Record<string, number>;

export interface Pregunta {
  id: string;
  /** Texto del botón. */
  tema: string;
  pregunta: string;
  respuesta: string;
  /** Qué representa el eje vertical, en palabras. */
  eje: string;
  es: Serie;
  ue: Serie | null;
  /** Nombre de la segunda línea: casi siempre la UE. */
  ref: string;
  /** La cifra más reciente; si es mensual o trimestral, posterior al último dato anual. */
  hoy: { valor: number; periodo: string; ue: number | null };
  fmt: (v: number) => string;
  linea?: { valor: number; texto: string };
  que: string;
  gobierno: string;
  ojo?: string;
  fuente: { titulo: string; url: string };
}

const ind = datos.indicadores;
const eurostat = (dataset: string) => ({ titulo: `Eurostat (${dataset})`, url: `https://ec.europa.eu/eurostat/databrowser/view/${dataset}/default/table?lang=es` });
const ultimo = (s: Serie) => {
  const a = Object.keys(s).sort().at(-1)!;
  return { a, v: s[a] };
};
const extremo = (s: Serie, f: (a: number, b: number) => boolean) =>
  Object.entries(s).reduce((m, [a, v]) => (f(v, m.v) ? { a, v } : m), { a: '', v: f(1, 0) ? -Infinity : Infinity });
const mapa = (s: Serie, f: (v: number) => number): Serie => Object.fromEntries(Object.entries(s).map(([a, v]) => [a, f(v)]));
// useGrouping 'always': «1.221 €» y no «1221 €», que es lo que hace es-ES con cuatro cifras.
const n = (v: number, d = 0) => v.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: 'always' } as Intl.NumberFormatOptions);
const pct = (d: number) => (v: number) => `${n(v, d)} %`;
const anual = (s: Serie, ue: Serie | null) => {
  const u = ultimo(s);
  return { valor: u.v, periodo: u.a, ue: ue?.[u.a] ?? null };
};

// Paro.
const paro = { es: ind.paro.es as Serie, ue: ind.paro.ref as Serie };
const paroPeor = extremo(paro.es, (a, b) => a > b);

// Salario mínimo en euros al mes, 14 pagas. En 2021 subió en septiembre (de 950 a 965); se toma la
// cifra con la que acabó el año. Y descontada la inflación (IPCA de España), en euros del último
// año con inflación anual.
const smi: Serie = {
  2011: 641.4, 2012: 641.4, 2013: 645.3, 2014: 645.3, 2015: 648.6, 2016: 655.2, 2017: 707.7, 2018: 735.9,
  2019: 900, 2020: 950, 2021: 965, 2022: 1000, 2023: 1080, 2024: 1134, 2025: 1184, 2026: 1221,
};
const ipc = ind.inflacion.es as Serie;
const ultimoIpc = ultimo(ipc).a;
const smiReal: Serie = Object.fromEntries(
  Object.keys(smi).filter((a) => a <= ultimoIpc).map((a) => {
    let f = 1;
    for (let y = Number(a) + 1; y <= Number(ultimoIpc); y++) f *= 1 + ipc[y] / 100;
    return [a, Math.round(smi[a] * f)];
  }),
);
const smiGanancia = Math.round((smi[ultimoIpc] / smiReal[2018] - 1) * 100);

// Renta de los hogares: índice 2008 = 100 → diferencia en % con 2008.
const renta = { es: mapa(ind.renta.es as Serie, (v) => Math.round((v - 100) * 10) / 10), ue: mapa(ind.renta.ref as Serie, (v) => Math.round((v - 100) * 10) / 10) };
const rentaHoy = ultimo(renta.es);
const masMenos = (v: number) => `un ${n(Math.abs(Math.round(v)))} % ${v >= 0 ? 'más' : 'menos'}`;

// Inflación.
const precios = { es: ipc, ue: ind.inflacion.ref as Serie };
const preciosPeor = extremo(precios.es, (a, b) => a > b);

// Vivienda: índice 2015 = 100 → lo que cuesta hoy una casa que en 2015 costaba 100.000 €.
const casa = { es: mapa(ind.vivienda.es as Serie, (v) => Math.round(v * 10) * 100), ue: mapa(ind.vivienda.ref as Serie, (v) => Math.round(v * 10) * 100) };
const casaHoy = ultimo(casa.es);
const miles = (v: number) => `${n(Math.round(v / 1000) * 1000)} €`;

// Crecimiento.
const pib = { es: ind.pib.es as Serie, ue: ind.pib.ref as Serie };

// Deuda.
const deuda = { es: ind.deuda.es as Serie, ue: ind.deuda.ref as Serie };
const deudaHoy = ultimo(deuda.es);

// Pobreza.
const pobreza = { es: ind.pobreza.es as Serie, ue: ind.pobreza.ref as Serie };
const pobrezaHoy = ultimo(pobreza.es);

export const preguntas: Pregunta[] = [
  {
    id: 'trabajo', tema: 'Trabajo', pregunta: '¿Es más fácil encontrar trabajo?',
    respuesta: `Hoy, de cada 100 personas que buscan trabajo, ${n(datos.ahora.paro.es)} no lo encuentran. En ${paroPeor.a}, lo peor de la crisis, eran ${n(paroPeor.v)}. En el conjunto de la UE son ${n(datos.ahora.paro.ref!)}.`,
    eje: 'De cada 100 personas que buscan trabajo, cuántas no lo encuentran (tasa de paro)',
    ...paro, ref: 'UE', hoy: { valor: datos.ahora.paro.es, periodo: datos.ahora.paro.periodo, ue: datos.ahora.paro.ref }, fmt: pct(1),
    que: 'La tasa de paro: el porcentaje de personas que quieren trabajar y buscan empleo pero no lo tienen. Sale de la Encuesta de Población Activa, armonizada con el resto de Europa.',
    gobierno: 'Lo mueven sobre todo el crecimiento de la economía y las leyes laborales (reformas de 2012 y 2021). España tiene desde hace décadas un paro más alto que la media europea, con cualquier Gobierno.',
    fuente: eurostat(ind.paro.dataset),
  },
  {
    id: 'sueldo', tema: 'Sueldo mínimo', pregunta: '¿Ha subido el sueldo mínimo?',
    respuesta: `El sueldo mínimo es hoy de ${n(smi[ultimo(smi).a])} € al mes en 14 pagas; en 2018 era de ${n(smi[2018])} €. Aun descontando lo que han subido los precios, en ${ultimoIpc} daba para comprar un ${smiGanancia} % más que en 2018.`,
    eje: 'Euros al mes, en 14 pagas',
    es: smi, ue: smiReal, ref: `Descontada la subida de precios (€ de ${ultimoIpc})`, hoy: anual(smi, null), fmt: (v) => `${n(v)} €`,
    que: 'El salario mínimo interprofesional: lo menos que se puede pagar por una jornada completa, en euros brutos al mes y 14 pagas. La línea discontinua lo traduce a euros de hoy para ver cuánto ha subido de verdad.',
    gobierno: 'Lo fija directamente el Gobierno cada año por real decreto, tras consultar a sindicatos y patronal. No necesita al Congreso.',
    ojo: 'Es el suelo, no el sueldo de la mayoría. Hay debate entre economistas sobre si las subidas grandes frenan la contratación en algunas zonas y sectores.',
    fuente: { titulo: 'Reales decretos del salario mínimo (BOE)', url: 'https://www.boe.es/buscar/boe.php?campo%5B0%5D=TIT&dato%5B0%5D=salario+m%C3%ADnimo+interprofesional' },
  },
  {
    id: 'dinero', tema: 'Dinero en casa', pregunta: '¿Llega más el dinero a los hogares?',
    respuesta: `Descontado lo que han subido los precios, los hogares tienen de media ${masMenos(rentaHoy.v)} de dinero por persona que en 2008, antes de la gran crisis. En el conjunto de la UE, ${masMenos(renta.ue[rentaHoy.a])}.`,
    eje: 'Dinero de los hogares por persona, descontada la inflación: % más o menos que en 2008',
    ...renta, ref: 'UE', hoy: anual(renta.es, renta.ue), fmt: (v) => `${v > 0 ? '+' : ''}${n(v, 1)} %`,
    linea: { valor: 0, texto: 'Igual que en 2008' },
    que: 'La renta disponible de los hogares por persona: sueldos, pensiones y otras rentas, menos impuestos, descontada la inflación. Mide mejor que el PIB lo que nota la gente en el bolsillo.',
    gobierno: 'Le afectan directamente los impuestos, las pensiones, las ayudas y el salario mínimo; e indirectamente, el empleo y los precios.',
    fuente: eurostat(ind.renta.dataset),
  },
  {
    id: 'precios', tema: 'Precios', pregunta: '¿Está todo más caro?',
    respuesta: `Lo que hace un año costaba 100 € hoy cuesta ${n(100 + datos.ahora.inflacion.es, 0)} €. El Banco Central Europeo considera sano que suba unos 2 € al año. El peor año reciente fue ${preciosPeor.a}, con una subida del ${n(preciosPeor.v, 1)} %.`,
    eje: 'Cuánto suben los precios en un año (inflación)',
    ...precios, ref: 'UE', hoy: { valor: datos.ahora.inflacion.es, periodo: datos.ahora.inflacion.periodo, ue: datos.ahora.inflacion.ref }, fmt: pct(1),
    linea: { valor: 2, texto: 'Lo sano: 2 %' },
    que: 'La inflación: cuánto suben de media los precios de lo que se compra en un año (el IPC armonizado europeo, casi igual al IPC del INE).',
    gobierno: 'Poco: la deciden sobre todo el precio de la energía y los tipos de interés del Banco Central Europeo. El Gobierno puede suavizarla con rebajas de impuestos, topes y ayudas.',
    ojo: 'Que los precios bajen tampoco es buena señal: suele ir con crisis.',
    fuente: eurostat(ind.inflacion.dataset),
  },
  {
    id: 'vivienda', tema: 'Vivienda', pregunta: '¿Se puede comprar una casa?',
    respuesta: `Una vivienda que en 2015 costaba 100.000 € cuesta hoy de media unos ${miles(casaHoy.v)}. En el conjunto de la UE, unos ${miles(casa.ue[casaHoy.a])}.`,
    eje: 'Lo que cuesta una vivienda que en 2015 costaba 100.000 €',
    ...casa, ref: 'UE', hoy: anual(casa.es, casa.ue), fmt: miles,
    linea: { valor: 100000, texto: 'Precio de 2015' },
    que: 'El precio de compra de las viviendas, nuevas y usadas, respecto a 2015. Sin descontar la inflación.',
    gobierno: 'Lo mueven los tipos de interés, la población y lo que se construye. El suelo y el urbanismo son de comunidades y ayuntamientos; el Estado regula alquileres, hipotecas e impuestos.',
    ojo: 'Que suba es bueno para quien ya tiene casa y malo para quien quiere comprarla. El alquiler no aparece aquí.',
    fuente: eurostat(ind.vivienda.dataset),
  },
  {
    id: 'crecimiento', tema: 'Crecimiento', pregunta: '¿Crece la economía?',
    respuesta: `En el último año la economía española ha crecido un ${n(datos.ahora.pib.es, 1)} %, ${datos.ahora.pib.es >= datos.ahora.pib.ref! ? 'más' : 'menos'} que la media de la UE (${n(datos.ahora.pib.ref!, 1)} %). En 2020, con la pandemia, cayó un ${n(-pib.es[2020], 1)} %.`,
    eje: 'Cuánto crece cada año todo lo que produce el país (PIB)',
    ...pib, ref: 'UE', hoy: { valor: datos.ahora.pib.es, periodo: datos.ahora.pib.periodo, ue: datos.ahora.pib.ref }, fmt: pct(1),
    linea: { valor: 0, texto: 'Ni crece ni cae' },
    que: 'El crecimiento del PIB: cuánto aumenta todo lo que se produce en España, descontada la subida de precios.',
    gobierno: 'Influye con el gasto, los impuestos y las reformas, pero pesan más el ciclo europeo, los tipos de interés, el turismo y crisis como la pandemia.',
    ojo: 'Crecer mucho después de una caída grande es en parte rebote: 2021 y 2022 recuperan lo perdido en 2020. Y con más población, el PIB crece aunque cada persona no tenga más.',
    fuente: eurostat(ind.pib.dataset),
  },
  {
    id: 'deuda', tema: 'Deuda', pregunta: '¿Debe más el Estado?',
    respuesta: `Las administraciones deben ${n(deudaHoy.v)} € por cada 100 € que produce el país en un año. En 2011 debían ${n(deuda.es[2011])} €; la media de la UE es de ${n(deuda.ue[deudaHoy.a])} €.`,
    eje: 'Lo que deben las administraciones por cada 100 € que produce el país en un año (% del PIB)',
    ...deuda, ref: 'UE', hoy: anual(deuda.es, deuda.ue), fmt: pct(1),
    linea: { valor: 60, texto: 'Referencia europea: 60' },
    que: 'La deuda pública: todo lo que deben el Estado, las comunidades, los ayuntamientos y la Seguridad Social, comparado con lo que produce el país en un año.',
    gobierno: 'Sube cada año que se gasta más de lo que se ingresa, y baja como porcentaje cuando la economía crece más deprisa que la deuda. En 2012 sumó además el rescate de la banca, y en 2020, la pandemia.',
    fuente: eurostat(ind.deuda.dataset),
  },
  {
    id: 'pobreza', tema: 'Pobreza', pregunta: '¿Hay menos pobreza?',
    respuesta: `De cada 100 personas, ${n(pobrezaHoy.v)} están en riesgo de pobreza o exclusión social. En 2015, el primer año con estos datos, eran ${n(pobreza.es[2015])}; en el conjunto de la UE son ${n(pobreza.ue[pobrezaHoy.a])}.`,
    eje: 'De cada 100 personas, cuántas están en riesgo de pobreza o exclusión',
    ...pobreza, ref: 'UE', hoy: anual(pobreza.es, pobreza.ue), fmt: pct(1),
    que: 'La tasa AROPE: personas con ingresos muy por debajo de lo normal en el país, que no pueden pagar gastos básicos o que viven en hogares donde casi no se trabaja.',
    gobierno: 'Le afectan las ayudas (como el ingreso mínimo vital desde 2020), las pensiones, el salario mínimo y el empleo.',
    ojo: 'Eurostat cambió la definición en 2015 y no da la serie nueva antes; por eso empieza ahí. Cada año se refiere a los ingresos del año anterior.',
    fuente: eurostat(ind.pobreza.dataset),
  },
];

// Lo que vino de fuera y se ve en casi todas las gráficas.
export const sacudidas = [
  { anio: 2012, texto: 'Crisis del euro' },
  { anio: 2020, texto: 'Pandemia' },
  { anio: 2022, texto: 'Guerra de Ucrania' },
];

export const generado = datos.generado;
