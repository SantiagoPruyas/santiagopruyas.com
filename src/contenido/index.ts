import { en } from "./en";
import { es } from "./es";
import type { Contenido, Dato, Idioma } from "./tipos";

export type { Contenido, Dato, Idioma } from "./tipos";

export const IDIOMAS = ["es", "en"] as const satisfies readonly Idioma[];

const CONTENIDOS: Record<Idioma, Contenido> = { es, en };

export function esIdioma(valor: string): valor is Idioma {
  return (IDIOMAS as readonly string[]).includes(valor);
}

export function obtenerContenido(idioma: Idioma): Contenido {
  return CONTENIDOS[idioma];
}

// El español vive en la raíz y el inglés en /en.
export function rutaEn(idioma: Idioma, ruta: string): string {
  const limpia = ruta === "/" ? "" : ruta;
  if (idioma === "es") return limpia || "/";
  return `/en${limpia}`;
}

// Un dato que falta se muestra como marcador, nunca como cifra supuesta.
export function textoDeDato(dato: Dato): string {
  return "valor" in dato ? dato.valor : `[${dato.falta}]`;
}

export function mesYAnio(idioma: Idioma, fecha: string): string {
  const [anio, mes] = fecha.split("-").map(Number);
  return new Intl.DateTimeFormat(idioma === "es" ? "es-AR" : "en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(anio, mes - 1, 1)));
}
