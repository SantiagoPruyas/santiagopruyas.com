import { Escena } from "@/components/marco/Escena";
import { Marco } from "@/components/marco/Marco";

// La apertura se construye con el motor de escenas; por ahora queda el marco con su cartel.
export default function Inicio() {
  return (
    <Marco>
      <Escena id="apertura" luz="naranja">
        <h1 className="flex justify-between gap-6 pt-5 font-cond text-[15px] font-medium uppercase tracking-[0.24em] md:pt-7 md:text-[22px] md:tracking-[0.32em]">
          <span>Santiago Isaac</span>
          <span>Product Engineer</span>
        </h1>
      </Escena>
    </Marco>
  );
}
