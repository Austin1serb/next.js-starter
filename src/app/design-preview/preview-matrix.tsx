import { MatrixFx } from "@/app/components/effects/matrix-fx"

export function PreviewMatrix() {
  return (
    <section id="matrix-fx" className="relative isolate overflow-hidden bg-neutral-950 text-white">
      <MatrixFx className="text-neutral-500" />
      <div className="relative mx-auto flex min-h-160 max-w-4xl flex-col items-center justify-center px-6 py-28 text-center">
        <p className="rounded-full border border-white/15 bg-neutral-950/80 px-5 py-2 font-mono text-sm text-white/70">
          A little atmosphere
        </p>
        <h2 className="font-display text-hero mt-12">Presence that speaks for itself.</h2>
        <p className="text-lead mt-6 max-w-xl text-white/60">
          A quiet shimmer. A softer edge. Room for your ideas to stand out.
        </p>
      </div>
    </section>
  )
}
