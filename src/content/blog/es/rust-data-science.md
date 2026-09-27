---
title: "Rust: un nuevo titán en ciencia de datos"
description: "Aprendizaje automático con cómputo de alto rendimiento, seguridad y concurrencia"
date: 2024-02-20
tags: [rust, machine-learning, ciencia-de-datos]
icon: "🦀"
order: 3
cover: "/blog/covers/rust-data-science.jpg"
topic: ml
---

*Aprendizaje automático con cómputo de alto rendimiento. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/rust-a-new-titan-in-data-science-d449463078b2).*

![Imagen creada por el autor con DALL-E 3](https://miro.medium.com/v2/resize:fit:1000/0*vx1zsEPAAIedzzbY)

La ciencia de datos ha vivido una especie de guerra entre lenguajes: cada uno aporta fortalezas distintas y cubre necesidades diferentes. Python y C++ han liderado durante años ese debate:

- **Python** destaca por una sintaxis accesible y un ecosistema enorme.
- **C++** destaca por velocidad y eficiencia.

Un lenguaje adecuado para ciencia de datos debería ser fácil de aprender, manejar grandes conjuntos y formatos de datos, tener buenas bibliotecas, escalar en cálculos complejos y facilitar la reproducibilidad. Ningún lenguaje sobresale por igual en todos esos criterios.

Python es expresivo y cuenta con herramientas maduras para análisis, visualización y aprendizaje automático, aunque su ejecución suele ser más lenta. C++ ofrece rendimiento de bajo nivel, pero es más complejo y su ecosistema para análisis de datos es menos amplio. Rust busca ocupar un espacio intermedio: rendimiento próximo a C++ con mecanismos modernos que hacen el desarrollo más seguro.

![El ecosistema de lenguajes en ciencia de datos](https://miro.medium.com/v2/resize:fit:602/0*os5cjeYGQc0io0x7.png)

## Rust

Rust fue creado por Graydon Hoare en 2006 como un proyecto personal orientado a la programación de sistemas segura y eficiente. Mozilla empezó a respaldarlo en 2009 para componentes críticos de Firefox y del motor Servo.

Su sintaxis tiene puntos en común con C++, y toma ideas de Erlang y Haskell, especialmente para concurrencia y seguridad de memoria. Para quien trabaja con datos, sus tres principios más interesantes son:

- **Seguridad**, en particular de memoria.
- **Velocidad**, sin un recolector de basura durante la ejecución.
- **Concurrencia**, con muchas comprobaciones trasladadas al compilador.

![Por qué Rust](https://miro.medium.com/v2/resize:fit:700/0*ykGlHUFmA-6TL550)

## Seguridad en Rust

La seguridad de Rust se apoya en gestión de memoria, préstamos y referencias, tiempos de vida y manejo explícito de errores. La idea clave es desplazar al momento de compilación muchos fallos que en otros lenguajes se descubren al ejecutar el programa.

Para visualizar la memoria, podemos pensar en un escritorio. La RAM sería la superficie de trabajo inmediata: rápida, pero volátil. El disco es como los cajones: conserva datos a largo plazo, aunque es más lento.

### Propiedad: gestión de memoria

Todos los programas deben decidir quién gestiona la memoria que usan. Algunos lenguajes incorporan un recolector de basura que identifica memoria que ya no es necesaria; en otros, la persona programadora debe reservarla y liberarla manualmente.

Rust usa un sistema de **propiedad** cuyas reglas comprueba el compilador. Si se incumplen, el programa no compila. Cada valor tiene un propietario; cuando este sale de su ámbito, Rust puede liberar el recurso de forma determinista. Estas comprobaciones no añaden coste durante la ejecución.

![Reglas de propiedad en Rust](https://miro.medium.com/v2/resize:fit:700/0*Q4Akyrjy6uZzagB7.png)

El resultado es seguridad de memoria sin depender de un recolector de basura y sin sacrificar el rendimiento de tiempo de ejecución.

### Préstamos y referencias

Una referencia permite acceder temporalmente a un valor sin tomar su propiedad. Puede ser inmutable o mutable. La regla central es sencilla: puede haber muchas referencias inmutables, o una única referencia mutable, pero no ambas a la vez.

~~~rust
fn main() {
    let x = 5;
    println!("El valor de x es: {}", x);
    // x = 6; // Error: x no es mutable

    let mut y = 5;
    println!("El valor de y es: {}", y);
    y = 6;
    println!("El valor de y es: {}", y);
}
~~~

En el ejemplo, x no cambia después de inicializarse. En cambio, y se declara con mut y puede modificarse. Estas reglas evitan modificaciones simultáneas inseguras y carreras de datos antes de que el programa llegue a ejecutarse.

![Propiedad y préstamos](https://miro.medium.com/v2/resize:fit:700/0*r6BLNyJXKCA8RxGn.png)

### Tiempos de vida

Un tiempo de vida define durante cuánto tiempo es válida una referencia. El compilador los usa para impedir referencias colgantes: referencias a datos que ya dejaron de existir.

~~~rust
fn main() {
    let i = 3;
    {
        let prestamo_1 = &i;
        println!("prestamo_1: {}", prestamo_1);
    }
    {
        let prestamo_2 = &i;
        println!("prestamo_2: {}", prestamo_2);
    }
}
~~~

En este caso, i vive más que los dos préstamos, y los ámbitos de prestamo_1 y prestamo_2 no se solapan. El compilador puede verificar que ninguna referencia será usada fuera de su validez.

### Manejo de errores

Rust no usa excepciones como mecanismo principal. En su lugar utiliza tipos enumerados como Result y Option:

- **Result** representa una operación que puede tener éxito o fallar.
- **Option** representa la presencia o ausencia de un valor.

El diseño obliga a tratar los casos de error de manera explícita, disminuyendo la probabilidad de fallos silenciosos o inesperados.

![El enum Result de Rust](https://miro.medium.com/v2/resize:fit:700/0*wu96YljC9kWnx-_V.jpg)

## Velocidad de Rust

Rust está diseñado para rendir al nivel de C o C++ en muchos casos. Esa velocidad se basa principalmente en cuatro decisiones.

### Compilación a código máquina

Rust es compilado: el código se transforma en instrucciones que puede ejecutar el procesador. Python, por contraste, suele ejecutarse a través de un intérprete, lo que aporta flexibilidad a cambio de sobrecarga.

### Tipado estático

Los tipos se conocen durante la compilación. Esto permite optimizaciones y elimina muchas comprobaciones en tiempo de ejecución. Los lenguajes de tipado dinámico suelen ofrecer más libertad, pero requieren comprobaciones adicionales cuando el programa ya está corriendo.

### Gestión de memoria sin GC

Un recolector de basura identifica y libera automáticamente memoria que no se utiliza. Es útil, pero puede añadir pausas y trabajo adicional. El modelo de propiedad, préstamos y tiempos de vida de Rust proporciona seguridad sin ese proceso en ejecución.

### Abstracciones de coste cero

Una abstracción oculta complejidad tras una interfaz sencilla; una función es el ejemplo básico. En Rust, muchas abstracciones de alto nivel se resuelven y optimizan durante la compilación, de modo que no deben hacer el programa más lento que una implementación manual de bajo nivel equivalente.

El compilador rustc usa LLVM como backend de optimización. Esto permite escribir código expresivo y compilarlo a código máquina eficiente.

![Abstracciones de coste cero en Rust](https://miro.medium.com/v2/resize:fit:700/0*1besRfLZ80IfrIuE)

## Concurrencia

La concurrencia consiste en gestionar varias tareas que se solapan en el tiempo; no implica necesariamente que todas se ejecuten exactamente al mismo tiempo. Un ejemplo sería alternar entre dos colas de clientes que comparten una sola cafetera.

![Programación concurrente frente a paralela](https://miro.medium.com/v2/resize:fit:600/0*ErT3ztKmU_uoH2Ow.jpg)

Rust hace que este tipo de programas sea más seguro al aplicar propiedad, préstamos y su sistema de tipos a las operaciones concurrentes. Muchos errores habituales —como acceder simultáneamente a datos mutables— se detectan durante la compilación.

Propiedad, préstamos y tiempos de vida son, por tanto, la base compartida de la velocidad, la seguridad y la concurrencia de Rust.

## Rust en ciencia de datos

Rust está ganando espacio en ciencia de datos gracias a esas propiedades. Antes de recorrer algunas herramientas, conviene conocer el término **crate**: una unidad de compilación que puede ser una biblioteca o un binario. Para alguien que use Python o R, una crate se parece a un paquete.

### ndarray: el NumPy de Rust

ndarray es una crate para cálculos con arrays de N dimensiones. Resulta útil para álgebra lineal, análisis numérico y manipulación de datos multidimensionales.

Sus ventajas incluyen interoperabilidad con otras bibliotecas y con Python mediante FFI, buen rendimiento en conjuntos grandes y soporte para distintas disposiciones y tamaños de array.

### Polars: DataFrames de alto rendimiento

Polars es una biblioteca de DataFrames construida en Rust para manipular y analizar datos de forma eficiente.

![Polars frente a pandas](https://miro.medium.com/v2/resize:fit:700/0*paHzG6aYUtg7X4lM.png)

Entre sus características se encuentran:

- Cálculos rápidos, especialmente atractivos en conjuntos grandes.
- Una API de Python que permite aprovechar el rendimiento de Rust sin escribir Rust.
- Ejecución paralela por defecto en muchas operaciones.
- Transformaciones variadas y compatibilidad con múltiples formatos de entrada y salida.

La documentación de [Polars](https://www.pola.rs/) y su [repositorio](https://github.com/pola-rs/polars) son buenos puntos de partida.

### Plotters: visualización

Plotters es una crate flexible para crear gráficos en aplicaciones nativas y WebAssembly. Soporta backends de bitmap, gráficos vectoriales, Piston, GTK/Cairo y WebAssembly, además de uso interactivo en Jupyter Notebook.

![Ejemplos de gráficos con Plotters](https://miro.medium.com/v2/resize:fit:700/0*2ieR2k77vBu932VX.png)

Sus [ejemplos](https://docs.rs/plotters/latest/plotters/) ayudan a explorar la variedad de visualizaciones disponibles.

## Integración con frameworks populares

El ecosistema de Rust se conecta también con los principales frameworks de deep learning. La madurez y las APIs evolucionan rápidamente, así que conviene consultar siempre la documentación actual de cada proyecto.

### TensorFlow

La crate tensorflow proporciona bindings para interactuar con TensorFlow desde Rust. Incluye módulos para construir grafos de cómputo, leer y escribir TFRecords, crear operaciones y trabajar con entrenamiento.

El [repositorio de tensorflow/rust](https://github.com/tensorflow/rust) y sus ejemplos muestran cómo integrar modelos y operaciones de TensorFlow dentro de aplicaciones Rust.

### PyTorch

La crate [tch-rs](https://github.com/LaurentMazare/tch-rs) expone bindings de Rust para la API de C++ de PyTorch. Su objetivo es mantenerse cerca de la API original, proporcionando acceso a tensores, modelos y operaciones de PyTorch desde código Rust.

![PyTorch representado por un lanzallamas](https://miro.medium.com/v2/resize:fit:700/0*UzVxjQKO_69q0txa.png)

El proyecto incluye ejemplos para cargar y ejecutar modelos, incluidos modelos compilados mediante TorchScript.

### Hugging Face y tokenizadores rápidos

Hugging Face ha usado Rust de forma notable en Tokenizers: el núcleo de tokenización está implementado en Rust para procesar grandes volúmenes de texto con rapidez, mientras que puede utilizarse desde Python.

También han surgido bibliotecas del ecosistema Rust para ejecutar modelos de lenguaje y trabajar con formatos eficientes. El [repositorio de Tokenizers](https://github.com/huggingface/tokenizers) es una referencia especialmente sólida para esta integración.

![Una llama en Rust](https://miro.medium.com/v2/resize:fit:512/0*b36XlImNGBUfxyHN.png)

## Conclusión

Rust combina rendimiento, seguridad de memoria y concurrencia de una forma muy valiosa para la inteligencia artificial y la ciencia de datos. Herramientas como ndarray y Polars permiten calcular y transformar datos con eficiencia; Plotters cubre la visualización; y los bindings o integraciones con TensorFlow, PyTorch y Hugging Face acercan el lenguaje al flujo de trabajo de machine learning.

No reemplazará de inmediato al ecosistema de Python, que sigue siendo extraordinariamente amplio. Pero Rust es una opción cada vez más relevante cuando importan el rendimiento, la fiabilidad y la integración de componentes de alto rendimiento.

## Bibliografía

1. [Comunidad de Rust](https://www.rust-lang.org/community).
2. [What is Rust and why is it so popular?](https://stackoverflow.blog/2020/01/20/what-is-rust-and-why-is-it-so-popular/).
3. [The Rust Programming Language](https://www.rust-lang.org/learn).
4. [The Ultimate Ndarray Handbook](https://towardsdatascience.com/the-ultimate-ndarray-handbook-mastering-the-art-of-scientific-computing-with-rust-ef5ab767212a).
5. [Rust Polars: Unlocking High-Performance Data Analysis](https://towardsdatascience.com/rust-polars-unlocking-high-performance-data-analysis-part-1-ce42af370ece).
6. [TensorFlow Rust bindings](https://github.com/tensorflow/rust).
7. [tch-rs](https://github.com/LaurentMazare/tch-rs).
8. [Ejemplo de carga de un modelo PyTorch en Rust](https://github.com/LaurentMazare/tch-rs/blob/main/examples/jit/README.md).
9. [Rustformers en Hugging Face](https://huggingface.co/rustformers).
10. [rust_tokenizers](https://docs.rs/rust_tokenizers/latest/rust_tokenizers/).
