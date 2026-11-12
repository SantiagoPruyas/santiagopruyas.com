@AGENTS.md

<!-- Reglas generales de trabajo: ~/.claude/CLAUDE.md. Acá solo lo propio de este sitio. -->

# Santiago Pruyas — portfolio personal

## Qué es

- Sitio de marca personal de Santiago Isaac Pruyas, Product Engineer (Corrientes, Argentina). No busca trabajo ni clientes.
- Concepto: el sitio se recorre como una película. Nueve escenas en una página, el scroll es la línea de tiempo, y un personaje 3D de Santiago es el protagonista.
- Acción principal: escribir por mail a `santi.pruyas@gmail.com`. No hay formulario.
- Estado: en desarrollo, sin publicar. Dominio: `santiagopruyas.com` (el subdominio `pesito.` ya está en uso y no se toca).
- Planificación: epic de Traycer con el brief, la estructura de escenas, el material de los productos y los tickets.

## Stack y comandos

- Next.js 16 (App Router, `cacheComponents`), React 19, TypeScript, Tailwind v4, GSAP con ScrollTrigger y Lenis. Hosting previsto: Vercel.
- Idiomas: español en la raíz e inglés en `/en`. Por dentro las dos son `src/app/[lang]`: `src/proxy.ts` sirve desde `/es` todo lo que llega sin idioma y `next.config.ts` redirige `/es` a la raíz. No volver a los `rewrites` de `next.config.ts`: en Vercel no cubrían la navegación interna hacia `/`.
- Contenido: todos los textos visibles viven en `src/contenido/` (`es.ts` y `en.ts`, con el mismo tipo). Los datos que no dependen del idioma, en `src/lib/` (`escenas.ts`, `productos.ts`). Ningún componente lleva texto escrito adentro, salvo `/sistema`.
- Un dato que falta se declara como `{ falta: "..." }` y se muestra entre corchetes con `textoDeDato`.

```bash
npm run dev          # local en http://localhost:3000
npm run build        # build de producción
npm run lint         # lint
npm run typecheck    # genera los tipos de las rutas y revisa tipos
```

## Motor de escenas

- `src/components/marco/MarcoVivo.tsx` es la parte viva del marco: scroll suave con Lenis, qué escena está en pantalla, la luz de las franjas, el avance de la línea de tiempo y el código de tiempo. El avance y el código se escriben directo en el DOM (`--avance`, `[data-codigo]`); React solo se entera cuando cambia la escena.
- `Escena` es un tramo alto con un cuadro `position: sticky` adentro. No se usa el `pin` de ScrollTrigger. La duración de cada escena, en pantallas, está en `src/lib/escenas.ts`.
- Cada escena arma su animación con `useGSAP` y un ScrollTrigger con `scrub` sobre su tramo (`closest("[data-escena]")`), con `start` y `end` calculados con `altoDeFranja()`. Ver `src/components/escenas/Apertura.tsx`.
- Con `prefers-reduced-motion` no hay Lenis ni animaciones de scroll, los tramos se achican al alto del contenido y no se bajan los cuadros del personaje.
- `usePelicula()` da la escena actual e `irA(id)`, que lleva el scroll a una escena.
- `overflow-anchor: none` en `html` y `body` es necesario: con `cacheComponents` la página anterior sigue en el DOM mientras entra la nueva y el anclaje de scroll del navegador movía la posición al cambiar de idioma.
- `Secuencia` dibuja cuadros en un canvas; la imagen fija es el último cuadro y los demás se bajan después de la carga. Los cuadros se convierten con `node scripts/cuadros.mjs`.
- Las escenas 02 a 05 usan `EscenaProducto`: el scroll avanza por las paradas del recorrido (los pasos del producto y, al final de MuniOficios, la mención de Gobierno Abierto) y con cada una cambia la pantalla. La parada actual es estado de React y el cambio lo hacen transiciones de CSS, no un `scrub`. En pantallas angostas hay una parada más al principio, la presentación, porque la descripción y los pasos comparten el mismo lugar. Con movimiento reducido se muestra otra versión, quieta, con los pasos uno debajo del otro.
- Las capturas de cada paso están en `src/lib/productos.ts` (`recorrido`, una por paso; `null` si falta) y se preparan con `node scripts/capturas.mjs <carpeta-de-originales>`, que solo recorta y achica. Un paso sin captura muestra la `portada` del producto si la tiene, y si no un marcador; en los dos casos el paso lleva el marcador entre corchetes.
- `Pantalla` pone la captura en su marco. En una escena el marco entra entero en su lugar con unidades de contenedor (`.pantalla-navegador` y `.pantalla-telefono` en `globals.css`).
- Comentario del director: `useComentario()` (`src/components/marco/comentario.ts`) guarda el interruptor en `localStorage`, así sigue igual al cambiar de escena y de idioma. Desde 1280 de ancho es una columna a la derecha de la pantalla, que se achica con `scale` para hacerle lugar; por debajo es una barra que abre una hoja. Nada cambia de tamaño en el flujo: solo `scale`, `translate` y `opacity`.
- Las escenas 06 a 09 usan `EscenaBreve` hasta tener su versión definitiva.

## Marca y dirección visual

- Tokens en `src/app/globals.css`. Fondo casi negro `#0C0B0A`, franjas `#050404`, texto `#ECE6DC`, apoyo `#A69D90`.
- Un solo acento, `--luz`, que cada escena redefine con `data-luz`: naranja `#F2661F` (escenas propias), verde `#41B45E` (Municipalidad), dorado `#EAC081` (Fondare), violeta `#A996F2` (4peeq). No hay otros colores: la paleta por defecto de Tailwind está desactivada.
- Tipografías con `next/font`: Sofia Sans Extra Condensed (títulos, `font-cond`), Sofia Sans (texto), JetBrains Mono (datos).
- Marco de cine en `src/components/marco/`: la interfaz vive en las franjas fijas de arriba y abajo; la escena queda limpia en el medio.
- Tono visual: premium y sobrio. Franjas, subtítulos y créditos; sin claquetas ni efectos de película vieja.
- Lo que no va: violetas o azules de relleno, resplandores de color, serif itálica en titulares, emojis, barras de color al costado de las tarjetas.
- Textos: voseo, cercano. No hablan de "escribir código" sino de entender a quien usa el producto.

## Reglas de contenido

- Ningún dato inventado: lo que falte va como marcador visible entre corchetes.
- Estudios: "Licenciatura en Sistemas de Información, UNNE — en curso".
- Créditos: MuniOficios, con el equipo de Tembiapó. Pymetón y Gobierno Abierto, "desarrollo principal". PeeqSales, solo. Fondare, en equipo.
- 4peeq y la Municipalidad son lugares de trabajo, no clientes.
- Capturas: solo con datos de prueba, y sin nombres de clientes que no hayan dado permiso.
- Nombres del código en español, con el vocabulario del epic: marco, franja, escena, luz, subtítulo.

## Skills que aplican

- Look premium (`high-end-visual-design`): sí.
- Motion con GSAP / ScrollTrigger: protagonista. Lenis para el scroll suave.
- shadcn: no.
- Copy escrito por nosotros (`copywriting`, `ux-copy`).

## Páginas

| Ruta | Propósito | Estado |
|---|---|---|
| `/` | La película: nueve escenas | Motor, apertura y las cuatro escenas de producto hechos; de la 06 a la 09, en versión breve |
| `/sistema` | Referencia interna de tokens y piezas base; no se indexa | Hecha |
| `/guion` | Referencia interna: todos los textos, escena por escena, en el idioma de la ruta; no se indexa | Hecha |
| `/trabajo/[producto]` | Página de caso de cada producto destacado | Pendiente |
| `/en/...` | Versión en inglés de cada página | Hecha para las páginas que existen |

## Verificación de este sitio

- Capturar en 1440 y 390 de ancho: `/` y `/sistema`, y cada escena nueva.
- Metas: contenido principal visible en menos de 2,5 s en celular con 4G, sin saltos de diseño, sin pantalla de carga que bloquee.
- Accesibilidad: contraste AA, navegable con teclado, foco visible, `alt` en todas las imágenes, y todo legible con movimiento reducido.

## SEO

- Dominio: `https://santiagopruyas.com`. Búsqueda principal: el nombre propio.
- Schema: `Person` y `WebSite`. `hreflang` entre español e inglés.
- `sitemap.xml`, `robots.txt` y canonical antes de publicar.
