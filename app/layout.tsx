import { bodyAttributes } from "@zero-ui/attributes"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { DOMAIN_URL, SITE_CONFIG } from "@/config/siteConfig"
import { TopBar } from "./components/TopBar/TopBar"
import { Footer } from "./components/Footer"
import { MotionWrapper } from "@/utils/motion-wrapper"
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
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.title}`,
  },
  description: SITE_CONFIG.description,
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <MotionWrapper>
        <body {...bodyAttributes} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <TopBar />
          {children}
          <Footer />
        </body>
      </MotionWrapper>
    </html>
  )
}
