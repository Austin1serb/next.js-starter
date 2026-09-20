// biome-ignore lint/correctness/noUndeclaredDependencies: tsconfig maps this alias to generated .zero-ui/attributes.js.
import { bodyAttributes } from "@zero-ui/attributes"
import type { Metadata } from "next"
import { Inter_Tight } from "next/font/google"
import "./globals.css"
import { siteGraph } from "@/config/schemas"
import { DOMAIN_URL, SITE_CONFIG } from "@/config/site-config"
import { ZeroUiRuntime } from "@/lib/init-zero-runtime"
import { MotionWrapper } from "@/lib/motion-wrapper"
import { LazyUi } from "./components/lazy-ui"
import { PreloadResources } from "./preload-resources"

const displayFont = Inter_Tight({
  variable: "--font-primary",
  subsets: ["latin"],
})
const bodyFont = Inter_Tight({
  variable: "--font-secondary",
  subsets: ["latin"],
})

// const monoFont = DM_Sans({
//   variable: "--font-mono",
//   subsets: ["latin"],
// })

export const metadata: Metadata = {
  // TODO: Update DOMAIN_URL upon deployment or opengraph image+sitemap+canonical will break
  metadataBase: new URL(DOMAIN_URL),
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <MotionWrapper>
        <body
          {...bodyAttributes}
          className={`${displayFont.variable} ${bodyFont.variable} bg-background font-body text-foreground antialiased`}
        >
          <script
            id="structured-data-graph"
            type="application/ld+json"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires raw JSON; HTML delimiters are escaped.
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(siteGraph).replace(/</gu, "\\u003c"),
            }}
          />
          <PreloadResources />
          <LazyUi />
          {children}
          <ZeroUiRuntime />
        </body>
      </MotionWrapper>
    </html>
  )
}
