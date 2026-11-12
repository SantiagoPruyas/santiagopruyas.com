"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useCallback, useRef, useState, type ReactNode } from "react";
import type { Contenido, Idioma } from "@/contenido";
import { ESCENAS, SEGUNDOS_TOTALES, type IdEscena } from "@/lib/escenas";
import { FranjaInferior } from "./FranjaInferior";
import { FranjaSuperior } from "./FranjaSuperior";
import { PeliculaContext, altoDeFranja } from "./pelicula";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CUADROS_POR_SEGUNDO = 24;
const MARCAS_PAREJAS = ESCENAS.map((_, indice) => indice / ESCENAS.length);

const dosCifras = (valor: number) => String(Math.floor(valor)).padStart(2, "0");

type Props = {
  children: ReactNode;
  idioma: Idioma;
  interfaz: Contenido["interfaz"];
  nombres: Contenido["escenas"];
};

// Parte viva del marco: el scroll suave, qué escena está en pantalla, el
// avance de la línea de tiempo y el código de tiempo. El avance y el código se
// escriben directo en el DOM para no renderizar React en cada cuadro de scroll.
export function MarcoVivo({ children, idioma, interfaz, nombres }: Props) {
  const raiz = useRef<HTMLDivElement>(null);
  const lenis = useRef<Lenis | null>(null);
  const [actual, setActual] = useState<IdEscena>(ESCENAS[0].id);
  const [marcas, setMarcas] = useState(MARCAS_PAREJAS);

  useGSAP(
    () => {
      const marco = raiz.current;
      if (!marco) return;

      const escenas = gsap.utils.toArray<HTMLElement>("[data-escena]", marco);
      // Las páginas de referencia no tienen escenas: ahí el marco queda quieto.
      if (escenas.length === 0) return;

      const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let tic: ((tiempo: number) => void) | undefined;

      if (!reducido) {
        const suave = new Lenis();
        suave.on("scroll", ScrollTrigger.update);
        tic = (tiempo) => suave.raf(tiempo * 1000);
        gsap.ticker.add(tic);
        gsap.ticker.lagSmoothing(0);
        lenis.current = suave;
      }

      ScrollTrigger.config({ ignoreMobileResize: true });

      for (const escena of escenas) {
        ScrollTrigger.create({
          trigger: escena,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActual(escena.dataset.escena as IdEscena);
          },
        });
      }

      const codigo = marco.querySelector<HTMLElement>("[data-codigo]");
      const cuadros = marco.querySelector<HTMLElement>("[data-cuadros]");

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          marco.style.setProperty("--avance", self.progress.toFixed(4));
          const segundos = self.progress * SEGUNDOS_TOTALES;
          if (codigo) {
            codigo.textContent = `${dosCifras(segundos / 3600)}:${dosCifras((segundos / 60) % 60)}:${dosCifras(segundos % 60)}`;
          }
          if (cuadros) {
            cuadros.textContent = `:${dosCifras((segundos % 1) * CUADROS_POR_SEGUNDO)}`;
          }
        },
      });

      // Cada marca de la línea de tiempo va donde empieza su escena de verdad.
      const ubicarMarcas = () => {
        const tope = ScrollTrigger.maxScroll(window);
        if (tope <= 0) return;
        const franja = altoDeFranja();
        const nuevas = escenas.map((escena) => {
          const inicio = escena.getBoundingClientRect().top + window.scrollY - franja;
          return Math.min(1, Math.max(0, inicio / tope));
        });
        setMarcas((previas) => (previas.join() === nuevas.join() ? previas : nuevas));
      };
      ScrollTrigger.addEventListener("refresh", ubicarMarcas);
      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.removeEventListener("refresh", ubicarMarcas);
        if (tic) gsap.ticker.remove(tic);
        lenis.current?.destroy();
        lenis.current = null;
      };
    },
    { scope: raiz },
  );

  const irA = useCallback((id: IdEscena) => {
    const escena = raiz.current?.querySelector<HTMLElement>(`[data-escena="${id}"]`);
    if (!escena) return false;

    const destino = escena.getBoundingClientRect().top + window.scrollY - altoDeFranja();
    if (lenis.current) lenis.current.scrollTo(destino);
    else window.scrollTo({ top: destino });
    window.history.replaceState(null, "", `#${id}`);
    return true;
  }, []);

  const luz = ESCENAS.find((escena) => escena.id === actual)?.luz ?? "naranja";

  return (
    <PeliculaContext.Provider value={{ actual, irA }}>
      <div ref={raiz} data-marco data-luz={luz}>
        <a
          href="#contenido"
          className="sr-only z-50 rounded-[4px] bg-luz px-4 py-2 text-[15px] font-medium text-sobre-luz focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
        >
          {interfaz.saltarAlContenido}
        </a>
        <FranjaSuperior idioma={idioma} textos={interfaz} />
        <main id="contenido" className="py-[var(--franja)]">
          {children}
        </main>
        <FranjaInferior textos={interfaz} nombres={nombres} marcas={marcas} />
        <div className="grano" aria-hidden="true" />
      </div>
    </PeliculaContext.Provider>
  );
}
