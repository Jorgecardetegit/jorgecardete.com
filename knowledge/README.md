# Aprende

Lecciones que se publican en `/aprende/` (solo en español). Cada carpeta es un área y cada `.mdx` una lección:
`knowledge/politica/cortes.mdx` → `/aprende/politica/cortes/`.

- Áreas y bloques: `src/data/learn.ts`
- Páginas: `src/pages/aprende/`
- Componentes visuales: `src/components/learn/` (disponibles en cualquier lección sin importarlos)

## Frontmatter de una lección

```yaml
title: Las Cortes, el Congreso y el Senado
description: Una o dos frases para la tarjeta y los buscadores.
section: como-funciona   # bloque del área en src/data/learn.ts
order: 5                 # posición dentro del bloque
icon: 🏛️                 # uno distinto por lección
summary: «En una frase», lo que debería quedar aunque no se lea nada más.
keyPoints:               # «Lo esencial», de 3 a 5 puntos
  - ...
sources:                 # siempre fuentes primarias: BOE, instituciones, datos oficiales
  - title: Constitución Española, artículos 66 a 96 (BOE)
    url: https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229
updated: 2026-10-18      # fecha de la última revisión
```

## Componentes

| Componente | Para qué |
| --- | --- |
| `<Nota tipo="clave\|dato\|ojo\|ejemplo" titulo="...">` | Recuadro destacado |
| `<Mito mito="...">realidad</Mito>` | Creencia extendida frente a lo que dice la ley |
| `<Pasos>` + `<Paso titulo quien final>` | Procesos numerados |
| `<Comparar>` + `<Lado titulo subtitulo icono color>` | Tarjetas para comparar |
| `<Cifras>` + `<Cifra valor etiqueta color>` | Números grandes |
| `<Niveles items={[...]} pie="...">` | Escaleras de niveles (tribunales, administraciones) |
| `MapaPoderes`, `MapaConstitucion`, `PiramideNormas`, `Hemiciclo`, `EscanosProvincias`, `CalculadoraDHondt`, `QuienHaceQue`, `EjesIdeologicos` | Diagramas de política |

Colores: `green`, `terracotta`, `gold`, `purple`, `red`.

## Criterios de redacción

- Para entender, no para convencer: nunca se recomienda a quién votar.
- Todo con fuente. Los datos que cambian (escaños, composición de cámaras) se comprueban en la fuente oficial antes de publicarlos.
- En los debates abiertos se explican las posiciones principales con la misma extensión.
- Hechos judiciales con el estado procesal exacto.
- Frases cortas, sin jerga; si un término técnico hace falta, se explica la primera vez.

## Plan de Política en España

1. **Cómo funciona.** 14 lecciones de teoría. Hecho.
2. **Los partidos.** Una ficha por partido con la misma plantilla: propuestas por tema, votaciones reales (datos abiertos del Congreso), pactos y candidatos por provincia (BOE). Criterio de inclusión: partidos con escaño en el Congreso o en el Parlamento Europeo.
3. **Qué ha pasado.** Línea temporal desde 1978, con detalle desde 2011.
4. **Después:** matriz tema × partido, datos de contexto (INE, Eurostat) y una página de metodología.
