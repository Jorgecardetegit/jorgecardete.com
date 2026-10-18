// Las votaciones de cada tema, de la más reciente a la más antigua. Lo usan la vista de temas
// (TemasVista) y su menú en la columna derecha (TemasAside).
import { temas, temasDe } from '../data/politica/temas';
import { votaciones } from './politica';

const todas = [
  ...votaciones.clave.filter((v) => v.tipo !== 'investidura'),
  ...votaciones.propuestas,
].map((v) => ({ v, temas: temasDe(`${v.titulo} ${v.detalle ?? ''}`) }));

export const votosPorTema = new Map(
  temas.map((tema) => [
    tema.id,
    todas.filter((x) => x.temas.includes(tema.id)).map((x) => x.v).sort((a, b) => b.fecha.localeCompare(a.fecha)),
  ]),
);
