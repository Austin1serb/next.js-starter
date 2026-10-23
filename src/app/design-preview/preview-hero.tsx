import { ArrowRight, BookOpen, Sparkles } from "@react-zero-ui/icon-sprite"
import { Section, TokenLabel } from "./_shared"

export function PreviewHero() {
  return (
    <Section background="background">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-accent text-caption inline-flex items-center gap-1.5 font-medium">
          <Sparkles size={12} /> New · v1.0 is here
        </span>

        <div className="mt-6">
          <TokenLabel>Hero · text-hero · primary · secondary</TokenLabel>
        </div>

        <h1 className="font-display text-foreground text-hero mt-6">
          Build production sites{" "}
          <span className="text-primary">without rebuilding the foundation.</span>
        </h1>

        <p className="text-lead text-muted-foreground mt-6">
          A Next.js starter with semantic design tokens, sensible defaults, and the boring stuff
          already done. Ship the work that actually matters.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button type="button" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Start building <ArrowRight size={16} />
          </button>
          <button
            type="button"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <BookOpen size={16} /> Read the docs
          </button>
        </div>

        <p className="text-body-sm text-muted-foreground mt-12">
          Trusted by teams at Acme · Globex · Hooli · Initech · Massive Dynamic
        </p>
      </div>
    </Section>
  )
}
