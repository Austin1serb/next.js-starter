import type { Metadata } from "next"
import { SITE_SLUGS } from "@/config/site-config"

export const metadata: Metadata = {
  title: "About",
  description: "About",
  alternates: {
    canonical: SITE_SLUGS.about,
  },
}

const Page: React.FC = () => {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 pt-28 pb-16">
      <h1 className="text-surface text-4xl font-bold">About</h1>
      <p className="text-surface/80 mt-4 max-w-2xl text-lg">
        Replace this section with the company story, why the team is qualified, and the proof points that build trust for a new client site.
      </p>
    </main>
  )
}

export default Page
