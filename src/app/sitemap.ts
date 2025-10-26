import { SITE_SLUGS, DOMAIN_URL } from "@/config/site-config"
import type { MetadataRoute } from "next"
import { execSync } from "child_process"
import { existsSync } from "fs"

/**
 * Convert a route to its corresponding file path in the Next.js app directory
 * Examples:
 *   "/" -> "app/page.tsx"
 *   "/about" -> "app/about/page.tsx"
 *   "/blog/post" -> "app/blog/post/page.tsx"
 */
function routeToFilePath(route: string): string {
  if (route === "/") return "app/page.tsx"

  // Remove leading slash and convert to app directory structure
  const cleanRoute = route.replace(/^\//, "")
  const possiblePaths = [`app/${cleanRoute}/page.tsx`, `app/${cleanRoute}/page.ts`, `app/${cleanRoute}.tsx`, `app/${cleanRoute}.ts`]

  // Check which file actually exists
  for (const path of possiblePaths) {
    if (existsSync(path)) {
      return path
    }
  }

  // Default to the most common structure
  return `app/${cleanRoute}/page.tsx`
}

/**
 * Get the last git commit date for a file
 * Falls back to current date if git is unavailable or file has no history
 */
function getLastModifiedDate(filePath: string): string {
  try {
    const gitCommand = `git log -1 --format=%cI -- ${filePath}`
    const lastCommitDate = execSync(gitCommand, { encoding: "utf-8" }).trim()
    return lastCommitDate || new Date().toISOString()
  } catch (error) {
    console.warn("Unable to get last modified date, falling back to current date:", error)
    // If git command fails (not in a git repo, file doesn't exist, etc.)
    // fall back to current date
    return new Date().toISOString()
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const flatSlugs = Object.values(SITE_SLUGS).flatMap((val): string[] => (typeof val === "string" ? [val] : Object.values(val)))

  // Filter out external URLs, hash links, and administrative pages
  const internalRoutes = flatSlugs.filter((url) => {
    return !url.startsWith("http") && !url.includes("#") && !url.includes("/terms-of-service") && !url.includes("/privacy-policy")
  })

  return internalRoutes.map((url) => {
    const filePath = routeToFilePath(url)
    const lastModified = getLastModifiedDate(filePath)

    return {
      url: DOMAIN_URL + url,
      lastModified,
      priority: url === "/" ? 1.0 : 0.8,
      changeFrequency: url === "/" ? ("daily" as const) : ("weekly" as const),
    }
  })
}
