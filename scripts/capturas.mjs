// Prepara las capturas de las escenas a partir de los originales: recorta lo
// que no puede salir (la insignia de desarrollo de Next, el nombre de un
// cliente) y las achica para la web. Nunca dibuja ni tapa nada: solo recorta.
// Uso: node scripts/capturas.mjs <carpeta-de-originales> [carpeta-de-salida]
import path from "node:path";
import sharp from "sharp";

const [origen, destino = "public/capturas"] = process.argv.slice(2);
if (!origen) {
  console.error("Uso: node scripts/capturas.mjs <carpeta-de-originales> [carpeta-de-salida]");
  process.exit(1);
}

// recorte: [izquierda, arriba, ancho, alto] en píxeles del original.
const CAPTURAS = [
  // Las del repositorio de MuniOficios traen la insignia de Next abajo a la izquierda.
  { de: "munioficios/repo/L02-categorias.png", a: "munioficios-oficios", recorte: [0, 0, 3200, 1660], ancho: 1600 },
  { de: "munioficios/repo/L09-comparar-ofertas.png", a: "munioficios-presupuestos", recorte: [0, 0, 3200, 1660], ancho: 1600 },
  { de: "munioficios/repo/L12-credencial.png", a: "munioficios-credencial", recorte: [0, 0, 3200, 1660], ancho: 1600 },
  { de: "gobierno-abierto/web-tableros-escritorio.png", a: "gobierno-abierto-tableros", ancho: 1600 },
  { de: "fondare/web-escritorio.png", a: "fondare-publica", ancho: 1600 },
  { de: "pymeton/web-evento-escritorio.png", a: "pymeton-evento", ancho: 1600 },
  // El carrito del vendedor empieza debajo del selector de lista, que nombra al cliente.
  { de: "peeqsales/repo/vendedor_pedido-carrito.png", a: "peeqsales-vendedor", recorte: [0, 222, 390, 546] },
  { de: "peeqsales/repo/admin-4peeq_pedidos-listado.png", a: "peeqsales-administracion", recorte: [0, 0, 1440, 820] },
  { de: "peeqsales/repo/logistica_entrega-detalle.png", a: "peeqsales-repartidor", recorte: [0, 0, 390, 768] },
];

for (const { de, a, recorte, ancho } of CAPTURAS) {
  let imagen = sharp(path.join(origen, de));
  if (recorte) {
    const [left, top, width, height] = recorte;
    imagen = imagen.extract({ left, top, width, height });
  }
  if (ancho) imagen = imagen.resize({ width: ancho });

  const salida = path.join(destino, `${a}.jpg`);
  const { width, height, size } = await imagen.jpeg({ quality: 82, mozjpeg: true }).toFile(salida);
  console.log(`${a}.jpg  ${width}×${height}  ${(size / 1024).toFixed(0)} KB`);
}
