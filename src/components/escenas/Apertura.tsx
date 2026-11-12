"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { preload } from "react-dom";
import { altoDeFranja, usePelicula } from "@/components/marco/pelicula";
import { Boton } from "@/components/ui/Boton";
import { Etiqueta } from "@/components/ui/Etiqueta";
import { Secuencia, type ControlDeSecuencia } from "@/components/ui/Secuencia";
import { Subtitulo } from "@/components/ui/Subtitulo";
import type { Contenido } from "@/contenido";
import { GIRO_DE_APERTURA } from "@/lib/personaje";

type Props = {
  textos: Contenido["apertura"];
  // Texto alternativo del personaje.
  alt: string;
};

// Escena 01. Al cargar se ve completa: el apellido como en un póster y el
// personaje delante, mirando a cámara. Con el scroll el título se abre, los
// textos se van y el personaje gira hacia la película que sigue.
export function Apertura({ textos, alt }: Props) {
  const raiz = useRef<HTMLDivElement>(null);
  const secuencia = useRef<ControlDeSecuencia>(null);
  const { irA } = usePelicula();

  const { cuadros, ancho, alto } = GIRO_DE_APERTURA;
  // La imagen fija es lo más grande de la primera pantalla: se pide antes que nada.
  preload(cuadros[cuadros.length - 1], { as: "image", fetchPriority: "high" });

  const mitad = Math.ceil(textos.titulo.length / 2);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tramo = raiz.current?.closest<HTMLElement>("[data-escena]");
      if (!tramo) return;

      const giro = { valor: 1 };

      // La línea dura 1: las posiciones y duraciones son fracciones del scroll de la escena.
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: tramo,
            start: () => `top ${altoDeFranja()}px`,
            end: () => `bottom ${window.innerHeight - altoDeFranja()}px`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to("[data-sale]", { autoAlpha: 0, y: -16, duration: 0.25, ease: "power1.in" }, 0)
        .to('[data-mitad="izquierda"]', { xPercent: -22, duration: 0.7, ease: "power2.inOut" }, 0)
        .to('[data-mitad="derecha"]', { xPercent: 22, duration: 0.7, ease: "power2.inOut" }, 0)
        .to("[data-personaje]", { scale: 1.1, transformOrigin: "50% 100%", duration: 1 }, 0)
        .to(
          giro,
          { valor: 0, duration: 0.7, onUpdate: () => secuencia.current?.dibujar(giro.valor) },
          0.3,
        );
    },
    { scope: raiz },
  );

  return (
    <div ref={raiz} className="absolute inset-0">
      <h1 className="sr-only">
        {textos.nombre} {textos.titulo} — {textos.rol}
      </h1>

      <p
        data-sale
        aria-hidden="true"
        className="absolute inset-x-[var(--margen)] top-5 z-20 flex justify-between gap-6 font-cond text-[15px] font-medium uppercase tracking-[0.24em] md:top-7 md:text-[22px] md:tracking-[0.32em]"
      >
        <span>{textos.nombre}</span>
        <span>{textos.rol}</span>
      </p>

      <div aria-hidden="true" className="entra-titulo absolute inset-x-0 top-[7%] z-10 md:top-[10%]">
        <div className="flex justify-center whitespace-nowrap font-cond text-[min(39vw,calc((100dvh-2*var(--franja))*0.76))] font-extrabold uppercase leading-none">
          <span data-mitad="izquierda" className="inline-block">
            {textos.titulo.slice(0, mitad)}
          </span>
          <span data-mitad="derecha" className="inline-block">
            {textos.titulo.slice(mitad)}
          </span>
        </div>
      </div>

      <div
        data-personaje
        className="absolute bottom-[5%] left-[-2%] z-20 aspect-[4/5] w-[104%] md:bottom-[-20%] md:left-[44.4%] md:h-[108%] md:w-auto"
      >
        <div className="entra-luz size-full">
          <Secuencia
            ref={secuencia}
            cuadros={cuadros}
            ancho={ancho}
            alto={alto}
            alt={alt}
            className="size-full"
          />
        </div>
      </div>

      {/* En el celular el personaje queda detrás del subtítulo y del botón: la sombra los separa. */}
      <div className="absolute inset-x-0 bottom-0 z-30 h-[250px] bg-linear-to-t from-barra/90 via-barra/60 to-transparent md:hidden" />

      <div
        data-sale
        className="absolute bottom-[34px] left-[var(--margen)] z-40 hidden flex-col gap-1.5 md:flex"
      >
        {textos.ficha.map((linea) => (
          <Etiqueta key={linea}>{linea}</Etiqueta>
        ))}
      </div>

      <div data-sale className="absolute inset-x-4 bottom-[88px] z-40 md:inset-x-[22%] md:bottom-[34px]">
        <Subtitulo lineas={textos.subtitulo} />
      </div>

      <div
        data-sale
        className="absolute inset-x-4 bottom-5 z-40 md:inset-x-auto md:bottom-[34px] md:right-[var(--margen)]"
      >
        <Boton
          href="#munioficios"
          onClick={(evento) => {
            if (irA("munioficios")) evento.preventDefault();
          }}
          className="w-full md:w-auto"
        >
          {textos.saltar}
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M2 3l6 5-6 5zM9 3l6 5-6 5z" />
          </svg>
        </Boton>
      </div>
    </div>
  );
}
