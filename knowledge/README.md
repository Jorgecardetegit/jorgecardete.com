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

## Datos de Política en España

El panel (`/aprende/politica/`) gira en torno a las elecciones: partidos, diputados y votaciones. Las lecciones de esta carpeta son la referencia teórica, en `/aprende/politica/como-funciona/`.

| Archivo | Qué es | De dónde sale |
| --- | --- | --- |
| `src/data/politica/partidos.ts` | Ficha de cada partido, líder y candidatura (con fecha de revisión) | A mano, con fuentes |
| `src/data/politica/diputados.json` | Los 350 diputados de la legislatura, con biografía oficial | `node scripts/aprende/diputados.mjs <activos.json> <bajas.json> <histórico.json> <fecha disolución>` |
| `src/data/politica/votaciones.json` | Votaciones clave, propuestas, afinidad entre partidos y estadísticas por diputado | `node scripts/aprende/votaciones.mjs <carpeta con los JSON de votaciones>` |
| `src/data/politica/resultados-2023.json` | Votos y escaños de 2023 por provincia (mapa) | `node scripts/aprende/resultados.mjs <carpeta con 03022307.DAT, 07022307.DAT y 08022307.DAT>` del `02202307_TOTA.zip` de [infoelectoral.interior.gob.es](https://infoelectoral.interior.gob.es/) |
| `src/data/politica/votaciones-manuales.json` | Votaciones clave que el Congreso publica solo como imagen | A mano, con fuente en cada una |

Los JSON de origen son los de [datos abiertos del Congreso](https://www.congreso.es/es/opendata) (diputados y votaciones por sesión). Criterio de partidos: escaño en el Congreso al disolverse las Cortes o eurodiputados.

## Plan

1. **Cómo funciona.** 14 lecciones de teoría. Hecho.
2. **Partidos, diputados y votaciones.** Hecho con los datos de la XV legislatura. Pendiente: programas del 29-N cuando se publiquen y candidaturas oficiales del BOE (hacia el 3 de noviembre).
3. **Qué ha pasado.** Línea temporal desde 2011 en `src/data/politica/linea-temporal.ts`. Hecho. Cada hecho lleva fuente (BOE, Interior, medios o Wikipedia) y enlaces a lecciones y partidos; al añadir uno nuevo, verificarlo en al menos dos fuentes.
4. **Temas.** Hecho con las votaciones (`src/data/politica/temas.ts`: cada votación se asigna por palabras clave del título). Pendiente: `propuestas` de cada partido con los programas del 29-N, todas a la vez cuando estén publicados.
5. **Cuando se publiquen:** candidaturas oficiales en el BOE (hacia el 3 de noviembre) y programas electorales.
