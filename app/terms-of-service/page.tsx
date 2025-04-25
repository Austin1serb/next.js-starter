import { SITE_NAP, SITE_CONFIG, SITE_SLUGS } from "@/config/siteConfig"
import { Terms } from "./Terms"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: SITE_CONFIG.title + " - Terms of Service",
  description: "Read the terms of service for " + SITE_CONFIG.title,
  alternates: {
    canonical: SITE_SLUGS.terms,
  },
}

const Page: React.FC = () => {
  return (
    <Terms
      accentColor="--primary"
      fullCompanyName={SITE_NAP.name}
      fullWebAddress={SITE_CONFIG.url}
      contact={{
        name: SITE_NAP.contact,
        title: SITE_NAP.contactTitle,
        phone: SITE_NAP.phone,
        email: SITE_NAP.email,
      }}
    />
  )
}
export default Page
