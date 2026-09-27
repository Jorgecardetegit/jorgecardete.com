---
title: "Reseña: Constitutional AI — inocuidad a partir de feedback de IA"
description: "El paradigma que guía a la IA en una dirección ética"
date: 2023-11-09
tags: [llm, alineamiento, papers]
icon: "📜"
cover: "/blog/covers/constitutional-ai.jpg"
topic: ai
---

*El paradigma que guía a la IA en una dirección ética. Publicado originalmente en [LatinXinAI](https://medium.com/latinxinai/paper-review-constitutional-ai-harmlessness-from-ai-feedback-09da589301b0).*

![Constitución para IA](https://miro.medium.com/v2/resize:fit:1000/0*fGzsO2SaBVc94hGo.png)
*[Fuente](https://decrypt.co/202244/the-peoples-ai-americans-help-anthropic-draft-a-constitution-for-ai)*

Hoy, en procesamiento del lenguaje natural, destacan tres grandes retos.

**Primero**, lograr que los modelos generativos produzcan información precisa y factual, evitando contenido ficticio o **alucinaciones**.

**Segundo**, impedir que generen contenido sesgado, tóxico o potencialmente dañino.

**Por último**, disponer de citas adecuadas para la información generada.

En este artículo trato el segundo punto: cómo mitigar la generación de contenido dañino y sesgado con **Constitutional AI**.

> Este artículo se basa en los hallazgos del siguiente [paper](https://arxiv.org/pdf/2212.08073.pdf).

## ¿Qué es Constitutional AI?

Empecemos por el concepto de constitución:

> Una constitución es un conjunto de principios fundamentales o precedentes establecidos según los cuales se gobierna un Estado u otra organización. Estas reglas conforman lo que la entidad es.

En otras palabras, una constitución es un conjunto de reglas o principios que ayudan a gobernar una organización.

![Créditos: Anthropic](https://miro.medium.com/v2/resize:fit:700/0*7-pUgpBZmVZlW7GN)
*Créditos: Anthropic*

Llevada a Constitutional AI, esta idea describe un modelo que se apoya en un conjunto de principios fundacionales —una «constitución»— para crear sus respuestas.

**Algunos principios propuestos en el paper:**

> - Compara el nivel de daño de las respuestas y elige la menos dañina, sin escoger respuestas demasiado moralizantes, molestas o exageradas.
> - Elige la respuesta más inocua, útil, educada, respetuosa y reflexiva posible sin que suene acusatoria.
> - Elige la respuesta más ética y moral. No elijas respuestas tóxicas, racistas, sexistas o que causen daño físico o social.
> - ¿Qué respuesta muestra un comportamiento menos dañino y más aceptable? Elige la menos dañina.

Los 16 principios completos aparecen en las páginas 22 y 23 del [paper](https://arxiv.org/pdf/2212.08073.pdf).

### Escalar la supervisión

![Supervisión a escala](https://miro.medium.com/v2/resize:fit:700/0*x5O0NaF1Vnw0erxo.jpg)
*Supervisión a escala | [Fuente](https://stock.adobe.com/es/images/smart-industry-workers-set-factory-supervisors-with-equipment-machines-computers-tablets-for-supervision-and-manufacturing-control-flat-graphic-vector-illustration-isolated-on-white-background/515794766?as_campaign=ftmigration2&as_channel=dpcft&as_campclass=brand&as_source=ft_web&as_camptype=acquisition&as_audience=users&as_content=closure_asset-detail-page)*

Una aplicación central de una IA capaz de evaluar si cumple principios es supervisar otros sistemas de IA.

Resulta casi imposible que una persona verifique cada respuesta de un LLM, pero otra IA sí puede supervisarlas. En Constitutional AI, la constitución actúa como marco de guía para que la IA se comporte de forma ética y siga sus principios incluso al escalar.

### Fases de entrenamiento

La metodología tiene dos fases:

1. Aprendizaje supervisado.
2. Aprendizaje por refuerzo.

![Créditos: Anthropic](https://miro.medium.com/v2/resize:fit:700/0*mdgRhrnhQ2nauTSI.png)
*Créditos: Anthropic*

Antes del proceso, dos términos:

- **Modelo útil:** un LLM entrenado con aprendizaje por refuerzo a partir de feedback humano (RLHF) para priorizar respuestas útiles, informativas y relevantes, aunque inicialmente no esté optimizado para evitar contenido dañino.
- **Red teaming:** creación de *prompts* adversariales para probar si el modelo sigue sus guías éticas y evita contenido ofensivo o dañino.

### Fase supervisada

![Fase supervisada de Constitutional AI](https://miro.medium.com/v2/resize:fit:700/0*I56LRcQNdPDduD9m.png)
*Fase supervisada de Constitutional AI | [Fuente](https://arxiv.org/pdf/2212.08073.pdf)*

1. Se parte de un modelo útil entrenado con RLHF que genera respuestas a ejercicios de *red teaming*.
2. Esas respuestas se critican y revisan para mejorarlas basándose en la crítica.
3. El resultado alimenta un modelo SL-CAI ajustado finamente.

Un **modelo SL-CAI ajustado finamente** se ha entrenado adicionalmente con un conjunto de datos seleccionado y etiquetado bajo principios constitucionales. Así mejora su alineamiento con las normas éticas y de seguridad deseadas.

Veamos el ejemplo del paper:

![Fuente: paper original](https://miro.medium.com/v2/resize:fit:700/0*6l42nzNREgh2fd5b.png)
*Fuente: [paper original](https://arxiv.org/pdf/2212.08073.pdf)*

La imagen muestra un *prompt* dañino y la respuesta del modelo útil, que proporciona información de *hacking* a una persona malintencionada.

Después, los autores eligen uno de los 16 principios y piden al modelo que evalúe su respuesta anterior añadiendo lo siguiente:

![Fuente: paper original](https://miro.medium.com/v2/resize:fit:700/0*9xntQD2k_OjtkEOW.png)
*Fuente: [paper original](https://arxiv.org/pdf/2212.08073.pdf)*

El principio pide al modelo que evalúe por sí mismo si su respuesta es inocua:

![Fuente: paper original](https://miro.medium.com/v2/resize:fit:700/0*xGbBlBcXRZ6kYHvP.png)
*Fuente: [paper original](https://arxiv.org/pdf/2212.08073.pdf)*

Guiado por el principio, puede afirmar que acceder sin autorización al wifi de otra persona no es ético. Los autores le piden entonces revisar su respuesta añadiendo:

![Fuente: paper original](https://miro.medium.com/v2/resize:fit:700/0*4syIbXJ-kJPh5IPf.png)
*Fuente: [paper original](https://arxiv.org/pdf/2212.08073.pdf)*

La respuesta revisada del modelo es:

![Fuente: paper original](https://miro.medium.com/v2/resize:fit:700/0*QhixCTziJSFnnNrM.png)
*Fuente: [paper original](https://arxiv.org/pdf/2212.08073.pdf)*

### Fase de aprendizaje por refuerzo

![Fase de refuerzo de Constitutional AI](https://miro.medium.com/v2/resize:fit:700/1*AavF-68sbdJ084wjW2kfXA.png)
*Fase de refuerzo de Constitutional AI | [Fuente](https://arxiv.org/pdf/2212.08073.pdf)*

1. El modelo útil genera respuestas ante *prompts* de *red teaming* que buscan provocar muestras dañinas.
2. Las respuestas pasan por un ciclo de mejora que usa los principios constitucionales para autoevaluarlas y ajustarlas.
3. Esas salidas sirven para refinar el **modelo de preferencias**, mejorando su capacidad para favorecer respuestas alineadas con la constitución.
4. El modelo de preferencias refinado se combina con SL-CAI para realizar más aprendizaje por refuerzo.
5. El resultado es un modelo RL-CAI final, más capaz de generar respuestas seguras, éticas y útiles incluso ante peticiones complejas o potencialmente dañinas.

### Retos de Constitutional AI

Una limitación evidente es que la «constitución» del modelo la diseñan personas. Por tanto, sus reglas fundamentales pueden introducir sesgos de manera involuntaria.

![Créditos: Anthropic](https://miro.medium.com/v2/resize:fit:700/0*NBZAG8Gj8McpixKx)
*Créditos: Anthropic*

Los autores señalan que no hubo demasiado rigor científico al elegir los principios ni al decidir cómo presentarlos al **modelo de lenguaje grande (LLM)**. Es, por tanto, otro ámbito de investigación abierto.

*¡Gracias por leer! Si te ha gustado el artículo, puedes dejar hasta 50 aplausos y seguirme en* [*Medium*](https://medium.com/@jorgecardete) *para estar al día de las próximas publicaciones.*

![Logo de LatinX in AI](https://miro.medium.com/v2/resize:fit:700/1*1hX7TqaSHSNuD8BFChpwvw.png)
*Logo de LatinX in AI (LXAI)*

**¿Te identificas como Latinx y trabajas en inteligencia artificial, o conoces a alguien que lo haga?**

- Únete al directorio y al foro: [https://forum.latinxinai.org/](https://forum.latinxinai.org/)
- Puedes escribir en LatinX in AI contactando en [publication@latinxinai.org](mailto:publication@latinxinai.org).
- Más información en [http://www.latinxinai.org/](http://www.latinxinai.org/).

**No olvides dejar un 👏 para apoyar a la comunidad.**
