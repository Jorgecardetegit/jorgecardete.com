// Partidos incluidos: los que tenían escaño en el Congreso al disolverse la XV legislatura
// (6 de octubre de 2026) o eurodiputados elegidos en 2024. Criterio objetivo: nadie elige
// a quién sacar. Misma plantilla para todos; lo que cambia rápido lleva fecha.
export interface Resultado {
  eleccion: '2015' | '2016' | '2019A' | '2019N' | '2023';
  escanos: number;
  /** Nombre con el que se presentó, si no es el actual. */
  como?: string;
}

export interface Partido {
  id: string;
  nombre: string;
  siglas: string;
  color: string;
  ambito: string;
  fundacion: number;
  lider: { nombre: string; cargo: string };
  candidatura: { texto: string; estado: 'confirmada' | 'anunciada' | 'por confirmar' };
  resumen: string;
  web?: string;
  /** Resultado de 2023 en el Congreso (porcentaje de voto válido). */
  voto2023?: number;
  resultados: Resultado[];
  europa2024?: { escanos: number; pct: number; como?: string };
}

export const elecciones = [
  { id: '2015', label: '2015' },
  { id: '2016', label: '2016' },
  { id: '2019A', label: 'abr. 2019' },
  { id: '2019N', label: 'nov. 2019' },
  { id: '2023', label: '2023' },
] as const;

/** Fecha hasta la que están revisados líderes y candidaturas. */
export const revisadoPartidos = '2026-10-18';

export const partidos: Partido[] = [
  {
    id: 'pp', nombre: 'Partido Popular', siglas: 'PP', color: '#1d84ce', ambito: 'Toda España', fundacion: 1989,
    lider: { nombre: 'Alberto Núñez Feijóo', cargo: 'Presidente' },
    candidatura: { texto: 'Alberto Núñez Feijóo', estado: 'anunciada' },
    resumen: 'Nace en 1989 de la refundación de Alianza Popular (1976). Se define como un partido de centroderecha, de tradición liberal, conservadora y democristiana. Ha gobernado con José María Aznar (1996-2004) y Mariano Rajoy (2011-2018). Fue el partido más votado en 2023, pero no logró la investidura.',
    web: 'https://www.pp.es/', voto2023: 33.06,
    resultados: [{ eleccion: '2015', escanos: 123 }, { eleccion: '2016', escanos: 137 }, { eleccion: '2019A', escanos: 66 }, { eleccion: '2019N', escanos: 89 }, { eleccion: '2023', escanos: 137 }],
    europa2024: { escanos: 22, pct: 34.21 },
  },
  {
    id: 'psoe', nombre: 'Partido Socialista Obrero Español', siglas: 'PSOE', color: '#e30613', ambito: 'Toda España (en Cataluña, PSC)', fundacion: 1879,
    lider: { nombre: 'Pedro Sánchez', cargo: 'Secretario general' },
    candidatura: { texto: 'Pedro Sánchez', estado: 'anunciada' },
    resumen: 'Fundado en 1879, es el partido más antiguo de España. Se define como socialdemócrata. Ha gobernado con Felipe González (1982-1996), José Luis Rodríguez Zapatero (2004-2011) y Pedro Sánchez (desde 2018), este último en coalición con Unidas Podemos y después con Sumar.',
    web: 'https://www.psoe.es/', voto2023: 31.68,
    resultados: [{ eleccion: '2015', escanos: 90 }, { eleccion: '2016', escanos: 85 }, { eleccion: '2019A', escanos: 123 }, { eleccion: '2019N', escanos: 120 }, { eleccion: '2023', escanos: 121 }],
    europa2024: { escanos: 20, pct: 30.19 },
  },
  {
    id: 'vox', nombre: 'Vox', siglas: 'Vox', color: '#5ac035', ambito: 'Toda España', fundacion: 2013,
    lider: { nombre: 'Santiago Abascal', cargo: 'Presidente' },
    candidatura: { texto: 'Santiago Abascal', estado: 'anunciada' },
    resumen: 'Fundado en 2013 por antiguos miembros del PP. Entró en el Congreso en abril de 2019 y fue tercera fuerza en noviembre de ese año. Entre sus propuestas centrales están devolver competencias de las comunidades al Estado y endurecer la política migratoria.',
    web: 'https://www.voxespana.es/', voto2023: 12.38,
    resultados: [{ eleccion: '2015', escanos: 0 }, { eleccion: '2016', escanos: 0 }, { eleccion: '2019A', escanos: 24 }, { eleccion: '2019N', escanos: 52 }, { eleccion: '2023', escanos: 33 }],
    europa2024: { escanos: 6, pct: 9.63 },
  },
  {
    id: 'sumar', nombre: 'Sumar', siglas: 'Sumar', color: '#d6215f', ambito: 'Toda España', fundacion: 2023,
    lider: { nombre: 'Verónica Martínez Barbero y Rosa Martínez', cargo: 'Co-coordinadoras de Movimiento Sumar (desde julio de 2026)' },
    candidatura: { texto: 'Ada Colau, propuesta el 12 de octubre por Movimiento Sumar, IU, Más Madrid y Comuns', estado: 'anunciada' },
    resumen: 'Plataforma creada en 2023 en torno a Yolanda Díaz que agrupó a una quincena de partidos de izquierda: IU, Más Madrid, Comuns, Compromís y otros, y al principio también Podemos. Fue cuarta fuerza en 2023 y ha formado parte del Gobierno de coalición con el PSOE.',
    web: 'https://movimientosumar.es/', voto2023: 12.33,
    resultados: [{ eleccion: '2023', escanos: 31 }],
    europa2024: { escanos: 3, pct: 4.67 },
  },
  {
    id: 'podemos', nombre: 'Podemos', siglas: 'Podemos', color: '#6b2e7f', ambito: 'Toda España', fundacion: 2014,
    lider: { nombre: 'Ione Belarra', cargo: 'Secretaria general' },
    candidatura: { texto: 'Irene Montero, designada por el partido', estado: 'anunciada' },
    resumen: 'Nació en 2014, tras el 15M y la crisis económica, con Pablo Iglesias al frente. Con sus aliados (Unidos y después Unidas Podemos) fue tercera fuerza en 2015 y 2016 y formó parte del Gobierno de coalición entre 2020 y 2023. En 2023 se presentó dentro de Sumar y en diciembre de ese año sus diputados pasaron al Grupo Mixto.',
    web: 'https://podemos.info/',
    resultados: [
      { eleccion: '2015', escanos: 69, como: 'Podemos y confluencias' },
      { eleccion: '2016', escanos: 71, como: 'Unidos Podemos y confluencias' },
      { eleccion: '2019A', escanos: 42, como: 'Unidas Podemos y confluencias' },
      { eleccion: '2019N', escanos: 35, como: 'Unidas Podemos y confluencias' },
    ],
    europa2024: { escanos: 2, pct: 3.3 },
  },
  {
    id: 'erc', nombre: 'Esquerra Republicana de Catalunya', siglas: 'ERC', color: '#f5a623', ambito: 'Cataluña', fundacion: 1931,
    lider: { nombre: 'Oriol Junqueras', cargo: 'Presidente' },
    candidatura: { texto: 'Por confirmar', estado: 'por confirmar' },
    resumen: 'Fundada en 1931, es un partido catalán de izquierdas, republicano e independentista. Presidió la Generalitat entre 2021 y 2024 con Pere Aragonès. En el Congreso facilitó con su abstención la investidura de Pedro Sánchez en 2020 y la apoyó en 2023.',
    web: 'https://www.esquerra.cat/', voto2023: 1.89,
    resultados: [{ eleccion: '2015', escanos: 9 }, { eleccion: '2016', escanos: 9 }, { eleccion: '2019A', escanos: 15 }, { eleccion: '2019N', escanos: 13 }, { eleccion: '2023', escanos: 7 }],
    europa2024: { escanos: 3, pct: 4.91, como: 'Ahora Repúblicas, con EH Bildu y BNG (escaños de la coalición)' },
  },
  {
    id: 'junts', nombre: 'Junts per Catalunya', siglas: 'Junts', color: '#16b5a6', ambito: 'Cataluña', fundacion: 2020,
    lider: { nombre: 'Carles Puigdemont', cargo: 'Presidente' },
    candidatura: { texto: 'Por confirmar', estado: 'por confirmar' },
    resumen: 'Partido independentista catalán constituido en 2020 en torno a Carles Puigdemont, heredero del espacio de Convergència (CDC). Sus votos fueron decisivos para la investidura de Pedro Sánchez en 2023, pactada junto a la ley de amnistía. En 2025 anunció la ruptura con el PSOE.',
    web: 'https://junts.cat/', voto2023: 1.6,
    resultados: [{ eleccion: '2015', escanos: 8, como: 'Democràcia i Llibertat' }, { eleccion: '2016', escanos: 8, como: 'CDC' }, { eleccion: '2019A', escanos: 7, como: 'JxCat' }, { eleccion: '2019N', escanos: 8, como: 'JxCat' }, { eleccion: '2023', escanos: 7 }],
    europa2024: { escanos: 1, pct: 2.52 },
  },
  {
    id: 'bildu', nombre: 'EH Bildu', siglas: 'EH Bildu', color: '#a3c614', ambito: 'País Vasco y Navarra', fundacion: 2011,
    lider: { nombre: 'Arnaldo Otegi', cargo: 'Coordinador general' },
    candidatura: { texto: 'Por confirmar', estado: 'por confirmar' },
    resumen: 'Coalición de la izquierda independentista vasca (izquierda abertzale) creada en 2011 y constituida como partido en 2017. Es la segunda fuerza del Parlamento Vasco. En el Congreso facilitó con su abstención la investidura de Pedro Sánchez en 2020 y la apoyó en 2023.',
    web: 'https://ehbildu.eus/', voto2023: 1.36,
    resultados: [{ eleccion: '2015', escanos: 2 }, { eleccion: '2016', escanos: 2 }, { eleccion: '2019A', escanos: 4 }, { eleccion: '2019N', escanos: 5 }, { eleccion: '2023', escanos: 6 }],
    europa2024: { escanos: 3, pct: 4.91, como: 'Ahora Repúblicas, con ERC y BNG (escaños de la coalición)' },
  },
  {
    id: 'pnv', nombre: 'Partido Nacionalista Vasco', siglas: 'PNV', color: '#2e8b3a', ambito: 'País Vasco (y Navarra)', fundacion: 1895,
    lider: { nombre: 'Aitor Esteban', cargo: 'Presidente del Euzkadi Buru Batzar' },
    candidatura: { texto: 'Por confirmar', estado: 'por confirmar' },
    resumen: 'Fundado en 1895 por Sabino Arana, es el partido nacionalista vasco de centroderecha. Ha gobernado el País Vasco casi sin interrupción desde 1980. En el Congreso apoyó la moción de censura de 2018 y las investiduras de Pedro Sánchez de 2020 y 2023.',
    web: 'https://www.eaj-pnv.eus/', voto2023: 1.12,
    resultados: [{ eleccion: '2015', escanos: 6 }, { eleccion: '2016', escanos: 5 }, { eleccion: '2019A', escanos: 6 }, { eleccion: '2019N', escanos: 6 }, { eleccion: '2023', escanos: 5 }],
    europa2024: { escanos: 1, pct: 1.63, como: 'CEUS, con Coalición Canaria (escaño de la coalición)' },
  },
  {
    id: 'bng', nombre: 'Bloque Nacionalista Galego', siglas: 'BNG', color: '#5aa9d6', ambito: 'Galicia', fundacion: 1982,
    lider: { nombre: 'Ana Pontón', cargo: 'Portavoz nacional' },
    candidatura: { texto: 'Por confirmar', estado: 'por confirmar' },
    resumen: 'Frente nacionalista gallego de izquierdas fundado en 1982. Es la segunda fuerza del Parlamento de Galicia desde 2020. Su diputado en el Congreso apoyó las investiduras de Pedro Sánchez de 2020 y 2023.',
    web: 'https://www.bng.gal/', voto2023: 0.62,
    resultados: [{ eleccion: '2015', escanos: 0 }, { eleccion: '2016', escanos: 0 }, { eleccion: '2019A', escanos: 0 }, { eleccion: '2019N', escanos: 1 }, { eleccion: '2023', escanos: 1 }],
    europa2024: { escanos: 3, pct: 4.91, como: 'Ahora Repúblicas, con ERC y EH Bildu (escaños de la coalición)' },
  },
  {
    id: 'cc', nombre: 'Coalición Canaria', siglas: 'CC', color: '#e8c400', ambito: 'Canarias', fundacion: 1993,
    lider: { nombre: 'Fernando Clavijo', cargo: 'Secretario nacional' },
    candidatura: { texto: 'Cristina Valido, propuesta por el partido el 5 de octubre', estado: 'anunciada' },
    resumen: 'Partido nacionalista canario fundado en 1993. Gobierna Canarias desde 2023, con Fernando Clavijo como presidente, en coalición con el PP. Su diputada apoyó la investidura de Pedro Sánchez en 2023.',
    web: 'https://coalicioncanaria.org/', voto2023: 0.47,
    resultados: [{ eleccion: '2015', escanos: 1 }, { eleccion: '2016', escanos: 1 }, { eleccion: '2019A', escanos: 2 }, { eleccion: '2019N', escanos: 2 }, { eleccion: '2023', escanos: 1 }],
    europa2024: { escanos: 1, pct: 1.63, como: 'CEUS, con el PNV (escaño de la coalición)' },
  },
  {
    id: 'upn', nombre: 'Unión del Pueblo Navarro', siglas: 'UPN', color: '#1f4e9c', ambito: 'Navarra', fundacion: 1979,
    lider: { nombre: 'Cristina Ibarrola', cargo: 'Presidenta' },
    candidatura: { texto: 'Por confirmar', estado: 'por confirmar' },
    resumen: 'Partido regionalista navarro de centroderecha fundado en 1979. Ha gobernado Navarra durante buena parte de la democracia. Defiende el régimen foral de Navarra y su permanencia como comunidad propia, separada del País Vasco. En 2015 y 2016 se presentó con el PP y en 2019 en la coalición Navarra Suma.',
    web: 'https://www.upn.org/', voto2023: 0.21,
    resultados: [{ eleccion: '2019A', escanos: 2, como: 'Navarra Suma' }, { eleccion: '2019N', escanos: 2, como: 'Navarra Suma' }, { eleccion: '2023', escanos: 1 }],
  },
  {
    id: 'salf', nombre: 'Se Acabó La Fiesta', siglas: 'SALF', color: '#4a4a4a', ambito: 'Toda España', fundacion: 2024,
    lider: { nombre: 'Luis Pérez (Alvise)', cargo: 'Fundador y eurodiputado' },
    candidatura: { texto: 'Por confirmar', estado: 'por confirmar' },
    resumen: 'Formación creada en 2024 por el activista en redes sociales Luis Pérez, conocido como Alvise. Logró 3 eurodiputados en su primera elección; dos de ellos abandonaron la formación en 2025. No tiene representación en el Congreso.',
    resultados: [],
    europa2024: { escanos: 3, pct: 4.58 },
  },
];

export const getPartido = (id: string) => partidos.find((p) => p.id === id);
