import { Etiqueta } from "@/components/ui/Etiqueta";
import { Subtitulo } from "@/components/ui/Subtitulo";

type Props = {
  etiqueta: string;
  titulo: string;
  texto?: string;
  subtitulo: string[];
};

// Versión mínima de una escena: su etiqueta, su título y su subtítulo. Ocupa
// el lugar de cada escena hasta que se construye la definitiva, para que la
// película ya se pueda recorrer de punta a punta.
export function EscenaBreve({ etiqueta, titulo, texto, subtitulo }: Props) {
  return (
    <div className="flex flex-1 flex-col justify-between gap-10 py-7 md:py-9">
      <div className="flex flex-col gap-4 md:max-w-[62%]">
        <Etiqueta>{etiqueta}</Etiqueta>
        <h2 className="font-cond text-[clamp(72px,12vw,168px)] font-extrabold uppercase leading-[0.86]">
          {titulo}
        </h2>
        <span className="h-[3px] w-16 bg-luz" aria-hidden="true" />
        {texto ? <p className="max-w-[44ch] text-[17px] leading-snug md:text-[19px]">{texto}</p> : null}
      </div>
      <Subtitulo lineas={subtitulo} />
    </div>
  );
}
