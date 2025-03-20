import { siteConfig, siteNAP } from "@/config/siteConfig"
import { Privacy } from "./PrivacyPolicy"
const Page: React.FC = () => {
  return (
    <Privacy
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
export default Page
