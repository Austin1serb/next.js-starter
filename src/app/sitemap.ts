import type { MetadataRoute } from "next"
import { ALL_PAGES, DOMAIN_URL } from "@/config/site-config"

const IGNORE_ROUTES = ["/terms-of-service", "/privacy-policy"]

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date()

  const internalRoutes = ALL_PAGES.filter(
    (url) => !url.startsWith("http") && !url.includes("#") && !IGNORE_ROUTES.includes(url)
  )

  return internalRoutes.map((url) => ({
    url: new URL(url, DOMAIN_URL).toString(),
    lastModified: buildDate,
    priority: url === "/" ? 1 : 0.8,
    changeFrequency: url === "/" ? "daily" : "weekly",
  }))
}
