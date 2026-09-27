---
title: "Backpropagation"
description: "Del misterio al dominio: el motor de las redes neuronales"
date: 2023-11-01
tags: [deep-learning, redes-neuronales, matemáticas]
icon: "🔁"
order: 2
cover: "/blog/covers/backpropagation.jpg"
topic: ml
---

*Del misterio al dominio: el motor de las redes neuronales. Publicado originalmente en [Towards AI](https://medium.com/towards-artificial-intelligence/backpropagation-2eeb25201095).*

![Creada con DALL-E 3](https://miro.medium.com/v2/resize:fit:700/1*zM2cHNJjHEbJZYk3ZPHbSg.png)
*Creada con DALL-E 3 | Todas las imágenes de ecuaciones fueron creadas por el autor*

*Backpropagation* significa «propagación hacia atrás de los errores». Es un algoritmo de aprendizaje supervisado que minimiza los errores de predicción de una red neuronal.

En esencia, aplica la **regla de la cadena** para calcular los gradientes de la función de pérdida respecto a los parámetros del modelo. Tiene dos fases:

1. **Propagación hacia delante.** Una entrada atraviesa las capas de la red y genera una predicción, que se compara con la etiqueta real para calcular el error.
2. **Propagación hacia atrás.** Partiendo de ese error, se recorren las capas en sentido inverso para calcular cómo ajustar los pesos y minimizar la pérdida mediante algoritmos como el [descenso de gradiente](https://towardsdatascience.com/gradient-descent-explained-9b953fc0d2c).

![Propagación hacia delante](https://miro.medium.com/v2/resize:fit:640/0*vZpUjYBZQx4B7_Gv.gif)
*Propagación hacia delante | Fuente: 3Blue1Brown*

![Propagación hacia delante y hacia atrás](https://miro.medium.com/v2/resize:fit:700/0*OO8jkWCl5pbP66Qr.gif)
*Propagación hacia delante y hacia atrás | Fuente: 3Blue1Brown*

> Backpropagation es, esencialmente, una aplicación de la **regla de la cadena** para calcular el **gradiente** de cada peso de la red.

Antes de profundizar, hay que entender esos dos conceptos.

## 1. Regla de la cadena

La regla de la cadena permite derivar funciones compuestas; es especialmente útil cuando unas funciones están anidadas dentro de otras.

Supongamos que *y = g(u)* y *u = f(x)*, de modo que *y = g(f(x))*. La regla de la cadena calcula la derivada de *y* respecto a *x* considerando la función intermedia *u*.

![](https://miro.medium.com/v2/resize:fit:134/0*7UzGmsYmjps6woOJ)

Puede extenderse a más funciones. Si *y* depende de *u*, *u* depende de *v* y *v* depende de *x*:

![](https://miro.medium.com/v2/resize:fit:188/0*_MEyOqB3aOfTElVJ)

### Ejemplo

Dadas las siguientes funciones:

![](https://miro.medium.com/v2/resize:fit:268/1*K7of60jOqilJegUiNR8MfA.png)

Buscamos la derivada de *y* respecto a *x*.

**Paso 1:** calcular *du/dx*.

![](https://miro.medium.com/v2/resize:fit:173/1*cUz0XlGtyC7RYnrcHYvd4w.png)

**Paso 2:** calcular *dy/du*.

![](https://miro.medium.com/v2/resize:fit:132/1*GaR7utCz4y0VRiKXQWHHzQ.png)

**Paso 3:** aplicar la regla de la cadena.

![](https://miro.medium.com/v2/resize:fit:134/0*3G9qkRe_s1LQx2Hm)

**Paso 4:** sustituir los resultados.

![](https://miro.medium.com/v2/resize:fit:165/1*BNy69_25Be8-ZI-kGizVWg.png)

**Paso 5:** sustituir *u* por su función original de *x*.

![](https://miro.medium.com/v2/resize:fit:201/1*llSLwbY3G5cO4vijBko8VA.png)

La derivada final indica cómo un cambio pequeño en *x* afecta a *y* a través de *u*.

## 2. Gradiente

Para una función de una sola variable, una derivada expresa la pendiente de la recta tangente. Para una función de **múltiples variables**, usamos el **gradiente**, su generalización.

El gradiente indica la dirección de máximo crecimiento y su magnitud representa la velocidad de aumento en esa dirección.

Si *x = (x1, x2, …, xn)*, el gradiente de *f* se denota por **∇f**:

![](https://miro.medium.com/v2/resize:fit:286/0*_W_OR1uhQ7vt30-v)

Consideremos esta función y calculemos su gradiente en *(1, 2)*:

![](https://miro.medium.com/v2/resize:fit:227/0*zI-yIlm6MN84jzfB)

Primero calculamos las derivadas parciales:

![](https://miro.medium.com/v2/resize:fit:383/1*8Rw6vLT4B8OhuUmvMmztng.png)

Después las evaluamos en *(1, 2)*:

![](https://miro.medium.com/v2/resize:fit:400/1*4Ay6CAv24oyb01Wch1lvmg.png)

El gradiente es **∇f(1,2) = (10,6)**. Por cada unidad que aumentamos en *x*, la función sube 10; por cada unidad en *y*, sube 6.

La magnitud del gradiente representa la pendiente. Para *(10,6)*:

![](https://miro.medium.com/v2/resize:fit:383/0*4UQBnA_JTClOakQo)

Moverse desde *(1,2)* en la dirección *(10,6)* incrementa aproximadamente *f(x,y)* en 11,66 unidades por cada paso pequeño.

## Regla de la cadena y gradiente en backpropagation

Una red neuronal es una enorme función compuesta de muchas neuronas conectadas.

![Funciones dentro de las capas de una red neuronal](https://miro.medium.com/v2/resize:fit:599/0*4BeOQ6A1V5filQ31.png)
*Funciones dentro de las capas de una red neuronal | [Fuente](https://towardsdatascience.com/how-to-define-a-neural-network-as-a-mathematical-function-f7b820cde3f)*

Cada capa construye sobre la información de la anterior hasta llegar a la salida. La regla de la cadena permite descomponer ese recorrido y el gradiente explica el impacto de cada peso en la pérdida total.

Por ejemplo, para saber cómo un peso de la primera capa afecta a la pérdida final, hay que seguir su efecto sobre la salida de la primera capa, luego sobre la segunda, la tercera y así hasta la salida.

![Representación de pesos de red neuronal](https://miro.medium.com/v2/resize:fit:700/0*Y7EQ_EicVKSUS9OF.png)
*Representación de pesos de red neuronal | [Fuente](https://towardsdatascience.com/backpropagation-step-by-step-derivation-99ac8fbdcc28)*

## El proceso completo

**Paso 1: propagación hacia delante.** Pasamos una entrada por la red y obtenemos las activaciones de cada capa.

**Paso 2: pérdida.** Calculamos la diferencia entre la predicción y el objetivo real con una función de pérdida.

**Paso 3: propagación hacia atrás.** Para cada peso calculamos cuánto cambia la pérdida si cambia ese peso:

![](https://miro.medium.com/v2/resize:fit:74/0*O1-KY8a4V8HD-3v2)

Al expandir el gradiente con la regla de la cadena, aparece un producto de gradientes desde la salida hasta la capa que contiene el peso.

**Paso 4: ajustar los pesos.** Con los gradientes, ajustamos los pesos en la dirección que reduce la pérdida, normalmente con descenso de gradiente, Adam o RMSprop. Repetimos el proceso para cada peso.

## Ejemplo de backpropagation

Imaginemos una red *feedforward* simple: una capa de entrada con cuatro neuronas y una sola neurona de salida.

![Parámetros de la red neuronal](https://miro.medium.com/v2/resize:fit:290/0*e8tsNl7IZvV4D70K.png)

### Paso 1: propagación hacia delante

Dado un vector de entrada *x*, la suma ponderada de la neurona de salida es:

![](https://miro.medium.com/v2/resize:fit:296/0*s-3hy2k7O55Q5XZs)

Tras la función de activación, la salida es:

![](https://miro.medium.com/v2/resize:fit:179/0*YWMbsM0Rfs8WuhYt)

### Paso 2: función de pérdida

Supongamos que usamos el **error cuadrático medio (MSE)**:

![](https://miro.medium.com/v2/resize:fit:129/0*gOC9ngMtNqcau_rp)

### Paso 3: backpropagation

Para ajustar los pesos, calculamos la derivada de la pérdida respecto a cada peso usando la regla de la cadena:

![](https://miro.medium.com/v2/resize:fit:212/0*-rp6Qbi16q-e_1gc)

Al multiplicar los términos obtenemos el gradiente para el peso *wi*:

![](https://miro.medium.com/v2/resize:fit:275/0*7vc8LsX5hBN1u6Yg)

### Paso 4: actualización de pesos

Actualizamos *wi* con descenso de gradiente, donde ***α*** es la tasa de aprendizaje:

![](https://miro.medium.com/v2/resize:fit:175/0*rEcLHlAy9Nur3EVv)

El proceso se repite para *w1*, *w2*, *w3* y *w4*.

*Backpropagation | 3Blue1Brown*

### Bibliografía

- [Kostadinov, S. (2019). Understanding Backpropagation Algorithm. Towards Data Science.](https://towardsdatascience.com/understanding-backpropagation-algorithm-7bb3aa2f95fd)
- [Wikipedia: Backpropagation](https://en.wikipedia.org/wiki/Backpropagation)
- [3Blue1Brown: But what is backpropagation really doing?](https://www.youtube.com/watch?v=Ilg3gGewQ5U&list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi&index=4)
- [Andrej Karpathy: Backpropagation, Neural Networks 1](https://www.youtube.com/watch?v=i94OvYb6noo&list=PLkt2uSq6rBVctENoVBg1TpCC7OQi31AlC&index=5)

*¡Gracias por leer! Si te ha gustado el artículo, puedes dejar hasta 50 aplausos y seguirme en* [*Medium*](https://medium.com/@jorgecardete) *para estar al día de las próximas publicaciones.*
