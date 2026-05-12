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
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 pt-28 pb-16">
      <h1 className="text-foreground text-4xl font-bold">Contact</h1>
      <p className="text-foreground/80 mt-4 max-w-2xl text-lg">
        Use this page for the contact form, direct phone and email details, and a simple next step for leads who are ready to reach out.
      </p>
    </main>
  )
}

export default ContactPage
