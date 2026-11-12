import { Etiqueta } from "@/components/ui/Etiqueta";
import type { Contenido } from "@/contenido";
import { ESCENAS, type Escena } from "@/lib/escenas";
import { TiraDeTiempo } from "./TiraDeTiempo";

type Props = {
  escena: Escena;
  nombre: string;
  textos: Contenido["interfaz"];
  progreso: number;
  // Código de tiempo con cuadros: hh:mm:ss:cc.
  codigo: string;
};

const MARCAS = ESCENAS.map((_, indice) => indice / ESCENAS.length);

export function FranjaInferior({ escena, nombre, textos, progreso, codigo }: Props) {
  return (
    <div
      role="region"
      aria-label={textos.lineaDeTiempo}
      className="fixed inset-x-0 bottom-0 z-40 flex h-[var(--franja)] items-center gap-3.5 bg-barra px-[var(--margen)] md:gap-8"
    >
      <Etiqueta className="whitespace-nowrap">
        {textos.escenaAbreviada} {escena.numero}
        <span className="hidden md:inline"> — {nombre}</span>
      </Etiqueta>
      <TiraDeTiempo marcas={MARCAS} progreso={progreso} className="min-w-0 flex-1" />
      <Etiqueta className="whitespace-nowrap">
        {/* En el celular no hay lugar para los cuadros. */}
        <span className="md:hidden">{codigo.slice(0, 8)}</span>
        <span className="hidden md:inline">{codigo}</span>
      </Etiqueta>
    </div>
  );
}
