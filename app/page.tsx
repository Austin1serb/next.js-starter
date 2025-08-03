import { SITE_CONFIG } from "@/config/siteConfig"
import type { Metadata } from "next"
import { Icon } from "./components/ui/Icon"
import { ActivitySquare, SquareActivity } from "lucide-react"

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  alternates: {
    canonical: SITE_CONFIG.url,
  },
}

const Home: React.FC = () => {
  return (
    <div className="flex-center py-40 text-8xl font-black uppercase">
      NEXT.js Starter
      <button className="**:rounded-lg **:bg-blue-500 **:text-white flex gap-2">
        <Icon name="Apple" className="h-20 w-20" />
        <Icon name="AArrowDown" className="h-20 w-20" />
        <Icon name="AArrowUp" className="h-20 w-20" />
        <Icon name="ALargeSmall" className="h-20 w-20" />
        <Icon name="Accessibility" className="h-20 w-20" />
        <Icon name="Activity" className="h-20 w-20" />
        <Icon name="SquareActivity" className="h-20 w-20" />
        <Icon name="AlarmClock" className="h-20 w-20" />
        <Icon name="AlignJustify" className="h-20 w-20" />
        <Icon name="AlignLeft" className="h-20 w-20" />
        <Icon name="AlignRight" className="h-20 w-20" />
        <Icon name="Angry" className="h-20 w-20" />
        <Icon name="ArrowDown" className="h-20 w-20" />
        <Icon name="ArrowUp" className="h-20 w-20" />
        <Icon name="ArrowUpLeft" className="h-20 w-20" />
        <Icon name="ArrowUpRight" className="h-20 w-20" />
        <Icon name="ArrowDownLeft" className="h-20 w-20" />
        <Icon name="ArrowDownRight" className="h-20 w-20" />
        <Icon name="ArrowLeft" className="h-20 w-20" />
        <Icon name="ArrowRight" className="h-20 w-20" />
        <Icon name="ArrowUpLeft" className="h-20 w-20" />
        <Icon name="ArrowUpRight" className="h-20 w-20" />
        <Icon name="Clock" className="h-20 w-20" />
        <Icon name="Clock1" className="h-20 w-20" />
        <Icon name="Clock10" className="h-20 w-20" />
        <Icon name="Clock11" className="h-20 w-20" />
        <Icon name="Mail" className="h-20 w-20" />
        <Icon name="Figma" className="h-20 w-20" />
        Contact
      </button>
    </div>
  )
}
export default Home
