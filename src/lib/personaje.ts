// Cuadros del personaje girando de perfil hacia cámara, renderizados en Blender
// y convertidos con scripts/cuadros.mjs. Son provisorios: el ticket del
// personaje los reemplaza por los definitivos sin tocar nada más.
const CANTIDAD = 36;

export const GIRO_DE_APERTURA = {
  ancho: 660,
  alto: 825,
  cuadros: Array.from(
    { length: CANTIDAD },
    (_, indice) => `/personaje/apertura/${String(indice).padStart(3, "0")}.webp`,
  ),
};
