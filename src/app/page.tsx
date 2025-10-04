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
  return <div className="flex-center text-surface mx-auto h-full w-full pt-20 text-center text-8xl font-black uppercase">NEXT.js Starter</div>
}
export default Home
