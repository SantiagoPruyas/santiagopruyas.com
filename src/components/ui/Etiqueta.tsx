import type { ComponentProps } from "react";

// Etiqueta monoespaciada para datos de la película: número de escena, rol, código de tiempo.
export function Etiqueta({ className = "", ...props }: ComponentProps<"span">) {
  return (
    <span
      className={`font-mono text-[12px] uppercase leading-normal tracking-[0.06em] text-apoyo ${className}`}
      {...props}
    />
  );
}
