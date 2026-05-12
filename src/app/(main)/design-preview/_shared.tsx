import type { ReactNode } from "react"

type SectionBackground = "background" | "background-muted" | "background-inverse" | "surface-inverse"

const backgroundClass: Record<SectionBackground, string> = {
  background: "bg-background",
  "background-muted": "bg-background-muted",
  "background-inverse": "bg-background-inverse",
  "surface-inverse": "bg-surface-inverse",
}

type SectionProps = {
  background?: SectionBackground
  children: ReactNode
  className?: string
}

export function Section({ background = "background", children, className = "" }: SectionProps) {
  return (
    <section className={`${backgroundClass[background]} px-4 py-16 sm:px-6 md:py-24 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  )
}

type TokenLabelProps = {
  children: ReactNode
}

export function TokenLabel({ children }: TokenLabelProps) {
  return <p className="text-caption text-foreground-subtle font-mono tracking-wider uppercase">{children}</p>
}
