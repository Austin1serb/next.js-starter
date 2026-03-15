import { test, expect, type APIResponse, type Page } from "@playwright/test"
import { ROUTES_TO_CHECK, SITE_ORIGIN, isAllowedExternalStatus, isExternalUrl, mapWithConcurrency } from "./test-utils"

const LINK_TIMEOUT_MS = 10_000
const LINK_CONCURRENCY = 8

interface LinkCheckResult {
  url: string
  ok: boolean
  status: number | undefined
  reason: string | undefined
}

async function getAllLinksFromPage(page: Page): Promise<string[]> {
  const hrefs = await page.locator("a[href]").evaluateAll((links) =>
    links
      .map((link) => link.getAttribute("href"))
      .filter((href): href is string => Boolean(href && !href.startsWith("mailto:") && !href.startsWith("tel:") && !href.startsWith("javascript:")))
  )

  return Array.from(new Set(hrefs.map((href) => new URL(href, page.url()).href)))
}

async function fetchLink(page: Page, url: string): Promise<APIResponse> {
  const headResponse = await page.request.fetch(url, {
    method: "HEAD",
    maxRedirects: 5,
    timeout: LINK_TIMEOUT_MS,
    failOnStatusCode: false,
  })

  if (headResponse.status() < 400 && headResponse.status() !== 405) {
    return headResponse
  }

  return page.request.get(url, {
    maxRedirects: 5,
    timeout: LINK_TIMEOUT_MS,
    failOnStatusCode: false,
  })
}

async function validateLink(page: Page, url: string): Promise<LinkCheckResult> {
  try {
    const parsedUrl = new URL(url)
    const response = await fetchLink(page, url)
    const status = response.status()

    if (isExternalUrl(parsedUrl)) {
      return {
        url,
        ok: isAllowedExternalStatus(status),
        status,
        reason: isAllowedExternalStatus(status) ? undefined : `External link returned ${status}`,
      }
    }

    return {
      url,
      ok: status >= 200 && status < 400,
      status,
      reason: status >= 200 && status < 400 ? undefined : `Internal link returned ${status}`,
    }
  } catch (error) {
    return {
      url,
      ok: false,
      status: undefined,
      reason: error instanceof Error ? error.message : String(error),
    }
  }
}

for (const pageUrl of ROUTES_TO_CHECK) {
  test(`Validate links on ${pageUrl}`, async ({ page }) => {
    test.setTimeout(90_000)

    await page.goto(pageUrl, { waitUntil: "networkidle" })
    const linkUrls = await getAllLinksFromPage(page)

    const internalLinks = linkUrls.filter((url) => new URL(url).origin === SITE_ORIGIN)
    const externalLinks = linkUrls.filter((url) => new URL(url).origin !== SITE_ORIGIN)

    const [internalResults, externalResults] = await Promise.all([
      mapWithConcurrency(internalLinks, LINK_CONCURRENCY, (url) => validateLink(page, url)),
      mapWithConcurrency(externalLinks, LINK_CONCURRENCY, (url) => validateLink(page, url)),
    ])

    const failures = internalResults.filter((result) => !result.ok)
    const externalWarnings = externalResults.filter((result) => !result.ok)

    if (externalWarnings.length > 0) {
      console.warn(
        `External link warnings on ${pageUrl}:\n${externalWarnings
          .map((warning) => {
            const statusText = warning.status ? ` (status ${warning.status})` : ""
            return `${warning.url}${statusText}: ${warning.reason ?? "Unknown failure"}`
          })
          .join("\n")}`
      )
    }

    expect(
      failures,
      failures
        .map((failure) => {
          const statusText = failure.status ? ` (status ${failure.status})` : ""
          return `${failure.url}${statusText}: ${failure.reason ?? "Unknown failure"}`
        })
        .join("\n")
    ).toEqual([])
  })
}
