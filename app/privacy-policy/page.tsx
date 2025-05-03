import { SITE_CONFIG, SITE_NAP, SITE_SLUGS } from "@/config/siteConfig"
import { Privacy } from "./PrivacyPolicy"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the privacy policy for " + SITE_CONFIG.title,
  alternates: {
    canonical: SITE_SLUGS.privacy,
  },
}

const Page: React.FC = () => {
  return (
    <Privacy
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
