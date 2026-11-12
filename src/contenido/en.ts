import type { Contenido } from "./tipos";

export const en: Contenido = {
  meta: {
    titulo: "Santiago Pruyas — Product Engineer",
    descripcion:
      "Product Engineer based in Corrientes, Argentina. I design and build software products end to end.",
  },
  interfaz: {
    saltarAlContenido: "Skip to content",
    navegacion: {
      apertura: "Opening",
      munioficios: "Work",
      metodo: "Method",
      creditos: "Credits",
    },
    etiquetaNavegacion: "Scenes",
    subtitulos: "Subtitles",
    cambiarA: { es: "View in Spanish", en: "View in English" },
    sonido: "Sound",
    comentario: "Commentary",
    menu: "Menu",
    cerrar: "Close",
    lineaDeTiempo: "Timeline",
    escenaAbreviada: "Sc.",
    verEnVivo: "See it live",
    leerElCaso: "Read the case",
    recorrido: "Walkthrough",
    abrir: "Open",
    faltaCaptura: "This screen hasn't been captured yet",
    paginaPublica: "Public page",
    cierre: "Closing shot",
  },
  escenas: {
    apertura: "Opening",
    munioficios: "MuniOficios",
    fondare: "Fondare",
    pymeton: "Pymetón",
    peeqsales: "PeeqSales",
    "en-rodaje": "Now filming",
    metodo: "Method",
    "detras-de-escena": "Behind the scenes",
    creditos: "Credits",
  },
  apertura: {
    nombre: "Santiago Isaac",
    rol: "Product Engineer",
    titulo: "Pruyas",
    subtitulo: ["I put myself in your shoes.", "That's how an idea becomes a product."],
    ficha: ["Sc. 01 · Int. night", "Corrientes, Argentina"],
    saltar: "Skip to the work",
  },
  productos: {
    munioficios: {
      descripcion:
        "A public platform that connects Corrientes residents with local tradespeople.",
      credito: "With the Tembiapó team",
      estado: "Live",
      subtitulo: ["A neighbor needs an electrician today, not paperwork."],
      pasos: [
        {
          titulo: "They look for a trade",
          texto: "They pick a category and see the registered tradespeople.",
        },
        {
          titulo: "They compare quotes",
          texto: "They post what they need and get two offers, side by side.",
        },
        {
          titulo: "They trust their pick",
          texto: "The tradesperson's credential, with its QR code.",
        },
      ],
      comentario:
        "My product within Tembiapó, built for the Employment Office of the Municipality of Corrientes.",
      dato: { valor: "16 categories, 23 trades and more than 100 tradespeople listed" },
    },
    fondare: {
      descripcion:
        "Management software for construction companies: budgets, purchasing and the real progress of every build.",
      credito: "Built in a team",
      estado: "In testing",
      subtitulo: [
        "A build drifts off budget little by little.",
        "The dashboard flags it before it's too late.",
      ],
      pasos: [
        { titulo: "The budget", texto: "The build broken down by trade and resource." },
        { titulo: "The purchase", texto: "A purchase order approved against that budget." },
        { titulo: "The warning", texto: "The dashboard flags a cost overrun in time." },
      ],
      comentario: "One system for several construction companies, built in a team.",
      dato: { falta: "companies or builds in the trial" },
    },
    pymeton: {
      descripcion:
        "Ticketing for small-business events, with capacity control and check-in at the door.",
      credito: "Lead developer",
      estado: "Live",
      subtitulo: ["Nobody has time at the door.", "The scanner checks a ticket with one hand."],
      pasos: [
        { titulo: "The event", texto: "The page with the countdown and the checkout." },
        { titulo: "The ticket", texto: "It arrives with its QR code." },
        { titulo: "The door", texto: "The scanner checks it from a phone." },
      ],
      comentario: "The goal: no overselling and no duplicate tickets.",
      dato: { falta: "tickets sold or attendees" },
      cierre: "The badge hangs from its lanyard and swings like a real one.",
    },
    peeqsales: {
      descripcion: "Sales and logistics for a food distributor.",
      credito: "Solo, end to end",
      estado: "Live",
      subtitulo: ["One order, three people, three screens."],
      pasos: [
        { titulo: "The sales rep", texto: "Takes the order out on the street, from a phone." },
        { titulo: "The back office", texto: "Sees it come in and invoices it." },
        { titulo: "The driver", texto: "Delivers it and confirms with a photo." },
      ],
      comentario:
        "Orders, invoicing, returns, zone maps, notifications and an AI assistant in the admin panel.",
      dato: { falta: "orders processed or active sales reps" },
    },
  },
  comentario: {
    titulo: "Director's commentary",
    hechoCon: "Built with",
    estado: "Status",
    resultado: "Result",
    tamano: "Size",
    pantallas: "screens",
    enConstruccionDesde: "in development since",
  },
  mencion: {
    etiqueta: "Also at the Municipality",
    credito: "Lead developer",
    texto: "The city's public data, in dashboards any resident can read.",
    dato: "More than 71 datasets and 9 interactive dashboards",
  },
  enRodaje: {
    subtitulo: ["Three products still being filmed."],
    estado: "In development",
    tarjetas: [
      { nombre: "Peeq Up", texto: { falta: "one line about Peeq Up" } },
      { nombre: "El Bagual", texto: { valor: "From the order on a tablet to the invoice." } },
      {
        nombre: "YA! Chipacitos",
        texto: { valor: "Orders between stores, the factory and the warehouse." },
      },
    ],
  },
  metodo: {
    subtitulo: ["I listen. I shape it. I build it. I stay with it."],
    momentos: [
      { titulo: "I listen", texto: "First I talk to the people who will use it." },
      { titulo: "I shape it", texto: "I define the scope and the data model." },
      { titulo: "I build it", texto: "From the interface to deployment." },
      { titulo: "I stay with it", texto: "Support is part of the product too." },
    ],
  },
  detras: {
    subtitulo: ["This one is really me."],
    recorrido: [
      { lugar: "Freelance", texto: "Custom systems for local shops." },
      {
        lugar: "Municipality of Corrientes",
        texto: "Today, Director of Innovation and Technology.",
      },
      { lugar: "4peeq", texto: "Product Engineer." },
    ],
    estudios: "BSc in Information Systems, UNNE — in progress",
    desde: "Based in Corrientes, Argentina",
  },
  creditos: {
    subtitulo: ["Written, designed and built by Santiago Isaac Pruyas."],
    reparto: "Cast",
    lugares: [
      { lugar: "4peeq", rol: "Product Engineer" },
      { lugar: "Municipality of Corrientes", rol: "Director of Innovation and Technology" },
    ],
    escribime: "Write to me",
    descargarCv: "Download CV",
  },
  guion: {
    etiqueta: "Internal reference",
    titulo: "Script",
    bajada: "Every line on the site, scene by scene, in the chosen language.",
    recorrido: "Walkthrough",
    dato: "Figure",
    sinSitio: "Private system, no public site",
  },
};
