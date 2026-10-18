// Genera src/data/politica/economia.json con los indicadores económicos de España desde 2004,
// junto a la media de la UE, a partir de la API de Eurostat.
// Eurostat usa la misma metodología para todos los países, así que España y la UE se comparan
// sin ajustes. Uso:
//   node scripts/aprende/economia.mjs
// Los textos de cada indicador (qué mide, qué depende del Gobierno) están en economia.ts.
import { writeFileSync } from 'node:fs';
import { setDefaultAutoSelectFamilyAttemptTimeout } from 'node:net';

// Los servidores de Eurostat tardan en aceptar la conexión más que los 250 ms que Node espera por defecto.
setDefaultAutoSelectFamilyAttemptTimeout(5000);

const API = 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data';
const DESDE = 2004;

// Series anuales. `con` es la referencia con la que se compara España (null: ninguna).
const anuales = [
  { id: 'pib', dataset: 'nama_10_gdp', filtros: { unit: 'CLV_PCH_PRE', na_item: 'B1GQ' } },
  { id: 'renta', dataset: 'tepsr_wc310', filtros: {} },
  // une_rt_a solo llega a 2009; lfsa_urgan es la misma tasa de la EPA y empieza antes.
  { id: 'paro', dataset: 'lfsa_urgan', filtros: { citizen: 'TOTAL', age: 'Y15-74', sex: 'T', unit: 'PC' } },
  { id: 'inflacion', dataset: 'prc_hicp_aind', filtros: { unit: 'RCH_A_AVG', coicop: 'CP00' } },
  { id: 'vivienda', dataset: 'prc_hpi_a', filtros: { purchase: 'TOTAL', unit: 'I15_A_AVG' } },
  { id: 'deuda', dataset: 'gov_10dd_edpt1', filtros: { na_item: 'GD', unit: 'PC_GDP', sector: 'S13' } },
  { id: 'pobreza', dataset: 'ilc_peps01n', filtros: { unit: 'PC', age: 'TOTAL', sex: 'T' } },
];

// La última cifra publicada (mensual o trimestral), para «Ahora mismo».
const recientes = [
  { id: 'paro', dataset: 'une_rt_m', filtros: { s_adj: 'SA', age: 'TOTAL', sex: 'T', unit: 'PC_ACT' } },
  { id: 'inflacion', dataset: 'prc_hicp_minr', filtros: { unit: 'RCH_A', coicop18: 'TOTAL' } },
  { id: 'pib', dataset: 'namq_10_gdp', filtros: { unit: 'CLV_PCH_SM', s_adj: 'SCA', na_item: 'B1GQ' } },
];

async function serie(dataset, filtros, geos, desde) {
  const params = new URLSearchParams({ ...filtros, sinceTimePeriod: String(desde) });
  for (const g of geos) params.append('geo', g);
  const res = await fetch(`${API}/${dataset}?${params}`);
  const d = await res.json();
  if (d.error) throw new Error(`${dataset}: ${JSON.stringify(d.error)}`);
  // Con todos los filtros fijados solo varían geo y time: el índice es geo * nTiempos + tiempo.
  for (const [k, n] of d.id.map((k, i) => [k, d.size[i]])) {
    if (n > 1 && k !== 'geo' && k !== 'time') throw new Error(`${dataset}: falta fijar «${k}»`);
  }
  const tiempos = Object.keys(d.dimension.time.category.index);
  const out = {};
  for (const [g, gi] of Object.entries(d.dimension.geo.category.index)) {
    out[g] = {};
    tiempos.forEach((t, ti) => {
      const v = d.value[String(gi * tiempos.length + ti)];
      if (v != null) out[g][t] = Math.round(v * 100) / 100;
    });
  }
  return { datos: out, actualizado: d.updated?.slice(0, 10) };
}

const indicadores = {};
for (const s of anuales) {
  const con = s.con === undefined ? 'EU27_2020' : s.con;
  const { datos, actualizado } = await serie(s.dataset, s.filtros, con ? ['ES', con] : ['ES'], DESDE);
  indicadores[s.id] = { dataset: s.dataset, con, actualizado, es: datos.ES ?? {}, ref: con ? datos[con] ?? {} : null };
  console.log(s.id, Object.entries(datos.ES ?? {}).slice(-3).map(([t, v]) => `${t}: ${v}`).join(' · '));
}

const ahora = {};
const anio = new Date().getFullYear() - 1;
for (const s of recientes) {
  const { datos } = await serie(s.dataset, s.filtros, ['ES', 'EU27_2020'], anio);
  const ultimo = Object.keys(datos.ES).sort().at(-1);
  ahora[s.id] = { dataset: s.dataset, periodo: ultimo, es: datos.ES[ultimo], ref: datos.EU27_2020?.[ultimo] ?? null };
  console.log('ahora', s.id, ultimo, datos.ES[ultimo]);
}

writeFileSync(
  new URL('../../src/data/politica/economia.json', import.meta.url),
  `${JSON.stringify({ generado: new Date().toISOString().slice(0, 10), indicadores, ahora }, null, 1)}\n`,
);
