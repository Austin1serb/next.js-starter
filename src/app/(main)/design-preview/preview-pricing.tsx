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
    <Section background="background-muted">
      <div className="mx-auto max-w-2xl text-center">
        <TokenLabel>Border · border-strong · primary · primary-muted · success · foreground-disabled</TokenLabel>
        <h2 className="font-display text-title text-foreground mt-4">Simple pricing, real composition.</h2>
        <p className="text-body text-foreground-muted mt-4">The featured tier swaps to a stronger border and the primary action. Same tokens, different mix.</p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`bg-surface relative flex flex-col rounded-xl p-6 shadow-sm ${tier.featured ? "border-border-strong border-2" : "border-border border"}`}
          >
            {tier.featured && (
              <span className="bg-primary-muted text-primary text-caption border-primary-border absolute -top-3 left-6 rounded-full border px-3 py-1 font-medium">
                Most popular
              </span>
            )}

            <h3 className="font-display text-subtitle text-foreground">{tier.name}</h3>
            <p className="text-body-sm text-foreground-muted mt-1">{tier.description}</p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="font-display text-title text-foreground">{tier.price}</span>
              <span className="text-body-sm text-foreground-subtle">/ month</span>
            </div>

            <ul className="mt-6 flex-1 space-y-3">
              {tier.features.map((feature) => (
                <li
                  key={feature.label}
                  className={`text-body-sm flex items-start gap-2 ${feature.included ? "text-foreground-muted" : "text-foreground-disabled"}`}
                >
                  {feature.included ? (
                    <Check size={16} className="text-success mt-0.5 shrink-0" aria-hidden />
                  ) : (
                    <Minus size={16} className="text-foreground-disabled mt-0.5 shrink-0" aria-hidden />
                  )}
                  <span>{feature.label}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className={`focus-visible:ring-ring focus-visible:ring-offset-ring-offset text-body-sm mt-8 w-full rounded-md px-4 py-2.5 font-medium transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
                tier.featured ? "bg-primary text-primary-foreground hover:bg-primary-hover" : "bg-secondary text-secondary-foreground hover:bg-secondary-hover"
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
