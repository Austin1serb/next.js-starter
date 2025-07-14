import { SITE_CONFIG } from "@/config/siteConfig"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
  alternates: {
    canonical: SITE_CONFIG.url,
  },
}

const Home: React.FC = () => {
  return <div className="flex-center py-40 text-8xl font-black uppercase">NEXT.js Starter</div>
}
export default Home
