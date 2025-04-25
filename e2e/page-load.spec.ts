import { SITE_SLUGS } from "@/config/siteConfig"
import { test, expect } from "@playwright/test"

// List of all pages to test
function flattenSlugs(obj: Record<string, string | Record<string, string>>): string[] {
  return Object.values(obj).flatMap((value) => (typeof value === "string" ? [value] : flattenSlugs(value)))
}

const pages = flattenSlugs(SITE_SLUGS)

test.describe("Page load tests", () => {
  for (const path of pages) {
    test(`should load ${path} page correctly`, async ({ page }) => {
      // Navigate to the page
      const response = await page.goto(`${path}`)

      // Verify the page loaded with 200 status
      expect(response?.status()).toBe(200)

      // Wait for the page to be fully loaded
      await page.waitForLoadState("domcontentloaded")

      // Check that the page has content - minimum validation
      const body = page.locator("body")
      await expect(body).toBeVisible()
    })
  }
})
