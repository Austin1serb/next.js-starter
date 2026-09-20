"use client"
import { CircleAlert, Lock, Mail, Phone } from "@react-zero-ui/icon-sprite"
import { Section, TokenLabel } from "./_shared"

export function PreviewForm() {
  return (
    <Section background="background">
      <div className="mx-auto max-w-xl">
        <TokenLabel>Surface · foreground · muted · border · ring · danger</TokenLabel>
        <h2 className="mt-4 font-display text-foreground text-title">Sign in to your account</h2>
        <p className="mt-3 text-body text-muted-foreground">
          All form controls share one set of tokens - focus rings included.
        </p>

        <form className="mt-10 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label htmlFor="preview-email" className="font-medium text-body-sm text-foreground">
              Email
            </label>

            <div className="relative">
              <Mail
                size={16}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                id="preview-email"
                type="email"
                placeholder="you@company.com"
                className="w-full rounded-md border border-border bg-surface py-2.5 pr-3 pl-9 text-body-sm text-foreground transition placeholder:text-muted-foreground"
              />
            </div>
            <p className="text-body-sm text-muted-foreground">We&apos;ll never share your email.</p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="preview-password"
                className="font-medium text-body-sm text-foreground"
              >
                Password
              </label>
              <a
                href="#"
                className="text-body-sm text-primary underline-offset-4 hover:text-primary/90 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock
                size={16}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                id="preview-password"
                type="password"
                defaultValue="hunter2"
                aria-invalid="true"
                className="w-full rounded-md border border-danger bg-surface py-2.5 pr-3 pl-9 text-body-sm text-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              />
            </div>
            <p className="flex items-center gap-1.5 text-body-sm text-danger">
              <CircleAlert size={14} aria-hidden />
              <span>That password doesn&apos;t look right.</span>
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="preview-phone"
              className="font-medium text-body-sm text-muted-foreground"
            >
              Phone (coming soon)
            </label>
            <div className="relative">
              <Phone
                size={16}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                id="preview-phone"
                type="tel"
                disabled
                placeholder="+1 (555) 000-0000"
                className="w-full cursor-not-allowed rounded-md border border-border bg-muted py-2.5 pr-3 pl-9 text-body-sm text-muted-foreground opacity-50 placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Sign in
            </button>
            <button
              type="button"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Section>
  )
}
