---
title: "La métrica METEOR: un clásico del PLN"
description: "Una mejora en la evaluación de traducción automática"
date: 2024-02-07
tags: [pln, métricas, machine-learning]
icon: "📏"
cover: "/blog/covers/meteor-metric.jpg"
topic: ai
---

*Una mejora en la evaluación de traducción automática. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/the-meteor-metric-an-nlp-classic-42552cb6ce69).*

![Creada con DALL-E 3 por el autor](https://miro.medium.com/v2/resize:fit:700/0*-tX_8yr2dBWJk7pC)
*Creada con DALL-E 3 por el autor*

Las métricas tempranas, como la **tasa de error de palabra (WER)** y **BLEU** (*Bilingual Evaluation Understudy*), fueron pioneras en la evaluación de traducción automática.

En particular, **BLEU** se convirtió en el estándar de la industria tras su introducción a comienzos de los años **2000**, gracias a su sencillez y a que se calcula rápidamente.

Sin embargo, su énfasis en las **coincidencias exactas de palabras** suele correlacionarse poco con el juicio humano, especialmente cuando hay **sinónimos** o **paráfrasis**.

> **[Beyond BLEU Score: Unraveling the Myths of Machine Translation’s Favorite Metric](https://medium.com/@jorgecardete/beyond-bleu-score-unraveling-the-myths-of-machine-translations-favorite-metric-afac33f56de8)**
> ¿Cómo distinguimos una traducción mediocre en el mundo lleno de matices de la traducción de idiomas?

**METEOR** nació como respuesta a esa limitación. Investigadores de [Carnegie Mellon University](https://www.cmu.edu/) lo presentaron en 2005.

Su innovación fue incorporar **reducción a la raíz** (*stemming*) y **coincidencia de sinónimos**, además de las coincidencias exactas, para capturar más significado del texto traducido.

METEOR introdujo también una estrategia de alineamiento que intenta imitar la intuición humana al **considerar el orden y la proximidad** de las palabras.

## Componentes de METEOR

### Coincidencia exacta

La evaluación más básica compara directamente las palabras del **texto traducido por la máquina** con las palabras del **texto de referencia**.

Es la base sobre la que se construyen los demás componentes.

### Stemming

Como las palabras pueden adoptar **formas morfológicas diferentes**, METEOR usa algoritmos de *stemming* para reducirlas a su **raíz**.

Así, palabras con la **misma raíz y sufijos distintos** —por ejemplo, «conectar», «conectado» y «conectando»— se consideran equivalentes, algo que la coincidencia exacta tradicional no detectaría.

### Coincidencia de sinónimos

Para capturar significado más allá de la forma de las palabras, METEOR usa coincidencias de sinónimos con **WordNet** u otras **bases de datos** similares.

Esto permite reconocer que una palabra traducida tiene el mismo significado que una palabra de la referencia aunque sea distinta, como «rápido» y «veloz».

## Mecanismo de puntuación

METEOR calcula su puntuación a partir de **precisión** y **recall**, medidas habituales en recuperación de información:

- La **precisión** es la proporción de palabras del texto traducido por máquina que, según la referencia, están correctamente traducidas.
- El **recall** mide la proporción de palabras de la traducción de referencia que aparecen en el texto traducido por máquina.

![Precisión y recall](https://miro.medium.com/v2/resize:fit:700/0*EKIk_rUIt9Itzecu)
***Precisión** y **recall** | [Fuente](https://towardsdatascience.com/precision-and-recall-made-simple-afb5e098970f)*

METEOR combina ambas medidas mediante la [**media armónica**](https://en.wikipedia.org/wiki/Harmonic_mean), un promedio que equilibra precisión y recall.

> La media armónica se pondera a favor del recall, pues la investigación sugiere que este es ligeramente más importante en la evaluación de traducción.

![](https://miro.medium.com/v2/resize:fit:170/0*GkAMvFa_3ws3cr5O)

En la fórmula, **P** representa la precisión y **R** el recall:

- Si ***α*** *= 1*, precisión y recall pesan lo mismo y la fórmula se reduce a la media armónica tradicional.
- Si *α < 1*, se reduce la contribución de la precisión, por lo que el **recall influye más** en la puntuación final.
- Si *α > 1*, la precisión tendría más peso que el recall; no es el caso de METEOR.

## Alineamiento

El alineamiento es esencial en METEOR: describe cómo se emparejan las palabras del texto traducido por máquina con las del texto de referencia. A diferencia de **BLEU**, que trata de forma independiente todas las coincidencias posibles de *n-gramas*, METEOR incluye un paso explícito de alineamiento que:

- **Minimiza los cruces**, es decir, las palabras que deberían reordenarse para coincidir con la referencia.
- Tiene en cuenta la **proximidad** de las coincidencias: las parejas de palabras más cercanas tienen más probabilidad de ser correctas.
- Permite correspondencias de muchas palabras a una y de una a muchas, reconociendo que una misma traducción correcta puede formularse de distintas maneras.

![Representación de alineamiento](https://miro.medium.com/v2/resize:fit:677/1*awnmD_zrE8Qg8bmMloeo-w.png)
*Representación de alineamiento | [Fuente](https://www.researchgate.net/figure/French-English-pair-with-complex-word-alignment-parses-Alignment-is-also-used-in_fig1_220874169)*

### Ejemplo práctico

Imaginemos que queremos traducir al español esta frase inglesa:

**Inglés (origen):** «Children play joyfully in the park.»

**Español (referencia):** «Los niños juegan alegremente en el parque.»

Comparemos dos traducciones automáticas:

- **Traducción A:** «Los niños juegan felizmente en el parque».
- **Traducción B:** «Los infantes están jugando en el área de juego».

### Traducción A: «Los niños juegan felizmente en el parque»

**Fase 1: coincidencias**

- **Coincidencias exactas:** «Los», «niños», «juegan», «en», «el», «parque» (6).
- **Coincidencia de sinónimos:** «felizmente» puede considerarse sinónimo de «alegremente» (1).

Total: 7 coincidencias.

**Fase 2: alineamiento**

No hay **cruces**; el orden es el mismo que en la referencia.

**Fase 3: puntuación**

![](https://miro.medium.com/v2/resize:fit:636/1*LQS4aJHp5eDtAEskcp5Y6Q.png)

Usaré **0,9** para α en la media armónica, un parámetro habitual:

![](https://miro.medium.com/v2/resize:fit:367/0*gwgNOgnMpwg5FA5p)

**Fase 4: penalización**

Como no hay fragmentos desalineados, la **penalización es 0**. La puntuación final es la media F reducida por esa penalización.

![](https://miro.medium.com/v2/resize:fit:525/0*U9IP9ppomRAJvj5C)

La **traducción A** logra una puntuación METEOR perfecta: coincide con la referencia tanto en las palabras como en su orden.

### Traducción B: «Los infantes están jugando en el área de juego»

**Fase 1: coincidencias**

- **Coincidencia exacta:** «Los» (1).
- **Coincidencias de raíz o sinónimos:** «infantes» por «niños», «jugando» por «juegan» y «área de juego» por «parque».

Si aceptamos todas como sinónimos, obtenemos **4 coincidencias**.

**Fase 2: alineamiento**

No hay cruces. Sin embargo, «están jugando» frente a «juegan» y «área de juego» frente a «parque» pueden introducir complejidad. Para simplificar, supongamos que no lo hacen.

**Fase 3: puntuación**

![](https://miro.medium.com/v2/resize:fit:369/1*r6WM-RXzagPu9RXlSgJ5Zw.png)

**Fase 4: penalización**

El cambio de estructura podría contarse como un fragmento distinto, pero para simplificar asumiremos que no hay penalización.

![](https://miro.medium.com/v2/resize:fit:435/0*_7TL7yYBF8EWdGO6)

### Conclusión

La diferencia entre las puntuaciones METEOR de ambas frases es clara. Mientras que la **traducción A** recibe una puntuación perfecta, la **traducción B** obtiene una puntuación muy baja.

En «Los infantes están jugando en el área de juego» hay términos ambiguos. «Están jugando» y «área de juego» no son tan exactos como «juegan» o «parque», pero este matiz no se tuvo en cuenta al calcular la puntuación.

Además, no sabemos **cómo se sienten los niños mientras juegan**: la oración original enfatiza que juegan alegremente, y la traducción B no lo refleja.

La traducción B quizá no parezca tan mala como indica METEOR. No obstante, METEOR no solo penaliza la literalidad: también la estructura de la frase.

Para una persona hispanohablante puede tener sentido, pero suena algo forzada; la traducción A es más simple y concisa.

## Limitaciones de METEOR

Como cualquier métrica, METEOR tiene limitaciones pese a mejorar otros métodos de evaluación.

**1. Dependencia del idioma**

METEOR depende de recursos específicos de cada idioma: *stemmers*, diccionarios de sinónimos y bases de datos de paráfrasis. Es posible que no estén disponibles o no tengan calidad suficiente para todas las lenguas, lo que limita su aplicabilidad y precisión entre pares de idiomas.

**2. Complejidad del alineamiento**

Su algoritmo de alineamiento es más sofisticado que el de métricas simples como BLEU, pero puede cometer errores, sobre todo cuando la estructura de la oración difiere mucho entre el idioma origen y el destino.

**3. No es adecuada para textos completos**

METEOR se usa generalmente a nivel de oración y puede rendir peor al evaluar la coherencia y cohesión de párrafos o documentos completos.

**4. Comprensión contextual limitada**

Como muchas métricas, METEOR no entiende por completo el contexto y puede puntuar de forma inexacta traducciones adecuadas en contexto que difieren a nivel de palabra o frase.

### Bibliografía

- [https://huggingface.co/spaces/evaluate-metric/meteor](https://huggingface.co/spaces/evaluate-metric/meteor)
- [https://machinelearninginterview.com/topics/machine-learning/meteor-for-machine-translation/](https://machinelearninginterview.com/topics/machine-learning/meteor-for-machine-translation/)
- [https://link.springer.com/article/10.1007/s10590-009-9059-4](https://link.springer.com/article/10.1007/s10590-009-9059-4)

*¡Gracias por leer! Si te ha gustado el artículo, puedes dejar hasta 50 aplausos y seguirme en* [*Medium*](https://medium.com/@jorgecardete) *para estar al día de los próximos artículos.*

*También puedes seguir mi nueva publicación:*

> **[The Deep Hub](https://medium.com/thedeephub)**
> Tu espacio sobre ciencia de datos: una publicación de Medium dedicada a intercambiar ideas y ampliar conocimientos.
