---
title: "Aprendizaje por refuerzo a partir de feedback humano (RLHF)"
description: "Cuando las máquinas aprenden no solo de datos, sino de la experiencia humana"
date: 2023-11-10
tags: [llm, aprendizaje-por-refuerzo, alineamiento]
icon: "🧑‍⚖️"
cover: "/blog/covers/rlhf.jpg"
topic: ai
---

*Cuando las máquinas aprenden no solo de datos, sino de la experiencia humana. Publicado originalmente en [LatinXinAI](https://medium.com/latinxinai/reinforcement-learning-from-human-feedback-rlhf-9d1d74040c1e).*

![RLHF](https://miro.medium.com/v2/resize:fit:700/0*qA7AFBBADrKdesXG.png)
*[Fuente](https://thesequence.substack.com/p/the-next-rlhf-effect-three-breakhroughts)*

La combinación del aprendizaje por refuerzo tradicional y la aportación humana directa se ha convertido en una herramienta esencial para desarrollar modelos de IA.

RLHF va más allá del entrenamiento convencional: permite a la IA aprender no solo de datos preprogramados, sino también de la riqueza del feedback humano, con sus matices y dimensiones éticas.

En este artículo veremos cómo RLHF fue un paso crucial para los LLM. El nombre lo describe: **aprendizaje por refuerzo** combinado con **feedback humano**.

### Aprendizaje por refuerzo

El aprendizaje por refuerzo (*reinforcement learning*, RL) es un tipo de machine learning en el que un agente aprende a tomar decisiones realizando acciones en un entorno para lograr un objetivo.

El agente recibe **recompensas** o **penalizaciones** que guían su aprendizaje.

![Aprendizaje por refuerzo](https://miro.medium.com/v2/resize:fit:700/0*gHsqNsSbQPCVPQ28.png)
*Aprendizaje por refuerzo | [Fuente](https://databasecamp.de/en/ml/reinforcement-learnings)*

Terminología básica:

- **Agente:** quien aprende o toma decisiones; el programa o modelo entrenado.
- **Entorno:** el mundo por el que se mueve el agente y que le proporciona estados; puede ser el mundo real, un videojuego o una simulación.
- **Acciones:** las decisiones disponibles para el agente; todas forman el espacio de acciones.
- **Estado:** situación concreta e inmediata en la que se encuentra el agente, una instantánea del entorno.
- **Recompensa:** valor numérico que el entorno devuelve tras cada acción e indica éxito o fracaso.
- **Política:** estrategia que determina la siguiente acción según el estado actual.
- **Función de valor:** estima lo bueno que es estar en un estado —o realizar una acción— en términos de recompensas futuras esperadas.

### Ejemplo: decidir la ubicación de anuncios en una página web

**Agente:** un programa que decide cuántos anuncios son adecuados.

**Entorno:** la página web.

**Acciones:**

1. Añadir un anuncio.
2. Eliminar un anuncio.
3. No añadir ni eliminar ninguno.

**Recompensa:** positiva si aumentan los ingresos; negativa si disminuyen.

El agente observa, por ejemplo, el número de anuncios actual y el espacio disponible. Si recibe recompensas positivas cuando los ingresos crecen y negativas cuando bajan, puede formular una política eficaz.

### ¿Por qué ChatGPT usa aprendizaje por refuerzo?

El RL, en especial la canalización de RLHF, es crucial para entrenar ChatGPT.

El aprendizaje supervisado tradicional requiere conjuntos grandes de ejemplos etiquetados. Pero para una tarea como generar texto humano, crear datos que cubran todos los escenarios posibles es impracticable.

RLHF permite aprender de un conjunto mucho más reducido en el que las personas evalúan la calidad de las respuestas.

**Optimizar objetivos a largo plazo.** RL es adecuado cuando importa el resultado a largo plazo, no solo la recompensa inmediata. En ChatGPT, el objetivo es generar respuestas coherentes, relevantes y apropiadas para el contexto; no siempre coincide con producir una frase gramaticalmente correcta.

> Quizá recuerdes que al lanzarse ChatGPT podía resolver tareas complejas, pero fallaba una multiplicación sencilla de dos cifras.

**Mejora iterativa.** Con RLHF, ChatGPT mejora repetidamente a partir de feedback continuo, algo fundamental para un sistema que interactúa en contextos diversos y cambiantes.

![Aprendizaje por refuerzo: entrenar a un gato](https://miro.medium.com/v2/resize:fit:700/0*ANUdv2RAXxkcL2IK.png)
*Aprendizaje por refuerzo: entrenar a un gato | [Fuente](https://itnext.io/chatgpt-decoded-an-expert-guide-to-mastering-the-technology-and-building-domain-specific-3a95b42827bb)*

Las personas entrenadoras evalúan las salidas del modelo. Ese feedback ayuda a alinearlo mejor con valores, expectativas y matices humanos del lenguaje.

### El problema del aprendizaje por refuerzo tradicional

En RL convencional, los agentes aprenden de sus acciones mediante una función de recompensa. El problema es que esa recompensa debe definirse sin una valoración humana directa para cada respuesta.

Definir o medir las recompensas suele ser difícil, especialmente en tareas complejas de PLN. El resultado puede ser un chatbot confuso y poco útil.

**RLHF** combina técnicas de RL —recompensas y comparaciones— con guía humana para entrenar a un agente de IA.

Las personas que prueban el modelo aportan feedback directo, lo que permite optimizar un modelo de lenguaje con más precisión que mediante autoentrenamiento. Se utiliza principalmente en PLN: chatbots, agentes conversacionales, texto a voz y resumen.

### ¿Cómo funciona RLHF?

![Pasos de RLHF](https://miro.medium.com/v2/resize:fit:700/0*uB17Lpiw0ZbPSDYe.png)
*Pasos de RLHF | [Fuente](https://www.pinterest.es/pin/meet-chatllama-the-first-opensource-implementation-of-llama-based-on-reinforcement-learning-from-human-feedback-rl-in-2023--624311567119542649/)*

El entrenamiento se realiza en tres fases:

1. **Fase inicial.** Se elige un modelo ya establecido como referencia para definir y etiquetar el comportamiento correcto. Usar un modelo preentrenado ahorra tiempo y datos.
2. **Feedback humano.** Tras entrenar el modelo inicial, personas evaluadoras puntúan la calidad o precisión de sus salidas. El sistema usa esas valoraciones para generar recompensas de RL.
3. **Aprendizaje por refuerzo.** El modelo de recompensa se ajusta con salidas del modelo principal y sus puntuaciones. El modelo principal utiliza ese feedback para mejorar tareas futuras.

RLHF es un proceso iterativo: recoge feedback y refina el modelo repetidamente para mejorar de forma continua.

### Retos y limitaciones

- **Subjetividad y error humano.** Su eficacia depende de la calidad y consistencia del feedback. Evaluaciones sesgadas, imprecisas o inconsistentes pueden provocar comportamientos deficientes o dañinos, especialmente en asuntos subjetivos.
- **Implicaciones éticas y sociales.** Si las personas que aportan feedback no son diversas, el modelo puede incorporar sesgos o no respetar diferencias culturales.
- **Escalabilidad y coste.** Obtener feedback humano a escala es caro y lento. Los métodos automatizados no suelen captar los matices de una persona, lo que hace RLHF menos escalable que otros enfoques.

RLHF ofrece ventajas importantes para tareas complejas de comprensión del lenguaje, pero estos límites deben gestionarse con cuidado para desarrollar IA eficaz y ética.

### Constitutional AI: un cambio en el paradigma ético

![Representación de Constitutional AI](https://miro.medium.com/v2/resize:fit:700/0*eIPDgidhW8CCX9D6)
*Representación de Constitutional AI | [Fuente](https://www.linkedin.com/pulse/transformative-power-ai-digital-marketing-exploring-ethical-balduwa/)*

Para afrontar estos retos, **Constitutional AI** ofrece un marco estructurado que guía el comportamiento de la IA dentro de límites éticos y sociales.

Consiste en incorporar principios o reglas «constitucionales» a la toma de decisiones de la IA. Puede ayudar a mitigar problemas de sesgo, escalabilidad y ética.

> **[Reseña: Constitutional AI — inocuidad a partir de feedback de IA](/blog/constitutional-ai)**
> El paradigma que guía a la IA en una dirección ética.

*¡Gracias por leer! Si te ha gustado el artículo, puedes dejar hasta 50 aplausos y seguirme en* [*Medium*](https://medium.com/@jorgecardete) *para estar al día de las próximas publicaciones.*

![Logo de LatinX in AI](https://miro.medium.com/v2/resize:fit:700/1*1hX7TqaSHSNuD8BFChpwvw.png)
*Logo de LatinX in AI (LXAI)*

**¿Te identificas como Latinx y trabajas en inteligencia artificial, o conoces a alguien que lo haga?**

- Únete al directorio y al foro: [https://forum.latinxinai.org/](https://forum.latinxinai.org/)
- Puedes escribir en LatinX in AI en [publication@latinxinai.org](mailto:publication@latinxinai.org).
- Más información en [http://www.latinxinai.org/](http://www.latinxinai.org/).

**No olvides dejar un 👏 para apoyar a la comunidad.**
