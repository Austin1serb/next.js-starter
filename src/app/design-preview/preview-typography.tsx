import { Section, TokenLabel } from "./_shared"

const scale: { className: string; label: string; range: string; sample: string }[] = [
  {
    className: "font-display text-hero",
    label: "text-hero",
    range: "48 → 70",
    sample: "The quick brown fox",
  },
  {
    className: "font-display text-title",
    label: "text-title",
    range: "32 → 40",
    sample: "The quick brown fox",
  },
  {
    className: "font-display text-subtitle",
    label: "text-subtitle",
    range: "18 → 22",
    sample: "The quick brown fox",
  },
  {
    className: "text-lead",
    label: "text-lead",
    range: "18 → 20",
    sample: "The quick brown fox jumps over the lazy dog.",
  },
  {
    className: "text-body",
    label: "text-body",
    range: "16 → 18",
    sample: "The quick brown fox jumps over the lazy dog.",
  },
  {
    className: "text-body-sm",
    label: "text-body-sm",
    range: "14 → 15",
    sample: "The quick brown fox jumps over the lazy dog.",
  },
  {
    className: "text-caption ",
    label: "text-caption",
    range: "11 → 13",
    sample: "The quick brown fox",
  },
]

export function PreviewTypography() {
  return (
    <Section background="background-muted">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <TokenLabel>Type scale · font-display · font-body</TokenLabel>
          <h2 className="mt-4 font-display text-foreground text-title">
            A clamp-based scale that breathes with the viewport.
          </h2>
          <p className="mt-4 max-w-prose text-body text-foreground-muted">
            Every size scales fluidly between mobile and desktop using{" "}
            <code className="rounded-sm bg-surface px-1.5 py-0.5 text-body-sm">clamp()</code>.
            Display sizes use{" "}
            <code className="rounded-sm bg-surface px-1.5 py-0.5 text-body-sm">font-display</code>
            {";"}
            everything else uses{" "}
            <code className="rounded-sm bg-surface px-1.5 py-0.5 text-body-sm">font-body</code>.
          </p>

          <ul className="mt-10 space-y-8">
            {scale.map((row) => (
              <li
                key={row.label}
                className="flex flex-col gap-2 border-border border-b pb-6 last:border-b-0"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-caption text-foreground-subtle">{row.label}</span>
                  <span className="font-mono text-caption text-foreground-subtle">
                    {row.range}px
                  </span>
                </div>
                <p className={`${row.className} text-foreground`}>
                  {row.sample} <br /> {row.sample}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <aside className="h-fit rounded-xl border border-border bg-surface p-8 shadow-sm">
          <p className="font-mono text-caption text-foreground-subtle uppercase tracking-wider">
            Sample article
          </p>
          <h3 className="mt-3 font-display text-foreground text-subtitle">
            How we think about typography
          </h3>

          <p className="mt-4 text-body text-foreground-muted">
            Good type is invisible. The reader should glide through a paragraph without noticing the
            seams between sizes, weights, and spacing. We picked a modest scale on purpose - five
            real sizes, two display sizes, one caption - and let{" "}
            <a
              href="#"
              className="text-link underline-offset-4 hover:text-link-hover hover:underline"
            >
              token composition
            </a>{" "}
            do the rest.
          </p>

          <blockquote className="mt-6 border-primary border-l-4 pl-4 text-foreground text-subtitle italic">
            “Restraint at the token layer buys freedom at the page layer.”
          </blockquote>

          <p className="mt-6 text-body text-foreground-muted">
            Caption text - the smallest size in the scale - is reserved for metadata, eyebrow
            labels, and form helpers. Don’t reach for it just because something “feels small.”
          </p>

          <p className="mt-6 text-body-sm text-foreground-subtle">
            - Updated May 2026 · 4 min read
          </p>
        </aside>
      </div>
    </Section>
  )
}
