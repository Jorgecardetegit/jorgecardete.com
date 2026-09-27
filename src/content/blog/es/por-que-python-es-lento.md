---
title: "¿Por qué Python es tan lento?"
description: "Los compromisos entre facilidad de uso y velocidad de ejecución"
date: 2024-02-01
tags: [python, rendimiento]
icon: "🐢"
cover: "/blog/covers/por-que-python-es-lento.jpg"
topic: practice
---

*Los compromisos entre facilidad de uso y velocidad de ejecución. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/but-why-python-is-so-slow-da1a4fb9be92).*

![Creada por el autor con DALL-E 3](https://miro.medium.com/v2/resize:fit:700/0*5gCsm9MXumW4iEDa)
*Creada por el autor con DALL-E 3*

En la comunidad de programación es bien sabido que el lenguaje de la serpiente **no gana carreras**.

Python es genial y a todo el mundo le gusta.

> «Pero es lento…»

En este artículo repasaré las características de Python que lo convierten en **uno de los lenguajes más completos** actuales, con la contrapartida de **no ser tan rápido**.

Antes, veamos algunos fundamentos de los lenguajes de programación.

### Niveles de abstracción

Los lenguajes de programación suelen describirse por su nivel de abstracción.

- Un **nivel bajo de abstracción** indica que el lenguaje está **más cerca del hardware** y es más difícil de interpretar.
- Un **nivel alto** indica que el código está **más cerca de la persona usuaria** y es más fácil de interpretar.

![Niveles de abstracción: del hardware a los lenguajes modernos](https://miro.medium.com/v2/resize:fit:700/1*OcSPIqq48saZU6eENg91Kw.png)
*Niveles de abstracción: del hardware a los lenguajes modernos | Creada por el autor*

C++, PHP, Java y Python se consideran **lenguajes modernos —o de alto nivel—** porque pueden ejecutarse en casi **cualquier sistema**.

En ensamblador hay que escribir un programa distinto según las **instrucciones de cada procesador**: el mismo código no puede ejecutarse en CPU diferentes.

> Por ejemplo, si creas un programa que imprime «Hello world» y se lo envías a alguien con otro modelo de ordenador, probablemente fallará al ejecutarlo.

### Lenguajes modernos: el último nivel de abstracción

![Abstracción en lenguajes modernos](https://miro.medium.com/v2/resize:fit:700/0*U7-cAHmg_ouBV1pV.png)
*Abstracción en lenguajes modernos | [Fuente](https://medium.com/young-coder/the-difference-between-compiled-and-interpreted-languages-d54f66aa71f0)*

Aunque son el nivel más alejado del código máquina, también hay jerarquías en la última capa de la pirámide.

Por un lado están los **lenguajes procedurales como C**, en los que hay que saber con precisión qué se hace paso a paso. Son **muy eficientes**, pero también complejos y menos flexibles.

Por otro, hay lenguajes que simplifican las tareas al permitir código más **legible** y **flexible**.

Ese es el caso de **Python**: sirve para casi todo y es fácil de implementar, pero pierde eficiencia en determinadas tareas.

**¿Por qué es Python tan «lento»?**

Repasemos algunas características para responder a esta pregunta.

## Lenguaje interpretado

Python es un **lenguaje interpretado**: un programa —el intérprete— lee y ejecuta el código **línea a línea en tiempo de ejecución**.

Es una forma de transformar código en código máquina.

Los **lenguajes compilados** siguen otra vía: un compilador transforma el código fuente en código máquina antes de ejecutarlo.

![Lenguajes compilados frente a interpretados](https://miro.medium.com/v2/resize:fit:700/0*MGg4NfHYXU9g9PiN.png)
*Lenguajes compilados frente a interpretados | [Fuente](https://medium.com/from-the-scratch/stop-it-there-are-no-compiled-and-interpreted-languages-512f84756664)*

### ¿Por qué el enfoque interpretado es más lento?

En un lenguaje interpretado, cada línea se traduce a código máquina ***sobre la marcha***, durante la ejecución.

Cada vez que se ejecuta un programa, el intérprete debe **analizar**, **procesar** y **ejecutar** el código. Esto añade sobrecarga frente a ejecutar directamente código máquina ya compilado.

> Si un fragmento se ejecuta varias veces —por ejemplo, dentro de un bucle—, el intérprete debe leerlo y traducirlo cada vez que lo encuentra. Un programa compilado ejecuta el código máquina directamente, sin volver a traducirlo en cada iteración.

> **[The Difference Between Compiled and Interpreted Languages](https://medium.com/young-coder/the-difference-between-compiled-and-interpreted-languages-d54f66aa71f0)**
> Una guía ilustrada sobre cómo los lenguajes modernos transforman código fuente en código máquina.

## CPython y su Global Interpreter Lock (GIL)

El intérprete estándar de Python es [CPython](https://en.wikipedia.org/wiki/CPython). Está escrito en **C** y **Python**, y compila el código Python a [**bytecode**](https://en.wikipedia.org/wiki/Bytecode) antes de interpretarlo.

Para impedir que varios hilos nativos ejecuten bytecode de Python al mismo tiempo, CPython usa el **Global Interpreter Lock**.

Este bloqueo es necesario porque la gestión de memoria de CPython no es segura para hilos.

Sin embargo, puede ser un cuello de botella importante en programas multihilo: limita las mejoras de rendimiento de usar [**multithreading**](https://en.wikipedia.org/wiki/Multithreading_(computer_architecture)) en procesadores con varios núcleos.

![Funcionamiento del Global Interpreter Lock](https://miro.medium.com/v2/resize:fit:700/0*ZaBCUF-0GXqqW_YD.png)
*Funcionamiento del Global Interpreter Lock | [Fuente](https://subscription.packtpub.com/book/programming/9781787285378/1/ch01lvl1sec13/the-limitations-of-python)*

## Tipado dinámico

Python es además **dinámicamente tipado**: no necesitas declarar el tipo de una variable al inicializarla.

### ¿Cómo afecta esto a la eficiencia?

En los lenguajes de tipado dinámico, los tipos se determinan **en tiempo de ejecución**. El intérprete debe comprobarlos cada vez que ejecuta una parte del código.

Eso requiere procesamiento adicional para determinar el tipo de cada variable y qué operación corresponde a esos tipos.

El enfoque opuesto son los lenguajes de tipado estático. En ellos, el tipo de una variable se conoce **en tiempo de compilación**, no durante la ejecución.

Como resultado, los compiladores pueden optimizar el código de forma más agresiva. Los programas son más rápidos, aunque menos flexibles.

[C++](https://en.wikipedia.org/wiki/C%2B%2B) y [Rust](https://en.wikipedia.org/wiki/Rust_%28programming_language%29) utilizan este enfoque.

![Tipado estático frente a dinámico](https://miro.medium.com/v2/resize:fit:641/1*uyxStLBaq-v39Uq5RfCdmQ.png)
*Tipado estático frente a dinámico | [Fuente](https://medium.com/@mhaipassakunsiri/static-vs-dynamic-typing-%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%99%E0%B8%B0-37a2bd6173fe)*

## Recolección de basura

La recolección de basura es un sistema de **gestión automática de memoria** que recupera memoria que el programa ya no utiliza.

Python gestiona automáticamente la **asignación** y la **liberación** de memoria de sus objetos. Su mecanismo principal es el **conteo de referencias**: cada objeto tiene un contador con el número de referencias que apuntan a él.

Cuando el contador baja a cero, es decir, cuando ya no queda ninguna referencia al objeto, se elimina inmediatamente de la memoria.

![Funcionamiento del recolector de basura](https://miro.medium.com/v2/resize:fit:700/0*L68nF0DjYLAoG2go.png)
*Funcionamiento del recolector de basura | [Fuente](https://jenaiz.com/2022/02/understanding-how-the-python-garbage-collector-works/)*

La recolección de basura es un arma de doble filo.

Simplifica mucho la gestión de memoria al limpiar objetos sin uso de forma automática. Así ayuda a prevenir fugas de memoria y otros errores asociados a gestionarla manualmente.

Pero introduce sobrecarga e imprevisibilidad, que pueden afectar al rendimiento de una aplicación.

> **[Demystifying Python’s Garbage Collector: Cleaning Up the Mess](https://medium.com/quantrium-tech/demystifying-pythons-garbage-collector-cleaning-up-the-mess-767662076ff5)**
> Una mirada más detallada al recolector de basura.

### Conclusión

Las cuatro características principales que pueden hacer lento a Python son:

- La **ejecución interpretada**, que añade una capa de abstracción entre el código y el lenguaje máquina.
- El **Global Interpreter Lock**, que impide a los programas multihilo aprovechar por completo los procesadores multinúcleo.
- El **tipado dinámico**, que determina el tipo de los objetos durante la ejecución y exige más trabajo al intérprete.
- La **recolección de basura**, que puede añadir latencia, especialmente con muchos objetos o estructuras de datos complejas.

> Pero hay algo importante…

Si te gusta Python y quieres construir un programa rápido, **no es el fin del mundo**.

Hay muchas maneras de acelerar código Python. ¿Has oído hablar de **Cython**, **Numba**, **NumPy** o **PyPy**?

Si no, no te preocupes: los veremos pronto.

### Bibliografía

- [https://docs.python.org](https://docs.python.org)
- [https://www.geeksforgeeks.org/garbage-collection-python/](https://www.geeksforgeeks.org/garbage-collection-python/)
- [https://www.baeldung.com/cs/statically-vs-dynamically-typed-languages](https://www.baeldung.com/cs/statically-vs-dynamically-typed-languages)
- [https://medium.com/young-coder/the-difference-between-compiled-and-interpreted-languages-d54f66aa71f0](https://medium.com/young-coder/the-difference-between-compiled-and-interpreted-languages-d54f66aa71f0)

*¡Gracias por leer! Si te ha gustado el artículo, puedes dejar hasta 50 aplausos y seguirme en* [*Medium*](https://medium.com/@jorgecardete) *para estar al día de las próximas publicaciones.*
