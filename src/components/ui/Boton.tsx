import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

type Variante = "lleno" | "linea";

type Props = {
  children: ReactNode;
  variante?: Variante;
  className?: string;
  // Con href es un enlace; sin href, un botón.
  href?: string;
  onClick?: (evento: MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit";
};

const BASE =
  "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-[4px] px-5 text-[15px] font-medium transition-[background-color,border-color,transform] duration-200 active:scale-[0.98]";

const VARIANTES: Record<Variante, string> = {
  lleno: "bg-luz text-sobre-luz hover:bg-texto",
  linea: "border border-texto/45 bg-fondo/55 text-texto hover:border-luz",
};

export function Boton({ children, variante = "linea", className = "", href, onClick, type }: Props) {
  const clases = `${BASE} ${VARIANTES[variante]} ${className}`;

  if (href === undefined) {
    return (
      <button type={type ?? "button"} onClick={onClick} className={clases}>
        {children}
      </button>
    );
  }

  // Las páginas internas pasan por el router; las anclas, mailto y sitios externos, no.
  if (href.startsWith("/")) {
    return (
      <Link href={href} onClick={onClick} className={clases}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onClick={onClick} className={clases}>
      {children}
    </a>
  );
}
