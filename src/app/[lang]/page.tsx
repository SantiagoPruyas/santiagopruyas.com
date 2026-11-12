import type { Metadata } from "next";
import { Apertura } from "@/components/escenas/Apertura";
import { EscenaBreve } from "@/components/escenas/EscenaBreve";
import { Escena } from "@/components/marco/Escena";
import { Marco } from "@/components/marco/Marco";
import { obtenerContenido, type Contenido } from "@/contenido";
import { ESCENAS, type IdEscena } from "@/lib/escenas";
import { alternativas, idiomaDe } from "@/lib/idioma";
import { PRODUCTOS } from "@/lib/productos";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  return { alternates: alternativas(await idiomaDe(params), "/") };
}

// Lo que muestra cada escena mientras no tiene su versión definitiva.
function breve(id: IdEscena, c: Contenido) {
  const producto = PRODUCTOS.find((p) => p.id === id);
  if (producto) {
    const texto = c.productos[producto.id];
    return {
      etiqueta: `${texto.credito} · ${texto.estado}`,
      titulo: producto.nombre,
      texto: texto.descripcion,
      subtitulo: texto.subtitulo,
    };
  }

  const subtitulos: Partial<Record<IdEscena, string[]>> = {
    "en-rodaje": c.enRodaje.subtitulo,
    metodo: c.metodo.subtitulo,
    "detras-de-escena": c.detras.subtitulo,
    creditos: c.creditos.subtitulo,
  };
  return { etiqueta: "", titulo: c.escenas[id], subtitulo: subtitulos[id] ?? [] };
}

export default async function Inicio({ params }: PageProps<"/[lang]">) {
  const idioma = await idiomaDe(params);
  const c = obtenerContenido(idioma);
  const [apertura, ...resto] = ESCENAS;

  return (
    <Marco idioma={idioma}>
      <Escena id={apertura.id} luz={apertura.luz} duracion={apertura.duracion}>
        <Apertura textos={c.apertura} alt={`${c.apertura.nombre} ${c.apertura.titulo}`} />
      </Escena>

      {resto.map((escena) => {
        const { etiqueta, ...datos } = breve(escena.id, c);
        return (
          <Escena
            key={escena.id}
            id={escena.id}
            luz={escena.luz}
            duracion={escena.duracion}
            className="flex flex-col"
          >
            <EscenaBreve
              etiqueta={[`${c.interfaz.escenaAbreviada} ${escena.numero}`, etiqueta]
                .filter(Boolean)
                .join(" · ")}
              {...datos}
            />
          </Escena>
        );
      })}
    </Marco>
  );
}
