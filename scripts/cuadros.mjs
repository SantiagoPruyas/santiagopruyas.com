// Convierte los cuadros PNG renderizados en Blender a WebP para la web.
// Uso: node scripts/cuadros.mjs <carpeta-de-png> <carpeta-de-salida> [ancho] [calidad]
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const [origen, destino, ancho = "660", calidad = "72"] = process.argv.slice(2);
if (!origen || !destino) {
  console.error("Uso: node scripts/cuadros.mjs <carpeta-de-png> <carpeta-de-salida> [ancho] [calidad]");
  process.exit(1);
}

fs.mkdirSync(destino, { recursive: true });
const cuadros = fs.readdirSync(origen).filter((f) => /^\d+\.png$/.test(f)).sort();
let total = 0;

for (const cuadro of cuadros) {
  const salida = path.join(destino, cuadro.replace(".png", ".webp"));
  await sharp(path.join(origen, cuadro))
    .resize({ width: Number(ancho) })
    .webp({ quality: Number(calidad), alphaQuality: 80, effort: 6 })
    .toFile(salida);
  total += fs.statSync(salida).size;
}

console.log(`${cuadros.length} cuadros, ${(total / 1024).toFixed(0)} KB en total`);
