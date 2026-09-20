import type { Metadata } from "next"
import { SITE_SLUGS } from "@/config/site-config"
import { ContactForm } from "./contact-form"
import { getTurnstileSiteKey } from "./utils/turnstile"

// Keep the widget's enabled state in sync with the server's runtime secret configuration.
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact",
  alternates: {
    canonical: SITE_SLUGS.contact,
  },
}
const ContactPage: React.FC = () => {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 pt-28 pb-16">
      <h1 className="font-bold text-4xl text-foreground">Contact</h1>
      <p className="mt-4 max-w-2xl text-foreground/80 text-lg">
        Tell us how we can help. We&apos;ll get back to you soon.
      </p>
      <ContactForm turnstileSiteKey={getTurnstileSiteKey()} />
    </main>
  )
}

export default ContactPage
