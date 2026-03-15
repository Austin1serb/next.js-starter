import type { Metadata } from "next"
import { SITE_SLUGS } from "@/config/site-config"

export const metadata: Metadata = {
  title: "Services",
  description: "Services",
  alternates: {
    canonical: SITE_SLUGS.services,
  },
}

const ServicesPage: React.FC = () => {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 pt-28 pb-16">
      <h1 className="text-surface text-4xl font-bold">Services</h1>
      <p className="text-surface/80 mt-4 max-w-2xl text-lg">
        Replace this with the client&apos;s service groups, supporting details, and clear calls to action for each offer.
      </p>
    </main>
  )
}

export default ServicesPage
