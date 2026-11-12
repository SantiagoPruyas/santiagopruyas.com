"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { altoDeFranja } from "@/components/marco/pelicula";
import { Etiqueta } from "@/components/ui/Etiqueta";
import { Subtitulo } from "@/components/ui/Subtitulo";
import { textoDeDato, type Contenido } from "@/contenido";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  etiqueta: string;
  titulo: string;
  textos: Contenido["enRodaje"];
};

// Escena 06. Los tres productos que todavía se están haciendo, sin capturas:
// tres cuadros que pasan de costado con el scroll, como una tira de película.
// Con movimiento reducido quedan quietos, uno al lado del otro.
export function EnRodaje({ etiqueta, titulo, textos }: Props) {
  const raiz = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tramo = raiz.current?.closest<HTMLElement>("[data-escena]");
      const tira = raiz.current?.querySelector<HTMLElement>("[data-tira]");
      if (!tramo || !tira) return;

      // Mientras la escena sube, la tira llega desde la derecha hasta apoyar
      // el primer cuadro en el margen. Con la escena ya fija recorre los tres
      // y termina con el último apoyado en el margen derecho. Las duraciones
      // son el scroll de cada parte, en píxeles: lo que tarda en subir y lo
      // que queda fija.
      const franja = altoDeFranja();
      const entrada = window.innerHeight - franja;
      const fija = tramo.offsetHeight - (window.innerHeight - 2 * franja);
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: tramo,
            start: "top bottom",
            end: () => `bottom ${window.innerHeight - altoDeFranja()}px`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(tira, { x: () => tira.clientWidth * 0.4 }, { x: 0, duration: entrada })
        .to(tira, { x: () => tira.clientWidth - tira.scrollWidth, duration: fija });
    },
    { scope: raiz },
  );

  return (
    <div ref={raiz} className="relative flex min-h-0 flex-1 flex-col gap-5 py-3.5 lg:gap-8 lg:py-9">
      {/* La misma luz de 4peeq que las dos escenas anteriores, más tenue. */}
      <div
        className="luz-de-escena pointer-events-none absolute inset-x-[calc(-1*var(--margen))] inset-y-0 -z-10 opacity-50"
        aria-hidden="true"
      />

      <header className="flex flex-col gap-2 lg:gap-3.5">
        <Etiqueta>{etiqueta}</Etiqueta>
        <h2 className="font-cond text-[clamp(50px,min(7.4vw,13.5dvh),124px)] font-extrabold uppercase leading-[0.86]">
          {titulo}
        </h2>
        <span className="h-[3px] w-12 bg-luz lg:w-16" aria-hidden="true" />
      </header>

      <div className="flex min-h-0 flex-1 items-center">
        <ul
          data-tira
          className="flex h-full max-h-[340px] w-full gap-4 motion-reduce:h-auto motion-reduce:max-h-none motion-reduce:flex-col lg:gap-6 md:motion-reduce:flex-row"
        >
          {textos.tarjetas.map((tarjeta) => (
            <li
              key={tarjeta.nombre}
              className="flex w-[78vw] shrink-0 flex-col justify-between gap-6 rounded-xl border border-texto/12 bg-superficie/70 bg-[radial-gradient(ellipse_at_100%_0%,color-mix(in_srgb,var(--luz)_13%,transparent),transparent_62%)] p-5 motion-reduce:min-h-[190px] motion-reduce:w-full md:w-[38vw] lg:p-7 md:motion-reduce:w-auto md:motion-reduce:flex-1"
            >
              <Etiqueta>{textos.estado}</Etiqueta>
              <div className="flex flex-col gap-2 lg:gap-3">
                <h3 className="font-cond text-[clamp(40px,5.4vw,88px)] font-bold uppercase leading-[0.9]">
                  {tarjeta.nombre}
                </h3>
                <p
                  className={
                    "falta" in tarjeta.texto
                      ? "font-mono text-[12px] leading-normal text-apoyo lg:text-[13px]"
                      : "max-w-[30ch] text-[16px] leading-[1.4] lg:text-[19px]"
                  }
                >
                  {textoDeDato(tarjeta.texto)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Subtitulo lineas={textos.subtitulo} className="max-lg:text-[19px]!" />
    </div>
  );
}
