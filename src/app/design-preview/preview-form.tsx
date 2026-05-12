"use client"
import { Mail, Lock, Phone, CircleAlert } from "@react-zero-ui/icon-sprite"
import { Section, TokenLabel } from "./_shared"

export function PreviewForm() {
  return (
    <Section background="background">
      <div className="mx-auto max-w-xl">
        <TokenLabel>Input · input-border · input-placeholder · input-disabled · ring · link · danger</TokenLabel>
        <h2 className="font-display text-title text-foreground mt-4">Sign in to your account</h2>
        <p className="text-body text-foreground-muted mt-3">All form controls share one set of tokens - focus rings included.</p>

        <form className="mt-10 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label htmlFor="preview-email" className="text-body-sm text-foreground font-medium">
              Email
            </label>
            <div className="relative">
              <Mail size={16} className="text-input-placeholder pointer-events-none absolute top-1/2 left-3 -translate-y-1/2" aria-hidden />
              <input
                id="preview-email"
                type="email"
                placeholder="you@company.com"
                className="bg-input border-input-border placeholder:text-input-placeholder text-foreground focus-visible:ring-ring focus-visible:ring-offset-ring-offset text-body-sm w-full rounded-md border py-2.5 pr-3 pl-9 transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              />
            </div>
            <p className="text-body-sm text-foreground-subtle">We&apos;ll never share your email.</p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="preview-password" className="text-body-sm text-foreground font-medium">
                Password
              </label>
              <a href="#" className="text-link hover:text-link-hover text-body-sm underline-offset-4 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock size={16} className="text-input-placeholder pointer-events-none absolute top-1/2 left-3 -translate-y-1/2" aria-hidden />
              <input
                id="preview-password"
                type="password"
                defaultValue="hunter2"
                aria-invalid="true"
                className="bg-input border-danger text-foreground focus-visible:ring-danger focus-visible:ring-offset-ring-offset text-body-sm w-full rounded-md border py-2.5 pr-3 pl-9 transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              />
            </div>
            <p className="text-body-sm text-danger flex items-center gap-1.5">
              <CircleAlert size={14} aria-hidden /> That password doesn&apos;t look right.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="preview-phone" className="text-body-sm text-foreground-disabled font-medium">
              Phone (coming soon)
            </label>
            <div className="relative">
              <Phone size={16} className="text-foreground-disabled pointer-events-none absolute top-1/2 left-3 -translate-y-1/2" aria-hidden />
              <input
                id="preview-phone"
                type="tel"
                disabled
                placeholder="+1 (555) 000-0000"
                className="bg-input-disabled border-input-border text-foreground-disabled placeholder:text-input-placeholder text-body-sm w-full cursor-not-allowed rounded-md border py-2.5 pr-3 pl-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-ring focus-visible:ring-offset-ring-offset text-body-sm flex-1 rounded-md px-4 py-2.5 font-medium transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Sign in
            </button>
            <button
              type="button"
              className="bg-secondary text-secondary-foreground hover:bg-secondary-hover focus-visible:ring-ring focus-visible:ring-offset-ring-offset text-body-sm rounded-md px-4 py-2.5 font-medium transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Section>
  )
}
