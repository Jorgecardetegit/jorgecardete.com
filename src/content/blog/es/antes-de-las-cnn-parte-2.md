---
title: "¿Qué había antes de las redes neuronales convolucionales? | Parte 2"
description: "Una introducción rápida a Haar Cascades"
date: 2024-02-14
tags: [visión-artificial, haar-cascades, machine-learning]
icon: "🧭"
cover: "/blog/covers/antes-de-las-cnn-parte-2.jpg"
topic: vision
---

*Una introducción rápida a Haar Cascades. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/but-what-was-before-cnns-part-2-992ffbac9cf1).*

![Imagen creada por el autor con DALL-E 3](https://miro.medium.com/v2/resize:fit:1792/0*kVyFRFbEyBMaxB1k)
*Imagen creada por el autor con DALL-E 3*

Si conoces la [visión artificial](https://en.wikipedia.org/wiki/Computer_vision), seguramente has oído hablar de las **redes neuronales convolucionales (CNN)**.

Las CNN han sustentado gran parte del desarrollo del campo: clasifican imágenes, detectan objetos y crean máscaras.

> **[Redes neuronales convolucionales: una guía completa](/blog/cnn-guia-completa)**
> El poder de las CNN en el análisis de imágenes.

Pero ¿hay otra forma de clasificar imágenes? En [detección de objetos](https://en.wikipedia.org/wiki/Object_detection), dos algoritmos forman una parte importante de la historia de la visión artificial:

- Haar Cascades.
- Histogramas de gradientes.

Aquí veremos **Haar Cascades**. La primera parte explicaba los histogramas de gradientes.

> **[¿Qué había antes de las CNN? | Parte 1](/blog/antes-de-las-cnn-parte-1)**
> Introducción a los histogramas de gradientes orientados.

## Haar Cascades

Las **Haar Cascades** reciben su nombre de [Alfréd Haar](https://en.wikipedia.org/wiki/Alfr%C3%A9d_Haar), el matemático que introdujo las **características tipo Haar**.

Paul Viola y Michael Jones desarrollaron la técnica en su *paper* de 2001, donde propusieron un método de **detección facial en tiempo real**.

### ¿Cómo funciona?

![Haar Cascades](https://miro.medium.com/v2/resize:fit:256/0*U-VUPcblL0ERxmj4)
*Haar Cascades | [Fuente](https://pyimagesearch.com/2020/06/22/turning-any-cnn-image-classifier-into-an-object-detector-with-keras-tensorflow-and-opencv/)*

Puede parecerse a una CNN porque recorre una imagen con un *kernel* para capturar características. En Haar Cascades, ese *kernel* es una **característica tipo Haar**.

Al desplazarla por la imagen, el algoritmo suma valores de píxel en sus regiones blancas y negras.

![Tipos de características tipo Haar](https://miro.medium.com/v2/resize:fit:297/1*7oIhjIXJCnn6jFX4cCSyEA.png)
*Tipos de características tipo Haar | [Fuente](http://www.willberger.org/cascade-haar-explained/)*

Estas características son patrones rectangulares simples de **dos**, **tres** o **cuatro** rectángulos negros o blancos. Cada rectángulo tiene un peso:

- **Positivo** en los rectángulos blancos.
- **Negativo** en los rectángulos negros.

El algoritmo suma las intensidades de cada rectángulo, las multiplica por sus pesos y resta la suma de las zonas negras a la de las blancas.

![Características Haar y ventana deslizante](https://miro.medium.com/v2/resize:fit:700/1*qyC3kgEjtRjjmFnlG4n8LA.png)
*Características Haar y ventana deslizante | [Fuente](https://ai.plainenglish.io/terminologies-used-in-face-detection-with-haar-cascade-classifier-open-cv-6346c5c926c)*

Los rectángulos de la ventana representan las zonas blancas y negras de cada característica:

- **A:** detecta bordes, como la separación entre frente y pelo.
- **B:** detecta líneas, como los ojos: piel clara arriba y abajo de pestañas e iris oscuros.
- **C:** detecta puntos, como la punta de la nariz o una mejilla.
- **D:** detecta diagonales, como reflejos de luz en mejillas o puente nasal.

![Características tipo Haar en detección facial](https://miro.medium.com/v2/resize:fit:700/1*sXYy2JP3_OnSoisa33tYCg.png)
*Características tipo Haar en detección facial | [Fuente](https://www.researchgate.net/figure/Haar-like-features-application_fig3_308836179)*

El algoritmo es ingenioso y puede detectar características eficazmente, pero resulta costoso. Viola y Jones resolvieron este problema con:

- Imágenes integrales.
- Clasificadores AdaBoost.
- Cascadas.

## 1. Imagen integral

La imagen integral —o tabla de áreas acumuladas— permite calcular rápidamente la suma de valores de píxel de zonas rectangulares. Es clave para evaluar características Haar, que dependen de diferencias de intensidad entre rectángulos adyacentes.

### Cómo se crea

1. Se inicializa con un borde de ceros alrededor de la imagen.
2. Para cada píxel se suma el valor que queda a su izquierda en la imagen integral.
3. También se suma el valor del píxel de arriba.
4. El valor en *(x, y)* equivale a la suma de todos los píxeles por encima y a la izquierda de *(x, y)*, incluido el propio píxel.

![Proceso de imagen integral](https://miro.medium.com/v2/resize:fit:406/1*4RFgkdGxdGWr0KthrcnTTA.png)
*Proceso de imagen integral | [Fuente](https://www.mathworks.com/help/images/integral-image.html)*

### Ejemplo

![Ejemplo de imagen integral](https://miro.medium.com/v2/resize:fit:431/1*wa_MzugxXeUexxIWOtPhrg.png)
*Ejemplo de imagen integral | [Fuente](https://www.mathworks.com/help/images/integral-image.html)*

Para sumar la región *2 × 2* inferior derecha: toma el valor azul *(59)*, resta los valores verde *(32)* y naranja *(42)* y suma el marrón *(15)*, ya que se restó dos veces. El resultado es *59 − 32 − 42 + 15 = 0*.

## 2. AdaBoost para seleccionar características

Usar todas las características Haar posibles es inviable. AdaBoost (*Adaptive Boosting*) selecciona unas pocas características críticas de un conjunto enorme.

Construye un clasificador fuerte como combinación lineal de clasificadores débiles, cada uno asociado con una característica Haar.

![Clasificador AdaBoost](https://miro.medium.com/v2/resize:fit:700/0*DIzy79k_iYdqT_Ef)
*Clasificador AdaBoost | [Fuente](https://www.almabetter.com/bytes/tutorials/data-science/adaboost-algorithm)*

Se centra en los ejemplos difíciles de clasificar y da más peso a los clasificadores que funcionan bien sobre ellos.

> Más información: [AdaBoost Classifier Example In Python](https://towardsdatascience.com/machine-learning-part-17-boosting-algorithms-adaboost-in-python-d00faac6c464).

## 3. Cascadas o etapas

Un clasificador en cascada es un proceso de varias etapas: cada una decide si una región de la imagen **puede contener** el objeto buscado.

Las etapas posteriores son más complejas y solo se evalúan si las anteriores han identificado positivamente la región.

![Cascadas en características Haar](https://miro.medium.com/v2/resize:fit:700/0*rHPubWvj7VL2oF4C.gif)
*Cascadas en características Haar | [Fuente](https://ai.plainenglish.io/terminologies-used-in-face-detection-with-haar-cascade-classifier-open-cv-6346c5c926c)*

Cada etapa descarta muchos ejemplos negativos —fondo— con pocas características, reduciendo el cálculo para la mayor parte de la imagen.

Las primeras etapas eliminan rápidamente regiones que no contienen el objeto. Conforme una región supera más etapas, aumentan las características usadas y el criterio se vuelve más estricto. Solo las regiones que superan todas las etapas se clasifican como objeto.

## Resumen

El proceso empieza con características tipo Haar, patrones de zonas claras y oscuras que distinguen partes de un objeto. Una ventana deslizante las busca en toda la imagen a distintas escalas.

La **imagen integral** acelera el cálculo de valores de píxel. **AdaBoost** elige las características más informativas, mejorando precisión y velocidad. Por último, las **cascadas** eliminan zonas irrelevantes con clasificadores simples antes de aplicar otros más complejos a las regiones prometedoras.

### Bibliografía

- [https://pyimagesearch.com/2021/04/12/opencv-haar-cascades/](https://pyimagesearch.com/2021/04/12/opencv-haar-cascades/)
- [Haar Cascades, Explained](https://medium.com/analytics-vidhya/haar-cascades-explained-38210e57970d)
- [Tutorial de AdaBoost en Kaggle](https://www.kaggle.com/code/prashant111/adaboost-classifier-tutorial)

*¡Gracias por leer! Si te ha gustado el artículo, puedes dejar hasta 50 aplausos y seguirme en* [*Medium*](https://medium.com/@jorgecardete) *para estar al día de los próximos artículos.*

*También puedes seguir mi nueva publicación:*

> **[The Deep Hub](https://medium.com/thedeephub)**
> Tu espacio sobre ciencia de datos: una publicación de Medium dedicada a intercambiar ideas y ampliar conocimientos.
