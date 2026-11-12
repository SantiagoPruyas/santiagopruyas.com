"use client";

import { Etiqueta } from "@/components/ui/Etiqueta";
import type { Contenido } from "@/contenido";
import { ESCENAS } from "@/lib/escenas";
import { usePelicula } from "./pelicula";
import { TiraDeTiempo } from "./TiraDeTiempo";

type Props = {
  textos: Contenido["interfaz"];
  nombres: Contenido["escenas"];
  marcas: number[];
};

export function FranjaInferior({ textos, nombres, marcas }: Props) {
  const { actual, irA } = usePelicula();
  const indice = Math.max(0, ESCENAS.findIndex((escena) => escena.id === actual));
  const escena = ESCENAS[indice];

  return (
    <div
      role="region"
      aria-label={textos.lineaDeTiempo}
      className="fixed inset-x-0 bottom-0 z-40 flex h-[var(--franja)] items-center gap-3.5 bg-barra px-[var(--margen)] md:gap-8"
    >
      <Etiqueta className="whitespace-nowrap">
        {textos.escenaAbreviada} {escena.numero}
        <span className="hidden md:inline"> — {nombres[escena.id]}</span>
      </Etiqueta>
      <TiraDeTiempo
        marcas={marcas}
        etiquetas={ESCENAS.map((e) => `${textos.escenaAbreviada} ${e.numero} — ${nombres[e.id]}`)}
        actual={indice}
        alElegir={(elegida) => irA(ESCENAS[elegida].id)}
        className="min-w-0 flex-1"
      />
      {/* El marco escribe acá el código de tiempo mientras se hace scroll. En el celular no hay lugar para los cuadros. */}
      <Etiqueta className="whitespace-nowrap tabular-nums">
        <span data-codigo>00:00:00</span>
        <span data-cuadros className="hidden md:inline">
          :00
        </span>
      </Etiqueta>
    </div>
  );
}
