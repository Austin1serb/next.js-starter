import type { Metadata } from "next"
import { SITE_SLUGS } from "@/config/siteConfig"

export const metadata: Metadata = {
  title: "Services",
  description: "Services",
  alternates: {
    canonical: SITE_SLUGS.services,
  },
}

const ServicesPage: React.FC = () => {
  return <div>Services</div>
}

export default ServicesPage
