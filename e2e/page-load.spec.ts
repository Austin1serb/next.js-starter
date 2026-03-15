import { test, expect } from "@playwright/test"
import { ROUTES_TO_CHECK } from "./test-utils"

test.describe("Page load tests", () => {
  for (const pageUrl of ROUTES_TO_CHECK) {
    test(`should load ${pageUrl} page correctly`, async ({ page }) => {
      const response = await page.goto(pageUrl, { waitUntil: "domcontentloaded" })

      expect(response?.status()).toBe(200)

      await page.waitForLoadState("networkidle")

      await expect(page.locator("body")).toBeVisible()
      await expect(page.locator("main, [role='main'], article, h1").first()).toBeVisible()
    })
  }
})
