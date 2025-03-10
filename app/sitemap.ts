import type { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"
import fs from "fs"
import path from "path"

export async function getRoutes(): Promise<string[]> {
  const appDir = path.join(process.cwd(), "app")
  const entries = fs.readdirSync(appDir, { withFileTypes: true })

  const pages = entries
    .filter((entry) => entry.isDirectory()) // Only look at directories
    .filter((entry) => {
      // Check if `page.tsx` exists inside the directory
      return fs.existsSync(path.join(appDir, entry.name, "page.tsx"))
    })
    .map((entry) => {
      // Convert folder names into route paths
      return `/${entry.name}`
    })

  // Ensure `/` is always included
  return ["/", ...pages]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = await getRoutes() // Get all static and dynamic pages

  return staticPages.map((page) => ({
    url: `${siteConfig.url}${page}`,
    lastModified: new Date().toISOString(),
    priority: page === "/" ? 1.0 : 0.8, // Prioritize homepage
  }))
}
