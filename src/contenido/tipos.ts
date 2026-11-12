import type { IdEscena, IdNavegacion } from "@/lib/escenas";
import type { IdProducto } from "@/lib/productos";

export type Idioma = "es" | "en";

// Un dato real, o lo que falta conseguir. Lo que falta se muestra como
// marcador entre corchetes: nunca se completa con una cifra supuesta.
export type Dato = { valor: string } | { falta: string };

export type Paso = { titulo: string; texto: string };

export type TextoProducto = {
  descripcion: string;
  credito: string;
  estado: string;
  // Cada elemento es una línea del subtítulo.
  subtitulo: string[];
  // El recorrido de la escena: dos o tres pasos.
  pasos: Paso[];
  // Lo que suma el comentario del director.
  comentario: string;
  dato: Dato;
  cierre?: string;
};

export type Contenido = {
  meta: { titulo: string; descripcion: string };
  interfaz: {
    saltarAlContenido: string;
    navegacion: Record<IdNavegacion, string>;
    etiquetaNavegacion: string;
    subtitulos: string;
    cambiarA: Record<Idioma, string>;
    sonido: string;
    comentario: string;
    menu: string;
    cerrar: string;
    lineaDeTiempo: string;
    escenaAbreviada: string;
    verEnVivo: string;
    leerElCaso: string;
  };
  escenas: Record<IdEscena, string>;
  apertura: {
    nombre: string;
    rol: string;
    titulo: string;
    subtitulo: string[];
    ficha: string[];
    saltar: string;
  };
  productos: Record<IdProducto, TextoProducto>;
  // Gobierno Abierto no tiene escena: va como mención dentro de MuniOficios.
  mencion: { etiqueta: string; credito: string; texto: string; dato: string };
  enRodaje: { subtitulo: string[]; tarjetas: { nombre: string; texto: Dato }[] };
  metodo: { subtitulo: string[]; momentos: Paso[] };
  detras: {
    subtitulo: string[];
    recorrido: { lugar: string; texto: string }[];
    estudios: string;
    desde: string;
  };
  creditos: {
    subtitulo: string[];
    reparto: string;
    lugares: { lugar: string; rol: string }[];
    escribime: string;
    descargarCv: string;
  };
  guion: {
    etiqueta: string;
    titulo: string;
    bajada: string;
    recorrido: string;
    comentario: string;
    dato: string;
    cierre: string;
    hechoCon: string;
    pantallas: string;
    enConstruccionDesde: string;
    sinSitio: string;
  };
};
