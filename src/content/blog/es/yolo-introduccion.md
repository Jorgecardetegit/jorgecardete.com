---
title: "YOLO (You Only Look Once): una breve introducción"
description: "Los fundamentos de la detección de objetos"
date: 2024-03-12
tags: [visión-artificial, detección-de-objetos, yolo]
icon: "🎯"
order: 6
cover: "/blog/covers/yolo-introduccion.jpg"
topic: vision
---

*Los fundamentos de la detección de objetos. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/yolo-you-only-look-once-a-brief-introduction-2dea897ae9bd).*

![Imagen creada por el autor con DALL-E 3](https://miro.medium.com/v2/resize:fit:700/0*Rji7GYLAI66f1Uq5)

**You Only Look Once (YOLO)** es un tipo innovador de **red neuronal convolucional** para **detección de objetos**.

A diferencia de los sistemas tradicionales, que procesan una imagen en varias fases, YOLO reúne el trabajo en **un único paso**, lo que lo hace muy rápido y eficiente.

> YOLO plantea la detección de objetos como un único problema de regresión.

La detección de objetos contiene dos componentes:

1. **Localización:** identificar dónde están los objetos en una imagen.
2. **Clasificación:** determinar qué son esos objetos.

![Clasificación de imágenes frente a detección de objetos](https://miro.medium.com/v2/resize:fit:401/0*iTsGQJo7G4Chl9O7.png)
*Clasificación de imágenes frente a detección de objetos | [Fuente](https://livebook.manning.com/book/deep-learning-for-vision-systems/chapter-7/v-6/63)*

Los métodos tradicionales suelen resolverlos por separado: un algoritmo propone regiones y otro las clasifica. YOLO predice directamente **bounding boxes** y **probabilidades de clase** a la vez.

## Funcionamiento general

Al recibir una imagen, YOLO la divide conceptualmente en una **cuadrícula**.

![Imagen dividida en cuadrículas](https://miro.medium.com/v2/resize:fit:294/1*mM9aGp2Efw_0-Mgl2-weWA.png)
*Imagen dividida en cuadrículas | [Fuente](https://www.cv-foundation.org/openaccess/content_cvpr_2016/papers/Redmon_You_Only_Look_CVPR_2016_paper.pdf)*

Cada celda predice:

- **Bounding boxes:** cajas con coordenadas de posibles objetos.
- **Puntuaciones de confianza:** probabilidad de que una caja contenga un objeto real.
- **Probabilidades de clase:** probabilidad de que pertenezca a una clase, como coche, gato o persona.

![Múltiples bounding boxes](https://miro.medium.com/v2/resize:fit:644/1*Zq_4zwcYkI-pRIZtGF3-yg.png)
*Múltiples bounding boxes | [Fuente](https://www.cv-foundation.org/openaccess/content_cvpr_2016/papers/Redmon_You_Only_Look_CVPR_2016_paper.pdf)*

Después, YOLO elimina cajas superpuestas o con confianza baja con **Non-Maximum Suppression**.

![Cuadrícula, cajas y non-maximum suppression](https://miro.medium.com/v2/resize:fit:1000/1*CFjkj_IT4R0IyJ1N8fbRIQ.png)
*Cuadrícula, cajas y non-maximum suppression | [Fuente](https://www.cv-foundation.org/openaccess/content_cvpr_2016/papers/Redmon_You_Only_Look_CVPR_2016_paper.pdf)*

## Anotación de imágenes

Anotar imágenes consiste en añadir metadatos: etiquetas de objetos, características o clases. En YOLO marcamos los objetos con **bounding boxes** y su clasificación.

![Objeto anotado con bounding box](https://miro.medium.com/v2/resize:fit:700/0*1f3U2A1cAsmcpXwU.jpeg)
*Objeto anotado con bounding box | [Fuente](https://towardsdatascience.com/image-data-labelling-and-annotation-everything-you-need-to-know-86ede6c684b1)*

Formatos comunes:

- **Pascal VOC:** esquina superior izquierda y esquina inferior derecha: [x_min, y_min, x_max, y_max].
- **COCO:** esquina superior izquierda, ancho y alto: [x_min, y_min, width, height].
- **YOLO:** centro de la caja, ancho y alto: [x_center, y_center, width, height].

![Tipos de anotación](https://miro.medium.com/v2/resize:fit:700/0*5POYvWFEkPTCHdCU.jpg)
*Tipos de anotación | [Fuente](https://albumentations.ai/docs/getting_started/bounding_boxes_augmentation/#yolo)*

YOLO utiliza, naturalmente, el formato YOLO.

## Arquitectura de YOLO

YOLO ha tenido muchas versiones, de YOLOv1 a YOLOv9 cuando se escribió el artículo. Su estructura general tiene tres componentes:

1. **Backbone:** CNN preentrenada para extraer características visuales.
2. **Neck:** capas que mezclan características de distintas escalas.
3. **Head:** capas finales de detección.

### Backbone

El backbone original tiene 24 capas convolucionales para extraer características.

Las capas convolucionales aplican kernels que recorren la imagen y aprenden patrones complejos.

![Operación de convolución](https://miro.medium.com/v2/resize:fit:395/0*OsG7n0U3jMQEuv9k.gif)
*Operación de convolución | [Fuente](https://github.com/vdumoulin/conv_arithmetic)*

Entre ellas hay capas de **max pooling**, que reducen las dimensiones espaciales de los mapas de características usando el valor máximo de cada ventana.

![Representación de max pooling](https://miro.medium.com/v2/resize:fit:700/0*QsmYosPhNeJ-koGG.gif)
*Representación de max pooling | [Fuente](https://developers.google.com/machine-learning/practica/image-classification/convolutional-neural-networks?hl=es-419)*

> Si necesitas repasar CNN, consulta [Redes neuronales convolucionales: una guía completa](/blog/cnn-guia-completa).

### Neck

El neck, opcional, está entre backbone y head. Combina mapas de características de varias capas, lo que ayuda a detectar objetos de distintas escalas.

YOLOv1 no tenía neck; versiones posteriores incorporaron componentes como PANet y FPN.

### Head

El head realiza las predicciones a partir de los mapas de características del backbone y, si existe, del neck.

Sus tareas son:

- Clasificar objetos.
- Predecir bounding boxes.
- Estimar *objectness*, la probabilidad de que haya un objeto dentro de la caja.

![Arquitectura completa de YOLOv1](https://miro.medium.com/v2/resize:fit:700/0*kt-JLMjBP0vvmpqJ.png)
*Arquitectura completa de YOLOv1 | [Fuente](https://manalelaidouni.github.io/Understanding%20YOLO%20and%20YOLOv2.html)*

YOLOv1 tenía 24 capas convolucionales, 4 de max pooling y 2 totalmente conectadas. Las versiones posteriores cambiaron notablemente esta estructura.

## Proceso de entrenamiento

### 1. Entrada

La imagen se redimensiona al tamaño fijo que espera el modelo, por ejemplo 416 × 416. En esta fase se procesa como un todo, sin cuadrícula.

![Redimensionamiento de imagen](https://miro.medium.com/v2/resize:fit:465/0*MAlkN1aRTfwiUYT2)
*Redimensionamiento | [Fuente](https://www.quora.com/How-does-image-resizing-work-in-terms-of-changing-the-pixels-number)*

### 2. CNN

La imagen pasa por capas convolucionales, activaciones como ReLU, pooling y, en ocasiones, normalización por lotes. Las capas tempranas detectan bordes y esquinas; las profundas, patrones complejos.

![Visualización 3D de una CNN](https://miro.medium.com/v2/resize:fit:700/1*oEewkBLFxdnxmpG8QQU5RQ.png)
*Visualización 3D de una CNN | [Fuente](https://adamharley.com/nn_vis/cnn/3d.html)*

### 3. Mapa de características y cuadrícula

La salida es un mapa de características más pequeño que conserva información espacial esencial. YOLO lo divide en una cuadrícula S × S antes de las capas finales.

![Creación de mapa de características](https://miro.medium.com/v2/resize:fit:700/0*tdtuNowSv0XayVoy)
*Creación de mapa de características | [Fuente](https://www.analyticsvidhya.com/blog/2020/11/tutorial-how-to-visualize-feature-maps-directly-from-cnn-layers/)*

### 4. Predicciones por celda

Cada celda predice varias cajas, sus coordenadas, confianza y probabilidades de clase.

![Arquitectura YOLO](https://miro.medium.com/v2/resize:fit:700/1*T8qXizcmDp00dXlfEN3kcg.png)
*Arquitectura YOLO | [Fuente](https://lilianweng.github.io/posts/2018-12-27-object-recognition-part-4/)*

La celda que contiene el **centro** de un objeto se encarga de predecir su caja. Como no sabemos qué celda será, todas generan predicciones y se elige la mejor.

![Celda responsable de la predicción](https://miro.medium.com/v2/resize:fit:594/0*3NK2nCGyjsgXKAr8.png)
*Celda responsable de coordenadas, objectness y clase | [Fuente](https://livebook.manning.com/book/deep-learning-for-vision-systems/chapter-7/v-6/10)*

### 5. Non-Maximum Suppression

YOLO genera varias cajas por objeto. Las ordena de mayor a menor confianza y elige la mejor como referencia.

![Imagen con múltiples bounding boxes](https://miro.medium.com/v2/resize:fit:700/0*yQxRFZIkjtJGtzpi.jpg)
*Imagen con múltiples bounding boxes | [Fuente](https://www.analyticsvidhya.com/blog/2020/08/selecting-the-right-bounding-box-using-non-max-suppression-with-implementation/)*

Compara esa caja con las demás y suprime las que se superponen mucho, porque probablemente detectan el mismo objeto. Repite el proceso hasta conservar solo las detecciones más fiables.

![Non-Maximum Suppression](https://miro.medium.com/v2/resize:fit:700/1*Au_sIcJMcydAhpkuAVSB5A.png)
*Non-Maximum Suppression | [Fuente](https://www.analyticsvidhya.com/blog/2020/11/tutorial-how-to-visualize-feature-maps-directly-from-cnn-layers/)*

### Intersection over Union (IoU)

**IoU** mide el solapamiento entre dos cajas: divide el área de intersección entre el área de unión. Si supera un umbral, la caja con menos confianza se suprime.

![Intersection over Union](https://miro.medium.com/v2/resize:fit:700/0*3Y-I1S_psV_TdZqp.png)
*Intersection over Union | [Fuente](https://datahacker.rs/deep-learning-intersection-over-union/)*

## Un ejemplo conceptual

Supongamos que entrenamos con dos caballos muy similares, pero uno mide un metro más. Aunque sus centros sean similares, YOLO aprende características de tamaño, forma, textura y otros rasgos que le permiten ajustar las dimensiones de cada caja mediante regresión.

![Objetos con centros parecidos y tamaños distintos](https://miro.medium.com/v2/resize:fit:564/0*1Bx2MnwiRZHz5pYD.jpg)
*Objetos con centros parecidos y tamaños distintos | [Fuente](https://livebook.manning.com/book/deep-learning-for-vision-systems/chapter-7/v-6/329)*

## Función de pérdida

La pérdida de YOLO tiene tres partes:

1. **Pérdida de localización:** penaliza diferencias entre las cajas predichas y las reales, tanto en centro *(x, y)* como en ancho y alto *(w, h)*.
2. **Pérdida de confianza:** enseña a diferenciar cajas que contienen objetos de las que solo capturan fondo. Reduce el peso de las muchas cajas sin objeto con el coeficiente λ_noobj.
3. **Pérdida de clasificación:** penaliza clases incorrectas dentro de las cajas con objeto.

![Fórmula de pérdida de localización](https://miro.medium.com/v2/resize:fit:608/0*lMV8nlzO_Y1X6f2u)

![Fórmula de pérdida de confianza](https://miro.medium.com/v2/resize:fit:564/0*X1gLj1jhuVCFJVuH)

![Fórmula de pérdida de clasificación](https://miro.medium.com/v2/resize:fit:464/0*jJebFwYtAHCRXQ46)

La función completa se optimiza iterativamente con **backpropagation** para reducir el error.

![Función de pérdida completa de YOLO](https://miro.medium.com/v2/resize:fit:700/0*Q6YU9TS3LTqPdPgg.png)
*Explicación completa de la pérdida de YOLO | [Fuente](https://towardsdatascience.com/yolov1-you-only-look-once-object-detection-e1f3ffec8a89)*

### Bibliografía

- [Understanding YOLO and YOLOv2](https://manalelaidouni.github.io/Understanding%20YOLO%20and%20YOLOv2.html)
- [Paper original de YOLO](https://arxiv.org/pdf/1506.02640.pdf)
- [YOLO: detección de objetos en tiempo real](https://www.geeksforgeeks.org/yolo-you-only-look-once-real-time-object-detection/)

*¡Gracias por leer! Si te ha gustado el artículo, puedes dejar hasta 50 aplausos y seguirme en* [*Medium*](https://medium.com/@jorgecardete) *para estar al día de las próximas publicaciones.*

*También puedes seguir mi nueva publicación:*

> **[The Deep Hub](https://medium.com/thedeephub)**
> Tu espacio sobre ciencia de datos.
