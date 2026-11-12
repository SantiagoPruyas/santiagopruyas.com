import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function Enlace({ href, children, className = "" }: Props) {
  const clases = `text-texto underline decoration-luz decoration-1 underline-offset-[6px] transition-colors duration-200 hover:text-luz ${className}`;

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={clases}>
        {children}
      </Link>
    );
  }

  const externo = href.startsWith("http");
  return (
    <a href={href} className={clases} {...(externo ? { target: "_blank", rel: "noreferrer" } : {})}>
      {children}
    </a>
  );
}
