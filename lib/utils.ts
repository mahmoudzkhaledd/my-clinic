import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function toNumber(n: any) {
  return (!isNaN(parseFloat(n)) && !isNaN(n - 0)) ? parseFloat(n) : null;
}