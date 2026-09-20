import type { Metadata } from "next"
import { SITE_SLUGS } from "@/config/site-config"

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
        Use this page for the contact form, direct phone and email details, and a simple next step
        for leads who are ready to reach out.
      </p>
    </main>
  )
}

export default ContactPage
