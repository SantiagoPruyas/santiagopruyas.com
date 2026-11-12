"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAVEGACION } from "@/lib/escenas";

const PISTA = "font-mono text-[12px] uppercase tracking-[0.06em] text-apoyo";

type InterruptorProps = {
  nombre: string;
  activo: boolean;
  alCambiar: () => void;
  className?: string;
};

function Interruptor({ nombre, activo, alCambiar, className = "" }: InterruptorProps) {
  return (
    <button
      type="button"
      aria-pressed={activo}
      onClick={alCambiar}
      className={`${PISTA} inline-flex min-h-11 items-center gap-2 transition-colors duration-200 hover:text-texto ${className}`}
    >
      {nombre}
      <span className={activo ? "text-luz" : "text-texto"}>{activo ? "on" : "off"}</span>
    </button>
  );
}

// El cambio de idioma llega con el contenido bilingüe; hasta entonces solo indica el idioma actual.
function Idioma({ corto = false }: { corto?: boolean }) {
  return (
    <span className={PISTA}>
      {corto ? null : "Subtítulos "}
      <span className="text-texto">ES</span> / EN
    </span>
  );
}

type Props = {
  // Entrada de la navegación que corresponde a la escena en pantalla.
  activa?: string;
};

export function FranjaSuperior({ activa = "Apertura" }: Props) {
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

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-barra">
      <div className="flex h-[var(--franja)] items-center justify-between gap-6 px-[var(--margen)]">
        <Link
          href="/"
          className="font-cond text-[19px] font-bold uppercase tracking-[0.14em] md:text-[24px]"
        >
          Santiago Pruyas
        </Link>

        <nav aria-label="Escenas" className="hidden gap-[30px] text-[15px] md:flex">
          {NAVEGACION.map((entrada) => (
            <Link
              key={entrada.href}
              href={entrada.href}
              aria-current={entrada.nombre === activa ? "true" : undefined}
              className="text-apoyo transition-colors duration-200 hover:text-texto aria-[current]:text-texto"
            >
              {entrada.nombre}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-[22px] md:flex">
          <Idioma />
          <Interruptor nombre="Sonido" activo={sonido} alCambiar={() => setSonido(!sonido)} />
          <Interruptor
            nombre="Comentario"
            activo={comentario}
            alCambiar={() => setComentario(!comentario)}
          />
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <Idioma corto />
          <button
            type="button"
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            onClick={() => setMenuAbierto(!menuAbierto)}
            className={`${PISTA} inline-flex min-h-11 items-center text-texto`}
          >
            {menuAbierto ? "Cerrar" : "Menú"}
          </button>
        </div>
      </div>

      <div
        id="menu-movil"
        hidden={!menuAbierto}
        className="border-t border-linea bg-barra px-[var(--margen)] pb-5 md:hidden"
      >
        <nav aria-label="Escenas" className="flex flex-col">
          {NAVEGACION.map((entrada) => (
            <Link
              key={entrada.href}
              href={entrada.href}
              onClick={() => setMenuAbierto(false)}
              className="flex min-h-12 items-center border-b border-linea font-cond text-[28px] font-bold uppercase tracking-[0.02em]"
            >
              {entrada.nombre}
            </Link>
          ))}
        </nav>
        <div className="flex gap-6 pt-2">
          <Interruptor nombre="Sonido" activo={sonido} alCambiar={() => setSonido(!sonido)} />
          <Interruptor
            nombre="Comentario"
            activo={comentario}
            alCambiar={() => setComentario(!comentario)}
          />
        </div>
      </div>
    </header>
  );
}
