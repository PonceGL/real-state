import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina nombres de clase de forma condicional y fusiona clases de Tailwind CSS sin conflictos de estilo.
 *
 * @param inputs - Una secuencia de valores de clase. Pueden ser cadenas, objetos o arreglos.
 * @returns Una cadena con los nombres de clase combinados y fusionados.
 *
 * @example
 * cn("p-4", { "font-bold": true }, "bg-red-500"); // "p-4 font-bold bg-red-500"
 * cn("p-2", "p-4"); // "p-4"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
