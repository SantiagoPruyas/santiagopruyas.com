import type { ReactNode } from "react";
import { obtenerContenido, type Idioma } from "@/contenido";
import { MarcoVivo } from "./MarcoVivo";

type Props = {
  children: ReactNode;
  idioma: Idioma;
};

// Marco de cine: la interfaz vive en las franjas de arriba y abajo y la escena
// queda limpia en el medio. Acá se eligen los textos; lo que se mueve está en MarcoVivo.
export function Marco({ children, idioma }: Props) {
  const contenido = obtenerContenido(idioma);

  return (
    <MarcoVivo idioma={idioma} interfaz={contenido.interfaz} nombres={contenido.escenas}>
      {children}
    </MarcoVivo>
  );
}
