import { SITE_NAP, SITE_SLUGS } from "@/config/site-config"
import type { Metadata } from "next"
import TermsOfService from "./terms.mdx"
import { LegalPageShell } from "../privacy-policy/page"

export const metadata: Metadata = {
  title: `${SITE_NAP.name} | Terms of Service`,
  description: `Terms of Service for ${SITE_NAP.name}`,
  alternates: {
    canonical: SITE_SLUGS.terms,
  },

  robots: { index: false, follow: true },
}

const page: React.FC = () => {
  return (
    <LegalPageShell>
      <TermsOfService />
    </LegalPageShell>
  )
}
export default page
