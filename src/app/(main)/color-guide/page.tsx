import { redirect } from "next/navigation"

export default function ColorGuidePage() {
  if (process.env.NODE_ENV === "production") {
    return redirect("/")
  }
  return (
    <main className="bg-background text-foreground min-h-screen">
      <section className="border-border bg-background border-b px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-caption text-foreground-subtle">Design token demo</p>

          <div className="mt-4 max-w-3xl">
            <h1 className="font-display text-hero text-foreground">Color system preview</h1>

            <p className="text-body text-foreground-muted mt-6">
              This page shows how the semantic color tokens behave across page backgrounds, surfaces, text, buttons, borders, status messages, overlays, and
              inverse sections.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="bg-primary text-caption text-primary-foreground hover:bg-primary-hover focus:ring-ring rounded-full px-5 py-3 transition focus:ring-2 focus:ring-offset-2 focus:outline-none">
              Primary action
            </button>

            <button className="bg-secondary text-caption text-secondary-foreground hover:bg-secondary-hover focus:ring-ring rounded-full px-5 py-3 transition focus:ring-2 focus:ring-offset-2 focus:outline-none">
              Secondary action
            </button>

            <button className="border-border bg-surface text-caption text-foreground hover:bg-surface-muted focus:ring-ring rounded-full border px-5 py-3 transition focus:ring-2 focus:ring-offset-2 focus:outline-none">
              Neutral action
            </button>
          </div>
        </div>
      </section>

      <section className="bg-background-muted px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          <TokenCard
            title="Page backgrounds"
            description="Use these for full-page and full-width section backgrounds."
            items={[
              ["background", "bg-background", "text-foreground"],
              ["background-muted", "bg-background-muted", "text-foreground"],
              ["background-inverse", "bg-background-inverse", "text-foreground-inverse"],
            ]}
          />

          <TokenCard
            title="Foreground"
            description="Use these for text and icons."
            items={[
              ["foreground", "bg-foreground", "text-foreground-inverse"],
              ["foreground-muted", "bg-foreground-muted", "text-foreground-inverse"],
              ["foreground-subtle", "bg-foreground-subtle", "text-foreground-inverse"],
              ["foreground-disabled", "bg-foreground-disabled", "text-foreground"],
              ["foreground-inverse", "bg-foreground-inverse", "text-foreground"],
            ]}
          />

          <TokenCard
            title="Surfaces"
            description="Use these for cards, panels, navs, modals, and contained UI."
            items={[
              ["surface", "bg-surface", "text-foreground"],
              ["surface-muted", "bg-surface-muted", "text-foreground"],
              ["surface-inverse", "bg-surface-inverse", "text-foreground-inverse"],
            ]}
          />
        </div>
      </section>

      <section className="bg-background px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="font-display text-title text-foreground">Surface examples</h2>
            <p className="text-body text-foreground-muted mt-4">
              Use background tokens for page sections. Use surface tokens for content blocks inside those sections.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <ExampleCard title="Default card" description="A normal card on the main page background." className="bg-surface text-foreground" />

            <ExampleCard title="Muted card" description="A quieter card or nested content block." className="bg-surface-muted text-foreground" />

            <ExampleCard
              title="Inverse card"
              description="A dark container that needs inverse foreground text."
              className="bg-surface-inverse text-foreground-inverse"
            />
          </div>
        </div>
      </section>

      <section className="bg-background-muted px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="font-display text-title text-foreground">Buttons and actions</h2>
            <p className="text-body text-foreground-muted mt-4">
              Primary is for main actions. Secondary is for supporting actions. Neutral buttons can use surface and border tokens.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="border-border bg-surface rounded-2xl border p-6">
              <h3 className="font-display text-subtitle text-foreground">Primary</h3>
              <p className="text-body text-foreground-muted mt-2">Main CTA, submit buttons, purchase buttons.</p>
              <button className="bg-primary text-caption text-primary-foreground hover:bg-primary-hover focus:ring-ring mt-6 w-full rounded-xl px-4 py-3 transition focus:ring-2 focus:ring-offset-2 focus:outline-none">
                Continue
              </button>
            </div>

            <div className="border-border bg-surface rounded-2xl border p-6">
              <h3 className="font-display text-subtitle text-foreground">Secondary</h3>
              <p className="text-body text-foreground-muted mt-2">Alternative actions and lower-priority CTAs.</p>
              <button className="bg-secondary text-caption text-secondary-foreground hover:bg-secondary-hover focus:ring-ring mt-6 w-full rounded-xl px-4 py-3 transition focus:ring-2 focus:ring-offset-2 focus:outline-none">
                View details
              </button>
            </div>

            <div className="border-border bg-surface rounded-2xl border p-6">
              <h3 className="font-display text-subtitle text-foreground">Muted primary</h3>
              <p className="text-body text-foreground-muted mt-2">Highlights, badges, selected states, and quiet emphasis.</p>
              <div className="bg-primary-muted text-caption text-foreground mt-6 rounded-xl px-4 py-3">Featured option</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="font-display text-title text-foreground">Status colors</h2>
            <p className="text-body text-foreground-muted mt-4">Each status has a strong color, soft background, foreground text, and border.</p>
          </div>

          <div className="mt-8 grid gap-4">
            <StatusMessage
              title="Success"
              description="Use for confirmations, saved states, and completed actions."
              className="border-success-border bg-success-background text-success-foreground"
              dotClassName="bg-success"
            />

            <StatusMessage
              title="Warning"
              description="Use for actions that need review before proceeding."
              className="border-warning-border bg-warning-background text-warning-foreground"
              dotClassName="bg-warning"
            />

            <StatusMessage
              title="Danger"
              description="Use for destructive actions, errors, and failed states."
              className="border-danger-border bg-danger-background text-danger-foreground"
              dotClassName="bg-danger"
            />
          </div>
        </div>
      </section>

      <section className="bg-background-inverse text-foreground-inverse px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-caption text-foreground-inverse/70">Inverse section</p>

            <h2 className="font-display text-title text-foreground-inverse mt-3">Dark backgrounds need inverse foreground tokens.</h2>

            <p className="text-body text-foreground-inverse/75 mt-4">
              Use background-inverse or surface-inverse when the whole section switches to a dark treatment.
            </p>
          </div>

          <div className="border-border-strong bg-surface text-foreground rounded-2xl border p-6">
            <h3 className="font-display text-subtitle">Surface on inverse</h3>
            <p className="text-body text-foreground-muted mt-2">A light card can still sit inside a dark section when needed.</p>
          </div>
        </div>
      </section>

      <section className="bg-background-muted px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="font-display text-title text-foreground">Overlay demo</h2>
            <p className="text-body text-foreground-muted mt-4">Overlay should be used behind dialogs, drawers, and blocking UI.</p>
          </div>

          <div className="border-border bg-background relative mt-8 overflow-hidden rounded-3xl border p-8">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-surface-muted h-32 rounded-2xl" />
              <div className="bg-primary-muted h-32 rounded-2xl" />
              <div className="bg-surface-muted h-32 rounded-2xl" />
            </div>

            <div className="bg-overlay absolute inset-0" />

            <div className="border-border bg-surface relative mx-auto max-w-md rounded-2xl border p-6 shadow-xl">
              <h3 className="font-display text-subtitle text-foreground">Modal surface</h3>
              <p className="text-body text-foreground-muted mt-2">The overlay separates the modal from the page behind it.</p>
              <button className="bg-primary text-caption text-primary-foreground mt-6 rounded-xl px-4 py-3">Confirm</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

type TokenCardProps = {
  title: string
  description: string
  items: [label: string, bgClassName: string, textClassName: string][]
}

function TokenCard({ title, description, items }: TokenCardProps) {
  return (
    <div className="border-border bg-surface rounded-2xl border p-6">
      <h2 className="font-display text-subtitle text-foreground">{title}</h2>
      <p className="text-body text-foreground-muted mt-2">{description}</p>

      <div className="mt-6 grid gap-3">
        {items.map(([label, bgClassName, textClassName]) => (
          <div key={label} className="border-border overflow-hidden rounded-xl border">
            <div className={`${bgClassName} ${textClassName} px-4 py-5`}>
              <span className="text-caption">{label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

type ExampleCardProps = {
  title: string
  description: string
  className: string
}

function ExampleCard({ title, description, className }: ExampleCardProps) {
  return (
    <div className={`border-border rounded-2xl border p-6 ${className}`}>
      <h3 className="font-display text-subtitle">{title}</h3>
      <p className="text-body mt-2 opacity-75">{description}</p>
      <div className="mt-6 h-2 rounded-full bg-current opacity-20" />
    </div>
  )
}

type StatusMessageProps = {
  title: string
  description: string
  className: string
  dotClassName: string
}

function StatusMessage({ title, description, className, dotClassName }: StatusMessageProps) {
  return (
    <div className={`rounded-2xl border p-5 ${className}`}>
      <div className="flex gap-3">
        <div className={`mt-2 size-2 rounded-full ${dotClassName}`} />
        <div>
          <h3 className="text-subtitle">{title}</h3>
          <p className="text-body mt-1 opacity-80">{description}</p>
        </div>
      </div>
    </div>
  )
}
