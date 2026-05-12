import { Section, TokenLabel } from "./_shared"

const scale: { className: string; label: string; range: string; sample: string }[] = [
  { className: "font-display text-hero", label: "text-hero", range: "48 → 70", sample: "The quick brown fox" },
  { className: "font-display text-title", label: "text-title", range: "32 → 40", sample: "The quick brown fox" },
  { className: "font-display text-subtitle", label: "text-subtitle", range: "18 → 22", sample: "The quick brown fox" },
  { className: "text-lead", label: "text-lead", range: "18 → 20", sample: "The quick brown fox jumps over the lazy dog." },
  { className: "text-body", label: "text-body", range: "16 → 18", sample: "The quick brown fox jumps over the lazy dog." },
  { className: "text-body-sm", label: "text-body-sm", range: "14 → 15", sample: "The quick brown fox jumps over the lazy dog." },
  { className: "text-caption ", label: "text-caption", range: "11 → 13", sample: "The quick brown fox" },
]

export function PreviewTypography() {
  return (
    <Section background="background-muted">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <TokenLabel>Type scale · font-display · font-body</TokenLabel>
          <h2 className="font-display text-title text-foreground mt-4">A clamp-based scale that breathes with the viewport.</h2>
          <p className="text-body text-foreground-muted mt-4 max-w-prose">
            Every size scales fluidly between mobile and desktop using <code className="text-body-sm bg-surface rounded-sm px-1.5 py-0.5">clamp()</code>.
            Display sizes use <code className="text-body-sm bg-surface rounded-sm px-1.5 py-0.5">font-display</code>; everything else uses{" "}
            <code className="text-body-sm bg-surface rounded-sm px-1.5 py-0.5">font-body</code>.
          </p>

          <ul className="mt-10 space-y-8">
            {scale.map((row) => (
              <li key={row.label} className="border-border flex flex-col gap-2 border-b pb-6 last:border-b-0">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-caption text-foreground-subtle font-mono">{row.label}</span>
                  <span className="text-caption text-foreground-subtle font-mono">{row.range}px</span>
                </div>
                <p className={`${row.className} text-foreground`}>
                  {row.sample} <br /> {row.sample}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <aside className="bg-surface border-border h-fit rounded-xl border p-8 shadow-sm">
          <p className="text-caption text-foreground-subtle font-mono tracking-wider uppercase">Sample article</p>
          <h3 className="font-display text-subtitle text-foreground mt-3">How we think about typography</h3>

          <p className="text-body text-foreground-muted mt-4">
            Good type is invisible. The reader should glide through a paragraph without noticing the seams between sizes, weights, and spacing. We picked a
            modest scale on purpose - five real sizes, two display sizes, one caption - and let{" "}
            <a href="#" className="text-link hover:text-link-hover underline-offset-4 hover:underline">
              token composition
            </a>{" "}
            do the rest.
          </p>

          <blockquote className="border-primary text-subtitle text-foreground mt-6 border-l-4 pl-4 italic">
            “Restraint at the token layer buys freedom at the page layer.”
          </blockquote>

          <p className="text-body text-foreground-muted mt-6">
            Caption text - the smallest size in the scale - is reserved for metadata, eyebrow labels, and form helpers. Don’t reach for it just because
            something “feels small.”
          </p>

          <p className="text-body-sm text-foreground-subtle mt-6">- Updated May 2026 · 4 min read</p>
        </aside>
      </div>
    </Section>
  )
}
