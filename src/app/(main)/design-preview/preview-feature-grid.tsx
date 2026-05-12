import { Palette, TextCursorInput, Layers, ArrowRight } from "@react-zero-ui/icon-sprite"
import { Section, TokenLabel } from "./_shared"

const features: { title: string; body: string; surface: "surface" | "surface-muted"; icon: typeof Palette }[] = [
  {
    title: "Semantic tokens",
    body: "Name colors by role, not by hue. Swap themes without touching components.",
    surface: "surface",
    icon: Palette,
  },
  {
    title: "Fluid type scale",
    body: "Every size clamps between mobile and desktop. No breakpoint gymnastics required.",
    surface: "surface-muted",
    icon: TextCursorInput,
  },
  {
    title: "Sensible defaults",
    body: "Conventions for radius, spacing, and shadows live as comments next to the tokens.",
    surface: "surface",
    icon: Layers,
  },
]

export function PreviewFeatureGrid() {
  return (
    <Section background="background">
      <div className="max-w-2xl">
        <TokenLabel>Surface · surface-muted · border · primary-muted · link</TokenLabel>
        <h2 className="font-display text-title text-foreground mt-4">Cards sit on background. Surfaces sit on cards.</h2>
        <p className="text-body text-foreground-muted mt-4">
          The difference between background and surface is what makes a layout feel layered without resorting to drop shadows everywhere.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <article
              key={feature.title}
              className={`border-border rounded-xl border p-6 shadow-sm ${feature.surface === "surface" ? "bg-surface" : "bg-surface-muted"}`}
            >
              <div className="bg-primary-muted text-primary border-primary-border flex size-10 items-center justify-center rounded-md border">
                <Icon size={20} />
              </div>
              <h3 className="font-display text-subtitle text-foreground mt-5">{feature.title}</h3>
              <p className="text-body text-foreground-muted mt-2">{feature.body}</p>
              <a href="#" className="text-link hover:text-link-hover text-body-sm mt-4 inline-flex items-center gap-1.5 underline-offset-4 hover:underline">
                Learn more <ArrowRight size={14} />
              </a>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
