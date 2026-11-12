import { NextResponse, type NextRequest } from "next/server";

// El español vive en la raíz y el inglés en /en. Por dentro los dos son
// /[lang]: todo lo que llega sin idioma se sirve desde /es. Se hace acá y no
// con rewrites en next.config.ts porque en Vercel esos rewrites no alcanzaban
// a la navegación interna hacia la raíz, y volver al español recargaba la página.
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `/es${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Todo menos lo que ya trae idioma, los archivos de Next y los archivos con extensión.
  matcher: ["/((?!en$|en/|es$|es/|_next/|.*\\..*).*)"],
};
