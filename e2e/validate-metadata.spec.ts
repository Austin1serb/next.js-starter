import { test, expect } from "@playwright/test"
import { ROUTES_TO_CHECK } from "./test-utils"

function normalizeCanonicalPath(pathname: string, search: string): string {
  const combined = `${pathname}${search}`
  if (!combined || combined === "/") return "/"
  return combined.endsWith("/") ? combined.slice(0, -1) : combined
}

test.describe("Validate metadata", () => {
  for (const pageUrl of ROUTES_TO_CHECK) {
    test(`should have metadata for ${pageUrl}`, async ({ page }) => {
      await page.goto(pageUrl)

      const title = await page.title()
      const description = await page.evaluate(() => document.querySelector('meta[name="description"]')?.getAttribute("content"))
      const canonical = await page.evaluate(() => document.querySelector('link[rel="canonical"]')?.getAttribute("href"))
      const canonicalUrl = canonical ? new URL(canonical) : null

      expect(title.trim().length).toBeGreaterThan(0)
      expect(description?.trim().length ?? 0).toBeGreaterThan(0)
      expect(canonical?.trim().length ?? 0).toBeGreaterThan(0)
      expect(canonicalUrl).not.toBeNull()
      expect(canonicalUrl?.protocol).toMatch(/^https?:$/)
      expect(normalizeCanonicalPath(canonicalUrl?.pathname ?? "", canonicalUrl?.search ?? "")).toBe(normalizeCanonicalPath(pageUrl, ""))
    })
  }
})
