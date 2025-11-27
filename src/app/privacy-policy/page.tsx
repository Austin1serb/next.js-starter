import { SITE_NAP, DOMAIN_URL, SITE_SLUGS } from "@/config/site-config"
import { Privacy } from "./privacy-policy"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAP.name}`,
  description:
    "We value your privacy. Please read this Privacy Policy carefully before using the Website operated by us as this Privacy Policy contains important information regarding your privacy and how we may use the information we collect about you.",
  keywords: "privacy policy, privacy, policy, data protection, data privacy, data security",
  alternates: {
    canonical: SITE_SLUGS.privacy,
  },
  robots: { index: false, follow: true },
}
const Page: React.FC = () => {
  return (
    <Privacy
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
