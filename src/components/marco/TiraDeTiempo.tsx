type Props = {
  // Posición de cada escena en la película, de 0 a 1.
  marcas: number[];
  // Avance actual, de 0 a 1.
  progreso: number;
  className?: string;
};

// Línea de tiempo de la franja inferior. El avance se mueve con transform
// para que seguir el scroll no dispare recálculos de diseño.
export function TiraDeTiempo({ marcas, progreso, className = "" }: Props) {
  const avance = Math.min(1, Math.max(0, progreso));

  return (
    <div className={`relative h-5 ${className}`} aria-hidden="true">
      <span className="absolute inset-x-0 top-[9px] h-0.5 bg-linea" />
      <span
        className="absolute inset-x-0 top-[9px] h-0.5 origin-left bg-luz"
        style={{ transform: `scaleX(${avance})` }}
      />
      {marcas.map((marca) => (
        <span
          key={marca}
          className="absolute top-1 h-3 w-0.5 bg-apoyo"
          style={{ left: `${marca * 100}%` }}
        />
      ))}
      <span className="absolute top-0 h-5 w-[3px] bg-luz" style={{ left: `${avance * 100}%` }} />
    </div>
  );
}
