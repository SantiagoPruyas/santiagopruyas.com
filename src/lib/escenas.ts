export type Luz = "naranja" | "verde" | "dorado" | "violeta";

// Lo que no depende del idioma. Los nombres y los textos viven en src/contenido.
// La duración se mide en pantallas: cuánto scroll ocupa la escena. Las de
// producto duran según los pasos de su recorrido.
export const ESCENAS = [
  { numero: "01", id: "apertura", luz: "naranja", duracion: 2.5 },
  { numero: "02", id: "munioficios", luz: "verde", duracion: 4.2 },
  { numero: "03", id: "fondare", luz: "dorado", duracion: 3.4 },
  { numero: "04", id: "pymeton", luz: "violeta", duracion: 4.2 },
  { numero: "05", id: "peeqsales", luz: "violeta", duracion: 3.4 },
  { numero: "06", id: "en-rodaje", luz: "violeta", duracion: 2.4 },
  { numero: "07", id: "metodo", luz: "naranja", duracion: 1.3 },
  { numero: "08", id: "detras-de-escena", luz: "naranja", duracion: 1.3 },
  { numero: "09", id: "creditos", luz: "naranja", duracion: 1.3 },
] as const satisfies readonly { numero: string; id: string; luz: Luz; duracion: number }[];

export type Escena = (typeof ESCENAS)[number];
export type IdEscena = Escena["id"];

// Navegación de la franja superior: cuatro entradas, no las nueve escenas.
export const NAVEGACION = ["apertura", "munioficios", "metodo", "creditos"] as const satisfies readonly IdEscena[];
export type IdNavegacion = (typeof NAVEGACION)[number];

// A qué entrada de la navegación pertenece cada escena.
export const GRUPO_DE: Record<IdEscena, IdNavegacion> = {
  apertura: "apertura",
  munioficios: "munioficios",
  fondare: "munioficios",
  pymeton: "munioficios",
  peeqsales: "munioficios",
  "en-rodaje": "munioficios",
  metodo: "metodo",
  "detras-de-escena": "creditos",
  creditos: "creditos",
};

// El código de tiempo sale del scroll: cada pantalla de scroll son tantos segundos de película.
const SEGUNDOS_POR_PANTALLA = 9;
export const SEGUNDOS_TOTALES =
  ESCENAS.reduce((suma, escena) => suma + escena.duracion, 0) * SEGUNDOS_POR_PANTALLA;
