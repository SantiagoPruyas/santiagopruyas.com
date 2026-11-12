import type { ReactNode } from "react";
import type { Luz } from "@/lib/escenas";

type Props = {
  id: string;
  luz: Luz;
  children: ReactNode;
  className?: string;
};

// Una escena ocupa el alto que queda entre las dos franjas y define su propia luz.
export function Escena({ id, luz, children, className = "" }: Props) {
  return (
    <section
      id={id}
      data-luz={luz}
      className={`relative min-h-[calc(100dvh-2*var(--franja))] overflow-hidden px-[var(--margen)] ${className}`}
    >
      {children}
    </section>
  );
}
