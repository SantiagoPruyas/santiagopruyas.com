"use client";

import { useSyncExternalStore } from "react";

// El comentario del director se enciende en la franja superior y lo lee cada
// escena. Se guarda en el navegador para que siga igual al cambiar de escena
// y de idioma, que vuelve a montar el marco.
const CLAVE = "comentario-del-director";
const oyentes = new Set<() => void>();

function leer() {
  try {
    return window.localStorage.getItem(CLAVE) === "on";
  } catch {
    return false;
  }
}

function suscribir(avisar: () => void) {
  oyentes.add(avisar);
  window.addEventListener("storage", avisar);
  return () => {
    oyentes.delete(avisar);
    window.removeEventListener("storage", avisar);
  };
}

function alternar() {
  try {
    window.localStorage.setItem(CLAVE, leer() ? "off" : "on");
  } catch {
    // Sin almacenamiento el interruptor no tiene dónde quedar guardado.
    return;
  }
  for (const avisar of oyentes) avisar();
}

export function useComentario() {
  const encendido = useSyncExternalStore(suscribir, leer, () => false);
  return [encendido, alternar] as const;
}

const REDUCIDO = "(prefers-reduced-motion: reduce)";

function suscribirAlMovimiento(avisar: () => void) {
  const consulta = window.matchMedia(REDUCIDO);
  consulta.addEventListener("change", avisar);
  return () => consulta.removeEventListener("change", avisar);
}

// Verdadero cuando el dispositivo pide menos movimiento.
export function useMovimientoReducido() {
  return useSyncExternalStore(
    suscribirAlMovimiento,
    () => window.matchMedia(REDUCIDO).matches,
    () => false,
  );
}
