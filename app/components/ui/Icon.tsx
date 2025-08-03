import * as Lucide from "lucide-react"
import type { ComponentType, SVGProps } from "react"

type IconName = keyof typeof Lucide

const pascalToKebab = (s: string) =>
  s
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2") // abcX → abc-x
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2") // XXx → x-x
    .replace(/([a-z])([0-9])/g, "$1-$2") // abc123 → abc-123
    .replace(/([0-9])([a-z])/g, "$1-$2") // 123abc → 123-abc
    .toLowerCase()

const DEV = process.env.NODE_ENV === "development"

// Inline icon ← same DX as Lucide
export async function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  if (DEV) {
    const C = Lucide[name] as ComponentType<SVGProps<SVGSVGElement>>

    if (!C) throw new Error(`Unknown icon: ${name}`)
    return <C {...props} />
  }

  // Production ➜ sprite <use>
  return (
    <svg {...props}>
      <use href={`/icons.svg#${pascalToKebab(name)}`} />
    </svg>
  )
}
