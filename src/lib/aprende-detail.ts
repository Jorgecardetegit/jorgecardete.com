// La ficha de abajo del panel: muestra el bloque `[data-detail="clave"]` y oculta los demás.
// La usan el lienzo de poderes y el mapa, y «intro» es la ficha por defecto.
export function showDetail(key: string) {
  for (const el of document.querySelectorAll<HTMLElement>('[data-detail]')) {
    el.hidden = el.dataset.detail !== key;
  }
}
