import type { Metadata } from "next";
import { Escena } from "@/components/marco/Escena";
import { Marco } from "@/components/marco/Marco";
import { Subtitulo } from "@/components/ui/Subtitulo";
import { obtenerContenido } from "@/contenido";
import { alternativas, idiomaDe } from "@/lib/idioma";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  return { alternates: alternativas(await idiomaDe(params), "/") };
}

// La apertura se construye con el motor de escenas; por ahora queda el marco con su cartel y su subtítulo.
export default async function Inicio({ params }: PageProps<"/[lang]">) {
  const idioma = await idiomaDe(params);
  const { apertura } = obtenerContenido(idioma);

  return (
    <Marco idioma={idioma}>
      <Escena id="apertura" luz="naranja" className="flex flex-col justify-between pb-8 md:pb-9">
        <h1 className="flex justify-between gap-6 pt-5 font-cond text-[15px] font-medium uppercase tracking-[0.24em] md:pt-7 md:text-[22px] md:tracking-[0.32em]">
          <span>{apertura.nombre}</span>
          <span>{apertura.rol}</span>
        </h1>
        <Subtitulo lineas={apertura.subtitulo} />
      </Escena>
    </Marco>
  );
}
