import type { ReactNode } from "react";
import { obtenerContenido, type Idioma } from "@/contenido";
import { ESCENAS, type Escena, type IdNavegacion } from "@/lib/escenas";
import { FranjaInferior } from "./FranjaInferior";
import { FranjaSuperior } from "./FranjaSuperior";

type Props = {
  children: ReactNode;
  idioma: Idioma;
  // Escena en pantalla: define la luz de las franjas y lo que marca la línea de tiempo.
  escena?: Escena;
  activa?: IdNavegacion;
  progreso?: number;
  codigo?: string;
};

// Marco de cine: la interfaz vive en las franjas de arriba y abajo y la escena queda limpia en el medio.
export function Marco({
  children,
  idioma,
  escena = ESCENAS[0],
  activa,
  progreso = 0,
  codigo = "00:00:00:00",
}: Props) {
  const contenido = obtenerContenido(idioma);

  return (
    <div data-luz={escena.luz}>
      <a
        href="#contenido"
        className="sr-only z-50 rounded-[4px] bg-luz px-4 py-2 text-[15px] font-medium text-sobre-luz focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        {contenido.interfaz.saltarAlContenido}
      </a>
      <FranjaSuperior idioma={idioma} textos={contenido.interfaz} activa={activa} />
      <main id="contenido" className="py-[var(--franja)]">
        {children}
      </main>
      <FranjaInferior
        escena={escena}
        nombre={contenido.escenas[escena.id]}
        textos={contenido.interfaz}
        progreso={progreso}
        codigo={codigo}
      />
      <div className="grano" aria-hidden="true" />
    </div>
  );
}
