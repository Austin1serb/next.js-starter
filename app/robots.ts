import type { MetadataRoute } from "next"
import { DOMAIN_URL } from "@/config/siteConfig"
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${DOMAIN_URL}/sitemap.xml`,
  }
}
