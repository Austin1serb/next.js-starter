import { siteNAP, siteConfig } from "@/config/siteConfig"
import { Terms } from "./Terms"

const page: React.FC = () => {
  return (
    <Terms
      accentColor="--primary"
      fullCompanyName={siteNAP.name}
      fullWebAddress={siteConfig.url}
      contact={{
        name: siteNAP.contact,
        title: siteNAP.contactTitle,
        phone: siteNAP.phone,
        email: siteNAP.email,
      }}
    />
  )
}
export default page
