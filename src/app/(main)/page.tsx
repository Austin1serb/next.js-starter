import type { Metadata } from "next"
import Link from "next/link"
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
        Next.js Starter by <br />
        <a
          href="https://www.serbyte.net/"
          className="text-primary transition-colors hover:text-primary-hover"
        >
          Serbyte Development
        </a>
      </h1>
      <p className="mt-6 max-w-2xl text-base text-foreground/80 sm:text-lg">
        Starter homepage for a service business website.
      </p>
      <Link
        href="/design-preview"
        className="text-primary transition-colors hover:text-primary-hover"
      >
        View Design Preview
      </Link>
    </main>
  )
}
export default Home
