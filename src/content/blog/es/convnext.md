---
title: "ConvNeXt: en busca de la última capa convolucional"
description: "Los ViT son precisos y las CNN eficientes: ConvNeXt busca reunir ambas cualidades"
date: 2024-01-01
tags: [deep-learning, cnn, visión-artificial]
icon: "🧩"
order: 4
cover: "/blog/covers/convnext.jpg"
topic: vision
---

> Traducción del artículo original de [Jorge Sáenz](https://twitter.com/jorge_sanz).

![ConvNeXt combina ideas de CNN y Transformers](https://miro.medium.com/v2/resize:fit:700/0*akgkP9W8_ybtRaAc)

Los Vision Transformers (ViT) se han convertido en una referencia en visión artificial. Aun así, no son una sustitución automática de las redes convolucionales: la atención global es costosa, los ViT clásicos necesitan muchos datos y, en tareas como detección o segmentación, suelen depender de diseños jerárquicos que recuperan varias ideas propias de las CNN.

ConvNeXt parte de una pregunta sencilla: ¿qué ocurre si modernizamos una ResNet con las decisiones de diseño que han funcionado en los Transformers? El resultado conserva convoluciones, pero logra una precisión y una eficiencia competitivas.

## CNN, ViT y sesgo inductivo

Las CNN han sido fundamentales desde los primeros modelos de reconocimiento visual y dieron un salto decisivo con AlexNet en 2012. Después llegaron arquitecturas como VGG, Inception, ResNeXt, DenseNet, MobileNet, EfficientNet y RegNet.

Su ventaja no procede solo de la capacidad del modelo. Una CNN incorpora supuestos útiles sobre las imágenes, conocidos como sesgos inductivos:

- **Localidad.** Los píxeles cercanos suelen estar relacionados, por lo que un filtro pequeño puede detectar patrones locales.
- **Equivarianza ante traslaciones.** Si un objeto se desplaza, su representación también se desplaza de forma coherente.
- **Jerarquía.** Las primeras capas encuentran bordes y texturas; las posteriores combinan esos elementos en partes y objetos.
- **Pesos compartidos.** El mismo filtro puede buscar una característica en toda la imagen, reduciendo parámetros y mejorando la generalización.

![Una convolución extrae patrones locales](https://miro.medium.com/v2/resize:fit:700/1*w2L-O5u9jS0ybwDXRDhRw.png)

![La respuesta convolucional se desplaza junto al objeto](https://miro.medium.com/v2/resize:fit:700/1*VeyvO9WL6jlLBcvpM_AaUw.gif)

Estos principios hacen que las CNN aprendan bien incluso sin cantidades enormes de datos. Pero sus campos receptivos locales también dificultan capturar relaciones lejanas: una convolución pequeña necesita muchas capas para conectar regiones distantes.

## Qué aportan los Vision Transformers

Un ViT divide la imagen en parches, los trata como una secuencia y permite que cada parche atienda a todos los demás. Esta atención global facilita modelar relaciones a larga distancia y escala muy bien cuando existe suficiente información de entrenamiento.

![La imagen se convierte en una secuencia de parches para el Transformer](https://miro.medium.com/v2/resize:fit:700/1*R4mr8W4zW9u0e8z4cSgvDw.png)

El coste de la atención global crece de forma cuadrática con el número de parches. Además, los ViT puros no traen los sesgos espaciales de una CNN; por eso necesitan más datos o una regularización cuidadosa para rendir al mismo nivel.

Los Transformers jerárquicos, como Swin Transformer, resuelven parte del problema calculando atención en ventanas locales y combinando información entre ellas. Curiosamente, así recuperan localidad, jerarquía y procesamiento por etapas: elementos muy cercanos al diseño convolucional.

## El punto de partida: una ResNet modernizada

ConvNeXt toma como base una ResNet y adopta, paso a paso, cambios inspirados en Swin Transformer. La comparación se hizo en dos escalas: una cercana a ResNet-50 y Swin-T, de unos 4,5 mil millones de FLOPs, y otra similar a ResNet-200 y Swin-B, de unos 15 mil millones.

### Diseño macro

Una ResNet-50 reparte sus bloques en cuatro etapas con la proporción (3, 4, 6, 3). ConvNeXt usa (3, 3, 9, 3), dando más profundidad a la tercera etapa, donde la representación suele ser más rica. Solo este cambio eleva la precisión de 78,8 % a 79,4 %.

También sustituye la capa inicial de 7 × 7, con salto 2, por una operación de 4 × 4 con salto 4, equivalente a convertir la imagen en parches desde el principio. La mejora es pequeña, pero consistente: 79,5 %.

![El stem por parches reduce pronto la resolución](https://miro.medium.com/v2/resize:fit:700/1*XSdxZXuywSBZl_uYVjVd6g.png)

### Convoluciones por canal y cuello de botella invertido

El siguiente cambio procede de ResNeXt y MobileNet. En vez de aplicar una convolución completa a todos los canales, una convolución por canal procesa cada uno por separado; después, capas de 1 × 1 mezclan la información entre canales. Así se puede aumentar la anchura de 64 a 96 canales con un coste controlado.

![La convolución por canal separa el cálculo espacial](https://miro.medium.com/v2/resize:fit:700/1*BaFBWPRNUWThERxQko8l7w.png)

Con esa modificación, la precisión sube a 80,5 % con 5,3 GFLOPs. ConvNeXt invierte después el cuello de botella: primero expande los canales, aplica la convolución por canal y vuelve a comprimirlos. Esto reduce el cómputo total a unos 4,6 GFLOPs y alcanza 80,6 %.

![El bloque ConvNeXt usa un cuello de botella invertido](https://miro.medium.com/v2/resize:fit:700/1*xoR7mZVSt2WX6t9A8dFvwg.png)

### Filtros grandes y detalles del bloque

Las convoluciones por canal permiten emplear filtros mayores sin disparar el coste. ConvNeXt usa filtros de 7 × 7: aportan un campo receptivo más amplio y mejor contexto global. A partir de ese tamaño, los beneficios tienden a saturarse.

![Los kernels grandes amplían el contexto de cada bloque](https://miro.medium.com/v2/resize:fit:700/1*851rB9nqSLvQH1d0ZrEJEA.png)

También ajusta detalles que parecen menores, pero suman:

- Reemplaza ReLU por GELU.
- Reduce el número de activaciones intermedias.
- Elimina la mayoría de normalizaciones por lotes.
- Sustituye Batch Normalization por Layer Normalization.
- Separa las capas de reducción de resolución de los bloques residuales, siguiendo el patrón de Swin.

![Comparación entre el bloque ResNet, Swin y ConvNeXt](https://miro.medium.com/v2/resize:fit:700/1*z46n0L6hN0V9F7OrDq2SlQ.png)

El conjunto de cambios lleva el modelo base aproximadamente de 78,8 % a 82,0 % de precisión Top-1 en ImageNet, sin abandonar las convoluciones.

## Resultados

En ImageNet, ConvNeXt-T logra alrededor de 82,1 % de Top-1 y supera a Swin-T con una complejidad comparable. Los modelos grandes también escalan bien: ConvNeXt-L alcanza 85,5 %, y ConvNeXt-XL preentrenado en ImageNet-22K llega a 87,8 %.

![Resultados de clasificación en ImageNet](https://miro.medium.com/v2/resize:fit:700/1*cxrrJQd1fVC6Z7NOd7qZ-g.png)

En detección de objetos sobre COCO, ConvNeXt-T mantiene o mejora la precisión de Swin-T usando menos FLOPs y con mayor velocidad de inferencia. Las CNN modernizadas siguen siendo especialmente atractivas cuando la eficiencia práctica importa.

![Resultados de detección de objetos en COCO](https://miro.medium.com/v2/resize:fit:700/1*Z0P9EoqZ9dlpDqt_R_JiBA.png)

En una A100, los ConvNeXt pueden ofrecer un rendimiento cercano a un 40 % superior al de modelos Swin equivalentes, conservando o mejorando la precisión. No significa que los Transformers dejen de ser útiles: demuestra que las CNN todavía tenían margen de mejora.

## Conclusión

ConvNeXt no intenta negar las aportaciones de los Vision Transformers. Su lección es más interesante: muchas innovaciones recientes pueden trasladarse a una arquitectura convolucional sencilla y producir un modelo competitivo, rápido y fácil de integrar.

La elección entre CNN y Transformer depende de los datos, la tarea y el presupuesto de cómputo. ConvNeXt amplía ese abanico y recuerda que las convoluciones no son una tecnología del pasado.

## Bibliografía

- [1] Z. Liu et al., [A ConvNet for the 2020s](https://arxiv.org/abs/2201.03545), 2022.
- [2] K. He et al., [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385), 2015.
- [3] Z. Liu et al., [Swin Transformer](https://arxiv.org/abs/2103.14030), 2021.
- [4] S. Xie et al., [Aggregated Residual Transformations for Deep Neural Networks](https://arxiv.org/abs/1611.05431), 2016.
- [5] M. Sandler et al., [MobileNetV2](https://arxiv.org/abs/1801.04381), 2018.
- [6] K. Simonyan y A. Zisserman, [Very Deep Convolutional Networks for Large-Scale Image Recognition](https://arxiv.org/abs/1409.1556), 2014.
