import type { Metadata } from "next";
import {
  JetBrains_Mono,
  Sofia_Sans,
  Sofia_Sans_Extra_Condensed,
} from "next/font/google";
import { notFound } from "next/navigation";
import { IDIOMAS, esIdioma, obtenerContenido } from "@/contenido";
import "../globals.css";

const sofia = Sofia_Sans({
  variable: "--font-sofia",
  subsets: ["latin"],
  display: "swap",
});

const sofiaCond = Sofia_Sans_Extra_Condensed({
  variable: "--font-sofia-cond",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return IDIOMAS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!esIdioma(lang)) return {};
  const { meta } = obtenerContenido(lang);

  return {
    metadataBase: new URL("https://santiagopruyas.com"),
    title: { default: meta.titulo, template: "%s — Santiago Pruyas" },
    description: meta.descripcion,
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${sofia.variable} ${sofiaCond.variable} ${jetbrains.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
