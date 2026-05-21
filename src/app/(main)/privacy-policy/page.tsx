import { SITE_NAP, SITE_SLUGS } from "@/config/site-config"
import type { Metadata } from "next"
import PrivacyPolicy from "./privacy-policy.mdx"

export const metadata: Metadata = {
  title: `${SITE_NAP.name} | Privacy Policy`,
  description: `Privacy Policy for ${SITE_NAP.name}`,
  alternates: {
    canonical: SITE_SLUGS.privacy,
  },
  robots: { index: false, follow: true },
}

const Page: React.FC = () => {
  return (
    <LegalPageShell>
      <PrivacyPolicy />
    </LegalPageShell>
  )
}
export default Page

export const LegalPageShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-background relative mx-auto w-full px-5 pt-20 pb-20 sm:px-10 lg:px-20">
      <article className="font-body mx-auto w-full max-w-5xl leading-7 [&_a]:underline [&_a]:underline-offset-4 [&_h1]:mb-6 [&_h1]:text-4xl [&_h1]:leading-tight [&_h1]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:my-2 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_strong]:font-bold [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6">
        {children}
      </article>
    </main>
  )
}
