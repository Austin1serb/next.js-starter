import { CircleAlert, CircleCheck, TriangleAlert, X } from "@react-zero-ui/icon-sprite"
import { Section, TokenLabel } from "./_shared"

type Alert = {
  tone: "success" | "warning" | "danger"
  title: string
  body: string
}

const alertIcon = {
  success: CircleCheck,
  warning: TriangleAlert,
  danger: CircleAlert,
} as const

const alerts: Alert[] = [
  {
    tone: "success",
    title: "Deployment succeeded",
    body: "Your changes are live at preview-42.acme.dev.",
  },
  {
    tone: "warning",
    title: "Approaching plan limit",
    body: "You have used 82% of your monthly bandwidth.",
  },
  {
    tone: "danger",
    title: "Build failed",
    body: "TypeScript reported 3 errors in src/lib/auth.ts.",
  },
]

const alertClass: Record<Alert["tone"], string> = {
  success: "bg-success-background border-success-border text-success-foreground",
  warning: "bg-warning-background border-warning-border text-warning-foreground",
  danger: "bg-danger-background border-danger-border text-danger-foreground",
}

const accentClass: Record<Alert["tone"], string> = {
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
}

export function PreviewStatus() {
  return (
    <Section background="background-muted">
      <div className="max-w-2xl">
        <TokenLabel>Success · Warning · Danger · danger-hover</TokenLabel>
        <h2 className="mt-4 font-display text-foreground text-title">
          Status colors come in soft and solid.
        </h2>
        <p className="mt-4 text-body text-foreground-muted">
          Soft variants are for inline alerts. Solid variants are for badges, dots, and destructive
          actions.
        </p>
      </div>

      <div className="mt-10 space-y-4">
        {alerts.map((alert) => {
          const Icon = alertIcon[alert.tone]
          return (
            <div
              key={alert.tone}
              className={`flex gap-3 rounded-xl border p-4 ${alertClass[alert.tone]}`}
            >
              <Icon
                size={20}
                className={`mt-0.5 shrink-0 ${accentClass[alert.tone]}`}
                aria-hidden
              />
              <div className="flex-1">
                <p className="font-semibold text-body-sm">{alert.title}</p>
                <p className="mt-0.5 text-body-sm opacity-90">{alert.body}</p>
              </div>
              <button
                type="button"
                aria-label="Dismiss"
                className="rounded-md p-1 opacity-60 transition hover:opacity-100"
              >
                <X size={16} />
              </button>
            </div>
          )
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface p-6 shadow-sm">
        <span className="mr-2 text-body-sm text-foreground-muted">
          Solid badges & destructive action:
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-success px-2.5 py-1 font-semibold text-caption text-white">
          <CircleCheck size={12} /> Success
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-warning px-2.5 py-1 font-semibold text-caption text-white">
          <TriangleAlert size={12} /> Warning
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-danger px-2.5 py-1 font-semibold text-caption text-white">
          <CircleAlert size={12} /> Danger
        </span>
        <button
          type="button"
          className="ml-auto rounded-md bg-danger px-4 py-2 font-medium text-body-sm text-white transition hover:bg-danger-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset"
        >
          Delete account
        </button>
      </div>
    </Section>
  )
}
