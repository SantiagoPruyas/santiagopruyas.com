import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Marco } from "@/components/marco/Marco";
import { Enlace } from "@/components/ui/Enlace";
import { Etiqueta } from "@/components/ui/Etiqueta";
import { mesYAnio, obtenerContenido, textoDeDato, type Contenido } from "@/contenido";
import { ESCENAS, type IdEscena } from "@/lib/escenas";
import { idiomaDe } from "@/lib/idioma";
import { CONTACTO, GOBIERNO_ABIERTO, PRODUCTOS } from "@/lib/productos";

export async function generateMetadata({ params }: PageProps<"/[lang]/guion">): Promise<Metadata> {
  const { guion } = obtenerContenido(await idiomaDe(params));
  return { title: guion.titulo, robots: { index: false, follow: false } };
}

function Fila({ nombre, children }: { nombre: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 md:grid-cols-[200px_1fr] md:gap-6">
      <dt>
        <Etiqueta>{nombre}</Etiqueta>
      </dt>
      <dd className="min-w-0 text-[17px] leading-relaxed">{children}</dd>
    </div>
  );
}

function Pasos({ pasos }: { pasos: { titulo: string; texto: string }[] }) {
  return (
    <ol className="flex flex-col gap-2">
      {pasos.map((paso) => (
        <li key={paso.titulo}>
          <span className="font-medium">{paso.titulo}.</span>{" "}
          <span className="text-apoyo">{paso.texto}</span>
        </li>
      ))}
    </ol>
  );
}

// Lo que dice cada escena además de su subtítulo.
function detalle(id: IdEscena, c: Contenido, idioma: "es" | "en"): ReactNode {
  const producto = PRODUCTOS.find((p) => p.id === id);

  if (producto) {
    const texto = c.productos[producto.id];
    return (
      <>
        <Fila nombre={texto.credito}>{texto.descripcion}</Fila>
        <Fila nombre={c.guion.recorrido}>
          <Pasos pasos={texto.pasos} />
        </Fila>
        {texto.cierre ? <Fila nombre={c.guion.cierre}>{texto.cierre}</Fila> : null}
        <Fila nombre={c.comentario.titulo}>
          {texto.comentario}{" "}
          <span className="text-apoyo">
            {producto.pantallas} {c.comentario.pantallas}, {c.comentario.enConstruccionDesde}{" "}
            {mesYAnio(idioma, producto.desde)}. {texto.estado}.
          </span>
        </Fila>
        <Fila nombre={c.comentario.hechoCon}>{producto.stack.join(" · ")}</Fila>
        <Fila nombre={c.guion.dato}>{textoDeDato(texto.dato)}</Fila>
        <Fila nombre={c.interfaz.verEnVivo}>
          {producto.enVivo ? (
            <Enlace href={producto.enVivo}>{producto.enVivo.replace("https://", "")}</Enlace>
          ) : (
            c.guion.sinSitio
          )}
        </Fila>
        {producto.id === "munioficios" ? (
          <Fila nombre={c.mencion.etiqueta}>
            <span className="font-medium">{GOBIERNO_ABIERTO.nombre}.</span> {c.mencion.texto}{" "}
            <span className="text-apoyo">
              {c.mencion.credito}. {c.mencion.dato}.
            </span>{" "}
            <Enlace href={GOBIERNO_ABIERTO.enVivo}>
              {GOBIERNO_ABIERTO.enVivo.replace("https://", "")}
            </Enlace>
          </Fila>
        ) : null}
      </>
    );
  }

  switch (id) {
    case "apertura":
      return (
        <>
          <Fila nombre={c.apertura.rol}>
            {c.apertura.nombre} {c.apertura.titulo}
          </Fila>
          <Fila nombre={c.apertura.ficha[0]}>{c.apertura.ficha[1]}</Fila>
          <Fila nombre="CTA">{c.apertura.saltar}</Fila>
        </>
      );
    case "en-rodaje":
      return c.enRodaje.tarjetas.map((tarjeta) => (
        <Fila key={tarjeta.nombre} nombre={tarjeta.nombre}>
          {textoDeDato(tarjeta.texto)}
        </Fila>
      ));
    case "metodo":
      return (
        <Fila nombre={c.guion.recorrido}>
          <Pasos pasos={c.metodo.momentos} />
        </Fila>
      );
    case "detras-de-escena":
      return (
        <>
          {c.detras.recorrido.map((etapa) => (
            <Fila key={etapa.lugar} nombre={etapa.lugar}>
              {etapa.texto}
            </Fila>
          ))}
          <Fila nombre="UNNE">{c.detras.estudios}</Fila>
          <Fila nombre="Corrientes">{c.detras.desde}</Fila>
        </>
      );
    case "creditos":
      return (
        <>
          <Fila nombre={c.creditos.reparto}>
            <ul className="flex flex-col gap-1">
              {PRODUCTOS.map((p) => (
                <li key={p.id}>
                  {p.nombre} <span className="text-apoyo">— {c.productos[p.id].credito}</span>
                </li>
              ))}
              <li>
                {GOBIERNO_ABIERTO.nombre} <span className="text-apoyo">— {c.mencion.credito}</span>
              </li>
            </ul>
          </Fila>
          {c.creditos.lugares.map((lugar) => (
            <Fila key={lugar.lugar} nombre={lugar.lugar}>
              {lugar.rol}
            </Fila>
          ))}
          <Fila nombre={c.creditos.escribime}>
            <Enlace href={`mailto:${CONTACTO.mail}`}>{CONTACTO.mail}</Enlace>
          </Fila>
          <Fila nombre="CTA">{c.creditos.descargarCv}</Fila>
        </>
      );
    default:
      return null;
  }
}

// Página de referencia: muestra todos los textos del contenido en el idioma de la ruta. No se indexa.
export default async function Guion({ params }: PageProps<"/[lang]/guion">) {
  const idioma = await idiomaDe(params);
  const c = obtenerContenido(idioma);

  const subtitulos: Record<IdEscena, string[]> = {
    apertura: c.apertura.subtitulo,
    munioficios: c.productos.munioficios.subtitulo,
    fondare: c.productos.fondare.subtitulo,
    pymeton: c.productos.pymeton.subtitulo,
    peeqsales: c.productos.peeqsales.subtitulo,
    "en-rodaje": c.enRodaje.subtitulo,
    metodo: c.metodo.subtitulo,
    "detras-de-escena": c.detras.subtitulo,
    creditos: c.creditos.subtitulo,
  };

  return (
    <Marco idioma={idioma}>
      <div className="mx-auto flex max-w-[1100px] flex-col gap-14 px-[var(--margen)] py-12 md:gap-20 md:py-20">
        <header className="flex flex-col gap-4">
          <Etiqueta>{c.guion.etiqueta}</Etiqueta>
          <h1 className="font-cond text-[72px] font-extrabold uppercase leading-[0.9] md:text-[132px]">
            {c.guion.titulo}
          </h1>
          <p className="max-w-[52ch] text-[17px] leading-relaxed text-apoyo">{c.guion.bajada}</p>
        </header>

        {ESCENAS.map((escena) => (
          <section
            key={escena.id}
            data-luz={escena.luz}
            className="flex flex-col gap-6 border-t border-linea pt-8"
          >
            <div className="flex flex-col gap-3">
              <Etiqueta className="text-luz">
                {c.interfaz.escenaAbreviada} {escena.numero} — {c.escenas[escena.id]}
              </Etiqueta>
              <h2 className="text-[24px] font-medium leading-[1.2] md:text-[32px]">
                {subtitulos[escena.id].map((linea) => (
                  <span key={linea} className="block">
                    {linea}
                  </span>
                ))}
              </h2>
            </div>
            <dl className="flex flex-col gap-4">{detalle(escena.id, c, idioma)}</dl>
          </section>
        ))}
      </div>
    </Marco>
  );
}
