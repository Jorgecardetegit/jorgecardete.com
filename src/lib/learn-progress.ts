// Lecciones leídas, solo en este navegador: es una ayuda para seguir por donde ibas,
// así que si el almacenamiento falla (modo privado, bloqueado) la página funciona igual.
const key = 'jorge.dev:aprende-leidas';

export function readLessons(): Set<string> {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(key) ?? '[]');
    return new Set(Array.isArray(saved) ? saved.filter((id) => typeof id === 'string') : []);
  } catch {
    return new Set();
  }
}

export function markRead(id: string) {
  const read = readLessons();
  if (read.has(id)) return;
  read.add(id);
  try {
    localStorage.setItem(key, JSON.stringify([...read]));
  } catch {}
}
