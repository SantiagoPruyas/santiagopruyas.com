import type { Luz } from "./escenas";

// Datos de cada producto que no dependen del idioma. El stack sale del
// package.json de cada repositorio; las pantallas y la fecha, de su historial.
export const PRODUCTOS = [
  {
    id: "munioficios",
    nombre: "MuniOficios",
    luz: "verde",
    stack: ["Next.js", "NestJS", "TypeScript", "Leaflet"],
    pantallas: 44,
    desde: "2026-03",
    enVivo: "https://lamunioficios.ciudaddecorrientes.gov.ar",
  },
  {
    id: "fondare",
    nombre: "Fondare",
    luz: "dorado",
    stack: ["Next.js", "Supabase", "Amazon S3"],
    pantallas: 64,
    desde: "2026-03",
    enVivo: "https://fondare.app",
  },
  {
    id: "pymeton",
    nombre: "Pymetón",
    luz: "violeta",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Mercado Pago"],
    pantallas: 54,
    desde: "2026-07",
    enVivo: "https://eventos.4peeq.com",
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
  },
] as const satisfies readonly {
  id: string;
  nombre: string;
  luz: Luz;
  stack: readonly string[];
  pantallas: number;
  desde: string;
  enVivo: string | null;
}[];

export type Producto = (typeof PRODUCTOS)[number];
export type IdProducto = Producto["id"];

export const GOBIERNO_ABIERTO = {
  nombre: "Portal de Gobierno Abierto",
  enVivo: "https://gobiernoabierto.ciudaddecorrientes.gov.ar",
} as const;

export const CONTACTO = {
  mail: "santi.pruyas@gmail.com",
  github: "https://github.com/SantiagoPruyas",
  linkedin: "https://www.linkedin.com/in/santiagoisaacpruyas/",
} as const;
