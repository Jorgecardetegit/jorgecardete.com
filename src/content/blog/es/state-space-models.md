---
title: "Introducción amable a los modelos de espacio de estados"
description: "Una guía breve a la base del análisis de sistemas dinámicos"
date: 2024-03-15
tags: [machine-learning]
icon: "📈"
order: 5
cover: "/blog/covers/state-space-models.jpg"
topic: ml
---

*Una guía breve a la base del análisis de sistemas dinámicos. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/gentle-introduction-to-state-space-models-e8cd7501e0cf).*

![Creada por el autor con DALL-E 3](https://miro.medium.com/v2/resize:fit:700/1*xyZB3D6glLHWI6Cqqn74DQ.png)
*Creada por el autor con DALL-E 3*

Últimamente, los **modelos de espacio de estados** (*State Space Models*, SSM) se han vuelto populares en machine learning, especialmente tras el conocido [paper de Mamba](https://arxiv.org/abs/2312.00752).

Las definiciones técnicas pueden parecer intimidantes: hablan de ecuaciones diferenciales, sistemas estocásticos y dinámicos. Son correctas, pero el concepto básico es más accesible.

Este artículo presenta los SSM desde cero y explica por qué son fundamentales en machine learning.

## Modelos de espacio de estados

![Dibujo de un coche](https://miro.medium.com/v2/resize:fit:254/0*AleDA5yT4alikbCG)
*Dibujo de un coche | [Fuente](https://www.google.com/url?sa=i&url=https%3A%2F%2Fgaleria.dibujos.net%2Fvehiculos%2Fcoches%2Fautomovil-moderno-pintado-por-kshy-9819628.html)*

Imagina un coche teledirigido cuyo movimiento queremos entender y predecir.

Los **SSM** describen su movimiento con dos ideas:

- **Estado:** una instantánea de todo lo que necesitamos saber: posición, dirección, velocidad, etc.
- **Observación:** lo que podemos ver o medir. Podemos conocer su posición sin conocer directamente su velocidad.

![Representación de fuerzas del coche](https://miro.medium.com/v2/resize:fit:598/1*cAtR1-EsnZSDPxFLymhPMg.png)
*Representación de fuerzas del coche | [Fuente](http://manuallibfarber.z13.web.core.windows.net)*

![Observación de un coche](https://miro.medium.com/v2/resize:fit:700/1*FfTP39TAyWt0ZjxqFBPtYg.png)
*Observación de un coche | [Fuente](https://kolblabs.com/observing-motion-of-the-car-and-time-class-7-science-experiment/)*

En resumen, dividimos un sistema complejo en su **estado interno** y sus **observaciones externas**. Con ello podemos predecir su comportamiento futuro.

## Sistemas dinámicos frente a estáticos

![Sistemas dinámicos](https://miro.medium.com/v2/resize:fit:539/1*1Cw2podAwK2eVX6Ixl0qgw.png)
*Sistemas dinámicos | [Fuente](https://www.researchgate.net/figure/Input-and-output-time-series-in-relation-to-a-dynamic-system_fig1_286597980)*

Los sistemas dinámicos evolucionan y se adaptan con el tiempo cuando llega información nueva. Actualizan continuamente el modelo para refinar sus predicciones.

Los sistemas estáticos no cambian después de desplegarse: se apoyan en un modelo fijo entrenado con datos predefinidos.

![Sistemas estáticos frente a dinámicos](https://miro.medium.com/v2/resize:fit:613/1*jvYQIFUg3tC1AIO0g3n-Aw.png)
*Sistemas estáticos frente a dinámicos | [Fuente](https://skill-lync.com/student-projects/structural-dynamics-53)*

> Los sistemas dinámicos se ajustan a condiciones y patrones cambiantes; los estáticos funcionan mejor en entornos estables y previsibles.

## SSM en machine learning: series temporales

Los SSM son especialmente útiles para **series temporales**, que cambian con el tiempo.

Clasificar imágenes de perros, gatos y pájaros es un problema esencialmente estático: las observaciones no dependen de una evolución temporal del sistema.

Predecir el tiempo meteorológico, en cambio, es dinámico. Los SSM se adaptan bien a los cambios de los datos con el tiempo.

![Análisis de series temporales](https://miro.medium.com/v2/resize:fit:640/0*4S8oWlPJA5cFyVd0.gif)
*Análisis de series temporales | [Fuente](https://blog.research.google/2021/11/metnet-2-deep-learning-for-12-hour.html)*

## Formulación matemática

Un SSM tiene una **ecuación de estado** y una **ecuación de observación**, ambas en función del tiempo *t*.

### Tiempo discreto

Los modelos analizan el tiempo como una variable **discreta**, dividida en pasos: horas, días, semanas, etc. Cada paso es un punto separado en el tiempo. En un modelo diario, *t = 1* sería el primer día y *t = 2* el segundo.

![Variables continuas y discretas en SSM](https://miro.medium.com/v2/resize:fit:418/1*0-0igeZt4ZND-21dBpPW5Q.png)
*Variables continuas y discretas en SSM | [Fuente](https://maximusminknox.blogspot.com/2022/05/explain-difference-between-discrete-and.html)*

### 1. Ecuación de estado

Describe cómo evoluciona el estado entre pasos temporales:

![](https://miro.medium.com/v2/resize:fit:362/0*d5o-NH6RMS7in1Xb)

- x(t): vector de estado en el instante t.
- A: matriz de transición de estado.
- B: matriz que mapea el efecto de las entradas u(t).
- w(t): ruido de estado, perturbaciones aleatorias o errores de modelado.

### 2. Ecuación de observación

Relaciona el estado interno con las salidas observables:

![](https://miro.medium.com/v2/resize:fit:317/0*mOwLHKf1VHg5WWK8)

- y(t): vector de salida en t.
- C: matriz que mapea el estado a salidas observadas.
- D: relación directa entre entrada y salida.
- v(t): ruido de observación.

Las matrices principales son:

- **A, transición de estado:** explica cómo el estado actual determina el siguiente. En el coche, cómo posición y velocidad actuales influyen en las posteriores.
- **B, entrada de control:** recoge el efecto de controles externos: volante, acelerador y freno.
- **C, salida:** traduce el estado a lo que medimos, como los indicadores del salpicadero.
- **D, transmisión directa:** representa una relación entre entradas y salidas que no pasa por el estado; muchas veces es una matriz de ceros.

## Estimar parámetros

Hay dos formas principales de determinar los parámetros:

### Principios fundamentales

Podemos derivar matrices del sistema a partir de leyes físicas u otros principios específicos, algo habitual en ingeniería y física.

![Principios físicos del sistema](https://miro.medium.com/v2/resize:fit:700/0*F-5YU9tVNpzY1FNr)
*Principios físicos del sistema | [Fuente](https://www.collegesidekick.com/study-guides/physics/8-3-conservation-of-momentum)*

### Ajuste a datos

También pueden estimarse con datos empíricos. Métodos comunes:

- Mínimos cuadrados y variantes.
- Expectation-Maximization (EM).
- Estimación de máxima verosimilitud (MLE).

![Concepto de mínimos cuadrados](https://miro.medium.com/v2/resize:fit:700/0*t6hKF-DJVsB7aPZf.png)
*Concepto de mínimos cuadrados | [Fuente](https://www.jmp.com/en_in/statistics-knowledge-portal/what-is-regression/the-method-of-least-squares.html)*

## Hacer predicciones

Una vez creado el modelo, conocemos cómo se relacionan los pasos temporales. Podemos predecir el siguiente estado aplicando sus ecuaciones.

En condiciones reales hay incertidumbre. Para reducir sesgo y seguir la distribución de los datos se utilizan algoritmos de estimación, como:

- Filtros de partículas.
- Filtro de Kalman extendido.
- Estimación de horizonte móvil.
- Filtros bayesianos.
- Mínimos cuadrados.

El más popular es el **filtro de Kalman**.

> **[Kalman Filter in a Nutshell](https://towardsdatascience.com/kalman-filter-in-a-nutshell-e66154a06862)**
> Una introducción al filtro de Kalman con un ejemplo cotidiano.

## Ejemplo: predicción meteorológica

### Paso 1: definir variables

**Observables:** temperatura, humedad, presión barométrica y velocidad/dirección del viento. Podemos medirlas directamente.

**Variables de estado:** estabilidad atmosférica (S), contenido de humedad (M) y movimiento de masas de aire (A). No se miden directamente en un único punto.

### Paso 2: definir pasos temporales

Podrían ser horarios o diarios. En este ejemplo actualizamos el modelo diariamente: todas las variables en t representan los datos recogidos cada día.

### Paso 3: modelo matemático

Organizamos las variables observables y de estado en vectores y usamos:

~~~text
X(t + 1) = F · X(t) + G · U(t) + w(t)
Y(t) = H · X(t) + v(t)
~~~

F define cómo el estado actual afecta al siguiente; G es la matriz de entradas; H conecta estado y observaciones; v(t) representa errores e incertidumbre de medición.

### Paso 4: encontrar F y H

Podemos derivarlas teóricamente a partir de principios físicos o ajustarlas con datos mediante mínimos cuadrados, filtro de Kalman o máxima verosimilitud.

Cada f(i,j) expresa cómo la variable de estado j afecta a la variable i en el siguiente instante. Cada h(i,j) expresa cómo la variable de estado j afecta a la observable i.

### Referencias

- [Kalman and Bayesian Filters in Python](https://github.com/rlabbe/Kalman-and-Bayesian-Filters-in-Python)
- [Kalman Filter](https://www.kalmanfilter.net/)
- [State Space Models](https://kevinkotze.github.io/ts-4-state-space/)
