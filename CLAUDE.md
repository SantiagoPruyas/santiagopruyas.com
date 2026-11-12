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

- Next.js 16 (App Router, `cacheComponents`), React 19, TypeScript, Tailwind v4. Hosting previsto: Vercel.
- Idiomas: español en la raíz e inglés en `/en`. Por dentro las dos son `src/app/[lang]`: `next.config.ts` reescribe la raíz a `/es` y redirige `/es` a la raíz.
- Contenido: todos los textos visibles viven en `src/contenido/` (`es.ts` y `en.ts`, con el mismo tipo). Los datos que no dependen del idioma, en `src/lib/` (`escenas.ts`, `productos.ts`). Ningún componente lleva texto escrito adentro, salvo `/sistema`.
- Un dato que falta se declara como `{ falta: "..." }` y se muestra entre corchetes con `textoDeDato`.

```bash
npm run dev          # local en http://localhost:3000
npm run build        # build de producción
npm run lint         # lint
npm run typecheck    # genera los tipos de las rutas y revisa tipos
```

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
| `/` | La película: nueve escenas | Solo el marco |
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
