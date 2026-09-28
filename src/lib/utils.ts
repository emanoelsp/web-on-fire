import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn() — o helper universal do ecossistema React (mesmo padrão do Shadcn/UI).
 * clsx monta a string condicionalmente; tailwind-merge resolve conflitos
 * (o último `px-*` vence, como você espera ao sobrescrever via props).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
