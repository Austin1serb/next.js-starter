import { TriangleAlert, X } from "@react-zero-ui/icon-sprite"
import { Section, TokenLabel } from "./_shared"

export function PreviewModal() {
  return (
    <Section background="background">
      <div className="max-w-2xl">
        <TokenLabel>Overlay · surface · shadow-2xl · modal radius</TokenLabel>
        <h2 className="font-display text-title text-foreground mt-4">Modals sit above an overlay.</h2>
        <p className="text-body text-foreground-muted mt-4">
          The overlay token is a translucent black. It sits on top of the page content and below the modal surface.
        </p>
      </div>

      <div className="border-border bg-background-muted relative mt-10 overflow-hidden rounded-2xl border p-8">
        <div className="grid gap-4 md:grid-cols-3" aria-hidden>
          <div className="bg-surface border-border h-32 rounded-xl border" />
          <div className="bg-surface-muted border-border h-32 rounded-xl border" />
          <div className="bg-surface border-border h-32 rounded-xl border" />
        </div>

        <div className="bg-overlay absolute inset-0" aria-hidden />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-border bg-surface relative w-full max-w-md rounded-2xl border p-6 shadow-2xl">
            <button type="button" aria-label="Close" className="text-foreground-subtle hover:text-foreground absolute top-4 right-4 rounded-md p-1 transition">
              <X size={18} />
            </button>
            <div className="bg-danger-background text-danger flex size-10 items-center justify-center rounded-full">
              <TriangleAlert size={20} aria-hidden />
            </div>
            <h3 className="font-display text-subtitle text-foreground mt-4">Delete this project?</h3>
            <p className="text-body text-foreground-muted mt-2">This will permanently remove the project and all of its deployments. This cannot be undone.</p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                className="bg-secondary text-secondary-foreground hover:bg-secondary-hover text-body-sm rounded-md px-4 py-2 font-medium transition"
              >
                Cancel
              </button>
              <button type="button" className="bg-danger hover:bg-danger-hover text-body-sm rounded-md px-4 py-2 font-medium text-white transition">
                Delete project
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
