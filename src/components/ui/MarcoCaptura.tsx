import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variante?: "navegador" | "telefono";
  // Dirección que se muestra en la barra del navegador, sin protocolo.
  direccion?: string;
  className?: string;
};

// Marco de dispositivo para las capturas. Casi todos los productos tienen
// interfaz blanca: el marco las contiene para que no encandilen sobre el fondo.
export function MarcoCaptura({ children, variante = "navegador", direccion, className = "" }: Props) {
  if (variante === "telefono") {
    return (
      <div className={`rounded-[30px] border border-texto/12 bg-superficie p-1.5 ${className}`}>
        <div className="overflow-hidden rounded-[24px] [&_img]:block [&_img]:h-auto [&_img]:w-full">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-xl border border-texto/12 bg-barra ${className}`}>
      <div className="flex h-[30px] items-center gap-1.5 bg-superficie px-4" aria-hidden="true">
        <span className="size-2 rounded-full bg-linea" />
        <span className="size-2 rounded-full bg-linea" />
        <span className="size-2 rounded-full bg-linea" />
        {direccion ? (
          <span className="ml-3 truncate font-mono text-[11px] tracking-[0.06em] text-apoyo">
            {direccion}
          </span>
        ) : null}
      </div>
      <div className="[&_img]:block [&_img]:h-auto [&_img]:w-full">{children}</div>
    </div>
  );
}
