import type { MetadataRoute } from "next"
import { DOMAIN_URL, SITE_SLUGS } from "@/config/site-config"

const IGNORE_ROUTES = ["/terms-of-service", "/privacy-policy"]

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date()

  const internalRoutes = Object.values(SITE_SLUGS)
    .flatMap((value): string[] => (typeof value === "string" ? [value] : Object.values(value)))
    .filter((url) => !url.startsWith("http") && !url.includes("#") && !IGNORE_ROUTES.includes(url))

  return internalRoutes.map((url) => ({
    url: new URL(url, DOMAIN_URL).toString(),
    lastModified: buildDate,
    priority: url === "/" ? 1 : 0.8,
    changeFrequency: url === "/" ? "daily" : "weekly",
  }))
}
