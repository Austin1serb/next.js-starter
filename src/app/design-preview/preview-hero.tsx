import { Sparkles, ArrowRight, BookOpen } from "@react-zero-ui/icon-sprite"
import { Section, TokenLabel } from "./_shared"

export function PreviewHero() {
  return (
    <Section background="background">
      <div className="mx-auto max-w-3xl text-center">
        <span className="bg-primary-muted text-primary text-caption border-primary-border inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-medium">
          <Sparkles size={12} /> New · v1.0 is here
        </span>

        <div className="mt-6">
          <TokenLabel>Hero · text-hero · primary · secondary</TokenLabel>
        </div>

        <h1 className="font-display text-hero text-foreground mt-6">
          Build production sites <span className="text-primary">without rebuilding the foundation.</span>
        </h1>

        <p className="text-lead text-foreground-muted mt-6">
          A Next.js starter with semantic design tokens, sensible defaults, and the boring stuff already done. Ship the work that actually matters.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-ring focus-visible:ring-offset-ring-offset text-body-sm inline-flex items-center gap-2 rounded-md px-5 py-3 font-medium transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Start building <ArrowRight size={16} />
          </button>
          <button
            type="button"
            className="bg-secondary text-secondary-foreground hover:bg-secondary-hover focus-visible:ring-ring focus-visible:ring-offset-ring-offset text-body-sm inline-flex items-center gap-2 rounded-md px-5 py-3 font-medium transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <BookOpen size={16} /> Read the docs
          </button>
        </div>

        <p className="text-body-sm text-foreground-subtle mt-12">Trusted by teams at Acme · Globex · Hooli · Initech · Massive Dynamic</p>
      </div>
    </Section>
  )
}
