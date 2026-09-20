import { Check, Minus } from "@react-zero-ui/icon-sprite"
import { Section, TokenLabel } from "./_shared"

type Tier = {
  name: string
  price: string
  description: string
  features: { label: string; included: boolean }[]
  featured?: boolean
  cta: string
}

const tiers: Tier[] = [
  {
    name: "Hobby",
    price: "$0",
    description: "For weekend projects and prototypes.",
    cta: "Start free",
    features: [
      { label: "1 project", included: true },
      { label: "Community support", included: true },
      { label: "Custom domains", included: false },

      { label: "Team seats", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$24",
    description: "For makers shipping real things.",
    featured: true,
    cta: "Start 14-day trial",
    features: [
      { label: "Unlimited projects", included: true },
      { label: "Priority support", included: true },
      { label: "Custom domains", included: true },
      { label: "Team seats (up to 5)", included: false },
    ],
  },
  {
    name: "Team",
    price: "$96",
    description: "For studios and small teams.",
    cta: "Contact sales",
    features: [
      { label: "Unlimited projects", included: true },
      { label: "Dedicated support", included: true },
      { label: "Custom domains", included: true },
      { label: "Unlimited team seats", included: true },
    ],
  },
]

export function PreviewPricing() {
  return (
    <Section background="muted">
      <div className="mx-auto max-w-2xl text-center">
        <TokenLabel>Border · primary · primary/10 · success · muted-foreground</TokenLabel>
        <h2 className="mt-4 font-display text-foreground text-title">
          Simple pricing, real composition.
        </h2>
        <p className="mt-4 text-body text-muted-foreground">
          The featured tier swaps to a stronger border and the primary action. Same tokens,
          different mix.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative flex flex-col rounded-xl bg-surface p-6 shadow-sm ${tier.featured ? "border-2 border-border" : "border border-border"}`}
          >
            {tier.featured && (
              <span className="absolute top-0 right-0 bg-accent/5 px-3 py-1 font-medium text-accent text-caption">
                Most popular
              </span>
            )}

            <h3 className="font-display text-foreground text-subtitle">{tier.name}</h3>
            <p className="mt-1 text-body-sm text-muted-foreground">{tier.description}</p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="font-display text-foreground text-title">{tier.price}</span>
              <span className="text-body-sm text-muted-foreground">/ month</span>
            </div>

            <ul className="mt-6 flex-1 space-y-3">
              {tier.features.map((feature) => (
                <li
                  key={feature.label}
                  className="flex items-start gap-2 text-body-sm text-muted-foreground"
                >
                  {feature.included ? (
                    <Check size={16} className="mt-0.5 shrink-0 text-success" aria-hidden />
                  ) : (
                    <Minus
                      size={16}
                      className="mt-0.5 shrink-0 text-muted-foreground"
                      aria-hidden
                    />
                  )}
                  <span>{feature.label}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className={`mt-8 w-full rounded-md px-4 py-2.5 font-medium text-body-sm transition ${
                tier.featured
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
              }`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
    </Section>
  )
}
