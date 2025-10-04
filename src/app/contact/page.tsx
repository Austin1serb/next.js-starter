import { SITE_SLUGS } from "@/config/site-config"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact",
  alternates: {
    canonical: SITE_SLUGS.contact,
  },
}
const ContactPage: React.FC = () => {
  return <div>Contact</div>
}

export default ContactPage
