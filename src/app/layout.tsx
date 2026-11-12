import type { Metadata } from "next";
import {
  JetBrains_Mono,
  Sofia_Sans,
  Sofia_Sans_Extra_Condensed,
} from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://santiagopruyas.com"),
  title: {
    default: "Santiago Pruyas — Product Engineer",
    template: "%s — Santiago Pruyas",
  },
  description:
    "Product Engineer en Corrientes, Argentina. Diseño y construyo productos de software de punta a punta.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${sofia.variable} ${sofiaCond.variable} ${jetbrains.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
