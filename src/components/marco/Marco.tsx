import type { ReactNode } from "react";
import { ESCENAS, type Escena } from "@/lib/escenas";
import { FranjaInferior } from "./FranjaInferior";
import { FranjaSuperior } from "./FranjaSuperior";

type Props = {
  children: ReactNode;
  // Escena en pantalla: define la luz de las franjas y lo que marca la línea de tiempo.
  escena?: Escena;
  activa?: string;
  progreso?: number;
  codigo?: string;
};

// Marco de cine: la interfaz vive en las franjas de arriba y abajo y la escena queda limpia en el medio.
export function Marco({
  children,
  escena = ESCENAS[0],
  activa,
  progreso = 0,
  codigo = "00:00:00:00",
}: Props) {
  return (
    <div data-luz={escena.luz}>
      <a
        href="#contenido"
        className="sr-only z-50 rounded-[4px] bg-luz px-4 py-2 text-[15px] font-medium text-sobre-luz focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Saltar al contenido
      </a>
      <FranjaSuperior activa={activa} />
      <main id="contenido" className="py-[var(--franja)]">
        {children}
      </main>
      <FranjaInferior escena={escena} progreso={progreso} codigo={codigo} />
      <div className="grano" aria-hidden="true" />
    </div>
  );
}
