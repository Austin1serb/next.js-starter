import { expect, test } from "@playwright/test"
import { ALL_PAGES, SITE_NAP } from "@/config/site-config"

for (const path of ALL_PAGES) {
  test(`configured route ${path} exists`, async ({ request }) => {
    const response = await request.get(path)
    expect(response.status()).toBe(200)
  })
}

test("every sitemap entry resolves to an existing page", async ({ request }) => {
  const response = await request.get("/sitemap.xml")
  expect(response.ok()).toBe(true)
  const xml = await response.text()
  const locations = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/gu), (match) => new URL(match[1]))
  expect(locations.length).toBeGreaterThan(0)
  for (const url of locations) {
    const page = await request.get(url.pathname)
    expect(page.status(), url.pathname).toBe(200)
  }
})

test("configured logo, sharing image, and favicon are real images", async ({ request }) => {
  const images = new Set([SITE_NAP.logo, ...SITE_NAP.images, SITE_NAP.favicon])
  for (const image of images) {
    const response = await request.get(new URL(image).pathname)
    expect(response.status(), image).toBe(200)
    expect(response.headers()["content-type"]).toMatch(/^image\//u)
  }
})
