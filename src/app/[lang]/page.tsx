import type { Metadata } from "next";
import { Apertura } from "@/components/escenas/Apertura";
import { EscenaBreve } from "@/components/escenas/EscenaBreve";
import { EscenaProducto } from "@/components/escenas/EscenaProducto";
import { Escena } from "@/components/marco/Escena";
import { Marco } from "@/components/marco/Marco";
import { mesYAnio, obtenerContenido, type Contenido } from "@/contenido";
import { ESCENAS, type IdEscena } from "@/lib/escenas";
import { alternativas, idiomaDe } from "@/lib/idioma";
import { PRODUCTOS } from "@/lib/productos";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  return { alternates: alternativas(await idiomaDe(params), "/") };
}

// Lo que muestra cada escena que todavía no tiene su versión definitiva.
function breve(id: IdEscena, c: Contenido) {
  const subtitulos: Partial<Record<IdEscena, string[]>> = {
    "en-rodaje": c.enRodaje.subtitulo,
    metodo: c.metodo.subtitulo,
    "detras-de-escena": c.detras.subtitulo,
    creditos: c.creditos.subtitulo,
  };
  return { titulo: c.escenas[id], subtitulo: subtitulos[id] ?? [] };
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
        const numero = `${c.interfaz.escenaAbreviada} ${escena.numero}`;
        const producto = PRODUCTOS.find((p) => p.id === escena.id);
        const textos = producto ? c.productos[producto.id] : null;

        return (
          <Escena
            key={escena.id}
            id={escena.id}
            luz={escena.luz}
            duracion={escena.duracion}
            className="flex flex-col"
          >
            {producto && textos ? (
              <EscenaProducto
                producto={producto}
                etiqueta={[numero, textos.credito, textos.estado].join(" · ")}
                textos={textos}
                tamano={`${producto.pantallas} ${c.comentario.pantallas} · ${c.comentario.enConstruccionDesde} ${mesYAnio(idioma, producto.desde)}`}
                interfaz={c.interfaz}
                rotulos={c.comentario}
                mencion={producto.id === "munioficios" ? c.mencion : undefined}
              />
            ) : (
              <EscenaBreve etiqueta={numero} {...breve(escena.id, c)} />
            )}
          </Escena>
        );
      })}
    </Marco>
  );
}
