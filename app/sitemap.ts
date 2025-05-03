import { SITE_SLUGS, SITE_CONFIG } from "@/config/siteConfig"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const flatSlugs = Object.values(SITE_SLUGS).flatMap((val) => (typeof val === "string" ? [val] : Object.values(val)))

  const allRoutes = [...flatSlugs]

  return allRoutes.map((url) => ({
    url: SITE_CONFIG.url + url,
    lastModified: new Date().toISOString(),
    priority: url === "/" ? 1.0 : 0.8,
  }))
}
