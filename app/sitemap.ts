import { siteConfig } from "@/config/site"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic routes, e.g., from an API or database
  const response = await fetch(`${siteConfig.url}/api/posts`)
  const posts = await response.json()

  // Map posts to sitemap entries
  const postUrls = posts.map((post: { slug: string }) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  // Combine static and dynamic routes
  return [
    {
      url: siteConfig.url,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...postUrls,
  ]
}
