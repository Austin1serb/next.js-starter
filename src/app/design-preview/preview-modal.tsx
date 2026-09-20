import { TriangleAlert, X } from "@react-zero-ui/icon-sprite"
import { Section, TokenLabel } from "./_shared"

export function PreviewModal() {
  return (
    <Section background="background">
      <div className="max-w-2xl">
        <TokenLabel>Overlay · surface · shadow-2xl · modal radius</TokenLabel>
        <h2 className="mt-4 font-display text-foreground text-title">
          Modals sit above an overlay.
        </h2>
        <p className="mt-4 text-body text-foreground-muted">
          The overlay token is a translucent black. It sits on top of the page content and below the
          modal surface.
        </p>
      </div>

      <div className="relative mt-10 min-h-[300px] overflow-hidden rounded-2xl border border-border bg-background-muted p-8">
        <div className="absolute inset-0 bg-black/35" aria-hidden />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl">
            <button
              type="button"
              aria-label="Close"
              className="absolute top-4 right-4 rounded-md p-1 text-foreground-subtle transition hover:text-foreground"
            >
              <X size={18} />
            </button>
            <div className="flex size-10 items-center justify-center rounded-full bg-danger-background text-danger">
              <TriangleAlert size={20} aria-hidden />
            </div>
            <h3 className="mt-4 font-display text-foreground text-subtitle">
              Delete this project?
            </h3>
            <p className="mt-2 text-body text-foreground-muted">
              This will permanently remove the project and all of its deployments. This cannot be
              undone.
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                className="rounded-md bg-secondary px-4 py-2 font-medium text-body-sm text-secondary-foreground transition hover:bg-secondary-hover"
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-md bg-danger px-4 py-2 font-medium text-body-sm text-white transition hover:bg-danger-hover"
              >
                Delete project
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
