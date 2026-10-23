import { Section } from "./_shared"

export function PreviewTestimonial() {
  return (
    <Section background="inverse">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <p className="text-caption text-inverse-foreground/60 font-mono tracking-wider uppercase">
            inverse · inverse-foreground · surface (on dark)
          </p>

          <blockquote className="font-display text-inverse-foreground text-title mt-6">
            “We replaced six different starter templates with this one. Six months in and we still
            haven&apos;t needed to add a token - we just keep composing them.”
          </blockquote>

          <div className="mt-8 flex items-center gap-3">
            <div className="bg-inverse-foreground/15 flex size-10 items-center justify-center rounded-full">
              <span className="font-display text-body-sm text-inverse-foreground">JD</span>
            </div>
            <div>
              <p className="text-body-sm text-inverse-foreground">Jamie Doe</p>
              <p className="text-body-sm text-inverse-foreground/60">Lead Engineer, Globex</p>
            </div>
          </div>
        </div>

        <aside className="border-border/30 bg-surface text-surface-foreground rounded-xl border p-6 shadow-2xl">
          <p className="text-caption text-muted-foreground font-mono tracking-wider uppercase">
            A surface on inverse
          </p>
          <h3 className="font-display text-foreground text-subtitle mt-3">
            Light cards still work on dark sections.
          </h3>
          <p className="text-body text-muted-foreground mt-3">
            When a section flips to{" "}
            <code className="bg-muted text-body-sm rounded-sm px-1.5 py-0.5">inverse</code>, the
            same surface tokens still produce a perfectly readable card without any overrides.
          </p>
          <button
            type="button"
            className="bg-primary text-body-sm text-primary-foreground hover:bg-primary/90 mt-5 rounded-md px-4 py-2 font-medium transition"
          >
            Try it
          </button>
        </aside>
      </div>
    </Section>
  )
}
