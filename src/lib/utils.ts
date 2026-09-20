import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["hero", "title", "subtitle", "lead", "body", "body-sm", "caption"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const slugify = (str: string): string => {
  return str
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/[^a-z0-9 -]/gu, "") // Remove all non-alphanumeric chars except hyphens and spaces
    .replace(/\s+/gu, "-") // Replace spaces with a single hyphen
    .replace(/-+/gu, "-") // Replace multiple hyphens with a single hyphen
}
