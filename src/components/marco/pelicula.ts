"use client";

import { createContext, useContext } from "react";
import { ESCENAS, type IdEscena } from "@/lib/escenas";

type Pelicula = {
  // Escena que está en pantalla.
  actual: IdEscena;
  // Lleva el scroll hasta una escena. Devuelve false si esa escena no está en la página.
  irA: (id: IdEscena) => boolean;
};

export const PeliculaContext = createContext<Pelicula>({
  actual: ESCENAS[0].id,
  irA: () => false,
});

export function usePelicula() {
  return useContext(PeliculaContext);
}

// Alto de cada franja en píxeles, leído del token para que valga en cualquier ancho.
export function altoDeFranja() {
  return parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--franja"));
}
