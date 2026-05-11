import { bodyAttributes } from "@zero-ui/attributes"
import type { Metadata } from "next"
import { Inter_Tight } from "next/font/google"
import "./globals.css"
import { DOMAIN_URL, SITE_CONFIG } from "@/config/site-config"
import { MotionWrapper } from "@/utils/motion-wrapper"
import { LazyUi } from "./components/lazy-ui"
import { ZeroUiRuntime } from "@/utils/init-zero-runtime"
import { siteGraph } from "@/config/schemas"

const displayFont = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
})
const sansFont = Inter_Tight({
  variable: "--font-body",
  subsets: ["latin"],
})

// const monoFont = DM_Sans({
//   variable: "--font-mono",
//   subsets: ["latin"],
// })

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN_URL),
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <MotionWrapper>
        <body {...bodyAttributes} className={`${displayFont.variable} ${sansFont.variable} antialiased`}>
          <script id="structured-data-graph" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }} />
          <LazyUi />
          {children}
          <ZeroUiRuntime />
        </body>
      </MotionWrapper>
    </html>
  )
}
