import { SITE_CONFIG, DOMAIN_URL } from "@/config/site-config"
import type { Metadata } from "next"

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
        <a href="https://www.serbyte.net/" className="text-primary hover:text-primary-hover transition-colors">
          Serbyte Development
        </a>
      </h1>
      <p className="text-foreground/80 mt-6 max-w-2xl text-base sm:text-lg">
        Starter homepage for a service business website. Replace this with the client hero, trust signals, and primary call to action.
      </p>
    </main>
  )
}
export default Home
