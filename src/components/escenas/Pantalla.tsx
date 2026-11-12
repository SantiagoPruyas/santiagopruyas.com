import Image from "next/image";
import type { CSSProperties } from "react";
import { MarcoCaptura } from "@/components/ui/MarcoCaptura";
import type { Captura } from "@/lib/productos";

// Proporción del marcador que ocupa el lugar de una captura que falta.
const PROPORCION_DEL_MARCADOR = 1.6;

const SOMBRA = "shadow-[0_32px_70px_rgb(0_0_0/0.5)]";

type Props = {
  // null: el paso todavía no tiene captura y se muestra el marcador.
  captura: Captura | null;
  alt: string;
  // Dirección del sitio en la barra del navegador, sin protocolo.
  direccion?: string;
  // Texto del marcador cuando falta la captura.
  falta: string;
  // Rótulo sobre la captura cuando no es la del paso, sino lo que hay mientras tanto.
  nota?: string;
  // Ajustada: entra entera en el lugar que le toca, que tiene que ser un
  // contenedor con tamaño. Fluida: ocupa el ancho disponible, en el flujo.
  modo: "ajustada" | "fluida";
};

// Una pantalla del recorrido dentro de su marco de dispositivo. Si la captura
// falta va un marcador a la vista: nunca se inventa una pantalla.
export function Pantalla({ captura, alt, direccion, falta, nota, modo }: Props) {
  const ajustada = modo === "ajustada";

  if (captura?.marco === "telefono") {
    return (
      <div
        className={ajustada ? "pantalla-telefono shrink-0" : "w-[230px] max-w-full"}
        style={{ "--r": captura.ancho / captura.alto } as CSSProperties}
      >
        <MarcoCaptura variante="telefono" className={SOMBRA}>
          <Image src={captura.src} alt={alt} width={captura.ancho} height={captura.alto} sizes="280px" />
        </MarcoCaptura>
      </div>
    );
  }

  const proporcion = captura ? captura.ancho / captura.alto : PROPORCION_DEL_MARCADOR;

  return (
    <div
      className={ajustada ? "pantalla-navegador shrink-0" : "w-full max-w-[720px]"}
      style={{ "--r": proporcion } as CSSProperties}
    >
      <MarcoCaptura direccion={direccion} className={SOMBRA}>
        <div className={`vista relative ${ajustada ? "" : "aspect-[var(--r)]"}`}>
          {captura ? (
            <Image
              src={captura.src}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover"
              style={{ objectPosition: captura.foco }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-superficie p-3 md:p-5">
              <span className="flex size-full items-center justify-center rounded-md border border-dashed border-texto/30 px-4 text-center font-mono text-[12px] leading-normal tracking-[0.04em] text-texto/80 md:text-[14px]">
                [{falta}]
              </span>
            </div>
          )}
          {captura && nota ? (
            <span className="absolute bottom-2.5 left-2.5 rounded-full border border-texto/15 bg-barra/90 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-texto md:bottom-4 md:left-4">
              {nota}
            </span>
          ) : null}
        </div>
      </MarcoCaptura>
    </div>
  );
}
