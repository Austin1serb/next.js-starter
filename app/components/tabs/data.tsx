import Image, { type StaticImageData } from "next/image"
import { TintSimulator } from "./TintSimulator"
import designBlack from "./assets/design-black.webp"
import assetsBlack from "./assets/assets-black.webp"
import searchBlack from "./assets/search-black.webp"
import notepadBlack from "./assets/notepad-black.webp"
import toolBlack from "./assets/tool-black.webp"
import brandImages from "./brand-images.jpg"
import competitorAnalysis from "./competitor-analysis.png"
import tintLawArticle from "./washington-vehicle-tint-law-illustration.webp"

export interface Phase {
  id: number
  title: string
  subtitle: string
  description: string
  details: string[]
  icon: StaticImageData
  feature: React.ReactNode
}

interface Props {
  id: number
  title: string
  subtitle: string
  description: string
  details: string[]
  icon: StaticImageData
  feature: React.ReactNode
}

export const phases: Props[] = [
  {
    id: 1,
    title: "Design System",
    subtitle: "Beautiful High-Converting Design",
    description:
      "Created a stunning design system that showcases amazing reviews while maintaining a slightly rebellious edge through strategic use of clip paths and angular elements.",
    details: [
      "Implemented clip-path CSS for edgy, non-traditional section borders",
      "Designed around extensive customer reviews and testimonials",
      "Created a cohesive design system with rebel aesthetic touches",
      "Incorporated angular elements instead of traditional straight lines",
    ],
    icon: designBlack,
    feature: (
      <div className="absolute inset-0 h-full w-full bg-white">
        <Image src={brandImages} alt="Competitor Analysis" fill className="object-contain py-5" />
      </div>
    ),
  },
  {
    id: 2,
    title: "Quality Assets",
    subtitle: "Premium Visual Content",
    description:
      "Developed stunning HD videos and high-quality images with crystal-clear call-to-actions strategically placed throughout the entire user journey.",
    details: [
      "Professional HD video content showcasing services",
      "High-resolution photography of completed work",
      "Strategic placement of clear call-to-action buttons",
      "Optimized media for fast loading times",
      "Created visual hierarchy to guide user attention",
    ],
    icon: assetsBlack,
    feature: (
      <video className="hero-section absolute inset-0 h-full w-full object-cover saturate-200" muted loop preload="metadata" autoPlay playsInline>
        <source src="/videos/clip-450.mp4" type="video/mp4" media="(max-width: 450px)" />
        <source src="/videos/clip-600.mp4" type="video/mp4" media="(max-width: 600px) and (min-width: 451px)" />
        <source src="/videos/clip-1200.mp4" type="video/mp4" media="(min-width: 601px) and (max-width: 1023px)" />
        <source src="/videos/clip.mp4" type="video/mp4" media="(min-width: 1024px)" />
        Your browser does not support the video tag.
      </video>
    ),
  },
  {
    id: 3,
    title: "Competitor Analysis",
    subtitle: "Traffic Generation Strategy",
    description: "Reverse-engineered competitor content and identified high-traffic keywords to build a content strategy that dominates local search results.",
    details: [
      "Analyzed top 5 competitors in the Bellevue area",
      "Used advanced SEO tools to identify high-traffic keywords",
      "Reverse-engineered successful competitor content strategies",
      "Built site copy around proven keyword opportunities",
      "Implemented technical SEO best practices",
    ],
    icon: searchBlack,
    feature: <Image src={competitorAnalysis} alt="Competitor Analysis" fill className="object-contain" />,
  },
  {
    id: 4,
    title: "Content & Blog",
    subtitle: "Authority Building Through Education",
    description:
      "Created comprehensive blog content focusing on Washington State tint laws - the #1 traffic driver - with legal citations and expert insights.",
    details: [
      "Researched and wrote detailed tint law articles",
      "Answered every possible question about WA state regulations",
      "Used high-quality citations from legal websites",
      "Created evergreen content that drives consistent traffic",
      "Established the business as the local authority on tinting",
    ],
    icon: notepadBlack,
    feature: <Image src={tintLawArticle} alt="Tint Law Article" fill className="object-contain" />,
  },
  {
    id: 5,
    title: "Interactive Tools",
    subtitle: "Window Tint Simulator",
    description: "Developed a custom window tint simulator allowing users to visualize different tint percentages in real-time - a unique engagement tool.",
    details: [
      "Built custom slider-based tint percentage simulator",
      "Real-time visual feedback for different tint levels",
      "Interactive tool increases user engagement and time on site",
      "Unique differentiator from competitors + SEO benefit",
    ],
    icon: toolBlack,
    feature: <TintSimulator className="h-full w-full" />,
  },
]
