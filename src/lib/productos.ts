import type { Luz } from "./escenas";

// Una pantalla real de un producto, dentro de su marco. Los archivos se
// preparan con scripts/capturas.mjs.
export type Captura = {
  src: string;
  ancho: number;
  alto: number;
  marco: "navegador" | "telefono";
  // Qué parte queda a la vista cuando el marco la recorta en una pantalla angosta.
  foco?: string;
  // Si la pantalla se mueve: el video, del que la imagen es el cuadro quieto.
  video?: string;
};

const captura = (
  nombre: string,
  ancho: number,
  alto: number,
  marco: Captura["marco"] = "navegador",
  foco?: string,
): Captura => ({ src: `/capturas/${nombre}.jpg`, ancho, alto, marco, foco });

// Datos de cada producto que no dependen del idioma. El stack sale del
// package.json de cada repositorio; las pantallas y la fecha, de su historial.
// El recorrido tiene una captura por paso, en el orden de los pasos del
// contenido; null es un paso que todavía no se capturó. La portada es lo que
// se muestra mientras tanto, si hay algo real para mostrar. El cierre es la
// última parada de la escena, para una pieza que merece su momento.
export const PRODUCTOS = [
  {
    id: "munioficios",
    nombre: "MuniOficios",
    luz: "verde",
    stack: ["Next.js", "NestJS", "TypeScript", "Leaflet"],
    pantallas: 44,
    desde: "2026-03",
    enVivo: "https://lamunioficios.ciudaddecorrientes.gov.ar",
    recorrido: [
      captura("munioficios-oficios", 1600, 830, "navegador", "22% 50%"),
      captura("munioficios-presupuestos", 1600, 830),
      captura("munioficios-credencial", 1600, 830),
    ],
    portada: null,
    cierre: null,
  },
  {
    id: "fondare",
    nombre: "Fondare",
    luz: "dorado",
    stack: ["Next.js", "Supabase", "Amazon S3"],
    pantallas: 64,
    desde: "2026-03",
    enVivo: "https://fondare.app",
    // La aplicación todavía no se capturó: va la página pública.
    recorrido: [null, null, null],
    portada: captura("fondare-publica", 1600, 1000, "navegador", "78% 50%"),
    cierre: null,
  },
  {
    id: "pymeton",
    nombre: "Pymetón",
    luz: "violeta",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Mercado Pago"],
    pantallas: 54,
    desde: "2026-07",
    enVivo: "https://eventos.4peeq.com",
    recorrido: [captura("pymeton-evento", 1600, 1000), null, null],
    portada: null,
    // La credencial 3D que cuelga en el inicio, grabada del sitio en vivo.
    cierre: {
      ...captura("pymeton-credencial", 1280, 660, "navegador", "72% 50%"),
      video: "/capturas/pymeton-credencial.mp4",
    },
  },
  {
    id: "peeqsales",
    nombre: "PeeqSales",
    luz: "violeta",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Leaflet"],
    pantallas: 39,
    desde: "2026-06",
    // Es un sistema privado: no tiene sitio público.
    enVivo: null,
    recorrido: [
      captura("peeqsales-vendedor", 390, 546, "telefono"),
      captura("peeqsales-administracion", 1440, 820, "navegador", "30% 50%"),
      captura("peeqsales-repartidor", 390, 768, "telefono"),
    ],
    portada: null,
    cierre: null,
  },
] as const satisfies readonly {
  id: string;
  nombre: string;
  luz: Luz;
  stack: readonly string[];
  pantallas: number;
  desde: string;
  enVivo: string | null;
  recorrido: readonly (Captura | null)[];
  portada: Captura | null;
  cierre: Captura | null;
}[];

export type Producto = (typeof PRODUCTOS)[number];
export type IdProducto = Producto["id"];

export const GOBIERNO_ABIERTO = {
  nombre: "Portal de Gobierno Abierto",
  enVivo: "https://gobiernoabierto.ciudaddecorrientes.gov.ar",
  captura: captura("gobierno-abierto-tableros", 1600, 1000),
} as const;

export const CONTACTO = {
  mail: "santi.pruyas@gmail.com",
  github: "https://github.com/SantiagoPruyas",
  linkedin: "https://www.linkedin.com/in/santiagoisaacpruyas/",
} as const;
