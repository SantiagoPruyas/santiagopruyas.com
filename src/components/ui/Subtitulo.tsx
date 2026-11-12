type Props = {
  // Cada elemento es una línea, como en los subtítulos de una película.
  lineas: string[];
  className?: string;
};

// El texto principal de cada escena. La sombra lo mantiene legible sobre cualquier imagen.
export function Subtitulo({ lineas, className = "" }: Props) {
  return (
    <p
      className={`text-center text-[22px] font-medium leading-[1.25] [text-shadow:0_2px_14px_rgb(0_0_0/0.85),0_0_2px_rgb(0_0_0/0.9)] md:text-[30px] ${className}`}
    >
      {lineas.map((linea) => (
        <span key={linea} className="block">
          {linea}
        </span>
      ))}
    </p>
  );
}
