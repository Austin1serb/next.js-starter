import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const slugify = (str: string): string => {
  return str
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/[^a-z0-9 -]/g, "") // Remove all non-alphanumeric chars except hyphens and spaces
    .replace(/\s+/g, "-") // Replace spaces with a single hyphen
    .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
}
