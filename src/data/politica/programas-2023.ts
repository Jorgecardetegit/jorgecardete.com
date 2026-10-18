// Qué propuso cada partido en su programa de las generales del 23 de julio de 2023, tema a tema,
// para contrastarlo con lo que votó después. Cada propuesta cita la página del PDF del programa
// (la del visor, no la numeración impresa). Los textos en catalán y gallego están traducidos.
//
// Criterio: solo medidas concretas que el programa formula como propuesta propia (no balances de
// lo hecho ni iniciativas pasadas que el programa enumera), con su redacción lo más cercana posible
// al original y un máximo de cuatro por partido y tema. Que un partido no aparezca en un tema
// significa que no hemos encontrado una propuesta concreta sobre eso en su programa.
export const revisadoProgramas2023 = '2026-10-18';

export interface Programa {
  titulo: string;
  url: string;
  idioma?: string;
  nota?: string;
}

export const programas2023: Record<string, Programa> = {
  pp: { titulo: 'Programa electoral 23J', url: 'https://www.pp.es/storage/2023/07/programa_electoral_pp_23j_feijoo_2023.pdf' },
  psoe: { titulo: 'Programa electoral. Elecciones generales 2023', url: 'https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf' },
  vox: { titulo: 'Programa electoral 2023', url: 'https://www.voxespana.es/wp-content/uploads/2023/07/Programa-VOX-2023-con-menos-peso.pdf' },
  sumar: { titulo: 'Un programa para ti', url: 'https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf' },
  podemos: {
    titulo: 'Un programa para ti (Sumar)', url: 'https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf',
    nota: 'En 2023 Podemos se presentó dentro de Sumar y no tuvo programa propio: sus propuestas son las de Sumar.',
  },
  erc: { titulo: 'Programa electoral. Eleccions generals 2023', url: 'https://defensacatalunya.esquerrarepublicana.cat/documents/e2023-programa.pdf', idioma: 'catalán' },
  junts: {
    titulo: 'Programa electoral. Eleccions generals 2023', url: 'https://img.beteve.cat/wp-content/uploads/2023/07/programa-junts-per-catalunya-eleccions-generals-2023.pdf', idioma: 'catalán',
    nota: 'Copia publicada por Betevé: el partido ya no lo tiene en su web.',
  },
  bildu: { titulo: 'Compromiso de Euskal Herria Bildu', url: 'https://ehbildu.eus/dokumentuak/23J-COMPROMISO-DE-EUSKAL-HERRIA-BILDU.pdf' },
  pnv: { titulo: 'Con voz propia', url: 'https://www.eaj-pnv.eus/es/adjuntos-documentos/20945/pdf/con-voz-propia-programa-electoral-23-j' },
  bng: { titulo: 'Programa eleccións xerais 2023', url: 'https://www.bng.gal/media/bnggaliza/files/2023/07/05/23_bng_xerais_programa.pdf', idioma: 'gallego' },
  cc: { titulo: 'Coalición por Canarias', url: 'https://coalicioncanaria.org/wp-content/uploads/2023/06/COALICION_POR_CANARIAS.pdf' },
  upn: { titulo: 'Programa elecciones generales 23J', url: 'https://www.upn.org/wp-content/uploads/2023/07/Programa-Generales-23J_V2-1.pdf' },
};

/** Partidos de la lista sin programa de 2023 que comparar, y por qué. */
export const sinPrograma2023: Record<string, string> = {
  salf: 'Se Acabó La Fiesta no existía en 2023: se presentó por primera vez en las europeas de 2024.',
};

/** Propuesta: texto (t) y página del PDF (p). */
export type Propuesta = { t: string; p: number };

export const propuestas2023: Record<string, Record<string, Propuesta[]>> = {
  vivienda: {
    pp: [
      { t: 'Derogar la Ley de Vivienda.', p: 34 },
      { t: 'Poner suelo público a disposición del alquiler asequible y la vivienda social.', p: 34 },
      { t: 'Desalojos de viviendas okupadas en un plazo máximo de 24 horas, y que los okupas no puedan empadronarse.', p: 82 },
    ],
    psoe: [
      { t: '50.000 viviendas de la Sareb para alquiler social y asequible.', p: 223 },
      { t: 'Rehabilitar más de 500.000 viviendas en la legislatura.', p: 225 },
      { t: 'Reforma legal para desalojar a okupas en un máximo de 48 horas.', p: 251 },
    ],
    vox: [
      { t: 'Derogar la Ley por el derecho a la vivienda.', p: 43 },
      { t: 'Más beneficios fiscales a quien alquile su vivienda vacía.', p: 42 },
      { t: 'Movilizar suelo del Estado y activos de la Sareb para vivienda en alquiler social.', p: 41 },
      { t: 'Impedir que un okupa pueda empadronarse en la vivienda ocupada.', p: 41 },
    ],
    sumar: [
      { t: 'Reformar la Ley de Vivienda para incluir el alquiler social obligatorio para grandes tenedores y la dación en pago.', p: 77 },
      { t: 'Aplicar la regulación de alquileres en todas las zonas de mercado tensionado.', p: 79 },
      { t: 'Un parque público de dos millones de viviendas en alquiler, con un gasto del 1 % del PIB.', p: 79 },
    ],
    erc: [{ t: 'Mantener la limitación de los precios del alquiler e impulsar su reducción.', p: 52 }],
    junts: [{ t: 'Subir el gasto estatal en vivienda hasta la media europea (0,6 % del PIB) y transferirlo a la Generalitat.', p: 94 }],
    bildu: [{ t: 'Recuperar de forma indefinida la prórroga automática de los contratos de alquiler con la misma renta.', p: 4 }],
    pnv: [{ t: 'Equilibrio entre inquilino y propietario que asegure los derechos de ambos, y ceder suelo del Estado para vivienda (como los cuarteles de Loiola en Donostia).', p: 46 }],
    bng: [{ t: 'Transferir gratis a Galicia las viviendas y el suelo de la Sareb para ampliar el parque público.', p: 15 }],
    upn: [
      { t: 'Derogar la Ley de Vivienda y respetar las competencias de Navarra.', p: 6 },
      { t: 'Normas que protejan la propiedad privada y combatan la ocupación ilegal.', p: 6 },
    ],
  },
  pensiones: {
    pp: [{ t: 'Revalorizar las pensiones en el marco del Pacto de Toledo.', p: 19 }],
    psoe: [{ t: 'Seguir subiendo la pensión mínima hasta la media europea.', p: 163 }],
    vox: [{ t: 'Que las pensiones contributivas no paguen IRPF.', p: 75 }],
    sumar: [
      { t: 'Mantener la subida con el IPC y subir más las mínimas y no contributivas hasta llegar al umbral de la pobreza.', p: 15 },
      { t: 'Reforma constitucional que blinde el derecho a la Seguridad Social.', p: 34 },
    ],
    junts: [
      { t: 'Acercar la pensión mínima contributiva al salario mínimo.', p: 101 },
      { t: 'Ligar cualquier retraso de la edad de jubilación al aumento de la esperanza de vida.', p: 100 },
      { t: 'Pensiones complementarias de empresa pactadas en convenio para todos los trabajadores.', p: 100 },
    ],
    bildu: [
      { t: 'Subir de inmediato las pensiones mínimas a 1.080 €.', p: 5 },
      { t: 'Rechazo a subir la edad de jubilación o el periodo de cálculo.', p: 5 },
    ],
    pnv: [
      { t: 'Mantener la actualización de las pensiones con el IPC.', p: 33 },
      { t: 'Transferir a Euskadi la gestión del régimen económico de la Seguridad Social.', p: 33 },
    ],
    bng: [{ t: 'Subir las pensiones mínimas hasta el 60 % del salario medio.', p: 6 }],
    cc: [{ t: 'Pensiones actualizadas según el coste de la vida y reducir la brecha de género.', p: 7 }],
    upn: [{ t: 'Pensiones dignas y sin recortes.', p: 4 }],
  },
  trabajo: {
    pp: [{ t: 'Tarifa 0 para los nuevos autónomos durante el primer año.', p: 20 }],
    psoe: [
      { t: 'Fijar en el Estatuto de los Trabajadores que el salario mínimo sea el 60 % del salario medio.', p: 26 },
      { t: 'Seguir con el piloto de reducción de jornada sin bajar el sueldo en empresas industriales.', p: 50 },
    ],
    vox: [
      { t: 'Derogar la reforma laboral de 2021.', p: 24 },
      { t: 'Que no paguen cuota los autónomos que ingresen menos del salario mínimo.', p: 23 },
    ],
    sumar: [
      { t: 'Jornada máxima de 37,5 horas por ley en 2024 y diálogo social para llegar a 32, sin bajar el sueldo.', p: 24 },
      { t: 'Reforzar las garantías frente al despido (readmisión o indemnización disuasoria).', p: 27 },
    ],
    erc: [{ t: 'Semana laboral de cuatro días.', p: 53 }],
    bildu: [
      { t: 'Jornada de 32 horas semanales sin bajar el sueldo.', p: 3 },
      { t: 'Salario mínimo de 1.200 € y capacidad para fijar uno propio en Euskadi y Navarra.', p: 3 },
      { t: 'Transferir la Inspección de Trabajo.', p: 4 },
    ],
    pnv: [{ t: 'Que los convenios del ámbito vasco prevalezcan sobre los estatales (marco propio de relaciones laborales).', p: 30 }],
    bng: [
      { t: 'Subir el salario mínimo al 60 % del salario medio.', p: 6 },
      { t: 'Un marco gallego de relaciones laborales con capacidad legislativa propia.', p: 11 },
    ],
    cc: [{ t: 'Mantener los incentivos a la contratación indefinida de jóvenes por microempresas y autónomos.', p: 6 }],
  },
  economia: {
    pp: [
      { t: 'Deflactar el IRPF y bajar temporalmente el IVA de carne, pescado y conservas.', p: 23 },
      { t: 'Eliminar el impuesto a las grandes fortunas.', p: 23 },
    ],
    psoe: [{ t: 'Evaluar el impuesto temporal a las grandes fortunas y debatir la tributación de la riqueza en la financiación autonómica.', p: 39 }],
    vox: [
      { t: 'Bajar el Impuesto de Sociedades hasta el 15 %.', p: 77 },
      { t: 'Volver al IVA de antes de 2012 (reducido del 8 % y general del 18 %) y quitar el IVA a la compra de primera vivienda.', p: 76 },
    ],
    sumar: [
      { t: 'Impuesto permanente a las grandes fortunas, con tipos de al menos el 4 % para los mayores patrimonios.', p: 16 },
      { t: 'IRPF con nuevos tramos hasta el 52 % para rentas desde 300.000 €.', p: 17 },
      { t: '«Herencia universal» de 20.000 € a los 23 años, pagada con el impuesto a las grandes fortunas.', p: 15 },
    ],
    erc: [{ t: 'Impuestos a las grandes fortunas, a las transacciones financieras y a las emisiones de CO2, y revertir el déficit fiscal de Cataluña.', p: 8 }],
    junts: [
      { t: 'Que la Generalitat sea titular de todos los impuestos pagados en Cataluña y los recaude su Agencia Tributaria.', p: 57 },
      { t: 'Deflactar todos los impuestos y bajar Sociedades de las pymes del 25 % al 20 %.', p: 58 },
    ],
    bildu: [{ t: 'Hacer permanentes y subir los impuestos a la banca, las energéticas y las grandes fortunas, gestionados por las haciendas forales.', p: 8 }],
    bng: [{ t: 'Financiación con concierto económico: que Galicia recaude todos sus impuestos.', p: 11 }],
    cc: [
      { t: 'Nueva financiación autonómica que separe del todo los recursos del Régimen Económico y Fiscal canario.', p: 5 },
      { t: 'Ampliar diez años la bonificación del 60 % del IRPF para los residentes en La Palma.', p: 5 },
    ],
    upn: [{ t: 'Bajar impuestos y deflactar la tarifa del IRPF.', p: 2 }],
  },
  inmigracion: {
    pp: [
      { t: 'Más medios, tecnología y coordinación de Policía y Guardia Civil en la gestión de las fronteras.', p: 81 },
      { t: 'Impulsar el Pacto Europeo de Migración y Asilo.', p: 99 },
    ],
    psoe: [{ t: 'Vías de migración regular, ordenada y circular, y agilizar las oficinas de extranjería.', p: 256 }],
    vox: [
      { t: 'Consultar a los españoles en referéndum sobre la política migratoria.', p: 100 },
      { t: 'Suprimir el arraigo como vía de regularización y no poder cambiar la expulsión por una multa.', p: 103 },
      { t: 'Plataformas de desembarco fuera de la UE para tramitar el asilo.', p: 102 },
      { t: 'Despliegue militar en las fronteras de Ceuta, Melilla y Canarias.', p: 91 },
    ],
    sumar: [
      { t: 'Nueva ley de extranjería con un procedimiento de regularización permanente.', p: 104 },
      { t: 'Cerrar los centros de internamiento de extranjeros (CIE).', p: 105 },
    ],
    erc: [{ t: 'Un Pacto Europeo de Migración y Asilo centrado en los derechos humanos y el derecho de asilo.', p: 14 }],
    junts: [
      { t: 'Que Cataluña pueda decidir sobre los flujos migratorios.', p: 107 },
      { t: 'Acabar con las devoluciones en caliente.', p: 107 },
    ],
    bildu: [
      { t: 'Derogar la Ley de Extranjería y sustituirla por otra que garantice todos los derechos.', p: 11 },
      { t: 'Fin de las devoluciones en caliente.', p: 11 },
    ],
    pnv: [
      { t: 'Una política europea común de inmigración y asilo.', p: 10 },
      { t: 'Alternativas al internamiento en los CIE.', p: 11 },
    ],
    bng: [{ t: 'Cerrar los CIE y poner fin a las deportaciones.', p: 20 }],
    cc: [
      { t: 'Que la llegada de menores no acompañados sea asunto prioritario del Estado y todas las comunidades participen en su acogida.', p: 13 },
      { t: 'Más cooperación de la UE con los países de origen y tránsito contra la inmigración irregular.', p: 13 },
    ],
  },
  territorio: {
    pp: [
      { t: 'Recuperar el delito de sedición.', p: 72 },
      { t: 'Reforzar la cooperación con las comunidades y la Conferencia de Presidentes.', p: 78 },
    ],
    psoe: [{ t: 'Una Ley de Cohesión Territorial y reforzar la Conferencia de Presidentes.', p: 231 }],
    vox: [
      { t: 'Un Estado unitario; mientras tanto, devolver al Estado Educación, Sanidad, Seguridad y Justicia.', p: 8 },
      { t: 'Suprimir los privilegios fiscales basados en «derechos históricos».', p: 8 },
    ],
    sumar: [
      { t: 'Nuevo modelo de financiación autonómica con un suelo para los servicios públicos.', p: 121 },
      { t: 'Reconocer el plurilingüismo y la realidad plurinacional.', p: 121 },
    ],
    erc: [
      { t: 'Negociar un referéndum de autodeterminación de Cataluña.', p: 8 },
      { t: 'Amnistía.', p: 8 },
      { t: 'Traspaso completo de Rodalies y Media Distancia a la Generalitat.', p: 8 },
    ],
    junts: [
      { t: 'Ley de amnistía «para todos los represaliados».', p: 24 },
      { t: 'Reconocer el derecho de autodeterminación de Cataluña.', p: 5 },
      { t: 'Mientras tanto, cambiar la financiación de la Generalitat aplicando el principio de ordinalidad.', p: 34 },
    ],
    bildu: [
      { t: 'Reconocer Euskal Herria como nación y su derecho a decidir.', p: 14 },
      { t: 'Transferir todas las competencias pendientes del Estatuto vasco y del Amejoramiento navarro.', p: 15 },
    ],
    pnv: [
      { t: 'Defender el Estatuto, el Concierto Económico y la nación vasca frente a la recentralización.', p: 6 },
      { t: 'Oficialidad del euskera, el catalán y el gallego en las instituciones europeas.', p: 36 },
    ],
    bng: [{ t: 'Derecho de autodeterminación y un proceso constituyente propio hacia una República gallega.', p: 10 }],
    cc: [
      { t: 'Desarrollar el Estatuto canario de 2018 y hacer cumplir el Régimen Económico y Fiscal.', p: 4 },
      { t: 'Máximo autogobierno para Canarias dentro de un Estado plurinacional consensuado.', p: 3 },
    ],
    upn: [
      { t: 'Impedir que partidos sin diputados navarros negocien competencias de Navarra.', p: 2 },
      { t: 'Defender el Convenio Económico navarro.', p: 2 },
    ],
  },
  instituciones: {
    pp: [
      { t: 'Que los jueces elijan a los 12 vocales judiciales del CGPJ.', p: 75 },
      { t: 'Reformar la ley del indulto para que el Gobierno tenga que motivarlo más.', p: 75 },
    ],
    psoe: [
      { t: 'Suprimir los aforamientos de cargos públicos para los delitos ajenos a su cargo.', p: 246 },
      { t: 'Debates electorales obligatorios por ley.', p: 247 },
    ],
    vox: [
      { t: 'Que todos los vocales del CGPJ los elijan jueces y magistrados.', p: 127 },
      { t: 'Integrar el Tribunal Constitucional en el Supremo como una Sala Sexta.', p: 126 },
    ],
    sumar: [
      { t: 'Reformular el sistema de elección del CGPJ para evitar su uso partidista.', p: 129 },
      { t: 'Cambiar los nombramientos del Tribunal Constitucional para evitar bloqueos en su renovación.', p: 129 },
    ],
    erc: [{ t: 'Derecho a voto desde los 16 años.', p: 53 }],
    junts: [{ t: 'Reformar el Reglamento del Congreso para que la Mesa no pueda bloquear debates (como la autodeterminación o la monarquía).', p: 26 }],
    bildu: [
      { t: 'Derogar la «ley mordaza».', p: 12 },
      { t: 'Sustituir la Ley de Secretos Oficiales.', p: 13 },
    ],
    pnv: [
      { t: 'Suprimir todos los aforamientos y la inviolabilidad del Rey.', p: 13 },
      { t: 'Nueva Ley de Secretos Oficiales.', p: 12 },
    ],
    bng: [{ t: 'Derogar entera la «ley mordaza».', p: 27 }],
  },
  igualdad: {
    pp: [
      { t: 'Seguir cumpliendo y actualizar el Pacto de Estado contra la violencia de género.', p: 62 },
      { t: 'Legislar sobre transexualidad «con la máxima prudencia».', p: 42 },
    ],
    psoe: [
      { t: 'Ley contra el proxenetismo en todas sus formas, incluida la tercería locativa, para abolir la prostitución.', p: 158 },
      { t: 'Garantizar el aborto en igualdad de condiciones en todas las comunidades y «zonas de seguridad» alrededor de las clínicas.', p: 160 },
    ],
    vox: [
      { t: 'Derogar la Ley Integral de Violencia de Género y aprobar una ley para todas las víctimas de violencia doméstica.', p: 164 },
      { t: 'Derogar la ley trans.', p: 173 },
      { t: 'Derogar las leyes del aborto y la eutanasia.', p: 58 },
    ],
    sumar: [{ t: 'Reducir la brecha salarial ampliando y reforzando los planes de igualdad en las empresas.', p: 108 }],
    bildu: [{ t: 'Reconocer el derecho a decidir sobre el propio cuerpo y defender las leyes LGTBIQ+ aprobadas.', p: 10 }],
    pnv: [{ t: 'Aplicar todo el marco legal contra la discriminación de las mujeres y la violencia machista.', p: 26 }],
    bng: [{ t: 'Incluir el término «feminicidio» en la ley y un Estatuto de la Víctima de Feminicidio.', p: 22 }],
    cc: [{ t: 'Aplicar el Convenio de Estambul en todo el Estado y oponerse a cualquier retroceso en las leyes contra la violencia de género.', p: 8 }],
    upn: [{ t: 'Defensa de la familia y la vida.', p: 3 }],
  },
  medioambiente: {
    pp: [
      { t: 'Alargar la vida de las centrales nucleares si el CSN lo avala.', p: 38 },
      { t: 'Un pacto nacional del agua.', p: 37 },
    ],
    psoe: [
      { t: 'Una ley que zonifique dónde se pueden instalar renovables.', p: 74 },
      { t: '700.000 empleos verdes.', p: 75 },
    ],
    vox: [
      { t: 'Plan Nacional del Agua con la interconexión de todas las cuencas.', p: 109 },
      { t: 'Quitar los impuestos de la factura de la luz.', p: 116 },
      { t: 'Pedir en Europa suspender la prohibición del motor de combustión en 2035.', p: 50 },
    ],
    sumar: [
      { t: 'Elevar los objetivos de la Ley de Cambio Climático: 55 % menos emisiones en 2030.', p: 41 },
      { t: 'Mantener el calendario de cierre nuclear, con moratoria a nuevas iniciativas.', p: 48 },
      { t: 'Un fondo público de inversión en renovables.', p: 46 },
    ],
    erc: [{ t: 'Eliminar el impuesto al autoconsumo eléctrico.', p: 78 }],
    junts: [{ t: 'Revisar los caudales mínimos del Ebro para conservar el Delta.', p: 46 }],
    bildu: [
      { t: 'Neutralidad climática en 2040.', p: 9 },
      { t: 'Transferencia completa de los trenes de Cercanías a las instituciones vascas.', p: 6 },
    ],
    pnv: [{ t: 'Desarrollar el hidrógeno verde con renovables.', p: 23 }],
    bng: [
      { t: 'Una tarifa eléctrica gallega más barata por ser Galicia excedentaria en electricidad.', p: 48 },
      { t: 'Galicia libre de eólica marina en las áreas marinas protegidas.', p: 44 },
    ],
    cc: [
      { t: 'Mantener al 100 % la bonificación de guaguas y tranvías más allá de 2023.', p: 5 },
      { t: 'Compensación anual para moderar el precio del agua desalada en Canarias.', p: 10 },
    ],
    upn: [{ t: 'Tren de alta velocidad hasta Pamplona y segunda fase del Canal de Navarra.', p: 3 }],
  },
  sanidad: {
    pp: [
      { t: 'Plan de choque en Atención Primaria y 1.000 plazas más de formación en medicina de familia.', p: 45 },
      { t: 'Un plan de prevención del suicidio.', p: 49 },
    ],
    psoe: [{ t: 'Tiempos máximos de espera por ley: 120 días para operaciones, 60 para especialistas y 30 para pruebas.', p: 201 }],
    vox: [
      { t: 'Tarjeta sanitaria única, historia clínica unificada y cartera de servicios común.', p: 56 },
      { t: 'Devolver al Estado las competencias de sanidad.', p: 8 },
    ],
    sumar: [{ t: 'Pacto de Estado por la salud mental con más psicólogos en la sanidad pública.', p: 90 }],
    erc: [{ t: 'Suprimir los ministerios cuyas competencias son de las comunidades, como Sanidad.', p: 24 }],
    junts: [{ t: 'Corregir el déficit de financiación de la sanidad pública catalana.', p: 16 }],
    bildu: [
      { t: 'Derogar la Ley 15/1997, que permite externalizar la gestión sanitaria.', p: 6 },
      { t: 'Multiplicar el presupuesto de salud mental y las plazas de psicología clínica (PIR).', p: 6 },
    ],
    bng: [
      { t: 'Modificar la Ley 15/1997 para frenar la privatización sanitaria.', p: 35 },
      { t: 'Acabar con los copagos farmacéuticos.', p: 36 },
    ],
    cc: [{ t: 'Que la salud sea un derecho fundamental protegido en la Constitución.', p: 8 }],
  },
  educacion: {
    pp: [{ t: 'Una prueba de acceso a la universidad (EBAU) común para toda España.', p: 52 }],
    psoe: [{ t: 'Universidad y FP superior gratis para quien apruebe a la primera, y más becas.', p: 116 }],
    vox: [
      { t: 'Cheque escolar para elegir centro libremente.', p: 33 },
      { t: 'Devolver al Estado las competencias de Educación.', p: 32 },
    ],
    sumar: [
      { t: 'Plazas gratuitas de educación infantil de 0 a 3 años para toda la demanda.', p: 94 },
      { t: 'Más becas y eliminar su parte variable.', p: 103 },
    ],
    erc: [{ t: 'Traspasar las becas universitarias a Cataluña, el País Valenciano y Baleares.', p: 53 }],
    junts: [{ t: 'Respetar el modelo de escuela catalana y transferir la gestión de las becas.', p: 16 }],
    bildu: [{ t: 'Blindar los modelos educativos y lingüísticos propios frente a cambios impuestos.', p: 15 }],
    pnv: [{ t: 'Respetar el modelo vasco de EBAU y las competencias educativas.', p: 48 }],
    bng: [
      { t: 'Dedicar al menos el 7 % del PIB a educación.', p: 34 },
      { t: 'Transferir a Galicia la gestión de las becas universitarias.', p: 34 },
    ],
    cc: [{ t: 'Reconocer por ley la gratuidad de la educación infantil de 0 a 3 años.', p: 6 }],
    upn: [
      { t: 'Libertad de elección de centro, público o concertado, y no imponer el euskera.', p: 4 },
      { t: 'Derogar la LOMLOE.', p: 4 },
    ],
  },
  exterior: {
    pp: [
      { t: 'Apoyo a Ucrania y sanciones a Rusia.', p: 101 },
      { t: 'Llegar a 140.000 efectivos en las Fuerzas Armadas.', p: 103 },
      { t: 'Relación equilibrada con Marruecos y Argelia.', p: 101 },
    ],
    psoe: [{ t: 'Seguir apoyando a Ucrania.', p: 259 }],
    vox: [
      { t: 'Presión internacional para recuperar Gibraltar.', p: 17 },
      { t: 'Más inversión en defensa.', p: 93 },
    ],
    sumar: [
      { t: 'Revertir el cambio de posición de 2022 sobre el Sáhara Occidental y apoyar su autodeterminación.', p: 141 },
      { t: 'Pasar de las garantías de la OTAN a una autonomía estratégica europea.', p: 139 },
      { t: 'Solidaridad con Ucrania y más ayuda humanitaria.', p: 141 },
    ],
    erc: [
      { t: 'Revertir el reconocimiento de la soberanía marroquí sobre el Sáhara Occidental.', p: 14 },
      { t: 'Apoyo a Ucrania frente a la invasión rusa.', p: 14 },
    ],
    junts: [{ t: 'Que el Estado deje de obstaculizar la acción exterior de la Generalitat.', p: 18 }],
    pnv: [{ t: 'Apoyo de la UE a Ucrania como prioridad.', p: 35 }],
    bng: [
      { t: 'Salir de la OTAN.', p: 67 },
      { t: 'Frenar el aumento del gasto militar.', p: 6 },
    ],
    cc: [{ t: 'Que Canarias participe en las negociaciones con Marruecos sobre aguas y migración.', p: 5 }],
  },
  memoria: {
    pp: [{ t: 'Derogar la Ley de Memoria Democrática.', p: 72 }],
    psoe: [{ t: 'Culminar la resignificación de Cuelgamuros con un centro de interpretación.', p: 253 }],
    vox: [
      { t: 'Derogar las leyes de memoria y aprobar una «Ley de Concordia».', p: 158 },
      { t: 'Que los crímenes de ETA se consideren de lesa humanidad para que no prescriban.', p: 129 },
    ],
    sumar: [
      { t: 'Desarrollar la Ley de Memoria Democrática: censo de víctimas y banco de ADN.', p: 134 },
      { t: 'Una ley de «bebés robados».', p: 135 },
    ],
    erc: [{ t: 'Cambiar la Ley de Amnistía de 1977 o el Código Penal para poder juzgar los crímenes del franquismo.', p: 33 }],
    junts: [{ t: 'Cambiar la ley de memoria para acabar con la impunidad de los crímenes franquistas.', p: 23 }],
    bildu: [{ t: 'Ampliar la Ley de Memoria a víctimas de la tortura y del terrorismo de Estado.', p: 12 }],
    pnv: [{ t: 'Aplicar plenamente las leyes de memoria.', p: 9 }],
    bng: [{ t: 'Amparo judicial a las víctimas del franquismo y recuperar los bienes expoliados, como hizo con el Pazo de Meirás.', p: 28 }],
    upn: [
      { t: 'Derogar la Ley de Memoria Democrática.', p: 3 },
      { t: 'Cambios legales para acabar con los homenajes a los terroristas de ETA.', p: 3 },
    ],
  },
};
