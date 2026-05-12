import { Section } from "./_shared"

export function PreviewTestimonial() {
  return (
    <Section background="background-inverse">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <p className="text-caption text-foreground-inverse/60 font-mono tracking-wider uppercase">
            background-inverse · foreground-inverse · surface (on dark)
          </p>

          <blockquote className="font-display text-title text-foreground-inverse mt-6">
            “We replaced six different starter templates with this one. Six months in and we still haven&apos;t needed to add a token - we just keep composing
            them.”
          </blockquote>

          <div className="mt-8 flex items-center gap-3">
            <div className="bg-foreground-inverse/15 flex size-10 items-center justify-center rounded-full">
              <span className="font-display text-foreground-inverse text-body-sm">JD</span>
            </div>
            <div>
              <p className="text-body-sm text-foreground-inverse">Jamie Doe</p>
              <p className="text-body-sm text-foreground-inverse/60">Lead Engineer, Globex</p>
            </div>
          </div>
        </div>

        <aside className="bg-surface text-foreground border-border-strong/30 rounded-xl border p-6 shadow-2xl">
          <p className="text-caption text-foreground-subtle font-mono tracking-wider uppercase">A surface on inverse</p>
          <h3 className="font-display text-subtitle text-foreground mt-3">Light cards still work on dark sections.</h3>
          <p className="text-body text-foreground-muted mt-3">
            When a section flips to <code className="text-body-sm bg-surface-muted rounded-sm px-1.5 py-0.5">background-inverse</code>, the same surface tokens
            still produce a perfectly readable card without any overrides.
          </p>
          <button
            type="button"
            className="bg-primary text-primary-foreground hover:bg-primary-hover text-body-sm mt-5 rounded-md px-4 py-2 font-medium transition"
          >
            Try it
          </button>
        </aside>
      </div>
    </Section>
  )
}
