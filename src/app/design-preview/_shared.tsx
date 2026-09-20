import type { ReactNode } from "react"

type SectionBackground = "background" | "surface" | "muted" | "inverse"

const backgroundClass: Record<SectionBackground, string> = {
  background: "bg-background",
  surface: "bg-surface text-surface-foreground",
  muted: "bg-muted",
  inverse: "bg-inverse text-inverse-foreground",
}

type SectionProps = {
  background?: SectionBackground
  children: ReactNode
  className?: string
}

export function Section({ background = "background", children, className = "" }: SectionProps) {
  return (
    <section
      className={`${backgroundClass[background]} px-4 py-16 sm:px-6 md:py-24 lg:px-8 ${className}`}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  )
}

type TokenLabelProps = {
  children: ReactNode
}

export function TokenLabel({ children }: TokenLabelProps) {
  return (
    <p className="font-mono text-caption text-muted-foreground uppercase tracking-wider">
      {children}
    </p>
  )
}
