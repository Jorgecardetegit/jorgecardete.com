// Los gobiernos de España desde la muerte de Franco, uno por investidura (o por designación,
// antes de la Constitución, y por moción de censura en 2018). Si un presidente repite, cada
// investidura es un gobierno distinto.
//
// Fechas y votaciones: artículos de Wikipedia de cada gobierno y tabla histórica de investiduras
// («Investidura (España)»), contrastados con el Congreso cuando hay datos abiertos. `desde` es el
// día de la designación, la investidura o la moción; cada gobierno dura hasta que llega el
// siguiente (incluido el tiempo en funciones). Lo que hizo cada uno: hechos establecidos, contados
// sin adjetivos; los que tienen ficha en la línea temporal llevan allí su fuente.
export const revisadoGobiernos = '2026-10-18';

export interface Gobierno {
  id: string;
  /** «Tercer Gobierno de Pedro Sánchez». */
  nombre: string;
  presidente: string;
  /** Id de partidos.ts, o '' si no tenía partido. */
  partido: string;
  /** Para quien no está en partidos.ts (UCD, gobiernos sin partido). */
  color?: string;
  siglas: string;
  desde: string;
  /** null: el gobierno sigue (en funciones hasta que haya uno nuevo). */
  hasta: string | null;
  legislatura: string;
  llegada: {
    tipo: 'designacion' | 'investidura' | 'mocion';
    fecha: string;
    si?: number;
    no?: number;
    abst?: number;
    /** Investiduras que necesitaron segunda votación (mayoría simple) o que fallaron antes. */
    nota?: string;
  };
  /** Escaños propios y apoyos. */
  forma: string;
  /** Escaños del partido del presidente y, en coalición, los del socio que entra en el Gobierno. Sin Congreso elegido, nada. */
  escanos?: { propios: number; socio?: { siglas: string; n: number } };
  resumen: string;
  apartados: { titulo: string; puntos: string[] }[];
  final: string;
  fuente: { titulo: string; url: string };
}

const W = (articulo: string) => ({ titulo: 'Artículo del Gobierno (Wikipedia)', url: `https://es.wikipedia.org/wiki/${articulo}` });

export const etapas = [
  { titulo: 'La Transición', desde: '1975-11-20', texto: 'De la muerte de Franco a la Constitución y los primeros gobiernos elegidos.' },
  { titulo: 'Los gobiernos de Felipe González', desde: '1982-12-01', texto: 'Catorce años de PSOE: tres mayorías absolutas y una legislatura con el apoyo de CiU y PNV.' },
  { titulo: 'Los gobiernos de Aznar', desde: '1996-05-04', texto: 'Primera alternancia hacia el PP: una legislatura con apoyos nacionalistas y otra con mayoría absoluta.' },
  { titulo: 'Los gobiernos de Zapatero', desde: '2004-04-16', texto: 'Dos legislaturas del PSOE en minoría, de la expansión económica a la crisis de 2008.' },
  { titulo: 'Los gobiernos de Rajoy', desde: '2011-12-20', texto: 'Mayoría absoluta en plena crisis, fin del bipartidismo, Cataluña y la primera moción de censura que prospera.' },
  { titulo: 'Los gobiernos de Pedro Sánchez', desde: '2018-06-01', texto: 'Llegada por moción de censura, primera coalición desde la República y una legislatura sostenida por siete partidos.' },
];

export const gobiernos: Gobierno[] = [
  {
    id: 'arias-navarro', nombre: 'Gobierno de Arias Navarro (tras la muerte de Franco)', presidente: 'Carlos Arias Navarro', partido: '', color: '#8a8178', siglas: 'Sin partido',
    desde: '1975-11-20', hasta: '1976-07-03', legislatura: 'Cortes franquistas',
    llegada: { tipo: 'designacion', fecha: '1975-11-20', nota: 'Presidente desde enero de 1974, nombrado por Franco tras el asesinato de Carrero Blanco. El Rey lo mantiene al morir Franco.' },
    forma: 'Gobierno de la dictadura, sin elecciones ni partidos legales. Lo forman franquistas de línea dura y reformistas como Manuel Fraga o José María de Areilza.',
    resumen: 'Es el puente entre la dictadura y la Transición. Intenta una reforma limitada del franquismo, sin romper con él, mientras crecen las huelgas y las protestas que piden libertades y amnistía.',
    apartados: [
      { titulo: 'Qué hizo', puntos: [
        'Mantiene la estructura del régimen: Cortes no elegidas, Movimiento Nacional y partidos prohibidos.',
        'Aprueba en 1976 leyes de reunión y de asociación política que permiten algunas organizaciones, pero dentro de las reglas del franquismo.',
        'El Rey concede en noviembre de 1975 un indulto general que no alcanza a la mayoría de los presos políticos.',
      ] },
      { titulo: 'Crisis', puntos: [
        'En marzo de 1976 la policía mata a cinco trabajadores en una asamblea en una iglesia de Vitoria. En mayo, dos personas mueren en los incidentes de Montejurra (Navarra).',
        'La oposición clandestina se une en la Coordinación Democrática («Platajunta») para pedir una ruptura con el régimen.',
      ] },
    ],
    final: 'El 1 de julio de 1976 el Rey fuerza la dimisión de Arias Navarro y, de una terna del Consejo del Reino, elige a Adolfo Suárez.',
    fuente: W('Carlos_Arias_Navarro'),
  },
  {
    id: 'suarez-1', nombre: 'Primer Gobierno de Adolfo Suárez', presidente: 'Adolfo Suárez', partido: '', color: '#8a8178', siglas: 'Sin partido',
    desde: '1976-07-03', hasta: '1977-06-17', legislatura: 'Cortes franquistas',
    llegada: { tipo: 'designacion', fecha: '1976-07-03', nota: 'Designado por el Rey a propuesta del Consejo del Reino, como mandaban las leyes franquistas.' },
    forma: 'Gobierno nombrado por el Rey, sin partido, con ministros jóvenes procedentes del propio régimen.',
    resumen: 'Desmonta la dictadura desde dentro y con sus propias leyes («de la ley a la ley»): las Cortes franquistas votan su disolución, se legalizan los partidos y se convocan las primeras elecciones libres desde 1936.',
    apartados: [
      { titulo: 'Qué hizo', puntos: [
        'La Ley para la Reforma Política, aprobada por las propias Cortes franquistas en noviembre de 1976 y en referéndum en diciembre con el 97,4 % de los votos, abre la puerta a unas Cortes elegidas por sufragio universal.',
        'Primera amnistía para presos políticos (julio de 1976), ampliada en 1977.',
        'Legaliza los partidos y los sindicatos; el Partido Comunista, en abril de 1977. Desaparece el Movimiento Nacional.',
        'Un decreto-ley de marzo de 1977 fija las reglas electorales que, con pocos cambios, siguen hoy: la provincia como circunscripción, un mínimo de diputados por provincia y la ley D’Hondt.',
      ] },
      { titulo: 'Crisis', puntos: [
        'Enero de 1977 es especialmente violento: secuestros del GRAPO y la matanza de Atocha, en la que la extrema derecha asesina a cinco personas.',
        'Parte del Ejército se opone a la legalización del PCE; dimite el ministro de Marina.',
      ] },
    ],
    final: 'Suárez se presenta a las elecciones del 15 de junio de 1977 al frente de la UCD, que gana. El Rey lo confirma como presidente dos días después.',
    fuente: W('Primer_gobierno_de_Adolfo_Suárez'),
  },
  {
    id: 'suarez-2', nombre: 'Segundo Gobierno de Adolfo Suárez', presidente: 'Adolfo Suárez', partido: 'ucd', color: '#3f9a54', siglas: 'UCD',
    desde: '1977-06-17', hasta: '1979-03-30', legislatura: 'Constituyente',
    llegada: { tipo: 'designacion', fecha: '1977-06-17', nota: 'Confirmado por el Rey tras ganar las elecciones de 1977. Todavía no existía la investidura en el Congreso.' },
    escanos: { propios: 165 },
    forma: 'UCD en minoría, con 165 de 350 escaños. Gobierna buscando acuerdos con todos los partidos para hacer la Constitución.',
    resumen: 'La legislatura del consenso: las primeras Cortes elegidas redactan y aprueban la Constitución, y Gobierno y oposición pactan las reformas económicas.',
    apartados: [
      { titulo: 'Leyes y derechos', puntos: [
        'La Constitución, redactada por siete diputados de UCD, PSOE, PCE, AP y la minoría catalana, se aprueba en referéndum el 6 de diciembre de 1978 con el 87,8 % de los votos.',
        'Ley de Amnistía de octubre de 1977, aprobada casi por unanimidad. Saca de prisión a los presos políticos y también impide juzgar los crímenes del franquismo.',
        'La mayoría de edad baja de 21 a 18 años.',
      ] },
      { titulo: 'Economía', puntos: [
        'Pactos de la Moncloa (octubre de 1977) entre el Gobierno y los partidos para frenar una inflación de más del 20 %.',
        'Reforma fiscal: se crea el IRPF (1978) y se tipifica el delito fiscal.',
      ] },
      { titulo: 'Territorio', puntos: [
        'Régimen de preautonomías: vuelve la Generalitat de Cataluña con Josep Tarradellas, que regresa del exilio en octubre de 1977, y se crea el Consejo General Vasco.',
      ] },
    ],
    final: 'Aprobada la Constitución, Suárez disuelve las Cortes y convoca elecciones para el 1 de marzo de 1979.',
    fuente: W('Segundo_gobierno_de_Adolfo_Suárez'),
  },
  {
    id: 'suarez-3', nombre: 'Tercer Gobierno de Adolfo Suárez', presidente: 'Adolfo Suárez', partido: 'ucd', color: '#3f9a54', siglas: 'UCD',
    desde: '1979-03-30', hasta: '1981-02-25', legislatura: 'I',
    llegada: { tipo: 'investidura', fecha: '1979-03-30', si: 183, no: 149, abst: 8, nota: 'Primera investidura según la Constitución.' },
    escanos: { propios: 168 },
    forma: 'UCD en minoría, con 168 escaños, con el apoyo puntual de otros grupos.',
    resumen: 'Pone en marcha las instituciones de la Constitución y los primeros estatutos de autonomía, en años de crisis económica, de los atentados más mortíferos de ETA y de divisiones crecientes dentro de la UCD.',
    apartados: [
      { titulo: 'Leyes e instituciones', puntos: [
        'Leyes del Tribunal Constitucional (1979) y de Libertad Religiosa (1980).',
        'Estatuto de los Trabajadores (1980), la ley básica de las relaciones laborales que sigue vigente, reformada.',
        'Primeras elecciones municipales democráticas, en abril de 1979.',
      ] },
      { titulo: 'Territorio', puntos: [
        'Estatutos del País Vasco y de Cataluña (diciembre de 1979). En 1980 se eligen sus parlamentos: gobiernan el PNV y CiU.',
        'Andalucía vota en referéndum (28 de febrero de 1980) acceder a la autonomía por la vía rápida, como las «históricas». Lo logra tras un cambio legal, porque en Almería no se alcanzó la mayoría exigida.',
      ] },
      { titulo: 'Crisis', puntos: [
        'ETA mata a más personas que en ningún otro periodo.',
        'En mayo de 1980 el PSOE presenta una moción de censura con Felipe González como candidato. No prospera, pero desgasta al Gobierno.',
        'La UCD, una coalición de familias políticas distintas, se divide.',
      ] },
    ],
    final: 'Suárez dimite el 29 de enero de 1981. Durante la investidura de su sucesor, Leopoldo Calvo-Sotelo, se produce el intento de golpe de Estado del 23-F.',
    fuente: W('Tercer_gobierno_de_Adolfo_Suárez'),
  },
  {
    id: 'calvo-sotelo', nombre: 'Gobierno de Leopoldo Calvo-Sotelo', presidente: 'Leopoldo Calvo-Sotelo', partido: 'ucd', color: '#3f9a54', siglas: 'UCD',
    desde: '1981-02-25', hasta: '1982-12-01', legislatura: 'I',
    llegada: { tipo: 'investidura', fecha: '1981-02-25', si: 186, no: 158, abst: 0, nota: 'El 20 de febrero se quedó en 169 votos, sin mayoría absoluta. La segunda votación, el 23, la interrumpió el golpe; se repitió el 25.' },
    escanos: { propios: 168 },
    forma: 'UCD en minoría, con 168 escaños.',
    resumen: 'Un gobierno marcado por el 23-F y por la descomposición de la UCD. Aprueba el divorcio, mete a España en la OTAN y pacta con el PSOE cómo generalizar las autonomías.',
    apartados: [
      { titulo: 'Leyes y derechos', puntos: [
        'Ley del divorcio (julio de 1981).',
      ] },
      { titulo: 'Territorio', puntos: [
        'Pactos autonómicos con el PSOE (1981) para extender las autonomías a todo el país. Se aprueban la mayoría de los estatutos.',
        'La LOAPA, que pretendía armonizar las autonomías, la anula en buena parte el Tribunal Constitucional en 1983.',
      ] },
      { titulo: 'Exterior', puntos: [
        'España entra en la OTAN en mayo de 1982, con la oposición del PSOE.',
      ] },
      { titulo: 'Justicia', puntos: [
        'Juicio a los responsables del 23-F: en 1982 son condenados Tejero, Milans del Bosch y Armada, entre otros.',
      ] },
    ],
    final: 'Con la UCD dividida (Suárez funda el CDS), Calvo-Sotelo adelanta las elecciones al 28 de octubre de 1982. La UCD se queda en 11 escaños y desaparece poco después.',
    fuente: W('Gobierno_de_Leopoldo_Calvo-Sotelo'),
  },
  {
    id: 'gonzalez-1', nombre: 'Primer Gobierno de Felipe González', presidente: 'Felipe González', partido: 'psoe', siglas: 'PSOE',
    desde: '1982-12-01', hasta: '1986-07-23', legislatura: 'II',
    llegada: { tipo: 'investidura', fecha: '1982-12-01', si: 207, no: 115, abst: 22 },
    escanos: { propios: 202 },
    forma: 'PSOE con mayoría absoluta: 202 escaños, la mayor de la democracia.',
    resumen: 'Primera alternancia en el poder. Combina reformas sociales y de modernización del Estado con una dura reconversión industrial, y culmina la entrada de España en la Comunidad Europea.',
    apartados: [
      { titulo: 'Leyes y derechos', puntos: [
        'Aborto despenalizado en tres supuestos (1985).',
        'Ley de Reforma Universitaria (1983) y LODE (1985), que crea los colegios concertados.',
        'Ley General de Sanidad (1986), que crea el Sistema Nacional de Salud.',
        'Objeción de conciencia al servicio militar (1984) y Ley de Libertad Sindical (1985).',
      ] },
      { titulo: 'Economía', puntos: [
        'Expropiación del grupo Rumasa (1983).',
        'Reconversión industrial en siderurgia, astilleros y minería, con cierres y protestas.',
        'Reforma de las pensiones de 1985, que alarga el periodo de cálculo; CCOO convoca una huelga general en contra.',
        'Se crea el IVA (1986), exigencia de la entrada en la Comunidad Europea.',
      ] },
      { titulo: 'Justicia', puntos: [
        'La Ley Orgánica del Poder Judicial (1985) hace que las Cortes elijan a los veinte vocales del CGPJ.',
        'Actúan los GAL, grupos de guerra sucia contra ETA financiados con fondos públicos, como probarán después los tribunales.',
      ] },
      { titulo: 'Exterior', puntos: [
        'Firma del tratado de adhesión a la Comunidad Europea (junio de 1985); España entra el 1 de enero de 1986.',
        'Referéndum de la OTAN (marzo de 1986): el Gobierno pide quedarse y gana el sí.',
      ] },
    ],
    final: 'González agota casi la legislatura y gana de nuevo con mayoría absoluta en junio de 1986.',
    fuente: W('Primer_gobierno_de_Felipe_González'),
  },
  {
    id: 'gonzalez-2', nombre: 'Segundo Gobierno de Felipe González', presidente: 'Felipe González', partido: 'psoe', siglas: 'PSOE',
    desde: '1986-07-23', hasta: '1989-12-05', legislatura: 'III',
    llegada: { tipo: 'investidura', fecha: '1986-07-23', si: 184, no: 144, abst: 6 },
    escanos: { propios: 184 },
    forma: 'PSOE con mayoría absoluta: 184 escaños.',
    resumen: 'Años de fuerte crecimiento tras la entrada en Europa, pero también de ruptura del PSOE con los sindicatos, que culmina en la huelga general del 14-D.',
    apartados: [
      { titulo: 'Economía y trabajo', puntos: [
        'Crecimiento económico y llegada de fondos europeos.',
        'Huelga general del 14 de diciembre de 1988, convocada por UGT y CCOO contra un plan de empleo juvenil con contratos más baratos. El Gobierno lo retira.',
      ] },
      { titulo: 'Leyes', puntos: [
        'Ley de Costas (1988), que protege el dominio público del litoral.',
      ] },
      { titulo: 'Terrorismo', puntos: [
        'ETA comete sus atentados más mortíferos: Hipercor en Barcelona (21 muertos, 1987) y la casa cuartel de Zaragoza (diciembre de 1987).',
        'Los partidos firman pactos contra el terrorismo (Madrid, 1987, y Ajuria Enea, 1988). El Gobierno mantiene conversaciones con ETA en Argel (1989), que fracasan.',
      ] },
    ],
    final: 'González adelanta las elecciones a octubre de 1989. Ese año Alianza Popular se refunda como Partido Popular, con Aznar como candidato.',
    fuente: W('Segundo_gobierno_de_Felipe_González'),
  },
  {
    id: 'gonzalez-3', nombre: 'Tercer Gobierno de Felipe González', presidente: 'Felipe González', partido: 'psoe', siglas: 'PSOE',
    desde: '1989-12-05', hasta: '1993-07-09', legislatura: 'IV',
    llegada: { tipo: 'investidura', fecha: '1989-12-05', si: 176, no: 155, abst: 6 },
    escanos: { propios: 175 },
    forma: 'PSOE con 175 escaños, justo la mitad; los diputados de Herri Batasuna no ocupan su escaño.',
    resumen: 'La legislatura de 1992 (Juegos de Barcelona, Expo de Sevilla y primer AVE) y del Tratado de Maastricht, que acaba con una crisis económica y los primeros grandes casos de corrupción del PSOE.',
    apartados: [
      { titulo: 'Leyes y derechos', puntos: [
        'Pensiones no contributivas (1990) para quien no ha cotizado lo suficiente.',
        'LOGSE (1990): la enseñanza obligatoria se amplía hasta los 16 años.',
        'Ley de Seguridad Ciudadana («ley Corcuera», 1992); el Constitucional anula en 1993 la entrada en domicilios sin orden judicial.',
      ] },
      { titulo: 'Europa y exterior', puntos: [
        'Tratado de Maastricht (1992) y primera reforma de la Constitución, para que los ciudadanos europeos puedan presentarse a las municipales.',
        'Apoyo logístico a la Guerra del Golfo (1991).',
      ] },
      { titulo: 'Economía', puntos: [
        'Grandes inversiones de 1992. Después, crisis: la peseta se devalúa varias veces entre 1992 y 1993 y el paro se dispara.',
      ] },
      { titulo: 'Polémicas', puntos: [
        'Caso Juan Guerra: dimite el vicepresidente Alfonso Guerra (1991).',
        'Caso Filesa, sobre la financiación ilegal del PSOE.',
      ] },
    ],
    final: 'González adelanta las elecciones a junio de 1993. Las gana, pero pierde la mayoría absoluta.',
    fuente: W('Tercer_gobierno_de_Felipe_González'),
  },
  {
    id: 'gonzalez-4', nombre: 'Cuarto Gobierno de Felipe González', presidente: 'Felipe González', partido: 'psoe', siglas: 'PSOE',
    desde: '1993-07-09', hasta: '1996-05-04', legislatura: 'V',
    llegada: { tipo: 'investidura', fecha: '1993-07-09', si: 181, no: 165, abst: 1 },
    escanos: { propios: 159 },
    forma: 'PSOE en minoría, con 159 escaños, apoyado por CiU (17) y PNV (5).',
    resumen: 'Una legislatura corta dominada por los escándalos (Roldán, los GAL, las escuchas del CESID) y por la dependencia de CiU, que acaba retirando su apoyo.',
    apartados: [
      { titulo: 'Leyes', puntos: [
        'Código Penal de 1995, el vigente, conocido como «Código Penal de la democracia».',
        'Ley del Jurado (1995).',
      ] },
      { titulo: 'Economía y trabajo', puntos: [
        'Reforma laboral de 1994, que legaliza las empresas de trabajo temporal; huelga general en enero de 1994.',
        'Pacto de Toledo (1995): los partidos acuerdan revisar las pensiones de forma pactada.',
        'Más competencias fiscales para las comunidades, pactadas con CiU.',
      ] },
      { titulo: 'Polémicas', puntos: [
        'Fuga y captura del exdirector de la Guardia Civil Luis Roldán (1994-1995).',
        'Se reabren las investigaciones de los GAL; el caso Marey llevará a la condena del exministro Barrionuevo en 1998.',
        'Escuchas ilegales del CESID: dimiten el vicepresidente Narcís Serra y el ministro de Defensa (1995).',
      ] },
      { titulo: 'Exterior', puntos: [
        'Presidencia española de la UE (segundo semestre de 1995). Javier Solana, ministro de Exteriores, pasa a ser secretario general de la OTAN.',
      ] },
    ],
    final: 'CiU retira su apoyo y los presupuestos de 1996 no salen adelante. González adelanta las elecciones a marzo de 1996, que gana el PP por poco.',
    fuente: W('Cuarto_gobierno_de_Felipe_González'),
  },
  {
    id: 'aznar-1', nombre: 'Primer Gobierno de José María Aznar', presidente: 'José María Aznar', partido: 'pp', siglas: 'PP',
    desde: '1996-05-04', hasta: '2000-04-26', legislatura: 'VI',
    llegada: { tipo: 'investidura', fecha: '1996-05-04', si: 181, no: 166, abst: 1 },
    escanos: { propios: 156 },
    forma: 'PP en minoría, con 156 escaños, apoyado por CiU (16), PNV (5) y Coalición Canaria (4) tras el Pacto del Majestic.',
    resumen: 'Primer gobierno del PP. Se centra en cumplir los requisitos para entrar en el euro, privatiza las grandes empresas públicas y cede más competencias a las comunidades a cambio del apoyo nacionalista.',
    apartados: [
      { titulo: 'Economía', puntos: [
        'España cumple los criterios de Maastricht y entra en el euro desde su creación (1999).',
        'Privatización de Telefónica, Repsol, Endesa y Argentaria, entre otras.',
        'Reforma laboral de 1997, pactada con sindicatos y patronal, con un nuevo contrato indefinido con despido más barato.',
        'Liberalización del suelo (1998), de las telecomunicaciones y del sector eléctrico.',
      ] },
      { titulo: 'Territorio', puntos: [
        'Pacto del Majestic con CiU: las comunidades reciben el 30 % del IRPF, se suprimen los gobernadores civiles y los Mossos d’Esquadra asumen el tráfico en Cataluña.',
      ] },
      { titulo: 'Sociedad y terrorismo', puntos: [
        'Se anuncia el fin del servicio militar obligatorio, que llega en 2001.',
        'ETA asesina al concejal Miguel Ángel Blanco (1997), lo que provoca movilizaciones masivas.',
        'Tregua de ETA tras el acuerdo de Lizarra entre partidos nacionalistas (1998-1999). El Gobierno se reúne con ETA en 1999 y la tregua se rompe a finales de ese año.',
      ] },
    ],
    final: 'Aznar agota la legislatura y gana las elecciones de marzo de 2000 con mayoría absoluta.',
    fuente: W('Primer_gobierno_de_José_María_Aznar'),
  },
  {
    id: 'aznar-2', nombre: 'Segundo Gobierno de José María Aznar', presidente: 'José María Aznar', partido: 'pp', siglas: 'PP',
    desde: '2000-04-26', hasta: '2004-04-16', legislatura: 'VII',
    llegada: { tipo: 'investidura', fecha: '2000-04-26', si: 202, no: 148, abst: 0 },
    escanos: { propios: 183 },
    forma: 'PP con mayoría absoluta: 183 escaños. CiU y Coalición Canaria también votan la investidura.',
    resumen: 'Sin necesidad de socios, el Gobierno endurece la lucha contra ETA, apoya la invasión de Irak y aprueba reformas muy contestadas. Termina con los atentados del 11-M, tres días antes de las elecciones.',
    apartados: [
      { titulo: 'Terrorismo y justicia', puntos: [
        'Pacto por las Libertades y contra el Terrorismo con el PSOE (2000).',
        'Ley de Partidos (2002); el Supremo ilegaliza Batasuna en 2003.',
      ] },
      { titulo: 'Economía', puntos: [
        'Llegan los billetes y monedas de euro (2002).',
        'Ley de Estabilidad Presupuestaria, con el objetivo de «déficit cero» (2001).',
        'Plan Hidrológico Nacional con el trasvase del Ebro (2001), muy contestado en Aragón y Cataluña.',
        'Reforma del desempleo por decreto («decretazo»), que provoca la huelga general del 20 de junio de 2002 y se retira en parte.',
      ] },
      { titulo: 'Educación', puntos: [
        'Leyes de Universidades (2001) y de Calidad de la Educación (2002), con fuertes protestas de estudiantes.',
      ] },
      { titulo: 'Exterior y crisis', puntos: [
        'Crisis del islote de Perejil con Marruecos (2002).',
        'Hundimiento del Prestige frente a Galicia (2002) y protestas por su gestión.',
        'Apoyo a la invasión de Irak (cumbre de las Azores, 2003) frente a grandes manifestaciones en contra.',
        'Atentados yihadistas del 11-M (2004): el Gobierno atribuye inicialmente la autoría a ETA.',
      ] },
    ],
    final: 'Aznar no se presenta y designa a Mariano Rajoy como sucesor. El PSOE gana las elecciones del 14 de marzo de 2004.',
    fuente: W('Segundo_gobierno_de_José_María_Aznar'),
  },
  {
    id: 'zapatero-1', nombre: 'Primer Gobierno de José Luis Rodríguez Zapatero', presidente: 'José Luis Rodríguez Zapatero', partido: 'psoe', siglas: 'PSOE',
    desde: '2004-04-16', hasta: '2008-04-11', legislatura: 'VIII',
    llegada: { tipo: 'investidura', fecha: '2004-04-16', si: 183, no: 148, abst: 19 },
    escanos: { propios: 164 },
    forma: 'PSOE en minoría, con 164 escaños, apoyado en la investidura por ERC, IU-ICV, Coalición Canaria, BNG y CHA.',
    resumen: 'Primer gobierno paritario. Legislatura de ampliación de derechos civiles y sociales, en plena expansión económica e inmobiliaria, y de reformas de los estatutos de autonomía, con el del Estatut catalán como el más polémico.',
    apartados: [
      { titulo: 'Leyes y derechos', puntos: [
        'Ley Integral contra la Violencia de Género (2004).',
        'Matrimonio entre personas del mismo sexo y divorcio sin necesidad de alegar causa (2005).',
        'Ley de Igualdad entre mujeres y hombres (2007).',
        'Ley de Dependencia (2006).',
        'Ley de Memoria Histórica (2007).',
        'Ley antitabaco (2005) y carné por puntos (2006).',
      ] },
      { titulo: 'Inmigración y economía', puntos: [
        'Regularización extraordinaria de inmigrantes con contrato de trabajo (2005): más de medio millón de personas.',
        'Crecimiento económico apoyado en la construcción y superávit en las cuentas públicas. «Cheque bebé» de 2.500 euros por nacimiento (2007).',
      ] },
      { titulo: 'Territorio', puntos: [
        'Reforma de varios estatutos de autonomía. El nuevo Estatut de Cataluña (2006) se recorta en las Cortes, se aprueba en referéndum y el PP lo recurre al Constitucional.',
        'El Congreso rechaza el Plan Ibarretxe (2005).',
        'Se deroga el trasvase del Ebro.',
      ] },
      { titulo: 'Exterior y terrorismo', puntos: [
        'Retirada de las tropas de Irak nada más llegar.',
        'Proceso de diálogo con ETA tras su «alto el fuego permanente» (2006), que se rompe con el atentado de la T4 de Barajas.',
      ] },
    ],
    final: 'Zapatero agota la legislatura y vuelve a ganar en marzo de 2008, de nuevo sin mayoría absoluta.',
    fuente: W('Primer_gobierno_de_José_Luis_Rodríguez_Zapatero'),
  },
  {
    id: 'zapatero-2', nombre: 'Segundo Gobierno de José Luis Rodríguez Zapatero', presidente: 'José Luis Rodríguez Zapatero', partido: 'psoe', siglas: 'PSOE',
    desde: '2008-04-11', hasta: '2011-12-20', legislatura: 'IX',
    llegada: { tipo: 'investidura', fecha: '2008-04-11', si: 169, no: 158, abst: 23, nota: 'En la primera votación, el 9 de abril, se quedó en 168 votos, sin mayoría absoluta; salió en la segunda, por mayoría simple.' },
    escanos: { propios: 169 },
    forma: 'PSOE en minoría, con 169 escaños.',
    resumen: 'La legislatura de la Gran Recesión. El Gobierno pasa de los estímulos de 2008-2009 a los recortes de 2010 por la presión de los mercados y de la UE, y termina con un paro por encima del 20 %.',
    apartados: [
      { titulo: 'Economía y trabajo', puntos: [
        'Estímulos frente a la crisis, como el Plan E de obras municipales (2008-2009), y fondo de rescate para reestructurar las cajas de ahorros (FROB, 2009).',
        'Recortes de mayo de 2010: bajada del 5 % del sueldo de los funcionarios y congelación de las pensiones.',
        'Reforma laboral de 2010; huelga general el 29 de septiembre.',
        'Reforma de las pensiones (2011): la edad de jubilación sube gradualmente a 67 años.',
        'Reforma exprés del artículo 135 de la Constitución, pactada con el PP, para priorizar el pago de la deuda (2011).',
      ] },
      { titulo: 'Leyes y derechos', puntos: [
        'Ley del aborto de plazos (2010): libre en las primeras 14 semanas.',
        'Prohibición de fumar en todos los espacios públicos cerrados (2011).',
      ] },
      { titulo: 'Territorio y terrorismo', puntos: [
        'El Constitucional recorta el Estatut de Cataluña (2010), con grandes manifestaciones en Barcelona.',
        'ETA anuncia el cese definitivo de su actividad armada (octubre de 2011).',
      ] },
      { titulo: 'Sociedad', puntos: [
        'Movimiento 15-M (2011), acampadas contra los recortes y el funcionamiento de los partidos.',
      ] },
    ],
    final: 'Zapatero no se presenta y adelanta las elecciones a noviembre de 2011. El PP gana con mayoría absoluta.',
    fuente: W('Segundo_gobierno_de_José_Luis_Rodríguez_Zapatero'),
  },
  {
    id: 'rajoy-1', nombre: 'Primer Gobierno de Mariano Rajoy', presidente: 'Mariano Rajoy', partido: 'pp', siglas: 'PP',
    desde: '2011-12-20', hasta: '2016-10-29', legislatura: 'X (y XI en funciones)',
    llegada: { tipo: 'investidura', fecha: '2011-12-20', si: 187, no: 149, abst: 14 },
    escanos: { propios: 186 },
    forma: 'PP con mayoría absoluta: 186 escaños. Desde diciembre de 2015, en funciones durante diez meses.',
    resumen: 'Gobierno de ajustes en lo peor de la crisis: subidas de impuestos, recortes, reforma laboral y rescate bancario europeo. La economía vuelve a crecer desde 2014, pero los casos de corrupción del PP y el desgaste social acaban con el bipartidismo en 2015.',
    apartados: [
      { titulo: 'Economía y trabajo', puntos: [
        'Subida del IRPF (2011) y del IVA general al 21 % (2012).',
        'Reforma laboral de 2012: abarata el despido y da prioridad a los convenios de empresa.',
        'Rescate europeo de la banca (2012) y amnistía fiscal (2012), que el Constitucional anula en 2017.',
        'Ley de Estabilidad Presupuestaria (2012) y reforma de las pensiones de 2013, con subidas mínimas del 0,25 % al año.',
        'El paro llega al máximo de la serie, un 26,9 % (2013), y empieza a bajar.',
      ] },
      { titulo: 'Leyes', puntos: [
        'Ley de Transparencia (2013) y reforma educativa LOMCE («ley Wert», 2013).',
        'Ley de Seguridad Ciudadana (2015), llamada «ley mordaza» por sus críticos.',
        'Tasas judiciales (2012), en buena parte retiradas en 2015.',
        'El Gobierno retira la reforma del aborto de Gallardón (2014) y el ministro dimite.',
      ] },
      { titulo: 'Instituciones y territorio', puntos: [
        'Abdicación de Juan Carlos I y proclamación de Felipe VI (2014).',
        'Consulta del 9-N en Cataluña (2014), sin validez legal.',
      ] },
      { titulo: 'Polémicas', puntos: [
        '«Papeles de Bárcenas» y caso Gürtel. Dimite la ministra Ana Mato (2014).',
      ] },
    ],
    final: 'En las elecciones de diciembre de 2015 el PP pierde la mayoría absoluta y ningún candidato logra ser investido. Tras repetir las elecciones en junio de 2016, Rajoy es investido en octubre.',
    fuente: W('Primer_gobierno_de_Mariano_Rajoy'),
  },
  {
    id: 'rajoy-2', nombre: 'Segundo Gobierno de Mariano Rajoy', presidente: 'Mariano Rajoy', partido: 'pp', siglas: 'PP',
    desde: '2016-10-29', hasta: '2018-06-01', legislatura: 'XII',
    llegada: { tipo: 'investidura', fecha: '2016-10-29', si: 170, no: 111, abst: 68, nota: 'Rechazado dos veces en septiembre. En octubre sale adelante en segunda votación gracias a la abstención del PSOE, después de que Pedro Sánchez dimitiera como líder socialista.' },
    escanos: { propios: 137 },
    forma: 'PP en minoría, con 137 escaños, apoyado por Ciudadanos y Coalición Canaria.',
    resumen: 'Un gobierno en minoría que necesita pactar cada presupuesto, marcado por la crisis de Cataluña y por la sentencia del caso Gürtel, que provoca la primera moción de censura que prospera.',
    apartados: [
      { titulo: 'Economía', puntos: [
        'Presupuestos de 2017 y 2018 con el apoyo de Ciudadanos, PNV y los partidos canarios.',
        'Subida del 8 % del salario mínimo para 2017, pactada con el PSOE.',
        'Tras las protestas de los pensionistas, los presupuestos de 2018 suben las pensiones un 1,6 %.',
      ] },
      { titulo: 'Cataluña', puntos: [
        'Referéndum ilegal del 1-O (2017), declaración de independencia y primera aplicación del artículo 155: el Gobierno destituye al Govern y convoca elecciones catalanas.',
      ] },
      { titulo: 'Polémicas y crisis', puntos: [
        'El Congreso reprueba a varios ministros, algo inédito hasta entonces.',
        'Atentados yihadistas de Barcelona y Cambrils (agosto de 2017).',
      ] },
    ],
    final: 'La sentencia del caso Gürtel (mayo de 2018) condena al PP como beneficiario a título lucrativo y pone en duda la credibilidad de Rajoy como testigo. El PSOE presenta una moción de censura y Rajoy cae el 1 de junio de 2018.',
    fuente: W('Segundo_gobierno_de_Mariano_Rajoy'),
  },
  {
    id: 'sanchez-1', nombre: 'Primer Gobierno de Pedro Sánchez', presidente: 'Pedro Sánchez', partido: 'psoe', siglas: 'PSOE',
    desde: '2018-06-01', hasta: '2020-01-07', legislatura: 'XII (y XIII en funciones)',
    llegada: { tipo: 'mocion', fecha: '2018-06-01', si: 180, no: 169, abst: 1, nota: 'Moción de censura contra Rajoy, apoyada por PSOE, Unidos Podemos, ERC, PDeCAT, PNV, EH Bildu, Compromís y Nueva Canarias.' },
    escanos: { propios: 84 },
    forma: 'PSOE en solitario con solo 84 escaños, el gobierno con menos apoyo propio de la democracia. En funciones desde abril de 2019.',
    resumen: 'Un gobierno de transición que gobierna sobre todo por decreto-ley, con los presupuestos de Rajoy, hasta que los socios de la moción le tumban los suyos y convoca elecciones.',
    apartados: [
      { titulo: 'Trabajo y derechos', puntos: [
        'Salario mínimo de 900 euros en 2019, una subida del 22 %.',
        'Permisos de paternidad y maternidad iguales, ampliados hasta 16 semanas de forma progresiva.',
        'Registro obligatorio de la jornada laboral (2019).',
      ] },
      { titulo: 'Memoria', puntos: [
        'Exhumación de Franco del Valle de los Caídos (octubre de 2019), avalada por el Supremo.',
      ] },
      { titulo: 'Polémicas y crisis', puntos: [
        'Dimiten en sus primeros meses los ministros Màxim Huerta (por fraude fiscal) y Carmen Montón (por su máster).',
        'Sentencia del procés (octubre de 2019) y disturbios en Cataluña.',
      ] },
    ],
    final: 'ERC y PDeCAT votan con PP y Ciudadanos las enmiendas a la totalidad y los presupuestos de 2019 no salen. Sánchez adelanta las elecciones a abril de 2019; las gana, pero no logra la investidura en julio y se repiten en noviembre.',
    fuente: W('Primer_Gobierno_de_Pedro_Sánchez'),
  },
  {
    id: 'sanchez-2', nombre: 'Segundo Gobierno de Pedro Sánchez', presidente: 'Pedro Sánchez', partido: 'psoe', siglas: 'PSOE y Unidas Podemos',
    desde: '2020-01-07', hasta: '2023-11-16', legislatura: 'XIV',
    llegada: { tipo: 'investidura', fecha: '2020-01-07', si: 167, no: 165, abst: 18, nota: 'En segunda votación, por mayoría simple. Votan a favor PSOE, Unidas Podemos, PNV, Más País, Compromís, BNG, Nueva Canarias y Teruel Existe; ERC y EH Bildu se abstienen.' },
    escanos: { propios: 120, socio: { siglas: 'Unidas Podemos', n: 35 } },
    forma: 'Coalición PSOE (120) y Unidas Podemos (35), la primera desde la Segunda República: 155 escaños, en minoría.',
    resumen: 'La legislatura de la pandemia y de la guerra de Ucrania. El Gobierno aprueba un gran número de leyes sociales con una mayoría de varios partidos, gestiona los fondos europeos y concede los indultos del procés.',
    apartados: [
      { titulo: 'Pandemia y economía', puntos: [
        'Estado de alarma por la COVID-19 (marzo de 2020); el Constitucional anulará después parte del confinamiento.',
        'ERTE para millones de trabajadores e ingreso mínimo vital (2020).',
        'Plan de recuperación con los fondos europeos Next Generation.',
        'Medidas por la guerra de Ucrania, como la «excepción ibérica» para abaratar la luz (2022).',
      ] },
      { titulo: 'Trabajo y pensiones', puntos: [
        'Reforma laboral pactada con sindicatos y patronal (2021), que limita los contratos temporales; se convalida por un voto emitido por error.',
        'Las pensiones vuelven a subir con el IPC (2021) y se reforma su financiación (2023).',
        'El salario mínimo llega a 1.080 euros (2023).',
      ] },
      { titulo: 'Leyes y derechos', puntos: [
        'Eutanasia (2021), ley educativa LOMLOE (2020) y Ley de Cambio Climático (2021).',
        'Ley del «solo sí es sí» (2022), que provoca rebajas de penas y se reforma en 2023, y ley trans (2023).',
        'Ley de Memoria Democrática (2022) y primera ley estatal de vivienda (2023).',
      ] },
      { titulo: 'Cataluña y justicia', puntos: [
        'Indultos a los condenados del procés (2021).',
        'Se suprime el delito de sedición y se reforma la malversación (2022).',
        'El CGPJ sigue sin renovarse: PSOE y PP no llegan a un acuerdo.',
      ] },
      { titulo: 'Exterior', puntos: [
        'Apoyo a Ucrania tras la invasión rusa (2022).',
        'Giro sobre el Sáhara Occidental: apoyo al plan de autonomía de Marruecos (2022).',
      ] },
    ],
    final: 'Tras la derrota del PSOE en las municipales y autonómicas de mayo de 2023, Sánchez adelanta las generales a julio. Gana el PP, pero Feijóo no logra la investidura y Sánchez es investido en noviembre.',
    fuente: W('Segundo_Gobierno_de_Pedro_Sánchez'),
  },
  {
    id: 'sanchez-3', nombre: 'Tercer Gobierno de Pedro Sánchez', presidente: 'Pedro Sánchez', partido: 'psoe', siglas: 'PSOE y Sumar',
    desde: '2023-11-16', hasta: null, legislatura: 'XV',
    llegada: { tipo: 'investidura', fecha: '2023-11-16', si: 179, no: 171, abst: 0, nota: 'En primera votación. Votan a favor PSOE, Sumar, ERC, Junts, EH Bildu, PNV, BNG y Coalición Canaria; Junts, tras pactar la ley de amnistía.' },
    escanos: { propios: 121, socio: { siglas: 'Sumar', n: 31 } },
    forma: 'Coalición PSOE (121) y Sumar (31): 152 escaños, que bajan a 148 cuando Podemos deja el grupo de Sumar en diciembre de 2023. El PP tiene mayoría absoluta en el Senado.',
    resumen: 'Una legislatura que depende en cada votación de siete partidos con intereses distintos. Arranca con la amnistía, queda marcada por varios casos judiciales que afectan al entorno del Gobierno y del PSOE, y termina con la ruptura de Junts y el adelanto electoral.',
    apartados: [
      { titulo: 'Cataluña y justicia', puntos: [
        'Ley de amnistía (2024), avalada por el Constitucional (2025) y por la justicia europea (2026).',
        'Se renueva el CGPJ (2024) tras más de cinco años de bloqueo, en un acuerdo PSOE-PP.',
        'El Supremo condena al fiscal general del Estado (2025).',
      ] },
      { titulo: 'Leyes y derechos', puntos: [
        'Reforma del artículo 49 de la Constitución para cambiar «disminuidos» por «personas con discapacidad» (2024).',
        'El Congreso tumba la reducción de la jornada a 37,5 horas (2025) y los decretos de vivienda (2026).',
      ] },
      { titulo: 'Crisis', puntos: [
        'DANA de Valencia (octubre de 2024) y gran apagón (abril de 2025).',
        'Caso Koldo: el exministro José Luis Ábalos y su asesor, en prisión provisional (2025); dimite el secretario de Organización del PSOE, Santos Cerdán (2025).',
      ] },
      { titulo: 'Exterior', puntos: [
        'España reconoce al Estado de Palestina (2024).',
      ] },
    ],
    final: 'Junts rompe con el PSOE en octubre de 2025. Sin mayoría, Sánchez disuelve las Cortes en octubre de 2026 y convoca elecciones para el 29 de noviembre. El Gobierno sigue en funciones hasta la siguiente investidura.',
    fuente: W('Tercer_Gobierno_de_Pedro_Sánchez'),
  },
];

/** Ordinal del gobierno dentro de los de su presidente: «1.º de 4». */
export function ordinal(g: Gobierno) {
  const suyos = gobiernos.filter((x) => x.presidente === g.presidente);
  return { n: suyos.indexOf(g) + 1, de: suyos.length };
}

export const gobiernoPath = (id: string) => `/aprende/politica/gobiernos/${id}/`;

/** «3 años y 7 meses», hasta hoy si el gobierno sigue. */
export function duracion(g: Gobierno, hoy = '2026-10-18') {
  const [y1, m1, d1] = g.desde.split('-').map(Number);
  const [y2, m2, d2] = (g.hasta ?? hoy).split('-').map(Number);
  let meses = (y2 - y1) * 12 + (m2 - m1) - (d2 < d1 ? 1 : 0);
  const anios = Math.floor(meses / 12);
  meses %= 12;
  const a = anios ? `${anios} ${anios === 1 ? 'año' : 'años'}` : '';
  const m = meses ? `${meses} ${meses === 1 ? 'mes' : 'meses'}` : '';
  return [a, m].filter(Boolean).join(' y ') || 'menos de un mes';
}

export const llegadaTexto = (g: Gobierno) =>
  g.llegada.tipo === 'designacion' ? 'Designado por el Rey' : g.llegada.tipo === 'mocion' ? 'Moción de censura' : 'Investidura';
