---
title: "Teacher forcing en machine learning"
description: "Cambiando la forma de entrenar modelos tradicionales"
date: 2024-02-05
tags: [machine-learning, rnn, entrenamiento]
icon: "🧑‍🏫"
cover: "/blog/covers/teacher-forcing.jpg"
topic: ml
---

*Cambiando la forma de entrenar modelos tradicionales. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/teacher-forcing-in-machine-learning-4a51e12a0c59).*

![Foto de Thao LEE en Unsplash](https://miro.medium.com/v2/resize:fit:700/0*kNnNr8Nhxm3HQcKF)
*Foto de [Thao LEE](https://unsplash.com/@h4x0r3?utm_source=medium&utm_medium=referral) en [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

El *teacher forcing* es una estrategia moderna de entrenamiento utilizada en el desarrollo de **modelos de secuencia a secuencia**, fundamentales en muchas aplicaciones de **procesamiento del lenguaje natural**.

Esta técnica se emplea a menudo en **RNN** y sus variantes: [LSTM](https://en.wikipedia.org/wiki/Long_short-term_memory) y [GRU](https://en.wikipedia.org/wiki/Gated_recurrent_unit).

Algunas de sus aplicaciones más habituales son:

- Traducción automática.
- Resumen de textos.
- Chatbots.

## ¿Qué es el *teacher forcing*?

Es un método para guiar y acelerar el aprendizaje de un modelo: en cada paso de la secuencia se le proporciona **la entrada correcta**, en vez de dejar que genere el siguiente paso a partir de sus propias salidas anteriores.

Visualicémoslo con un ejemplo. Imagina un aula en la que una estudiante **aprende a formar frases en un nuevo idioma**. La profesora le da una **palabra** y la estudiante **intenta predecir la siguiente**.

Si se equivoca, la profesora le proporciona inmediatamente **la palabra correcta**. La estudiante utiliza entonces esa palabra como **punto de partida para predecir la siguiente**, en lugar de continuar la frase desde su error.

> Así, siempre practica la construcción de frases a partir de secuencias correctas y refuerza los patrones y estructuras adecuados.

![Foto de Thought Catalog en Unsplash](https://miro.medium.com/v2/resize:fit:700/0*cfYszaBx45a-6GwO)
*Foto de [Thought Catalog](https://unsplash.com/@thoughtcatalog?utm_source=medium&utm_medium=referral) en [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

### Teacher forcing en redes neuronales recurrentes

En el contexto del **machine learning**, el *teacher forcing* funciona exactamente con el mismo principio.

Durante el entrenamiento de un modelo [***seq2seq***](https://en.wikipedia.org/wiki/Seq2seq), se introduce como entrada para la siguiente predicción la salida anterior correcta —la del conjunto de entrenamiento— en vez de la predicción anterior del modelo, que podría ser errónea.

Supongamos que queremos entrenar un modelo predictivo y que el texto que debe predecir es:

> «Dos personas leyendo un libro».

Sin embargo, el modelo se equivoca en la **segunda palabra** y predice «Dos» y «pájaros» como primera y segunda palabra, respectivamente.

- Sin *teacher forcing*, devolveríamos «pájaros» a nuestra **RNN** para predecir la tercera palabra, que también podría ser incorrecta.
- Con *teacher forcing*, introduciríamos «personas» en la **RNN** para la tercera predicción, aumentando la probabilidad de que esa palabra sea correcta.

![Sin teacher forcing frente a teacher forcing](https://miro.medium.com/v2/resize:fit:421/0*mzsfbyqBrWsm_09c.png)
*Sin teacher forcing frente a teacher forcing | [Fuente](https://towardsdatascience.com/what-is-teacher-forcing-3da6217fed1c)*

### Teacher forcing en traducción

Otra área en la que se usa mucho el *teacher forcing* es la **traducción**.

Pensemos en un modelo *seq2seq* diseñado para traducir frases del inglés al francés. La frase en inglés es:

> «The weather is nice today».

Y la traducción correcta al francés:

> «Le temps est beau aujourd’hui».

Al principio, el modelo no sabe **cómo traducirla correctamente**.

En un entrenamiento *sin teacher forcing*, si el modelo predice mal la primera palabra —«La» en vez de «Le»—, **la siguiente entrada también será incorrecta** y los errores podrían acumularse a lo largo de la traducción.

Con *teacher forcing*, independientemente de la salida anterior del modelo, se introduce «Le», la palabra correcta, como **entrada para predecir la siguiente**. Esto ayuda al modelo a aprender con más eficacia la estructura de la frase y el vocabulario.

![Foto de Anthony Choren en Unsplash](https://miro.medium.com/v2/resize:fit:700/0*5JWGbZyBhL606PQb)
*Foto de [Anthony Choren](https://unsplash.com/@tony_cm__?utm_source=medium&utm_medium=referral) en [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

### Pero, ¿cómo aprende el modelo si recibe constantemente la respuesta correcta?

Puede parecer contraintuitivo «enseñar» a un modelo dándole las respuestas de antemano. Sin embargo, este método se apoya en los principios del aprendizaje, tanto en sistemas artificiales como biológicos.

Al usar *teacher forcing* para entrenar modelos **seq2seq**, no estamos limitándonos a dar las respuestas: utilizamos las salidas correctas como una señal sólida que **guía el proceso de aprendizaje**.

Dejamos que el modelo **haga predicciones** y actualizamos sus pesos a partir del error que producen.

Pero, como seguramente habrás intuido, este tipo de entrenamiento también tiene inconvenientes.

## Ventajas y desventajas del teacher forcing

### Ventajas

El *teacher forcing* acelera notablemente el entrenamiento.

En las primeras fases, el modelo suele hacer predicciones imprecisas. Sin *teacher forcing*, sus **estados ocultos** se ven afectados por una cadena de predicciones incorrectas; los errores se acumulan y al modelo le cuesta mejorar.

### Desventajas

En la **fase de inferencia**, cuando el modelo normalmente no tiene acceso a la solución, debe basarse en su salida anterior para hacer la siguiente predicción.

Esto genera un desfase entre **cómo se entrena el modelo y cómo funciona durante la inferencia**, lo que puede reducir su rendimiento y estabilidad.

> Este fenómeno se conoce como [sesgo de exposición](https://arxiv.org/abs/2204.01171).

### Bibliografía

- [https://towardsdatascience.com/what-is-teacher-forcing-3da6217fed1c](https://towardsdatascience.com/what-is-teacher-forcing-3da6217fed1c)
- [https://machinelearningmastery.com/teacher-forcing-for-recurrent-neural-networks/](https://machinelearningmastery.com/teacher-forcing-for-recurrent-neural-networks/)

*¡Gracias por leer! Si te ha gustado el artículo, puedes dejar hasta 50 aplausos y seguirme en* [*Medium*](https://medium.com/@jorgecardete) *para enterarte de los próximos.*

*También puedes seguir mi nueva publicación:*

> **[The Deep Hub](https://medium.com/thedeephub)**
> Tu espacio sobre ciencia de datos: una publicación de Medium dedicada a intercambiar ideas y ampliar conocimientos.
