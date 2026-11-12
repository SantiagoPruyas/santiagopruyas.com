export type Luz = "naranja" | "verde" | "dorado" | "violeta";

export type Escena = {
  numero: string;
  id: string;
  nombre: string;
  luz: Luz;
};

// El orden y la luz de cada escena salen de la estructura de escenas del epic.
export const ESCENAS: Escena[] = [
  { numero: "01", id: "apertura", nombre: "Apertura", luz: "naranja" },
  { numero: "02", id: "munioficios", nombre: "MuniOficios", luz: "verde" },
  { numero: "03", id: "fondare", nombre: "Fondare", luz: "dorado" },
  { numero: "04", id: "pymeton", nombre: "Pymetón", luz: "violeta" },
  { numero: "05", id: "peeqsales", nombre: "PeeqSales", luz: "violeta" },
  { numero: "06", id: "en-rodaje", nombre: "En rodaje", luz: "violeta" },
  { numero: "07", id: "metodo", nombre: "Método", luz: "naranja" },
  { numero: "08", id: "detras-de-escena", nombre: "Detrás de escena", luz: "naranja" },
  { numero: "09", id: "creditos", nombre: "Créditos", luz: "naranja" },
];

// Navegación de la franja superior: cuatro entradas, no las nueve escenas.
export const NAVEGACION = [
  { nombre: "Apertura", href: "/#apertura" },
  { nombre: "Trabajo", href: "/#munioficios" },
  { nombre: "Método", href: "/#metodo" },
  { nombre: "Créditos", href: "/#creditos" },
];
