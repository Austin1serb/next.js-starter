import { redirect } from "next/navigation"
import { PreviewNav } from "./preview-nav"
import { PreviewHero } from "./preview-hero"
import { PreviewTypography } from "./preview-typography"
import { PreviewFeatureGrid } from "./preview-feature-grid"
import { PreviewPricing } from "./preview-pricing"
import { PreviewForm } from "./preview-form"
import { PreviewStatus } from "./preview-status"
import { PreviewTestimonial } from "./preview-testimonial"
import { PreviewModal } from "./preview-modal"
import { PreviewFooter } from "./preview-footer"

export default function DesignPreviewPage() {
  if (process.env.NODE_ENV === "production") {
    return redirect("/")
  }

  return (
    <main className="bg-background text-foreground font-body min-h-screen">
      <PreviewNav />
      <PreviewHero />
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
