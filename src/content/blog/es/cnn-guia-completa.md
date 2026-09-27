---
title: "Redes neuronales convolucionales: una guía completa"
description: "El poder de las CNN en el análisis de imágenes"
date: 2024-02-07
tags: [deep-learning, cnn, machine-learning]
icon: "🧠"
order: 1
cover: "/blog/covers/cnn-guia-completa.png"
topic: vision
---

*El poder de las CNN en el análisis de imágenes. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/convolutional-neural-networks-a-comprehensive-guide-5cc0b5eae175).*

![Redes neuronales convolucionales](/blog/covers/cnn-guia-completa.png)

Las **redes neuronales convolucionales**, o **CNN**, son redes especializadas en procesar y clasificar imágenes.

Pero ¿cómo se clasifica una imagen? Las imágenes también son números: una imagen digital es una cuadrícula de **píxeles** y cada píxel guarda color e intensidad.

![Representación de píxel](https://miro.medium.com/v2/resize:fit:355/0*Su2NsuI37Lii-OCK.png)
*Representación de píxel | Fuente*

En color, un píxel suele tener tres valores correspondientes a rojo, verde y azul (**RGB**). En escala de grises, contiene un único valor de intensidad, normalmente entre negro (0) y blanco (255).

![Imagen en escala de grises](https://miro.medium.com/v2/resize:fit:700/0*IjuQtgtesflU7sLy.png)
*Imagen en escala de grises | Fuente*

## ¿Cómo funcionan las CNN?

Primero, recordemos una red neuronal básica:

1. **Neuronas:** unidades que combinan funciones lineales y una función de activación no lineal.
2. **Capa de entrada:** cada neurona representa una característica de entrada. Una imagen de 28 × 28 tendría 784 entradas, una por píxel.
3. **Capas ocultas:** transforman la salida de la capa anterior.
4. **Capa de salida:** tiene tantas neuronas como clases; para regresión suele tener una.

![Proceso de red neuronal](https://miro.medium.com/v2/resize:fit:620/0*XoYvsfn9EBBQHHhM.gif)
*Proceso de red neuronal | Fuente: 3Blue1Brown*

Tras predecir, calculamos una pérdida y ajustamos los pesos mediante backpropagation.

La diferencia central de una CNN está en sus capas especializadas.

## Capas convolucionales

Son los bloques fundamentales de una CNN. Aplican **convoluciones** mediante filtros llamados **kernels**, pequeñas matrices que recorren la imagen y aprenden patrones visuales complejos.

Un kernel multiplica sus valores por los píxeles que cubre y suma el resultado. Así extrae bordes, texturas y formas.

![Operación de kernel](https://miro.medium.com/v2/resize:fit:390/0*Kvc8f4nHC0Vg_WaG.gif)
*Operación de kernel | Fuente*

Con un kernel 2 × 2, cada posición de la imagen produce un valor. El conjunto de valores de salida se llama **mapa de características** (*feature map*).

![Ejemplo de convolución](https://miro.medium.com/v2/resize:fit:363/0*4RTQZqKqrhsinDu-)

Para entender una capa convolucional hay tres conceptos esenciales: canales, stride y padding.

### 1. Canales

Las imágenes RGB tienen tres canales, cada uno una matriz. Una capa convolucional tiene también canales: cada filtro genera un mapa de características distinto y el conjunto de mapas forma su salida.

![Imagen RGB descompuesta](https://miro.medium.com/v2/resize:fit:560/1*whABJWYKeolCwllDcpg85w.png)
*Imagen RGB descompuesta | Fuente*

La **profundidad** de una capa es el número de kernels. Cada canal puede especializarse en detectar una característica, como orejas o boca de un gato.

![Representación de CNN](https://miro.medium.com/v2/resize:fit:640/1*-FR6rFrKXktjxwDTlGofPQ.png)
*Representación de CNN | Fuente*

> No confundas los canales de color de la imagen con los canales de una capa convolucional: podemos añadir tantos filtros como necesitemos y cada uno aprende una característica diferente.

### 2. Stride

El *stride* indica cuántos píxeles avanza el kernel cada vez.

![Stride 1](https://miro.medium.com/v2/resize:fit:600/0*PwwAAFrpat2zNcsV.gif)
*Stride 1 | Fuente*

![Stride 2](https://miro.medium.com/v2/resize:fit:600/0*CvEOVhChtGfcgZFb.gif)
*Stride 2 | Fuente*

Un stride mayor produce una salida espacialmente más pequeña porque recorre la imagen más rápido. Puede capturar rasgos más globales, reducir cálculo y ayudar a controlar el sobreajuste. Uno menor conserva detalles más finos y locales.

### 3. Padding

El *padding* añade píxeles alrededor de los bordes. Sin él, los píxeles de las esquinas se recorren menos que los centrales.

![Padding 0](https://miro.medium.com/v2/resize:fit:600/0*zAqkOGriv74N7K_d.gif)
*Padding 0 | Fuente*

![Padding 1](https://miro.medium.com/v2/resize:fit:600/0*9EyOto1wcaYsbT-T.gif)
*Padding 1 | Fuente*

Padding preserva información espacial de los bordes y aumenta el tamaño del mapa de características de salida. Conviene usarlo cuando los bordes contienen información importante.

La salida se calcula mediante:

![Fórmula de tamaño de salida](https://miro.medium.com/v2/resize:fit:540/0*KkBxsHaa_8sZZtEs)

El término 2 × padding representa los lados opuestos de la imagen, y +1 la posición inicial del filtro. El padding puede ser asimétrico y personalizado.

Las capas convolucionales extraen características; no son por sí solas una CNN completa. También necesitamos pooling y flattening.

## Capas de pooling

Aunque una convolución puede reducir el tamaño espacial, su objetivo principal es **extraer características**, no reducir dimensionalidad.

Pooling sí busca reducir el tamaño de cada mapa de características, conservando información importante mediante el máximo o el promedio de cada ventana.

![Max y Average Pooling](https://miro.medium.com/v2/resize:fit:700/0*Lja1hLtBQS6H1-qI.gif)
*Max y Average Pooling | Fuente*

En el ejemplo se pasa de 4 × 4 a 2 × 2.

A diferencia de la convolución, pooling no aprende un kernel: simplifica los datos con una operación matemática.

> Pooling **no reduce el número de canales**. Se aplica de forma independiente a cada canal; solo reduce las dimensiones espaciales.

![Capas dentro de una CNN](https://miro.medium.com/v2/resize:fit:624/0*LBommOWPlEow8rbE.png)
*Capas dentro de una CNN | Fuente*

## Capas de flattening

Flattening reorganiza todo un mapa de características multidimensional en un **vector largo**.

![Concepto de flattening](https://miro.medium.com/v2/resize:fit:700/0*JDM5bgdLuwvDjhcZ.png)
*Concepto de flattening | Fuente*

No modifica la información, solo cambia su forma.

Sirve para:

- **Integrar características:** permite combinar rasgos extraídos de distintas posiciones para tareas como clasificación.
- **Conectar con capas densas:** las capas totalmente conectadas operan sobre datos unidimensionales.

Las capas convolucionales detectan rasgos; las densas los integran para producir predicciones. En reconocimiento facial, las primeras detectan bordes y texturas; las densas pueden combinarlos para reconocer rasgos de un rostro.

## Resumen de una CNN

La estructura reúne:

- Capas convolucionales.
- Capas de pooling.
- Capas de flattening.
- Capas densas.

También necesita funciones de activación y backpropagation.

## Funciones de activación

Sin activaciones, la red sería un modelo lineal enorme.

En la parte de extracción, las activaciones se aplican tras las capas convolucionales. Pooling y flattening no necesitan activación: el primero reduce dimensionalidad y el segundo reorganiza datos.

![Representación completa de CNN](https://miro.medium.com/v2/resize:fit:1000/0*so8rajH9EF43_OGc)
*Representación completa de CNN | Fuente*

Las capas densas y la capa de salida sí usan activaciones para aprender interacciones complejas y hacer clasificaciones o predicciones.

### Activaciones en capas convolucionales y densas

**ReLU** devuelve la entrada si es positiva y cero si no. Reduce tiempo de entrenamiento y mitiga el problema de gradiente que se desvanece.

**Leaky ReLU** permite un gradiente pequeño, pero no nulo, cuando la unidad está inactiva, lo que ayuda a evitar neuronas muertas.

### Activaciones de salida

**Sigmoid** devuelve valores entre 0 y 1. Ya no es habitual en capas ocultas por el gradiente que se desvanece, pero sigue siendo útil para clasificación binaria.

**Tanh** devuelve valores entre -1 y 1 y puede funcionar mejor en algunos problemas por su rango de salida.

## Bibliografía

- [CNN Explainer](https://poloclub.github.io/cnn-explainer/)
- [IBM: Convolutional Neural Networks](https://www.ibm.com/topics/convolutional-neural-networks)
- [Guía completa de CNN](https://towardsdatascience.com/a-comprehensive-guide-to-convolutional-neural-networks-the-eli5-way-3bd2b1164a53)
- [CNN for Visual Recognition](https://doi.org/10.1007/978-3-319-57550-6)
- [CNNs explained](https://www.youtube.com/watch?v=KuXjwB4LzSA&t=22s)

*¡Gracias por leer! Si te ha gustado el artículo, puedes dejar hasta 50 aplausos y seguirme en **Medium** para estar al día de los próximos artículos.*
