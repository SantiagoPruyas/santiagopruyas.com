import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IDIOMAS, esIdioma, rutaEn, type Idioma } from "@/contenido";

// Lee el idioma de la ruta y corta con un 404 si no es uno de los dos del sitio.
export async function idiomaDe(params: Promise<{ lang: string }>): Promise<Idioma> {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  return lang;
}

// Dirección canónica de una página y su par en el otro idioma, para hreflang.
export function alternativas(idioma: Idioma, ruta: string): Metadata["alternates"] {
  return {
    canonical: rutaEn(idioma, ruta),
    languages: {
      ...Object.fromEntries(IDIOMAS.map((codigo) => [codigo, rutaEn(codigo, ruta)])),
      "x-default": rutaEn("es", ruta),
    },
  };
}
