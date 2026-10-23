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
  success: "bg-success/10 border-success/20 text-success",
  warning: "bg-warning/10 border-warning/20 text-warning",
  danger: "bg-danger/10 border-danger/20 text-danger",
}

const accentClass: Record<Alert["tone"], string> = {
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
}

export function PreviewStatus() {
  return (
    <Section background="muted">
      <div className="max-w-2xl">
        <TokenLabel>Success · warning · danger · matching foregrounds</TokenLabel>
        <h2 className="font-display text-foreground text-title mt-4">
          Status colors come in soft and solid.
        </h2>
        <p className="text-body text-muted-foreground mt-4">
          Use /10 backgrounds and /20 borders for soft alerts. Pair solid status fills with their
          matching foreground token.
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
                <p className="text-body-sm font-semibold">{alert.title}</p>
                <p className="text-body-sm mt-0.5 opacity-90">{alert.body}</p>
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

      <div className="border-border bg-surface mt-8 flex flex-wrap items-center gap-3 rounded-xl border p-6 shadow-sm">
        <span className="text-body-sm text-muted-foreground mr-2">
          Solid badges & destructive action:
        </span>
        <span className="bg-success text-caption text-success-foreground inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold">
          <CircleCheck size={12} /> Success
        </span>
        <span className="bg-warning text-caption text-warning-foreground inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold">
          <TriangleAlert size={12} /> Warning
        </span>
        <span className="bg-danger text-caption text-danger-foreground inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold">
          <CircleAlert size={12} /> Danger
        </span>
        <button
          type="button"
          className="bg-danger text-body-sm text-danger-foreground hover:bg-danger/90 focus-visible:ring-danger focus-visible:ring-offset-background ml-auto rounded-md px-4 py-2 font-medium transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Delete account
        </button>
      </div>
    </Section>
  )
}
