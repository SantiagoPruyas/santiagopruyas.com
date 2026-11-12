"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useId, useRef, useState } from "react";
import { useComentario, useMovimientoReducido } from "@/components/marco/comentario";
import { altoDeFranja } from "@/components/marco/pelicula";
import { Enlace } from "@/components/ui/Enlace";
import { Etiqueta } from "@/components/ui/Etiqueta";
import { Subtitulo } from "@/components/ui/Subtitulo";
import { textoDeDato, type Contenido } from "@/contenido";
import { GIRO_DE_APERTURA } from "@/lib/personaje";
import { GOBIERNO_ABIERTO, type Captura, type Producto } from "@/lib/productos";
import { Pantalla } from "./Pantalla";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SUAVE = "ease-[cubic-bezier(0.32,0.72,0,1)]";
const dosCifras = (valor: number) => String(valor).padStart(2, "0");
const sitioDe = (url: string) => new URL(url).host;

// Cada parada del recorrido: un paso del producto y, al final, lo que la
// escena tenga para cerrar: en MuniOficios la mención del Portal de Gobierno
// Abierto, en Pymetón su credencial 3D.
type Toma = {
  titulo: string;
  texto: string;
  // Lo que se ve: la captura del paso o, si falta, la portada del producto.
  captura: Captura | null;
  alt: string;
  // El paso todavía no tiene su captura.
  falta: boolean;
  nota?: string;
  direccion?: string;
  etiqueta?: string;
  pie?: string;
  enVivo?: string;
};

type Props = {
  producto: Producto;
  // Número de escena, crédito y estado, en una línea.
  etiqueta: string;
  textos: Contenido["productos"][Producto["id"]];
  // Cuántas pantallas tiene el producto y desde cuándo se construye.
  tamano: string;
  interfaz: Contenido["interfaz"];
  rotulos: Contenido["comentario"];
  mencion?: Contenido["mencion"];
};

function Flecha() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
      className="ml-1.5 inline-block"
    >
      <path d="M3 9l6-6M4 3h5v5" />
    </svg>
  );
}

type RecuadroProps = {
  // Con rótulo el personaje se corre a la derecha para dejarle lugar.
  rotulo?: string;
  className?: string;
};

// El personaje en un recuadro chico, iluminado con la luz de la escena.
function Recuadro({ rotulo, className = "" }: RecuadroProps) {
  const { cuadros, ancho, alto } = GIRO_DE_APERTURA;

  return (
    <div className={`relative overflow-hidden border border-linea bg-superficie ${className}`}>
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_28%,color-mix(in_srgb,var(--luz)_55%,transparent),transparent_72%)]"
        aria-hidden="true"
      />
      <Image
        src={cuadros[cuadros.length - 1]}
        alt=""
        width={ancho}
        height={alto}
        sizes="260px"
        className={`absolute top-[-20%] h-[150%] w-auto max-w-none -translate-x-1/2 grayscale ${
          rotulo ? "left-[64%]" : "left-1/2"
        }`}
      />
      <div className="absolute inset-0 bg-luz opacity-55 mix-blend-color" aria-hidden="true" />
      {rotulo ? (
        <span className="absolute bottom-2.5 left-3 font-mono text-[11px] uppercase tracking-[0.06em] text-texto [text-shadow:0_1px_6px_rgb(0_0_0/0.9)]">
          {rotulo}
        </span>
      ) : null}
    </div>
  );
}

type ComentarioProps = Pick<Props, "producto" | "textos" | "tamano" | "rotulos">;

// La capa técnica de la escena: qué buscaba el producto, con qué está hecho,
// en qué estado está, qué resultado dio y cuánto pesa.
function Comentario({ producto, textos, tamano, rotulos }: ComentarioProps) {
  const filas = [
    { nombre: rotulos.hechoCon, valor: producto.stack.join(" · ") },
    { nombre: rotulos.estado, valor: textos.estado },
    { nombre: rotulos.resultado, valor: textoDeDato(textos.dato), marcador: "falta" in textos.dato },
    { nombre: rotulos.tamano, valor: tamano },
  ];

  return (
    <>
      <p className="text-[15px] leading-[1.4]">{textos.comentario}</p>
      <dl className="flex flex-col gap-2.5 border-t border-linea pt-3.5">
        {filas.map((fila) => (
          <div key={fila.nombre}>
            <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-apoyo">
              {fila.nombre}
            </dt>
            <dd
              className={
                fila.marcador
                  ? "font-mono text-[12px] leading-normal text-apoyo"
                  : "text-[14px] leading-[1.4]"
              }
            >
              {fila.valor}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

// Escenas 02 a 05. La escena queda fija entre las franjas mientras el scroll
// avanza por los pasos del recorrido: con cada paso cambia la pantalla. El
// comentario del director suma la capa técnica sin mover el resto.
export function EscenaProducto({ producto, etiqueta, textos, tamano, interfaz, rotulos, mencion }: Props) {
  const raiz = useRef<HTMLDivElement>(null);
  const idHoja = useId();
  const [comentario] = useComentario();
  const reducido = useMovimientoReducido();
  // -1 es la presentación, antes del primer paso: solo existe en pantallas
  // angostas, donde la descripción y los pasos comparten el mismo lugar.
  const [toma, setToma] = useState(-1);
  const [hojaAbierta, setHojaAbierta] = useState(false);
  // Si la escena está a la vista: fuera de ella los videos no corren.
  const [enPantalla, setEnPantalla] = useState(false);

  const direccion = producto.enVivo ? sitioDe(producto.enVivo) : undefined;
  const tomas: Toma[] = textos.pasos.map((paso, indice) => {
    const propia = producto.recorrido[indice] ?? null;
    return {
      titulo: paso.titulo,
      texto: paso.texto,
      captura: propia ?? producto.portada,
      alt: propia
        ? `${producto.nombre}: ${paso.titulo}. ${paso.texto}`
        : `${producto.nombre}: ${interfaz.paginaPublica}`,
      falta: !propia,
      nota: !propia && producto.portada ? interfaz.paginaPublica : undefined,
      direccion,
    };
  });
  if (mencion) {
    tomas.push({
      titulo: GOBIERNO_ABIERTO.nombre,
      texto: mencion.texto,
      captura: GOBIERNO_ABIERTO.captura,
      alt: `${GOBIERNO_ABIERTO.nombre}: ${mencion.texto}`,
      falta: false,
      direccion: sitioDe(GOBIERNO_ABIERTO.enVivo),
      etiqueta: mencion.etiqueta,
      pie: `${mencion.credito} · ${mencion.dato}`,
      enVivo: GOBIERNO_ABIERTO.enVivo,
    });
  }
  if (producto.cierre && textos.cierre) {
    tomas.push({
      titulo: textos.cierre,
      texto: "",
      captura: producto.cierre,
      alt: `${producto.nombre}: ${textos.cierre}`,
      falta: false,
      direccion,
      etiqueta: interfaz.cierre,
    });
  }
  const cantidad = tomas.length;
  const actual = Math.max(0, toma);

  useGSAP(
    () => {
      if (reducido) {
        // La versión quieta es más alta que la animada: las posiciones de
        // todas las escenas se vuelven a medir.
        ScrollTrigger.refresh();
        return;
      }
      const escena = raiz.current;
      const tramo = escena?.closest<HTMLElement>("[data-escena]");
      if (!escena || !tramo) return;

      const ancha = window.matchMedia("(min-width: 1024px)");

      ScrollTrigger.create({
        trigger: tramo,
        start: () => `top ${altoDeFranja()}px`,
        end: () => `bottom ${window.innerHeight - altoDeFranja()}px`,
        onUpdate: (self) => {
          const presentacion = ancha.matches ? 0 : 1;
          const paradas = cantidad + presentacion;
          setToma(Math.min(paradas - 1, Math.floor(self.progress * paradas)) - presentacion);
          escena.style.setProperty("--recorrido", self.progress.toFixed(3));
        },
      });

      ScrollTrigger.create({
        trigger: tramo,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => setEnPantalla(self.isActive),
      });

      // Mientras la escena sube a su lugar, la pantalla llega un poco después que el texto.
      gsap.fromTo(
        "[data-pantallas]",
        { y: 72 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: tramo,
            start: "top bottom",
            end: () => `top ${altoDeFranja()}px`,
            scrub: true,
          },
        },
      );
    },
    { scope: raiz, dependencies: [reducido, cantidad] },
  );

  const cabecera = (
    <>
      <Etiqueta>{etiqueta}</Etiqueta>
      <h2 className="font-cond text-[clamp(50px,min(7.4vw,13.5dvh),124px)] font-extrabold uppercase leading-[0.86]">
        {producto.nombre}
      </h2>
      <span className="h-[3px] w-12 bg-luz lg:w-16" aria-hidden="true" />
    </>
  );

  const enVivo = producto.enVivo ? (
    <Enlace href={producto.enVivo} className="inline-flex min-h-11 items-center text-[15px]">
      {interfaz.verEnVivo}
      <Flecha />
    </Enlace>
  ) : null;

  const detalleDe = (parada: Toma) => (
    <>
      {parada.falta ? (
        <p className="mt-1 font-mono text-[12px] leading-normal text-apoyo">[{interfaz.faltaCaptura}]</p>
      ) : null}
      {parada.pie ? (
        <p className="mt-1 font-mono text-[12px] leading-normal text-apoyo">{parada.pie}</p>
      ) : null}
    </>
  );

  // La mención no tiene escena propia: su título es el enlace al sitio en vivo.
  const tituloDe = (parada: Toma) =>
    parada.enVivo ? (
      <a
        href={parada.enVivo}
        target="_blank"
        rel="noreferrer"
        aria-label={`${parada.titulo}: ${interfaz.verEnVivo}`}
        className="underline decoration-luz decoration-1 underline-offset-[5px] transition-colors duration-200 hover:text-luz"
      >
        {parada.titulo}
        <Flecha />
      </a>
    ) : (
      parada.titulo
    );

  // Con movimiento reducido la escena se muestra quieta y completa: los pasos
  // van uno debajo del otro, cada uno con su pantalla.
  if (reducido) {
    return (
      <div ref={raiz} className="relative flex flex-col gap-9 py-9 lg:py-14">
        <div
          className="luz-de-escena pointer-events-none absolute inset-x-[calc(-1*var(--margen))] inset-y-0 -z-10"
          aria-hidden="true"
        />
        <header className="flex flex-col gap-3">
          {cabecera}
          <p className="max-w-[44ch] text-[17px] leading-[1.45] lg:text-[19px]">{textos.descripcion}</p>
        </header>
        <Subtitulo lineas={textos.subtitulo} className="self-start text-left" />
        <ol aria-label={interfaz.recorrido} className="flex flex-col gap-10">
          {tomas.map((parada, indice) => (
            <li
              key={parada.titulo}
              className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14"
            >
              <div className="grid grid-cols-[2rem_minmax(0,1fr)] content-start gap-x-2">
                <span className="font-mono text-[12px] leading-[26px] tracking-[0.06em] text-luz">
                  {dosCifras(indice + 1)}
                </span>
                <div>
                  {parada.etiqueta ? <Etiqueta>{parada.etiqueta}</Etiqueta> : null}
                  <h3 className="text-[19px] font-medium leading-snug">{tituloDe(parada)}</h3>
                  {parada.texto ? (
                    <p className="text-[15px] leading-[1.4] text-apoyo">{parada.texto}</p>
                  ) : null}
                  {detalleDe(parada)}
                </div>
              </div>
              <Pantalla
                captura={parada.captura}
                alt={parada.alt}
                direccion={parada.direccion}
                falta={interfaz.faltaCaptura}
                nota={parada.nota}
                modo="fluida"
              />
            </li>
          ))}
        </ol>
        {enVivo}
        {comentario ? (
          <aside aria-label={rotulos.titulo} className="flex max-w-[440px] flex-col gap-4">
            <Etiqueta>{rotulos.titulo}</Etiqueta>
            <Comentario producto={producto} textos={textos} tamano={tamano} rotulos={rotulos} />
          </aside>
        ) : null}
      </div>
    );
  }

  return (
    <div
      ref={raiz}
      className="relative flex min-h-0 flex-1 flex-col gap-2.5 py-3.5 lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:grid-rows-[auto_minmax(0,1fr)_auto] lg:gap-x-14 lg:gap-y-5 lg:py-9 lg:[@media(max-height:800px)]:gap-y-3 lg:[@media(max-height:800px)]:py-5"
    >
      <div
        className="luz-de-escena pointer-events-none absolute inset-x-[calc(-1*var(--margen))] inset-y-0 -z-10"
        aria-hidden="true"
      />

      <header className="flex flex-col gap-2 lg:col-start-1 lg:row-start-1 lg:gap-3.5 lg:[@media(max-height:800px)]:gap-2.5">
        {cabecera}
        <p className="hidden max-w-[40ch] text-[19px] leading-[1.45] lg:block lg:[@media(max-height:800px)]:text-[17px]">{textos.descripcion}</p>
      </header>

      <div
        data-pantallas
        className="relative min-h-0 flex-1 [container-type:size] lg:col-start-2 lg:row-span-2 lg:row-start-1"
      >
        <div
          data-achicada={comentario}
          className={`absolute inset-0 origin-left transition-[scale] duration-500 ${SUAVE} xl:data-[achicada=true]:scale-[0.66]`}
        >
          {tomas.map((parada, indice) => (
            <div
              key={parada.titulo}
              data-estado={indice === actual ? "actual" : indice < actual ? "pasada" : "siguiente"}
              aria-hidden={indice !== actual}
              className={`absolute inset-0 flex items-start justify-center transition-[opacity,translate,scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-[estado=pasada]:-translate-y-4 data-[estado=pasada]:scale-[0.985] data-[estado=pasada]:opacity-0 data-[estado=siguiente]:translate-y-4 data-[estado=siguiente]:scale-[0.985] data-[estado=siguiente]:opacity-0 lg:items-center ${
                parada.captura?.marco === "telefono"
                  ? "max-lg:overflow-hidden max-lg:[mask-image:linear-gradient(#000_72%,transparent)]"
                  : ""
              }`}
            >
              <Pantalla
                captura={parada.captura}
                alt={parada.alt}
                direccion={parada.direccion}
                falta={interfaz.faltaCaptura}
                nota={parada.nota}
                modo="ajustada"
                activa={enPantalla && indice === actual}
              />
            </div>
          ))}
        </div>

        <aside
          aria-label={rotulos.titulo}
          data-encendido={comentario}
          className={`absolute right-0 top-1/2 hidden w-[calc(34cqw-28px)] -translate-y-1/2 flex-col gap-4 transition-[opacity,translate,visibility] duration-500 ${SUAVE} data-[encendido=false]:invisible data-[encendido=false]:translate-x-3 data-[encendido=false]:opacity-0 xl:flex`}
        >
          <Recuadro
            rotulo={rotulos.titulo}
            className="aspect-[25/14] rounded-[10px] [@media(max-height:780px)]:hidden"
          />
          <Comentario producto={producto} textos={textos} tamano={tamano} rotulos={rotulos} />
        </aside>
      </div>

      <div className="flex flex-col gap-2.5 lg:col-start-1 lg:row-start-2 lg:gap-5 lg:pt-1 lg:[@media(max-height:800px)]:gap-3">
        <span className="block h-px bg-linea" aria-hidden="true">
          <span className="block h-px origin-left scale-x-[var(--recorrido,0)] bg-luz" />
        </span>
        <div className="grid">
          <p
            data-visible={toma === -1}
            className="col-start-1 row-start-1 text-[15px] leading-[1.4] transition-[opacity,translate,visibility] duration-300 ease-out data-[visible=false]:invisible data-[visible=false]:translate-y-1.5 data-[visible=false]:opacity-0 lg:hidden"
          >
            {textos.descripcion}
          </p>
          <ol
            aria-label={interfaz.recorrido}
            className="col-start-1 row-start-1 grid lg:flex lg:flex-col lg:gap-4 lg:[@media(max-height:800px)]:gap-2"
          >
            {tomas.map((parada, indice) => (
              <li
                key={parada.titulo}
                data-activo={indice === actual}
                data-visible={indice === toma}
                className="group col-start-1 row-start-1 grid grid-cols-[2rem_minmax(0,1fr)] content-start gap-x-2 transition-[opacity,translate,visibility] duration-300 ease-out max-lg:data-[visible=false]:invisible max-lg:data-[visible=false]:translate-y-1.5 max-lg:data-[visible=false]:opacity-0"
              >
                <span className="font-mono text-[12px] leading-[24px] tracking-[0.06em] text-apoyo transition-colors duration-300 group-data-[activo=true]:text-luz lg:leading-[26px]">
                  {dosCifras(indice + 1)}
                </span>
                <div>
                  {parada.etiqueta ? <Etiqueta>{parada.etiqueta}</Etiqueta> : null}
                  <h3 className="text-[17px] font-medium leading-snug text-apoyo transition-colors duration-300 group-data-[activo=true]:text-texto lg:text-[19px]">
                    {tituloDe(parada)}
                  </h3>
                  {parada.texto ? (
                    <p className="text-[15px] leading-[1.4] text-apoyo">{parada.texto}</p>
                  ) : null}
                  {detalleDe(parada)}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Subtitulo
        lineas={textos.subtitulo}
        className="max-lg:text-[19px]! lg:col-start-2 lg:row-start-3 lg:self-end [@media(max-height:600px)]:max-lg:hidden"
      />

      <div className="flex min-h-11 items-center justify-between gap-4 lg:col-start-1 lg:row-start-3 lg:self-end">
        {enVivo ?? <span />}
        {comentario ? (
          <button
            type="button"
            aria-expanded={hojaAbierta}
            aria-controls={idHoja}
            onClick={() => setHojaAbierta(true)}
            className="inline-flex min-h-11 items-center gap-2.5 rounded-lg border border-linea bg-barra/70 py-1 pl-1.5 pr-3 text-[14px] font-medium transition-colors duration-200 hover:border-texto/30 xl:hidden"
          >
            <Recuadro className="size-8 rounded-md" />
            {rotulos.titulo}
            <span className="font-mono text-[11px] font-normal uppercase tracking-[0.06em] text-apoyo">
              {interfaz.abrir}
            </span>
          </button>
        ) : null}
      </div>

      {/* En pantallas angostas el comentario es una hoja que sube al tocar su barra. */}
      <div
        id={idHoja}
        role="region"
        aria-label={rotulos.titulo}
        inert={!(comentario && hojaAbierta)}
        data-abierta={comentario && hojaAbierta}
        data-lenis-prevent
        className={`absolute inset-x-[calc(-1*var(--margen))] bottom-0 z-20 flex max-h-full flex-col gap-4 overflow-y-auto border-t border-linea bg-barra px-[var(--margen)] pb-5 pt-2 transition-[translate,visibility] duration-500 ${SUAVE} data-[abierta=false]:invisible data-[abierta=false]:translate-y-full xl:hidden`}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2.5 text-[15px] font-medium">
            <Recuadro className="size-8 rounded-md" />
            {rotulos.titulo}
          </span>
          <button
            type="button"
            onClick={() => setHojaAbierta(false)}
            className="inline-flex min-h-11 items-center font-mono text-[12px] uppercase tracking-[0.06em] text-texto"
          >
            {interfaz.cerrar}
          </button>
        </div>
        <Comentario producto={producto} textos={textos} tamano={tamano} rotulos={rotulos} />
      </div>
    </div>
  );
}
