import { TriangleAlert, X } from "@react-zero-ui/icon-sprite"
import { Section, TokenLabel } from "./_shared"

export function PreviewModal() {
  return (
    <Section background="background">
      <div className="max-w-2xl">
        <TokenLabel>Surface · surface-foreground · bg-black/35 · shadow-2xl</TokenLabel>
        <h2 className="font-display text-foreground text-title mt-4">
          Modals sit above an overlay.
        </h2>
        <p className="text-body text-muted-foreground mt-4">
          A translucent backdrop separates the page from the modal. The modal uses the same surface
          tokens as cards and panels.
        </p>
      </div>

      <div className="border-border bg-muted relative mt-10 min-h-75 overflow-hidden rounded-2xl border p-8">
        <div className="absolute inset-0 bg-black/35" aria-hidden />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-border bg-surface text-surface-foreground relative w-full max-w-md rounded-2xl border p-6 shadow-2xl">
            <button
              type="button"
              aria-label="Close"
              className="text-muted-foreground hover:text-foreground absolute top-4 right-4 rounded-md p-1 transition"
            >
              <X size={18} />
            </button>
            <div className="bg-danger/10 text-danger flex size-10 items-center justify-center rounded-full">
              <TriangleAlert size={20} aria-hidden />
            </div>
            <h3 className="font-display text-foreground text-subtitle mt-4">
              Delete this project?
            </h3>
            <p className="text-body text-muted-foreground mt-2">
              This will permanently remove the project and all of its deployments. This cannot be
              undone.
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                className="bg-secondary text-body-sm text-secondary-foreground hover:bg-secondary/90 rounded-md px-4 py-2 font-medium transition"
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-danger text-body-sm text-danger-foreground hover:bg-danger/90 rounded-md px-4 py-2 font-medium transition"
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
