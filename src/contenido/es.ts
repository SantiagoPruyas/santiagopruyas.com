import type { Contenido } from "./tipos";

export const es: Contenido = {
  meta: {
    titulo: "Santiago Pruyas — Product Engineer",
    descripcion:
      "Product Engineer en Corrientes, Argentina. Diseño y construyo productos de software de punta a punta.",
  },
  interfaz: {
    saltarAlContenido: "Saltar al contenido",
    navegacion: {
      apertura: "Apertura",
      munioficios: "Trabajo",
      metodo: "Método",
      creditos: "Créditos",
    },
    etiquetaNavegacion: "Escenas",
    subtitulos: "Subtítulos",
    cambiarA: { es: "Ver en español", en: "Ver en inglés" },
    sonido: "Sonido",
    comentario: "Comentario",
    menu: "Menú",
    cerrar: "Cerrar",
    lineaDeTiempo: "Línea de tiempo",
    escenaAbreviada: "Esc.",
    verEnVivo: "Ver en vivo",
    leerElCaso: "Leer el caso",
    recorrido: "Recorrido",
    abrir: "Abrir",
    faltaCaptura: "Falta capturar esta pantalla",
    paginaPublica: "Página pública",
  },
  escenas: {
    apertura: "Apertura",
    munioficios: "MuniOficios",
    fondare: "Fondare",
    pymeton: "Pymetón",
    peeqsales: "PeeqSales",
    "en-rodaje": "En rodaje",
    metodo: "Método",
    "detras-de-escena": "Detrás de escena",
    creditos: "Créditos",
  },
  apertura: {
    nombre: "Santiago Isaac",
    rol: "Product Engineer",
    titulo: "Pruyas",
    subtitulo: ["Me pongo en tu lugar.", "Así una idea se vuelve un producto."],
    ficha: ["Esc. 01 · Int. noche", "Corrientes, Argentina"],
    saltar: "Saltar a los proyectos",
  },
  productos: {
    munioficios: {
      descripcion:
        "Plataforma pública que conecta a vecinos de Corrientes con prestadores de oficios.",
      credito: "Con el equipo de Tembiapó",
      estado: "En producción",
      subtitulo: ["Un vecino necesita un electricista hoy, no un trámite."],
      pasos: [
        {
          titulo: "Busca un oficio",
          texto: "Elige la categoría y ve los prestadores registrados.",
        },
        {
          titulo: "Compara presupuestos",
          texto: "Publica lo que necesita y recibe dos ofertas, una al lado de la otra.",
        },
        {
          titulo: "Confía en quien elige",
          texto: "La credencial del prestador, con su código QR.",
        },
      ],
      comentario:
        "Mi producto dentro de Tembiapó, para la Oficina de Empleo de la Municipalidad de Corrientes.",
      dato: { valor: "16 categorías, 23 oficios y más de 100 prestadores publicados" },
    },
    fondare: {
      descripcion:
        "Software de gestión para constructoras: presupuestos, compras y avance real de cada obra.",
      credito: "En equipo",
      estado: "En pruebas",
      subtitulo: ["Una obra se desvía de a poco.", "El panel avisa antes de que sea tarde."],
      pasos: [
        { titulo: "El presupuesto", texto: "La obra armada por rubros y recursos." },
        { titulo: "La compra", texto: "Una orden de compra aprobada contra ese presupuesto." },
        { titulo: "El aviso", texto: "El panel marca un desvío de costos a tiempo." },
      ],
      comentario: "Un mismo sistema para varias constructoras, hecho en equipo.",
      dato: { falta: "empresas u obras en la prueba" },
    },
    pymeton: {
      descripcion:
        "Venta de entradas para eventos de pymes, con control de aforo y validación en la puerta.",
      credito: "Desarrollo principal",
      estado: "En producción",
      subtitulo: [
        "En la puerta nadie tiene tiempo.",
        "El escáner valida la entrada con una sola mano.",
      ],
      pasos: [
        { titulo: "El evento", texto: "La página con la cuenta regresiva y la compra." },
        { titulo: "La entrada", texto: "Llega con su código QR." },
        { titulo: "La puerta", texto: "El escáner la valida desde el celular." },
      ],
      comentario: "El objetivo: cero sobreventa de aforo y cero entradas duplicadas.",
      dato: { falta: "entradas vendidas o asistentes" },
      cierre: "La credencial cuelga de su cinta y se mueve como una de verdad.",
    },
    peeqsales: {
      descripcion: "Ventas y logística para una distribuidora de alimentos.",
      credito: "Solo, de punta a punta",
      estado: "En producción",
      subtitulo: ["Un pedido, tres personas, tres pantallas."],
      pasos: [
        { titulo: "El vendedor", texto: "Carga el pedido en la calle, desde el celular." },
        { titulo: "La administración", texto: "Lo ve entrar y lo factura." },
        { titulo: "El repartidor", texto: "Lo entrega y lo confirma con una foto." },
      ],
      comentario:
        "Pedidos, facturación, devoluciones, mapas de zonas, notificaciones y un asistente de IA en el panel.",
      dato: { falta: "pedidos procesados o vendedores activos" },
    },
  },
  comentario: {
    titulo: "Comentario del director",
    hechoCon: "Hecho con",
    estado: "Estado",
    resultado: "Resultado",
    tamano: "Tamaño",
    pantallas: "pantallas",
    enConstruccionDesde: "en construcción desde",
  },
  mencion: {
    etiqueta: "También en la Municipalidad",
    credito: "Desarrollo principal",
    texto: "Los datos públicos de la ciudad, en tableros que cualquier vecino puede leer.",
    dato: "Más de 71 conjuntos de datos y 9 tableros interactivos",
  },
  enRodaje: {
    subtitulo: ["Tres productos que todavía se están filmando."],
    tarjetas: [
      { nombre: "Peeq Up", texto: { falta: "una línea sobre Peeq Up" } },
      { nombre: "El Bagual", texto: { valor: "De la comanda en la tablet a la factura." } },
      {
        nombre: "YA! Chipacitos",
        texto: { valor: "Pedidos entre locales, fábrica y depósito." },
      },
    ],
  },
  metodo: {
    subtitulo: ["Escucho. Le doy forma. Lo construyo. Lo acompaño."],
    momentos: [
      { titulo: "Escucho", texto: "Primero hablo con quien lo va a usar." },
      { titulo: "Le doy forma", texto: "Defino el alcance y el modelo de datos." },
      { titulo: "Lo construyo", texto: "De la interfaz al despliegue." },
      { titulo: "Lo acompaño", texto: "El soporte también es parte del producto." },
    ],
  },
  detras: {
    subtitulo: ["Acá sí soy yo."],
    recorrido: [
      { lugar: "Freelance", texto: "Sistemas a medida para comercios." },
      {
        lugar: "Municipalidad de Corrientes",
        texto: "Hoy, Director de Innovación y Tecnología.",
      },
      { lugar: "4peeq", texto: "Product Engineer." },
    ],
    estudios: "Licenciatura en Sistemas de Información, UNNE — en curso",
    desde: "Desde Corrientes, Argentina",
  },
  creditos: {
    subtitulo: ["Escrito, diseñado y programado por Santiago Isaac Pruyas."],
    reparto: "Reparto",
    lugares: [
      { lugar: "4peeq", rol: "Product Engineer" },
      { lugar: "Municipalidad de Corrientes", rol: "Director de Innovación y Tecnología" },
    ],
    escribime: "Escribime",
    descargarCv: "Descargar CV",
  },
  guion: {
    etiqueta: "Referencia interna",
    titulo: "Guion",
    bajada: "Todos los textos del sitio, escena por escena, en el idioma elegido.",
    recorrido: "Recorrido",
    dato: "Dato",
    cierre: "Cierre",
    sinSitio: "Sistema privado, sin sitio público",
  },
};
