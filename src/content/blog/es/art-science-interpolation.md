---
title: "El arte y la ciencia de la interpolación"
description: "Los pilares del procesamiento de imágenes"
date: 2024-02-08
tags: [visión-artificial, procesamiento-de-imágenes, interpolación]
icon: "🖼️"
order: 7
cover: "/blog/covers/art-science-interpolation.jpg"
topic: vision
---

*Los pilares del procesamiento de imágenes. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/the-art-and-science-of-interpolation-b12b99f2e053).*

![Foto de Jakob Owens en Unsplash](https://miro.medium.com/v2/resize:fit:700/0*HyORsUKyjvgiXVmr)
*Foto de [Jakob Owens](https://unsplash.com/@jakobowens1?utm_source=medium&utm_medium=referral) en [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

La interpolación de imágenes es una técnica de procesamiento digital que estima **valores de píxeles desconocidos**. Se usa al **redimensionar** o **transformar** una imagen, o al rellenar partes que faltan.

Su esencia consiste en crear transiciones suaves entre píxeles conocidos y generar otros nuevos sin perder la integridad y calidad general de la imagen.

![Redimensionar una imagen](https://miro.medium.com/v2/resize:fit:700/0*-dZ-zhXIIc-8zKMg.png)
*Redimensionar una imagen | [Fuente](https://imagy.app/batch-resize-images-in-adobe-photoshop/)*

> Si no conoces los píxeles y las imágenes, consulta antes [¿Cómo se crean las imágenes?](/blog/como-se-crean-las-imagenes).

## Cómo funciona la interpolación

Los métodos de interpolación se apoyan en los valores conocidos de los píxeles cercanos para calcular los valores nuevos o desconocidos.

Puede entenderse como rellenar huecos en una cuadrícula de píxeles. El objetivo es integrar los píxeles creados con los existentes, preservando bordes, texturas y gradientes con la mayor precisión posible.

### Redimensionamiento

![Redimensionamiento mediante interpolación](https://miro.medium.com/v2/resize:fit:700/1*Hc1D3d4W908mUkvTYFD8ZQ.png)
*Redimensionamiento mediante interpolación | [Fuente](https://www.cambridgeincolour.com/tutorials/image-interpolation.htm)*

Con los píxeles existentes hay que **estimar los nuevos** que se añadirán al ampliar o reducir una imagen.

### Rotación

![Rotación mediante interpolación](https://miro.medium.com/v2/resize:fit:700/1*g4ftWPa9izPZpflD0QjNEw.png)
*Rotación mediante interpolación | [Fuente](https://www.cambridgeincolour.com/tutorials/image-interpolation.htm)*

Rotar una imagen es otro caso común. Cuanto más se sepa de los píxeles circundantes, mejor será la interpolación. Aun así, al estirar demasiado una imagen la calidad se deteriora: la interpolación no puede inventar detalle que no existe.

## Tipos de interpolación

1. Vecino más cercano.
2. Bilineal.
3. Bicúbica.

### Vecino más cercano

Es la forma más simple: asigna al píxel nuevo el valor del píxel conocido más próximo.

Es rápida, pero puede producir una imagen **cuadriculada** y poco suave.

![Ampliación con vecino más cercano](https://miro.medium.com/v2/resize:fit:696/0*7uAm0FHBq_XmhcxS.jpg)
*Ampliación con vecino más cercano | [Fuente](https://jason-chen-1992.weebly.com/home/nearest-neighbor-and-bilinear-interpolation)*

### Interpolación bilineal

La interpolación bilineal considera el vecindario **2 × 2** más cercano de píxeles conocidos y calcula un promedio ponderado de esos cuatro valores.

Produce imágenes mucho más suaves que el vecino más cercano.

![Ampliación con interpolación bilineal](https://miro.medium.com/v2/resize:fit:423/0*PJE50me94RGCfC2Z)
*Ampliación con interpolación bilineal | [Fuente](https://theailearner.com/2018/12/29/image-processing-bilinear-interpolation/)*

### Interpolación bicúbica

La interpolación bicúbica da un paso más: considera un vecindario **4 × 4**, es decir, **16 píxeles** conocidos.

Como están a distintas distancias del píxel desconocido, los más cercanos reciben mayor peso. El resultado suele ser más nítido que con los dos métodos anteriores y ofrece una buena combinación de tiempo de proceso y calidad.

> La interpolación bicúbica es estándar en muchos programas de edición de imagen —incluido Adobe Photoshop—, controladores de impresión e interpolación dentro de cámara.

## Ejemplo de interpolación

Tomaré una imagen de **Unsplash** y la reduciré para mostrar el proceso.

![Foto de Silje Midtgård en Unsplash](https://miro.medium.com/v2/resize:fit:700/0*ZaNnHn7th5cbWFla)
*Foto de [Silje Midtgård](https://unsplash.com/@siljemidt?utm_source=medium&utm_medium=referral) en [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

Antes de remuestrearla, comprobamos su resolución: **800 píxeles de ancho** por **533 de alto**. Al reducirla por un factor de 8, obtenemos aproximadamente **100 × 66 píxeles**.

### 1. Vecino más cercano

```python
from PIL import Image
import matplotlib.pyplot as plt

downscale_factor = 8
downscaled_image = original_image.resize(
    (original_image.width // downscale_factor,
     original_image.height // downscale_factor),
    Image.NEAREST,
)
plt.imshow(downscaled_image)
plt.title("Interpolación por vecino más cercano")
plt.axis("off")
plt.show()
```

![Imagen modificada por el autor](https://miro.medium.com/v2/resize:fit:700/1*9SRCO2YyIk0ZBv9MarjRSQ.png)
*Imagen modificada por el autor*

En el resultado se aprecian dos rasgos:

- **Pixelación:** los píxeles se amplían y se vuelven cuadrados visibles.
- **Bordes dentados:** al reducir y ampliar, las líneas rectas o diagonales forman «escalones» por los cambios bruscos de color e intensidad.

**Uso:** requiere poco cálculo; es rápido y apropiado para aplicaciones en tiempo real con recursos limitados.

### 2. Interpolación bilineal

```python
downscaled_bilinear = original_image.resize(
    (original_image.width // downscale_factor,
     original_image.height // downscale_factor),
    Image.BILINEAR,
)
plt.imshow(downscaled_bilinear)
plt.title("Interpolación bilineal")
plt.axis("off")
plt.show()
```

![Imagen modificada por el autor](https://miro.medium.com/v2/resize:fit:700/1*oJRxtGPwWp_WsVyyCCsIJw.png)
*Imagen modificada por el autor*

La bilineal mejora notablemente la calidad frente al vecino más cercano:

1. Calcula el valor mediante un promedio ponderado de los cuatro píxeles más cercanos, dando transiciones más suaves y reduciendo el aspecto de bloques.
2. El efecto de escalera es menos visible; diagonales y curvas aparecen más suaves y menos dentadas.

**Uso:** es un compromiso razonable entre calidad visual y eficiencia computacional.

### 3. Interpolación bicúbica

```python
downscaled_bicubic = original_image.resize(
    (original_image.width // downscale_factor,
     original_image.height // downscale_factor),
    Image.BICUBIC,
)
plt.imshow(downscaled_bicubic)
plt.title("Interpolación bicúbica")
plt.axis("off")
plt.show()
```

![Imagen modificada por el autor](https://miro.medium.com/v2/resize:fit:700/1*dIiYMYrOzMyCelF6d5VThA.png)
*Imagen modificada por el autor*

La bicúbica se usa cuando se necesita un escalado de alta calidad:

1. Considera los **16 píxeles más próximos** en un entorno 4 × 4 y estima los valores con polinomios cúbicos; obtiene bordes más suaves y detalle más fino.
2. Conserva mejor los detalles, sobre todo al ampliar. Las transiciones de intensidad y color resultan más naturales.

**Uso:** es la técnica más usada para remuestrear imágenes. Consume más recursos, pero suele ser más efectiva.

## Comparación de métodos

En conjunto, cada método intercambia **calidad** por **complejidad computacional**:

- El **vecino más cercano** es el más rápido y el de menor calidad; conviene cuando la velocidad es crítica.
- La **bilineal** ofrece un equilibrio entre calidad y rendimiento.
- La **bicúbica** ofrece la mayor calidad de las tres y es ideal cuando se requiere un nivel de detalle alto.

![Comparación de interpolaciones](https://miro.medium.com/v2/resize:fit:700/0*FlRGXo13VYnk8LMF)

### Bibliografía

- [https://www.cambridgeincolour.com/tutorials/image-interpolation.htm](https://www.cambridgeincolour.com/tutorials/image-interpolation.htm)
- [https://www.geeksforgeeks.org/python-opencv-bicubic-interpolation-for-resizing-image/](https://www.geeksforgeeks.org/python-opencv-bicubic-interpolation-for-resizing-image/)

*¡Gracias por leer! Si te ha gustado el artículo, puedes dejar hasta 50 aplausos y seguirme en* [*Medium*](https://medium.com/@jorgecardete) *para estar al día de los próximos artículos.*

*También puedes seguir mi nueva publicación:*

> **[The Deep Hub](https://medium.com/thedeephub)**
> Tu espacio sobre ciencia de datos: una publicación de Medium dedicada a intercambiar ideas y ampliar conocimientos.
