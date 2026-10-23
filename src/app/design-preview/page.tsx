import { redirect } from "next/navigation"
import { PreviewFeatureGrid } from "./preview-feature-grid"
import { PreviewFooter } from "./preview-footer"
import { PreviewForm } from "./preview-form"
import { PreviewHero } from "./preview-hero"
import { PreviewMatrix } from "./preview-matrix"
import { PreviewModal } from "./preview-modal"
import { PreviewNav } from "./preview-nav"
import { PreviewPricing } from "./preview-pricing"
import { PreviewStatus } from "./preview-status"
import { PreviewTestimonial } from "./preview-testimonial"
import { PreviewTypography } from "./preview-typography"

export default function DesignPreviewPage() {
  if (process.env.NODE_ENV === "production") {
    return redirect("/")
  }

  return (
    <main className="bg-background font-body text-foreground min-h-screen">
      <PreviewNav />
      <PreviewHero />
      <PreviewMatrix />
      <PreviewTypography />
      <PreviewFeatureGrid />
      <PreviewPricing />
      <PreviewForm />
      <PreviewStatus />
      <PreviewTestimonial />
      <PreviewModal />
      <PreviewFooter />
    </main>
  )
}
