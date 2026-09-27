---
title: "¿Cómo se crean las imágenes?"
description: "Una introducción rápida a los píxeles y los canales de color"
date: 2023-12-25
tags: [visión-artificial, procesamiento-de-imágenes]
icon: "🎨"
cover: "/blog/covers/como-se-crean-las-imagenes.jpg"
topic: vision
---

*Una introducción rápida a los píxeles y los canales de color. Publicado originalmente en [Long. Sweet. Valuable.](https://medium.com/long-sweet-valuable/but-how-are-images-created-2186a759d7a8).*

![Creada por el autor con DALL-E 3](https://miro.medium.com/v2/resize:fit:700/1*F9rh_VB9yXtLLRAwTq_9zQ.png)
*Creada por el autor con DALL-E 3*

Hoy las imágenes están por todas partes; incluso podríamos decir que nuestra realidad se está convirtiendo en píxeles.

> ¿Cuántas horas dedicas a la televisión, al ordenador o al móvil?

Según una investigación encargada por [Vision Direct](https://www.visiondirect.co.uk/blog/look-after-your-eye-health-at-home/), la persona adulta media en Estados Unidos pasará el equivalente a **44 años** de su vida mirando pantallas.

Así que podemos afirmar que nuestra realidad se está «pixelando»…

**Pero ¿qué es exactamente un píxel?** Observa esta imagen en escala de grises:

![Imagen en escala de grises](https://miro.medium.com/v2/resize:fit:697/1*U1xhWvOO8KNtjjW8kKR2tw.png)
*Imagen en escala de grises | [Fuente](https://stackoverflow.com/questions/51818193/problems-with-using-a-rough-greyscale-algorithm)*

A primera vista parece bastante realista, pero veamos qué ocurre al ampliar la imagen. Fíjate en el ojo del pájaro.

![Ampliación de una imagen en escala de grises](https://miro.medium.com/v2/resize:fit:700/1*kEF-MU4t_uy54WBs84FdpA.gif)
*Ampliación de una imagen en escala de grises | Creada por el autor*

Al acercarnos, queda más claro que está formada por pequeños cuadrados; se aprecia especialmente en el ojo del pájaro, que es más oscuro.

**¡Esos cuadrados son píxeles!**

Puedes imaginar un píxel como un número dentro de una gran matriz que representa una imagen.

![Píxeles de una imagen en escala de grises](https://miro.medium.com/v2/resize:fit:1000/1*Jk19VScSlhTfuiIZPlQXug.png)
*Píxeles de una imagen en escala de grises | [Fuente](https://setosa.io/ev/image-kernels/)*

En esta imagen, cada píxel tiene un valor entre 0 y 255 que representa la intensidad del color.

- 0 → Negro por completo.
- 255 → Blanco por completo.

> Esta figura procede de [Setosa](https://setosa.io/ev/image-kernels/). Puedes usar esta herramienta interactiva para recorrer la imagen: los píxeles de las zonas más claras tienen los valores más altos.

En resumen, las imágenes en **escala de grises** están compuestas por:

> Una matriz de píxeles con valores entre 0 y 255 que representan la intensidad luminosa en un punto concreto.

### Imágenes en color

Las imágenes en color combinan tres canales:

- Rojo.
- Verde.
- Azul.

Al combinar estos tres colores se puede producir cualquier tonalidad imaginable.

![Canal RGB](https://miro.medium.com/v2/resize:fit:176/1*fNzgq7RBKkVsD-zeFUkyBA.png)
*Canal RGB | [Fuente](https://www.freepik.es/vector-premium/vector-mezcla-colores-rgb-cmyk-superposicion-color-rgb-cmyk_34957480.htm)*

Esta configuración se conoce como RGB (*red*, *green* y *blue*).

> **[Modelo de color RGB](https://www.officinaturini.com/rgb.html)**
> El modelo RGB es un modelo de color aditivo basado en rojo, verde y azul.

Aquí, en lugar de una matriz, tenemos tres: una por cada color. El concepto es muy parecido al de las imágenes en escala de grises.

![RGB frente a escala de grises](https://miro.medium.com/v2/resize:fit:685/0*e6scEEg6E4xn8Z45.png)
*RGB frente a escala de grises | [Fuente](https://link.springer.com/article/10.1007/s42979-023-01693-5)*

Cada matriz está formada por píxeles con valores de 0 a 255. En 0, el píxel es **completamente negro**; en 255 alcanza la **máxima intensidad de ese color concreto**.

Para verlo mejor, observa la siguiente imagen e intenta visualizar cada punto como una mezcla de píxeles rojos, verdes y azules.

![Imagen digital](https://miro.medium.com/v2/resize:fit:281/0*v1xH_Ew6wdWDnXKI.png)
*Imagen digital | [Fuente](https://www.evlabs.io/blog/digital-art-python-image-decomposition)*

En realidad, lo que vemos es una combinación de los canales RGB:

![Imagen descompuesta en canales RGB](https://miro.medium.com/v2/resize:fit:700/0*GSKYcrajXOkRhWfd.png)
*Imagen descompuesta en canales RGB | [Fuente](https://www.evlabs.io/blog/digital-art-python-image-decomposition)*

Cada una de estas configuraciones se compone de píxeles entre 0 y 255. Cuando los canales ya están definidos, se combinan para crear la imagen original.

Algunas imágenes pueden tener más rojo; otras, más píxeles de los canales azul y verde.

> En esencia, la configuración de color depende de las características concretas de cada imagen.

> Puedes usar esta [herramienta](https://pinetools.com/rgb-channels-image) de **Pinetools** para descomponer una imagen en canales RGB. Sube una imagen en color y observa cómo se separa.

### ¿Por qué los valores de píxel van de 0 a 255?

Este rango es consecuencia de usar **8 bits** para representar cada canal de color.

En imagen digital, el color de cada píxel suele representarse en código binario. Un **bit** es la unidad básica de información en computación y puede valer 0 o 1. Cuantos más bits se usan, más valores se pueden representar.

![Representación de bits](https://miro.medium.com/v2/resize:fit:404/1*AI9ES0TEXvEqicmlKf_oQw.png)
*Representación de bits | [Fuente](https://www.eeeguide.com/binary-number-system-definition-conversions-examples/)*

**8 bits por canal.** En una imagen digital típica, cada canal de color —rojo, verde y azul— recibe 8 bits. Es el formato estándar denominado **color de 24 bits**: 8 bits para rojo, 8 para verde y 8 para azul.

Con 8 bits se pueden representar **2⁸** valores distintos: **256 valores** por canal, de 0 a 255.

> ☣️ En los sistemas digitales se suele empezar a contar desde cero. Por eso, de 0 a 255 hay 256 números.

> Este número permite más de 16 millones de combinaciones de color *(256 rojos × 256 verdes × 256 azules)*, manteniendo tamaños de archivo manejables.

## Visión humana y percepción de las imágenes

Para terminar, veamos cómo percibimos las imágenes las personas.

![Célula fotorreceptora](https://miro.medium.com/v2/resize:fit:700/0*DPdMpK1LG57SEW0c)
*Célula fotorreceptora | [Fuente](https://onlineresize.club/2021-club.html#google_vignette)*

El funcionamiento de nuestros ojos es sorprendentemente parecido a cómo se crean las imágenes digitales en color.

Nuestra percepción se basa en los **tres tipos de células cónicas** presentes en el ojo:

- Conos **S** (*short wavelength*), más sensibles a la luz que percibimos como azul.
- Conos **M** (*medium wavelength*), más sensibles a la luz que percibimos como verde.
- Conos **L** (*long wavelength*), más sensibles a la luz que percibimos como rojo.

Cuando la luz entra en el ojo, estos conos se activan en distinto grado según su longitud de onda. El cerebro procesa después esas señales para crear la percepción de distintos colores.

Por ejemplo, cuando los conos **M** y **L** se estimulan por igual, percibimos el color amarillo.

Este proceso es casi idéntico al de las matrices RGB de las imágenes digitales.

### Bibliografía

- [https://www.optometrists.org/general-practice-optometry/guide-to-eye-health/how-does-the-eye-work/](https://loremartis.com/2023-07-25/shades-of-green/)
- [https://www.evlabs.io/blog/digital-art-python-image-decomposition](https://www.evlabs.io/blog/digital-art-python-image-decomposition)
- [https://www.imaios.com/en/e-anatomy/anatomical-structure/cone-cell-133706252](https://www.verywellhealth.com/eye-cones-5088699)

*¡Gracias por leer! Sígueme en* [*Medium*](https://medium.com/@jorgecardete) *para estar al día de mis próximas publicaciones.*
