export type Luz = "naranja" | "verde" | "dorado" | "violeta";

// Lo que no depende del idioma. Los nombres y los textos viven en src/contenido.
export const ESCENAS = [
  { numero: "01", id: "apertura", luz: "naranja" },
  { numero: "02", id: "munioficios", luz: "verde" },
  { numero: "03", id: "fondare", luz: "dorado" },
  { numero: "04", id: "pymeton", luz: "violeta" },
  { numero: "05", id: "peeqsales", luz: "violeta" },
  { numero: "06", id: "en-rodaje", luz: "violeta" },
  { numero: "07", id: "metodo", luz: "naranja" },
  { numero: "08", id: "detras-de-escena", luz: "naranja" },
  { numero: "09", id: "creditos", luz: "naranja" },
] as const satisfies readonly { numero: string; id: string; luz: Luz }[];

export type Escena = (typeof ESCENAS)[number];
export type IdEscena = Escena["id"];

// Navegación de la franja superior: cuatro entradas, no las nueve escenas.
export const NAVEGACION = ["apertura", "munioficios", "metodo", "creditos"] as const satisfies readonly IdEscena[];
export type IdNavegacion = (typeof NAVEGACION)[number];
