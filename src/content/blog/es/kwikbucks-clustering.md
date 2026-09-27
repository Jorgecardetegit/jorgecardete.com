---
title: "Revolucionando el clustering de datos: algoritmo KwikBucks"
description: "Un algoritmo que combina embeddings con la calidad de la atención cruzada"
date: 2023-11-15
tags: [machine-learning, clustering, papers]
icon: "🪣"
cover: "/blog/covers/kwikbucks-clustering.jpg"
topic: ml
---

*Un algoritmo que combina embeddings con la calidad de la atención cruzada. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/revolutionizing-data-clustering-kwikbucks-algorithm-149b7ae88125).*

![Imagen del autor con DALL-E 3](https://miro.medium.com/v2/resize:fit:700/0*BW0OCMzyUwq1WaWa)
*Imagen del autor con DALL-E 3*

A medida que crecen los modelos de machine learning, también aumentan los retos de coste. Un problema importante para la investigación es el precio de entrenar grandes modelos de clustering: el problema de **Budgeted Correlation Clustering (BCC)**.

BCC reconoce una tensión: las evaluaciones de similitud de gran calidad son caras computacionalmente, pero existe un presupuesto limitado para hacerlas.

Suele trabajar con dos oráculos o fuentes de información:

- Un oráculo caro y preciso.
- Un oráculo barato y menos preciso.

El reto consiste en aprovechar las consultas caras y de calidad, complementándolas con la fuente barata sin superar el presupuesto. El objetivo es obtener un clustering lo más cercano posible al que se lograría sin restricciones.

## Algoritmo KwikBucks

**KwikBucks** es un algoritmo de clustering que combina dos técnicas:

1. **Modelos de atención cruzada (CA):** herramientas muy precisas para decidir si dos datos son similares, pero costosas.
2. **Modelos de embeddings:** comparan grandes cantidades de datos con rapidez, aunque con menos precisión que CA.

El *paper* original está disponible en [OpenReview](https://openreview.net/forum?id=p0JSSa1AuV).

## Cómo funciona KwikBucks

No es necesario dominar embeddings, CA ni clusters para seguir esta explicación. El proceso tiene tres pasos.

### 1. Clustering inicial

- **Elegir centros.** El algoritmo selecciona puntos de datos que serán centros porque son bastante distintos entre sí.
- **Formar clusters.** Agrupa otros puntos alrededor de esos centros según su similitud.

### 2. Equilibrar dos modelos

- **Embeddings primero.** Para ahorrar tiempo y cómputo, usa embeddings para obtener una estimación rápida de qué puntos son similares.
- **Uso limitado de CA.** Después usa modelos de atención cruzada para comprobaciones más precisas, pero solo un número limitado de veces.

### 3. Posprocesamiento

Tras el agrupamiento inicial, KwikBucks decide si algunos clusters deberían fusionarse según si comparten más similitudes que diferencias.

### Una explicación sencilla

Imagina un chef que separa ingredientes distintos —los puntos de datos— en cuencos —los clusters—.

Tiene un colador grande, los modelos de embeddings, que separa rápido la mayoría de ingredientes; y un tamiz fino, los modelos CA, que separa con más detalle pero es lento.

Primero usa el colador grande y después el tamiz fino con moderación para refinar el resultado. Si dos cuencos contienen ingredientes similares, puede unirlos. Así obtiene grupos homogéneos de forma eficiente y precisa.

### Resultados

Las métricas todavía no son totalmente representativas porque este es el primer modelo con este enfoque. Los *baselines* del paper se parecen a KwikBucks, pero no persiguen exactamente el mismo objetivo.

> Este trabajo es el primer algoritmo de clustering por correlación que utiliza señales fuertes y débiles; adapta algoritmos previos, algunos de los cuales solo usan una señal fuerte.

![Evaluación del algoritmo KwikBucks](https://miro.medium.com/v2/resize:fit:700/1*kqxp9V-ENLsqOGHiOnH1pA.png)
*Evaluación del algoritmo KwikBucks | Paper original*

El rendimiento se midió con el objetivo de clustering por correlación y la puntuación F1, para distintos presupuestos de consultas y señales débiles. Consulta la página 7 del paper para los baselines y las métricas de evaluación.

## Repaso de conceptos

### Clustering

El clustering es una técnica central de minería de datos y aprendizaje no supervisado. Agrupa elementos similares en conjuntos o clusters.

![Clustering](https://miro.medium.com/v2/resize:fit:218/0*6e9iXTXaqjJzVcBG)
*Clustering | [Fuente](https://developers.google.com/machine-learning/clustering/clustering-algorithms?hl=es-419)*

Ayuda a entender la estructura de los datos y es útil en segmentación de clientes, reconocimiento de imágenes y muchas otras aplicaciones.

Hay dos enfoques generales:

**Clustering métrico.** Usa un espacio métrico, donde las distancias entre puntos están bien definidas. Los puntos más cercanos tienen más probabilidad de pertenecer al mismo cluster. K-means y clustering jerárquico son ejemplos habituales.

**Clustering de grafos.** Representa datos como nodos y sus similitudes o relaciones como aristas.

![Clustering de grafos](https://miro.medium.com/v2/resize:fit:605/0*WsZSHGrUFbGXygQu.jpg)
*Clustering de grafos | [Fuente](https://www.sciencedirect.com/science/article/abs/pii/S0370157309002841)*

Aquí se identifican comunidades según cómo se interconectan los nodos. A diferencia del clustering métrico, el foco está en las conexiones.

### Embeddings

Los embeddings representan elementos —palabras, frases o imágenes— como vectores en un espacio de alta dimensión. Cada dimensión captura alguna característica.

![Representación de embeddings](https://miro.medium.com/v2/resize:fit:589/0*w2r0M-DKssUk-xiH.png)
*Representación de embeddings | [Fuente](https://www.baeldung.com/cs/dimensionality-word-embeddings)*

La distancia entre vectores es significativa: vectores cercanos representan elementos relacionados o similares.

Los modelos de embeddings transforman datos sin procesar, como texto, a una forma que un algoritmo puede procesar. Intentan capturar significado: en texto, palabras con sentidos parecidos se mapean a puntos próximos.

![Vista general de BERT](https://miro.medium.com/v2/resize:fit:700/0*qxRn6nb8u7hZZh00)
*Vista general de BERT | [Fuente](https://www.exxactcorp.com/blog/Deep-Learning/how-do-bert-transformers-work)*

Word2Vec y BERT son modelos conocidos.

### Modelos de atención cruzada

Su base es el mecanismo de atención, que permite al modelo enfocarse selectivamente en partes de la entrada según lo que procesa.

![Atención cruzada](https://miro.medium.com/v2/resize:fit:437/0*sIutjwKJJS0a8bxn)
*Atención cruzada | [Fuente](https://jalammar.github.io/illustrated-transformer/)*

La atención cruzada amplía esta idea: permite atender a varias secuencias a la vez y ponderar elementos de una según la información de otra.

Captura el contexto y las relaciones entre secuencias. En traducción automática, puede centrarse en palabras concretas del idioma origen al generar la palabra correspondiente en el destino.

Por ejemplo, al traducir «I love machine learning» al francés:

1. **I → Je:** la atención se fija en el sujeto.
2. **love → aime:** se centra en el verbo y conserva atención sobre «I» para mantener concordancia.
3. **machine learning → l’apprentissage automatique:** reparte atención entre ambas palabras para capturar el término compuesto.

Es como un foco que se mueve por la oración inglesa e ilumina las palabras más relevantes para generar la siguiente palabra en francés.

Estas explicaciones son de alto nivel, pero sirven como base para entender por qué KwikBucks combina rapidez de los embeddings con la precisión de la atención cruzada.

### Lecturas recomendadas

**Clustering**

- [Guía completa de clustering](https://towardsdatascience.com/the-complete-guide-to-clustering-analysis-10fe13712787)
- [17 algoritmos de clustering](https://towardsdatascience.com/17-clustering-algorithms-used-in-data-science-mining-49dbfa5bf69a)

**Embeddings**

- [Neural network embeddings explained](https://towardsdatascience.com/neural-network-embeddings-explained-4d028e6f0526)
- [Introducción a Word Embedding y Word2Vec](https://towardsdatascience.com/introduction-to-word-embedding-and-word2vec-652d0c2060fa)

**Atención cruzada**

- [Attention is all you need](https://towardsdatascience.com/attention-is-all-you-need-discovering-the-transformer-paper-73e5ff5e0634)
- [Cross-Attention is what you need!](https://towardsdatascience.com/cross-attention-is-what-you-need-fusatnet-fusion-network-b8e6f673491)

*¡Gracias por leer! Si te ha gustado el artículo, puedes dejar hasta 50 aplausos y seguirme en* [*Medium*](https://medium.com/@jorgecardete) *para estar al día de las próximas publicaciones.*
