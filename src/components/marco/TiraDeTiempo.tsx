type Props = {
  // Posición de cada escena en la película, de 0 a 1.
  marcas: number[];
  // Avance fijo, de 0 a 1. Sin este valor la tira sigue a --avance, que el
  // marco actualiza con el scroll.
  progreso?: number;
  // Con estos tres, cada marca es un botón que lleva a su escena.
  etiquetas?: string[];
  actual?: number;
  alElegir?: (indice: number) => void;
  className?: string;
};

// Línea de tiempo de la franja inferior. El avance se mueve con transform
// para que seguir el scroll no dispare recálculos de diseño.
export function TiraDeTiempo({ marcas, progreso, etiquetas, actual, alElegir, className = "" }: Props) {
  const avance = progreso === undefined ? "var(--avance, 0)" : String(Math.min(1, Math.max(0, progreso)));

  return (
    <div className={`relative h-5 ${className}`} aria-hidden={alElegir ? undefined : "true"}>
      <span className="absolute inset-x-0 top-[9px] h-0.5 bg-linea" />
      <span
        className="absolute inset-x-0 top-[9px] h-0.5 origin-left bg-luz"
        style={{ transform: `scaleX(${avance})` }}
      />
      {marcas.map((marca, indice) =>
        alElegir ? (
          <button
            key={indice}
            type="button"
            aria-label={etiquetas?.[indice]}
            aria-current={indice === actual ? "true" : undefined}
            onClick={() => alElegir(indice)}
            className="group absolute top-1/2 flex h-11 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ left: `${marca * 100}%` }}
          >
            <span className="block h-3 w-0.5 bg-apoyo transition-[height,background-color] duration-200 group-hover:h-5 group-hover:bg-texto group-aria-[current]:bg-texto" />
          </button>
        ) : (
          <span
            key={indice}
            className="absolute top-1 h-3 w-0.5 bg-apoyo"
            style={{ left: `${marca * 100}%` }}
          />
        ),
      )}
      <span
        className="pointer-events-none absolute top-0 h-5 w-[3px] bg-luz"
        style={{ left: `calc(${avance} * 100%)` }}
      />
    </div>
  );
}
