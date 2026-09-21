import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const UNDERLINE_HOVER =
  "underline decoration-transparent decoration-1 underline-offset-2 transition-[text-decoration-color] duration-300 hover:decoration-current";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
