import type { CSSProperties, ReactNode } from "react";
import type { IdEscena, Luz } from "@/lib/escenas";

type Props = {
  id: IdEscena;
  luz: Luz;
  // Cuántas pantallas de scroll ocupa. Con 1 pasa de largo; con más, queda
  // fija entre las franjas mientras su animación avanza.
  duracion?: number;
  children: ReactNode;
  className?: string;
};

// Una escena es un tramo alto de página con un cuadro adentro que se queda
// pegado entre las dos franjas. Se usa position: sticky y no el pin de
// ScrollTrigger para no mover nodos del DOM por fuera de React. Con
// movimiento reducido el tramo se achica al alto del contenido y nada queda fijo.
// El cuadro aísla sus capas para que nada de adentro pase por encima de las franjas.
export function Escena({ id, luz, duracion = 1, children, className = "" }: Props) {
  return (
    <section
      id={id}
      data-escena={id}
      data-luz={luz}
      style={{ "--duracion": duracion } as CSSProperties}
      className="relative h-[calc(var(--duracion)*100lvh)] motion-reduce:h-auto"
    >
      <div
        className={`sticky top-[var(--franja)] isolate h-[calc(100dvh-2*var(--franja))] overflow-hidden px-[var(--margen)] motion-reduce:relative motion-reduce:top-0 motion-reduce:h-auto motion-reduce:min-h-[calc(100dvh-2*var(--franja))] ${className}`}
      >
        {children}
      </div>
    </section>
  );
}
