import { Etiqueta } from "@/components/ui/Etiqueta";
import { ESCENAS, type Escena } from "@/lib/escenas";
import { TiraDeTiempo } from "./TiraDeTiempo";

type Props = {
  escena: Escena;
  progreso: number;
  // Código de tiempo con cuadros: hh:mm:ss:cc.
  codigo: string;
};

const MARCAS = ESCENAS.map((_, indice) => indice / ESCENAS.length);

export function FranjaInferior({ escena, progreso, codigo }: Props) {
  return (
    <div
      role="region"
      aria-label="Línea de tiempo"
      className="fixed inset-x-0 bottom-0 z-40 flex h-[var(--franja)] items-center gap-3.5 bg-barra px-[var(--margen)] md:gap-8"
    >
      <Etiqueta className="whitespace-nowrap">
        Esc. {escena.numero}
        <span className="hidden md:inline"> — {escena.nombre}</span>
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
