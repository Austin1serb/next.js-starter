// app/sitemap.ts
import type { MetadataRoute } from "next"
import fs from "fs"
import path from "path"

const siteConfig = {
  url: "https://example.com",
}

// Recursively collect all pages with `page.tsx` or `page.jsx`
async function getStaticRoutes(dir = "app", parentPath = ""): Promise<string[]> {
  const currentDir = path.join(process.cwd(), dir)
  const entries = fs.readdirSync(currentDir, { withFileTypes: true })

  let routes: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name)

    if (entry.isDirectory()) {
      const routePath = path.join(parentPath, entry.name)

      // Check if this directory has a page.tsx or page.jsx file
      const hasPage = ["page.tsx", "page.jsx"].some((file) => fs.existsSync(path.join(fullPath, file)))

      if (hasPage) {
        routes.push(`/${routePath}`)
      }

      // Continue scanning nested folders recursively
      const nestedRoutes = await getStaticRoutes(path.join(dir, entry.name), routePath)
      routes = routes.concat(nestedRoutes)
    }
  }

  return parentPath === "" ? ["/", ...routes] : routes
}

//--------- Uncomment this block if you have dynamic routes ---------
// Get dynamic routes by calling `generateStaticParams` from dynamic pages

// async function getDynamicRoutes(): Promise<string[]> {
//   try {
//     const { generateStaticParams } = await import("./blog/[slug]/page")
//     const params = await generateStaticParams()
//     return params.map((route: { slug: string }) => `/blog/${route.slug}`)
//   } catch (error) {
//     console.error("Error loading dynamic routes:", error)
//     return [] // Return empty array on error
//   }
// }

// -------------------------------------------------------------------

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ---------- Uncomment this block if you have dynamic routes ----------
  // const [staticRoutes, dynamicRoutes] = await Promise.all([getStaticRoutes(), getDynamicRoutes()])
  // const allRoutes = [...staticRoutes, ...dynamicRoutes]
  // ----------------------------------------------------------------

  const allRoutes = await getStaticRoutes()

  return allRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
    priority: route === "/" ? 1 : 0.8,
  }))
}
