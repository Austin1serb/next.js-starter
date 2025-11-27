import { SITE_NAP, DOMAIN_URL } from "@/config/site-config"
import { Terms } from "./terms"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAP.name}`,
  description: `Read our Terms of Service to learn about the rules and regulations for accessing and using the ${SITE_NAP.name} website.`,
  keywords: ["terms of service", "terms and conditions"],
  alternates: {
    canonical: `${DOMAIN_URL}/terms-of-service`,
  },
  robots: { index: false, follow: true },
}
const Page: React.FC = () => {
  return (
    <Terms
      accentColor="--primary"
      fullCompanyName={SITE_NAP.name}
      fullWebAddress={DOMAIN_URL}
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
