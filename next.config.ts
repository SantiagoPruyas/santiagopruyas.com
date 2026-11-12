import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // El español vive en la raíz y el inglés en /en. Por dentro los dos son
  // /[lang]: src/proxy.ts sirve la raíz desde /es, y acá /es redirige a la
  // raíz para no duplicar páginas.
  async redirects() {
    return [
      { source: "/es", destination: "/", permanent: true },
      { source: "/es/:ruta*", destination: "/:ruta*", permanent: true },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
