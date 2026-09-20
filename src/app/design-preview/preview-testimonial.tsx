import { Section } from "./_shared"

export function PreviewTestimonial() {
  return (
    <Section background="background-inverse">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <p className="font-mono text-caption text-foreground-inverse/60 uppercase tracking-wider">
            background-inverse · foreground-inverse · surface (on dark)
          </p>

          <blockquote className="mt-6 font-display text-foreground-inverse text-title">
            “We replaced six different starter templates with this one. Six months in and we still
            haven&apos;t needed to add a token - we just keep composing them.”
          </blockquote>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-foreground-inverse/15">
              <span className="font-display text-body-sm text-foreground-inverse">JD</span>
            </div>
            <div>
              <p className="text-body-sm text-foreground-inverse">Jamie Doe</p>
              <p className="text-body-sm text-foreground-inverse/60">Lead Engineer, Globex</p>
            </div>
          </div>
        </div>

        <aside className="rounded-xl border border-border-strong/30 bg-surface p-6 text-foreground shadow-2xl">
          <p className="font-mono text-caption text-foreground-subtle uppercase tracking-wider">
            A surface on inverse
          </p>
          <h3 className="mt-3 font-display text-foreground text-subtitle">
            Light cards still work on dark sections.
          </h3>
          <p className="mt-3 text-body text-foreground-muted">
            When a section flips to{" "}
            <code className="rounded-sm bg-surface-muted px-1.5 py-0.5 text-body-sm">
              background-inverse
            </code>
            , the same surface tokens still produce a perfectly readable card without any overrides.
          </p>
          <button
            type="button"
            className="mt-5 rounded-md bg-primary px-4 py-2 font-medium text-body-sm text-primary-foreground transition hover:bg-primary-hover"
          >
            Try it
          </button>
        </aside>
      </div>
    </Section>
  )
}
