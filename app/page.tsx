import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
  alternates: {
    canonical: "/",
  },
}

const Home: React.FC = () => {
  return <div className="flex-center py-40 text-8xl font-black uppercase">NEXT.js Starter</div>
}
export default Home
