import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// https://www.youtube.com/watch?v=re2JFITR7TI
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
