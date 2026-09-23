import type { Metadata } from "next"
import Link from "next/link"
import { homeContent } from "@/app/cms/home"
import { DOMAIN_URL, SITE_CONFIG } from "@/config/site-config"

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  alternates: {
    canonical: DOMAIN_URL,
  },
}

const Home: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
      <h1 className="text-foreground text-hero">
        {homeContent.heading.text} <br />
        <a
          href={homeContent.heading.link.href}
          className="text-primary transition-colors hover:text-primary/90"
        >
          {homeContent.heading.link.label}
        </a>
      </h1>
      <p className="mt-6 max-w-2xl text-base text-foreground/80 sm:text-lg">
        {homeContent.description}
      </p>
      <Link
        href={homeContent.cta.href}
        className="text-primary transition-colors hover:text-primary/90"
      >
        {homeContent.cta.label}
      </Link>
    </main>
  )
}
export default Home
