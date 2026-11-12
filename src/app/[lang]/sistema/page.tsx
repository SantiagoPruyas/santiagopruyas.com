import type { Metadata } from "next";
import Image from "next/image";
import { Marco } from "@/components/marco/Marco";
import { TiraDeTiempo } from "@/components/marco/TiraDeTiempo";
import { Boton } from "@/components/ui/Boton";
import { Enlace } from "@/components/ui/Enlace";
import { Etiqueta } from "@/components/ui/Etiqueta";
import { MarcoCaptura } from "@/components/ui/MarcoCaptura";
import type { Luz } from "@/lib/escenas";
import { idiomaDe } from "@/lib/idioma";

export const metadata: Metadata = {
  title: "Sistema visual",
  robots: { index: false, follow: false },
};

const LUCES: { luz: Luz; lugar: string; uso: string; valor: string }[] = [
  { luz: "naranja", lugar: "Santiago", uso: "Apertura, método y créditos", valor: "#F2661F" },
  { luz: "verde", lugar: "Municipalidad", uso: "MuniOficios y Gobierno Abierto", valor: "#41B45E" },
  { luz: "dorado", lugar: "Fondare", uso: "Fondare", valor: "#EAC081" },
  { luz: "violeta", lugar: "4peeq", uso: "Pymetón, PeeqSales y En rodaje", valor: "#A996F2" },
];

// Página de referencia para desarrollo: muestra los tokens y las piezas base. No se indexa
// ni se traduce: sus textos describen el sistema, no son contenido del sitio.
export default async function Sistema({ params }: PageProps<"/[lang]/sistema">) {
  const idioma = await idiomaDe(params);

  return (
    <Marco idioma={idioma}>
      <div className="mx-auto flex max-w-[1400px] flex-col gap-20 px-[var(--margen)] py-12 md:gap-28 md:py-20">
        <header className="flex flex-col gap-4">
          <Etiqueta>Referencia interna</Etiqueta>
          <h1 className="font-cond text-[72px] font-extrabold uppercase leading-[0.9] md:text-[132px]">
            Sistema visual
          </h1>
        </header>

        <section className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <h2 className="font-cond text-[40px] font-bold uppercase leading-none">Tipografía</h2>
          <div className="flex min-w-0 flex-col gap-10">
            <div className="flex flex-col gap-2">
              <Etiqueta>Títulos · Sofia Sans Extra Condensed</Etiqueta>
              <p className="font-cond text-[96px] font-extrabold uppercase leading-[0.86] md:text-[168px]">
                Pruyas
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Etiqueta>Subtítulos y texto · Sofia Sans</Etiqueta>
              <p className="text-[22px] font-medium leading-tight md:text-[30px]">
                Me pongo en tu lugar. Así una idea se vuelve un producto.
              </p>
              <p className="max-w-[60ch] text-[17px] leading-relaxed text-apoyo">
                Un sitio de marca personal que se recorre como una película: cada producto es una
                escena y el scroll es la línea de tiempo.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Etiqueta>Datos · JetBrains Mono</Etiqueta>
              <Etiqueta className="text-texto">Esc. 04 · 4peeq · Desarrollo principal</Etiqueta>
            </div>
          </div>
        </section>

        <section className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <div className="flex flex-col gap-4">
            <h2 className="font-cond text-[40px] font-bold uppercase leading-none">Luz</h2>
            <p className="max-w-[36ch] text-[17px] leading-relaxed text-apoyo">
              El único acento. Cada escena lo redefine según dónde se hizo el producto, y todo lo
              que tiene adentro cambia con él.
            </p>
          </div>
          <div className="grid min-w-0 gap-px bg-linea sm:grid-cols-2">
            {LUCES.map(({ luz, lugar, uso, valor }) => (
              <div key={luz} data-luz={luz} className="flex min-w-0 flex-col gap-5 bg-fondo p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-cond text-[34px] font-bold uppercase leading-none text-luz">
                    {lugar}
                  </h3>
                  <Etiqueta>{valor}</Etiqueta>
                </div>
                <p className="text-[15px] text-apoyo">{uso}</p>
                <TiraDeTiempo marcas={[0, 0.25, 0.5, 0.75]} progreso={0.4} />
                <div className="flex flex-wrap items-center gap-4">
                  <Boton variante="lleno" href="#contenido">
                    Ver en vivo
                  </Boton>
                  <Boton href="#contenido">Leer el caso</Boton>
                </div>
                <Enlace href="mailto:santi.pruyas@gmail.com">santi.pruyas@gmail.com</Enlace>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <div className="flex flex-col gap-4">
            <h2 className="font-cond text-[40px] font-bold uppercase leading-none">
              Marco de captura
            </h2>
            <p className="max-w-[36ch] text-[17px] leading-relaxed text-apoyo">
              Las pantallas de los productos van adentro de un marco de navegador o de teléfono, a
              tamaño medio.
            </p>
          </div>
          <div className="grid min-w-0 items-start gap-8 sm:grid-cols-[2fr_1fr]">
            <MarcoCaptura direccion="eventos.4peeq.com">
              <Image
                src="/capturas/pymeton-inicio.jpg"
                alt="Inicio de Pymetón con la cuenta regresiva del evento"
                width={1100}
                height={687}
                sizes="(min-width: 768px) 45vw, 100vw"
              />
            </MarcoCaptura>
            <MarcoCaptura variante="telefono" className="mx-auto w-full max-w-[240px]">
              <Image
                src="/capturas/munioficios-celular.jpg"
                alt="Inicio de MuniOficios en el celular"
                width={351}
                height={760}
                sizes="240px"
              />
            </MarcoCaptura>
          </div>
        </section>
      </div>
    </Marco>
  );
}
