import { bodyAttributes } from "@zero-ui/attributes"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { DOMAIN_URL, SITE_CONFIG } from "@/config/site-config"
import { Footer } from "./components/footer"
import { MotionWrapper } from "@/utils/motion-wrapper"
import { LazyUi } from "./components/lazy-ui"
import { TopBar } from "./components/top-bar/top-bar"
import { ZeroUiRuntime } from "@/utils/init-zero-runtime"
import { siteGraph } from "@/config/schemas"

const geistSans = Geist({
  variable: "--font-primary",
  subsets: ["latin"],
})
const geistMono = Geist_Mono({
  variable: "--font-secondary",
  subsets: ["latin"],
})
export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN_URL),
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <script id="structured-data-graph" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }} />
      <MotionWrapper>
        <body {...bodyAttributes} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <TopBar />
          <LazyUi />
          {children}
          <Footer />
          <ZeroUiRuntime />
        </body>
      </MotionWrapper>
    </html>
  )
}
