"use client";

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";

export type ControlDeSecuencia = {
  // Muestra el cuadro que corresponde a un avance de 0 (primero) a 1 (último).
  dibujar: (avance: number) => void;
};

type Props = {
  // Direcciones de los cuadros, en orden. El último es además la imagen fija.
  cuadros: string[];
  ancho: number;
  alto: number;
  alt: string;
  ref?: Ref<ControlDeSecuencia>;
  className?: string;
};

// Secuencia de imágenes sobre un canvas. Lo primero que se ve es una imagen
// común, el último cuadro, para que el contenido aparezca enseguida; los demás
// se bajan después y el canvas toma su lugar cuando están todos.
export function Secuencia({ cuadros, ancho, alto, alt, ref, className = "" }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const imagenes = useRef<HTMLImageElement[]>([]);
  const pedido = useRef(cuadros.length - 1);
  const dibujado = useRef(-1);
  const [lista, setLista] = useState(false);

  const pintar = (indice: number) => {
    const imagen = imagenes.current[indice];
    const contexto = canvas.current?.getContext("2d");
    if (!imagen || !contexto || dibujado.current === indice) return;
    contexto.clearRect(0, 0, ancho, alto);
    contexto.drawImage(imagen, 0, 0, ancho, alto);
    dibujado.current = indice;
  };

  useImperativeHandle(ref, () => ({
    dibujar: (avance) => {
      pedido.current = Math.round(Math.min(1, Math.max(0, avance)) * (cuadros.length - 1));
      pintar(pedido.current);
    },
  }));

  useEffect(() => {
    // Sin movimiento, o con ahorro de datos, alcanza con la imagen fija.
    const ahorro = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (ahorro || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let vigente = true;

    const cargar = async () => {
      const cargadas = await Promise.all(
        cuadros.map(async (direccion) => {
          const imagen = new Image();
          imagen.src = direccion;
          await imagen.decode();
          return imagen;
        }),
      );
      if (!vigente) return;
      imagenes.current = cargadas;
      pintar(pedido.current);
      setLista(true);
    };

    // Los cuadros esperan a que la página termine de cargar: no compiten con el primer pintado.
    const empezar = () => cargar().catch(() => {});
    if (document.readyState === "complete") empezar();
    else window.addEventListener("load", empezar, { once: true });

    return () => {
      vigente = false;
      window.removeEventListener("load", empezar);
    };
    // Los cuadros de una secuencia no cambian mientras está montada.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${ancho} / ${alto}` }}>
      {/* La imagen fija tiene que ser exactamente el último cuadro, sin
          recodificar, para que no haya salto cuando el canvas la reemplaza. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={cuadros[cuadros.length - 1]}
        alt={alt}
        width={ancho}
        height={alto}
        fetchPriority="high"
        decoding="sync"
        className={`absolute inset-0 size-full ${lista ? "invisible" : ""}`}
      />
      <canvas
        ref={canvas}
        width={ancho}
        height={alto}
        aria-hidden="true"
        className={`absolute inset-0 size-full ${lista ? "" : "invisible"}`}
      />
    </div>
  );
}
