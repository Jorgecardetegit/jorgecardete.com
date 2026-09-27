---
title: "¿Qué había antes de las redes neuronales convolucionales? | Parte 1"
description: "Una introducción rápida a los histogramas de gradientes orientados"
date: 2024-02-12
tags: [visión-artificial, hog, machine-learning]
icon: "🧭"
cover: "/blog/covers/antes-de-las-cnn-parte-1.jpg"
topic: vision
---

*Una introducción rápida a los histogramas de gradientes orientados. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/but-what-was-before-convolutional-neural-networks-part-1-d654737b026a).*

![Imagen creada por el autor con DALL-E 3](https://miro.medium.com/v2/resize:fit:1792/0*cGJCRRRABHCEe0ZJ)
*Imagen creada por el autor con DALL-E 3*

## Una introducción rápida a HOG

El **histograma de gradientes orientados** (*Histogram of Oriented Gradients*, HOG) fue presentado en 2005 por [Navneet Dalal](https://scholar.google.com/citations?user=C6UAIHEAAAAJ) y [Bill Triggs](https://scholar.google.com/citations?user=hSpEF0gAAAAJ) para la **detección de personas**.

Su paper, [Histograms of Oriented Gradients for Human Detection](https://ieeexplore.ieee.org/abstract/document/1467360), se presentó en CVPR y se convirtió en un trabajo fundamental de visión artificial.

HOG es un **descriptor de características** empleado en visión artificial y procesamiento de imágenes para **detectar objetos**.

En otras palabras, permite a los ordenadores comprender e identificar objetos de una imagen.

Al mirar una foto, reconocemos contornos y formas —la curva de una pelota o el ángulo de la pata de una silla—. HOG ayuda a detectar esas formas fijándose en cómo cambia el brillo o el color de distintas zonas. Divide la imagen en bloques pequeños, registra los cambios bruscos de sombra o luz y conserva esos patrones.

![Foto de Virender Singh en Unsplash](https://miro.medium.com/v2/resize:fit:700/0*T0FlCuKFVJLU-Eao)
*Foto de [Virender Singh](https://unsplash.com/@virender833?utm_source=medium&utm_medium=referral) en [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

### Descriptores de características

Un descriptor de características representa una imagen de forma simplificada: extrae información relevante y descarta la menos útil.

Normalmente se encapsula en un vector, o conjunto de vectores, que describe las características de una imagen o parte de ella: bordes, esquinas, texturas, colores o formas.

![Representación de descriptor de características](https://miro.medium.com/v2/resize:fit:700/0*RVAzbv8RjzRDaZpw.png)
*Representación de descriptor de características | [Fuente](https://www.mdpi.com/2079-9292/9/3/391)*

> Su objetivo es transformar información visual en una forma más fácil de analizar y comparar.

### Gradientes

Un gradiente mide cuánto cambia el color o el brillo de un punto a otro. Estos cambios suelen estar en los bordes de los objetos.

Piensa en un gradiente como la pendiente de una colina: cuanto más pronunciada es la colina —o más brusco el cambio de brillo—, más fuerte es el gradiente.

![Diferencias en intensidad de gradiente](https://miro.medium.com/v2/resize:fit:560/0*8YZxtUqw1fq_Lkr5.png)
*Diferencias en la intensidad del gradiente | [Fuente](https://www.analyticsvidhya.com/blog/2019/09/feature-engineering-images-introduction-hog-feature-descriptor/)*

En la primera figura casi no hay gradiente porque no cambia el color. En la segunda aparece un cambio en un borde. En la tercera, el contraste diferencia claramente la cabeza y la oreja del perro.

## Pasos para calcular HOG

### 1. Dividir la imagen

La imagen se divide en cuadrados pequeños llamados **celdas**, normalmente de tamaño fijo, como 8 × 8 o 16 × 16 píxeles.

> Las celdas pequeñas capturan más detalle, pero generan vectores de características de mayor dimensión.

### 2. Calcular gradientes

Para cada celda calculamos la **dirección** y la **magnitud** del gradiente.

La dirección se obtiene a partir del cambio de intensidad en *x* e *y*:

*θ = arctan(Δy / Δx)*

La magnitud, que representa la fuerza del borde, suele calcularse así:

*|G| = √(Δx² + Δy²)*

### 3. Crear histogramas

Para cada celda creamos un histograma con la frecuencia de las direcciones de gradiente. Cada barra representa un ángulo y su altura indica cuántas veces aparece en la celda.

![Histograma de gradientes orientados](https://miro.medium.com/v2/resize:fit:597/0*Zs8z_vp_1fhWBEsQ.gif)
*Histograma de gradientes orientados | [Fuente](https://customers.pyimagesearch.com/lesson-sample-histogram-of-oriented-gradients-and-car-logo-recognition/)*

### 4. Normalizar

Para que cambios de iluminación o sombras no alteren el descriptor, normalizamos los histogramas. Métodos habituales:

- L2-norm.
- L1-norm.
- L1-sqrt.
- L2-Hys.

### 5. Combinar

Unimos los histogramas de todas las celdas en un gran descriptor de características: un mapa de las pendientes de toda la imagen.

### 6. Detectar

El histograma combinado funciona como una huella. Ante una imagen nueva, se calcula su HOG y se compara con las huellas de objetos conocidos.

## Ejemplo completo con Python

Usaremos una fotografía de [Karsten Winegeart](https://unsplash.com/@karsten116?utm_source=medium&utm_medium=referral).

![Foto de Karsten Winegeart en Unsplash](https://miro.medium.com/v2/resize:fit:700/0*ZIEa6mOph4Yzq4ou)
*Foto de [Karsten Winegeart](https://unsplash.com/@karsten116?utm_source=medium&utm_medium=referral) en [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

### 1. Escala de grises y celdas

Convertimos la imagen a escala de grises y la dividimos en celdas de 16 × 16.

![Imagen en escala de grises segmentada en celdas 16 × 16](https://miro.medium.com/v2/resize:fit:700/0*vNPRaSnSwBrETEXS)
*Imagen en escala de grises segmentada en celdas 16 × 16 | Modificada por el autor*

~~~python
import cv2
import numpy as np
import matplotlib.pyplot as plt

image = cv2.imread("ruta/a/tu/imagen.png")
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

cell_width, cell_height = 16, 16
image_with_cells = np.repeat(gray_image[:, :, np.newaxis], 3, axis=2)

num_cells_x = gray_image.shape[1] // cell_width
num_cells_y = gray_image.shape[0] // cell_height

for i in range(num_cells_x + 1):
    cv2.line(image_with_cells, (i * cell_width, 0),
             (i * cell_width, gray_image.shape[0]), (0, 255, 0), 1)
for i in range(num_cells_y + 1):
    cv2.line(image_with_cells, (0, i * cell_height),
             (gray_image.shape[1], i * cell_height), (0, 255, 0), 1)

plt.imshow(image_with_cells, cmap="gray")
plt.axis("off")
plt.show()
~~~

### 2. Magnitud y dirección del gradiente

Calculamos los gradientes mediante el operador Sobel.

![Magnitud y dirección del gradiente](https://miro.medium.com/v2/resize:fit:1000/0*Flpy_9rMBd-CZiEE)
*Magnitud y dirección del gradiente de la imagen original | Modificada por el autor*

Las zonas claras de magnitud representan gradientes fuertes, por lo que el perro se distingue claramente. Los colores de la dirección muestran la orientación de bordes y texturas; el contorno del perro aparece en zonas azules con orientación parecida.

~~~python
grad_x = cv2.Sobel(gray_image, cv2.CV_32F, 1, 0, ksize=1)
grad_y = cv2.Sobel(gray_image, cv2.CV_32F, 0, 1, ksize=1)

magnitude = cv2.magnitude(grad_x, grad_y)
direction = cv2.phase(grad_x, grad_y, angleInDegrees=True)
~~~

### 3. Histograma de cada celda

Con la magnitud y dirección, calculamos el histograma de orientación para cada celda.

![Histograma de gradiente por celda](https://miro.medium.com/v2/resize:fit:1000/1*wIfijDaTcs4RPDvrXkk82w.png)
*Histograma del gradiente por celda | Modificada por el autor*

La forma del perro es perceptible: los cuadrados azules destacan frente a histogramas grises uniformes y señalan zonas con bordes concentrados u orientaciones específicas.

~~~python
cell_size = (16, 16)
nbins = 9
num_cells_x = gray_image.shape[1] // cell_size[1]
num_cells_y = gray_image.shape[0] // cell_size[0]
histograms = np.zeros((num_cells_y, num_cells_x, nbins))

for i in range(num_cells_y):
    for j in range(num_cells_x):
        cell_direction = direction[
            i*cell_size[0]:(i+1)*cell_size[0],
            j*cell_size[1]:(j+1)*cell_size[1],
        ]
        cell_magnitude = magnitude[
            i*cell_size[0]:(i+1)*cell_size[0],
            j*cell_size[1]:(j+1)*cell_size[1],
        ]
        hist, _ = np.histogram(
            cell_direction, bins=nbins, range=(0, 180),
            weights=cell_magnitude,
        )
        histograms[i, j] = hist
~~~

### 4. Normalizar y visualizar

Normalizamos con [L2-Hys](https://en.wikipedia.org/wiki/Histogram_of_oriented_gradients) para hacer el descriptor más resistente a luz y sombras.

![Imagen original frente a imagen HOG](https://miro.medium.com/v2/resize:fit:1000/1*76uWjS941FAi7Z_wg6OO6g.png)
*Imagen original en gris frente a imagen HOG | Modificada por el autor*

~~~python
from skimage.feature import hog
from skimage import exposure

fd, hog_image = hog(
    gray_image,
    orientations=8,
    pixels_per_cell=(16, 16),
    cells_per_block=(1, 1),
    visualize=True,
    block_norm="L2-Hys",
)

hog_image_rescaled = exposure.rescale_intensity(hog_image, in_range=(0, 10))
plt.imshow(hog_image_rescaled, cmap=plt.cm.gray)
plt.axis("off")
plt.show()
~~~

### Bibliografía

- [HOG: Histogram of Oriented Gradients](https://towardsdatascience.com/hog-histogram-of-oriented-gradients-67ecd887675f)
- [Introducción a HOG](https://medium.com/analytics-vidhya/a-gentle-introduction-into-the-histogram-of-oriented-gradients-fdee9ed8f2aa)
- [Histogram of Oriented Gradients](https://learnopencv.com/histogram-of-oriented-gradients/)

*¡Gracias por leer! Si te ha gustado el artículo, puedes dejar hasta 50 aplausos y seguirme en* [*Medium*](https://medium.com/@jorgecardete) *para estar al día de las próximas publicaciones.*

*También puedes seguir mi nueva publicación:*

> **[The Deep Hub](https://medium.com/thedeephub)**
> Tu espacio sobre ciencia de datos.
