import Link from "next/link";
import type { ReactNode } from "react";

type Variante = "lleno" | "linea";

type Props = {
  children: ReactNode;
  variante?: Variante;
  className?: string;
} & (
  | { href: string; onClick?: never; type?: never }
  | { href?: never; onClick?: () => void; type?: "button" | "submit" }
);

const BASE =
  "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-[4px] px-5 text-[15px] font-medium transition-[background-color,border-color,transform] duration-200 active:scale-[0.98]";

const VARIANTES: Record<Variante, string> = {
  lleno: "bg-luz text-sobre-luz hover:bg-texto",
  linea: "border border-texto/45 bg-fondo/55 text-texto hover:border-luz",
};

export function Boton({ children, variante = "linea", className = "", ...props }: Props) {
  const clases = `${BASE} ${VARIANTES[variante]} ${className}`;

  if (props.href === undefined) {
    return (
      <button type={props.type ?? "button"} onClick={props.onClick} className={clases}>
        {children}
      </button>
    );
  }

  // Los enlaces internos pasan por el router; mailto y sitios externos, no.
  if (props.href.startsWith("/") || props.href.startsWith("#")) {
    return (
      <Link href={props.href} className={clases}>
        {children}
      </Link>
    );
  }

  return (
    <a href={props.href} className={clases}>
      {children}
    </a>
  );
}
