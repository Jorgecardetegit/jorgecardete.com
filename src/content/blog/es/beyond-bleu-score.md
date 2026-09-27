---
title: "Más allá de la métrica BLEU"
description: "La métrica favorita de la traducción automática"
date: 2023-11-03
tags: [pln, métricas, traducción-automática]
icon: "🔤"
cover: "/blog/covers/beyond-bleu-score.jpg"
topic: ai
---

*La métrica favorita de la traducción automática. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/beyond-bleu-score-unraveling-the-myths-of-machine-translations-favorite-metric-afac33f56de8).*

![](https://miro.medium.com/v2/resize:fit:700/0*cypE60F1J65aTyrj)

En el mundo lleno de matices de la traducción, ¿cómo distinguimos una traducción mediocre de una excelente?

La respuesta no llega necesariamente de una persona experta, sino de una métrica ingeniosa: **BLEU**.

BLEU, *Bilingual Evaluation Understudy*, revolucionó la **traducción automática** al medir cuantitativamente la calidad de una traducción generada por una máquina frente a traducciones humanas de alta calidad.

Comprender el vocabulario, los matices culturales y el contexto de un idioma es un reto enorme. BLEU mide hasta qué punto una traducción automática se aproxima a la fluidez y comprensión de una persona traductora.

Su fuerza está en la simplicidad: compara estadísticamente la salida de una máquina con una referencia humana, considerando precisión en la elección de palabras y estructura. Esto ayuda a ajustar algoritmos y ampliar los límites de la IA para superar barreras lingüísticas.

Aquí veremos su origen, funcionamiento, impacto y limitaciones.

## Origen de BLEU

Kishore Papineni y colaboradores introdujeron BLEU en un *paper* de 2002.

Antes, evaluar traducciones automáticas era subjetivo y dependía mucho del juicio humano. Las evaluaciones eran lentas, costosas e inconsistentes. BLEU cambió esto al ofrecer una evaluación automatizada, rápida y objetiva.

## Cómo funciona BLEU

BLEU cuantifica la calidad de un texto traducido por máquina comparándolo con traducciones humanas de referencia a nivel de secuencias de palabras o *n-gramas*.

Se basa en dos componentes:

1. **Precisión de n-gramas.** Evalúa n-gramas de distinta longitud, normalmente de 1 a 4 palabras. Cuenta los que aparecen tanto en la traducción automática como en la referencia y los divide entre el total de n-gramas de la traducción automática.
2. **Penalización por brevedad (BP).** Penaliza traducciones demasiado cortas, porque una frase breve puede lograr precisión alta por casualidad. Si la traducción automática es más corta que la referencia, BP es menor que 1; si tiene la misma longitud o es más larga, BP vale 1.

La puntuación BLEU global se calcula así:

![](https://miro.medium.com/v2/resize:fit:321/0*9OVGYWXLvR1-seL3)

Aquí ***pn*** es la precisión de los n-gramas, ***wn*** el peso de cada n-grama —por ejemplo, 0,25 para cada uno si N = 4— y **N** el número de n-gramas considerados.

El logaritmo convierte el producto de precisiones en una suma y la exponencial lo invierte, manteniendo una puntuación positiva.

### Penalización por brevedad

BP compensa la longitud: si la traducción candidata es más corta que las referencias, su valor es menor que 1; en caso contrario vale 1.

![](https://miro.medium.com/v2/resize:fit:233/0*UPBSJdf6stToZITX)

Donde:

- ***c*** es la longitud de la traducción candidata.
- ***r*** es la longitud efectiva del corpus de referencia.

La longitud *r* se elige entre las referencias que sirven como traducciones estándar. El objetivo es igualar mejor la longitud candidata y evitar recompensas o penalizaciones injustas.

Estrategias habituales:

1. **Longitud más cercana:** elegir la referencia cuya longitud se parece más a la candidata. Es la opción más común.
2. **Longitud más corta:** algunas implementaciones usan la referencia más breve.
3. **Longitud media:** usar el promedio de todas las referencias, menos frecuente porque podría no coincidir con ninguna referencia real.

### Resultado

BLEU va de 0 a 1 —o de 0 a 100 como porcentaje— y 1 indica coincidencia perfecta con la referencia.

## Ejemplo

Supongamos:

- **Traducción automática (MT):** «The cat is on the mat.»
- **Traducción de referencia (RT):** «The cat is sitting on the mat.»

### Paso 1: precisión de n-gramas

- **Unigramas:** MT tiene 6 y los 6 aparecen en RT: **6/6 = 1**.
- **Bigramas:** MT tiene 5; 4 aparecen en RT: **4/5**.
- **Trigramas:** MT tiene 4; 3 aparecen en RT: **3/4**.
- **4-gramas:** MT tiene 3; 2 aparecen en RT: **2/3**.

### Paso 2: BP

MT tiene longitud 6, igual que RT. Por tanto, **BP = 1**.

### Paso 3: BLEU

Usando pesos uniformes de ***wn*** = 0,25:

![](https://miro.medium.com/v2/resize:fit:342/0*IHrLZ0uvGDpX86Vo)

Sustituimos los valores:

![](https://miro.medium.com/v2/resize:fit:700/0*k9A0lU5ferIbJZzu)

Calculamos logaritmos, los sumamos y aplicamos la exponencial:

![](https://miro.medium.com/v2/resize:fit:668/0*qmoUXD93OWkiOuRV)

![](https://miro.medium.com/v2/resize:fit:225/0*ZscmYE_RYz6NOw3l)

![](https://miro.medium.com/v2/resize:fit:314/0*Od88lgF-jcaWRUXc)

El BLEU del ejemplo es aproximadamente **0,7958**.

## Interpretar BLEU

Un 0,7958 es alto, sobre todo porque ni las traducciones humanas suelen lograr un resultado perfecto: hay muchas formas válidas de traducir la misma frase. Una puntuación cercana a 1 indica una traducción muy parecida a la referencia y, en teoría, de más calidad.

Pero hay matices:

- **El contexto importa.** Entre 0,7 y 0,8 puede ser excelente en unas aplicaciones; para traducción técnica, una desviación pequeña puede ser problemática.
- **Importa la referencia.** Una puntuación alta contra una mala referencia dice poco; una algo más baja contra una referencia idiomática excelente puede ser muy buena.
- **No es la única métrica.** BLEU no siempre se correlaciona con legibilidad o corrección gramatical.
- **No captura el significado.** No evalúa directamente precisión semántica ni preservación del sentido.

En el ejemplo, «The cat is on the mat» es correcto hasta cierto punto: el gato está en la alfombra. Pero no expresa que está sentado, así que es demasiado general si esa información importa.

## Limitaciones de BLEU

BLEU fue un gran avance, pero no mide bien la **precisión semántica**, la **corrección gramatical** ni la **flexibilidad del lenguaje**.

1. **No evalúa semántica.** Una traducción puede obtener BLEU alto y ser incorrecta o absurda en significado.
2. **Depende de las referencias.** Si no cubren suficientes traducciones correctas posibles, la puntuación no refleja bien la calidad.
3. **Falla en textos breves.** Con poco contexto y pocos n-gramas es menos fiable.
4. **Dominios distintos.** Si los datos de entrenamiento y prueba pertenecen a dominios diferentes, puede no reflejar el rendimiento real.
5. **Sensibilidad al tamaño del corpus.** En corpus pequeños las puntuaciones son más volátiles.
6. **Favorece la literalidad.** Las coincidencias exactas pueden penalizar traducciones idiomáticas o culturalmente adecuadas.
7. **No mide fluidez ni legibilidad.** Son factores clave desde la perspectiva humana.

Por estas limitaciones, BLEU suele usarse junto con métricas como **METEOR**, **ROUGE** o **BERTScore**, que intentan cubrir parte de sus carencias.
