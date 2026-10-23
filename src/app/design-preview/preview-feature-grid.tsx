import { ArrowRight, Layers, Palette, TextCursorInput } from "@react-zero-ui/icon-sprite"
import { Section, TokenLabel } from "./_shared"

const features: {
  title: string
  body: string
  surface: "surface" | "muted"
  icon: typeof Palette
}[] = [
  {
    title: "Semantic tokens",
    body: "Name colors by role, not by hue. Swap themes without touching components.",
    surface: "surface",
    icon: Palette,
  },
  {
    title: "Fluid type scale",
    body: "Every size clamps between mobile and desktop. No breakpoint gymnastics required.",
    surface: "muted",
    icon: TextCursorInput,
  },
  {
    title: "Sensible defaults",
    body: "Use Tailwind’s spacing, radius, and shadow scales. Add project tokens only when needed.",
    surface: "surface",
    icon: Layers,
  },
]

export function PreviewFeatureGrid() {
  return (
    <Section background="background">
      <div className="max-w-2xl">
        <TokenLabel>Surface · muted · border · primary/10 · primary/20</TokenLabel>
        <h2 className="font-display text-foreground text-title mt-4">
          Cards sit on background. Surfaces sit on cards.
        </h2>
        <p className="text-body text-muted-foreground mt-4">
          The difference between background and surface is what makes a layout feel layered without
          resorting to drop shadows everywhere.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <article
              key={feature.title}
              className={`border-border rounded-xl border p-6 shadow-sm ${feature.surface === "surface" ? "bg-surface" : "bg-muted"}`}
            >
              <div className="border-primary/20 bg-primary/10 text-primary flex size-10 items-center justify-center rounded-md border">
                <Icon size={20} />
              </div>
              <h3 className="font-display text-foreground text-subtitle mt-5">{feature.title}</h3>
              <p className="text-body text-muted-foreground mt-2">{feature.body}</p>
              <a
                href="#"
                className="text-body-sm text-primary hover:text-primary/90 mt-4 inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
              >
                Explore {feature.title} <ArrowRight size={14} />
              </a>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
