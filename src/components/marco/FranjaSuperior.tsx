"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { IDIOMAS, rutaEn, type Contenido, type Idioma } from "@/contenido";
import { NAVEGACION, type IdNavegacion } from "@/lib/escenas";

const PISTA = "font-mono text-[12px] uppercase tracking-[0.06em] text-apoyo";

type Textos = Contenido["interfaz"];

type InterruptorProps = {
  nombre: string;
  activo: boolean;
  alCambiar: () => void;
};

function Interruptor({ nombre, activo, alCambiar }: InterruptorProps) {
  return (
    <button
      type="button"
      aria-pressed={activo}
      onClick={alCambiar}
      className={`${PISTA} inline-flex min-h-11 items-center gap-2 transition-colors duration-200 hover:text-texto`}
    >
      {nombre}
      <span className={activo ? "text-luz" : "text-texto"}>{activo ? "on" : "off"}</span>
    </button>
  );
}

type SubtitulosProps = { idioma: Idioma; textos: Textos; corto?: boolean };

// El idioma se elige como los subtítulos de una película. Cada opción lleva a
// la misma página en el otro idioma, sin mover el scroll.
function Subtitulos({ idioma, textos, corto = false }: SubtitulosProps) {
  const ruta = usePathname().replace(/^\/(es|en)(?=\/|$)/, "") || "/";

  return (
    <span className={`${PISTA} inline-flex items-center gap-1.5`}>
      {corto ? null : <span className="mr-0.5">{textos.subtitulos}</span>}
      {IDIOMAS.map((codigo, indice) => (
        <Fragment key={codigo}>
          {indice > 0 ? <span aria-hidden="true">/</span> : null}
          <Link
            href={rutaEn(codigo, ruta)}
            hrefLang={codigo}
            scroll={false}
            aria-label={textos.cambiarA[codigo]}
            aria-current={codigo === idioma ? "true" : undefined}
            className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-texto aria-[current]:text-texto"
          >
            {codigo}
          </Link>
        </Fragment>
      ))}
    </span>
  );
}

type Props = {
  idioma: Idioma;
  textos: Textos;
  // Entrada de la navegación que corresponde a la escena en pantalla.
  activa?: IdNavegacion;
};

export function FranjaSuperior({ idioma, textos, activa = "apertura" }: Props) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [sonido, setSonido] = useState(false);
  const [comentario, setComentario] = useState(false);

  useEffect(() => {
    if (!menuAbierto) return;
    const cerrar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setMenuAbierto(false);
    };
    window.addEventListener("keydown", cerrar);
    return () => window.removeEventListener("keydown", cerrar);
  }, [menuAbierto]);

  const inicio = rutaEn(idioma, "/");
  const enlaces = NAVEGACION.map((id) => ({
    id,
    nombre: textos.navegacion[id],
    href: `${inicio === "/" ? "" : inicio}/#${id}`,
  }));

  const interruptores = (
    <>
      <Interruptor nombre={textos.sonido} activo={sonido} alCambiar={() => setSonido(!sonido)} />
      <Interruptor
        nombre={textos.comentario}
        activo={comentario}
        alCambiar={() => setComentario(!comentario)}
      />
    </>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-barra">
      <div className="flex h-[var(--franja)] items-center justify-between gap-6 px-[var(--margen)]">
        <Link
          href={inicio}
          className="font-cond text-[19px] font-bold uppercase tracking-[0.14em] md:text-[24px]"
        >
          Santiago Pruyas
        </Link>

        <nav aria-label={textos.etiquetaNavegacion} className="hidden gap-[30px] text-[15px] md:flex">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.id}
              href={enlace.href}
              aria-current={enlace.id === activa ? "true" : undefined}
              className="text-apoyo transition-colors duration-200 hover:text-texto aria-[current]:text-texto"
            >
              {enlace.nombre}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-[22px] md:flex">
          <Subtitulos idioma={idioma} textos={textos} />
          {interruptores}
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <Subtitulos idioma={idioma} textos={textos} corto />
          <button
            type="button"
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            onClick={() => setMenuAbierto(!menuAbierto)}
            className={`${PISTA} inline-flex min-h-11 items-center text-texto`}
          >
            {menuAbierto ? textos.cerrar : textos.menu}
          </button>
        </div>
      </div>

      <div
        id="menu-movil"
        hidden={!menuAbierto}
        className="border-t border-linea bg-barra px-[var(--margen)] pb-5 md:hidden"
      >
        <nav aria-label={textos.etiquetaNavegacion} className="flex flex-col">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.id}
              href={enlace.href}
              onClick={() => setMenuAbierto(false)}
              className="flex min-h-12 items-center border-b border-linea font-cond text-[28px] font-bold uppercase tracking-[0.02em]"
            >
              {enlace.nombre}
            </Link>
          ))}
        </nav>
        <div className="flex gap-6 pt-2">{interruptores}</div>
      </div>
    </header>
  );
}
