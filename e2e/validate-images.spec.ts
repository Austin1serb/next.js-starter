import { test, expect, type Page } from "@playwright/test"
import { ROUTES_TO_CHECK } from "./test-utils"

interface ImageIssue {
  src: string
  pageUrl: string
  reason: string
}

interface ImageSnapshot {
  src: string
  currentSrc: string
  alt: string | null
  complete: boolean
  naturalWidth: number
  naturalHeight: number
  visible: boolean
  renderedWidth: number
  renderedHeight: number
  ariaHidden: boolean
  withinAriaHidden: boolean
  role: string | null
  hasLabeledParent: boolean
}

async function scrollThroughPage(page: Page) {
  await page.waitForLoadState("networkidle")
}

async function getImageSnapshots(page: Page): Promise<ImageSnapshot[]> {
  const images = page.locator("img")
  const count = await images.count()
  const snapshots: ImageSnapshot[] = []

  for (let index = 0; index < count; index += 1) {
    const image = images.nth(index)
    await image.scrollIntoViewIfNeeded().catch(() => null)

    const snapshot = await image.evaluate(async (node) => {
      const image = node as HTMLImageElement

      if (!image.complete) {
        await new Promise<void>((resolve) => {
          const done = () => resolve()
          image.addEventListener("load", done, { once: true })
          image.addEventListener("error", done, { once: true })
          window.setTimeout(done, 1000)
        })
      }

      const rect = image.getBoundingClientRect()
      const style = window.getComputedStyle(image)
      const parent = image.closest("a, button, [aria-label], [aria-labelledby]")

      return {
        src: image.getAttribute("src") ?? "",
        currentSrc: image.currentSrc,
        alt: image.getAttribute("alt"),
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        visible: style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0,
        renderedWidth: rect.width,
        renderedHeight: rect.height,
        ariaHidden: image.getAttribute("aria-hidden") === "true",
        withinAriaHidden: Boolean(image.closest('[aria-hidden="true"]')),
        role: image.getAttribute("role"),
        hasLabeledParent: Boolean(
          parent &&
            ((parent.getAttribute("aria-label") ?? "").trim() ||
              (parent.getAttribute("aria-labelledby") ?? "").trim() ||
              (parent.textContent ?? "").trim())
        ),
      }
    })

    snapshots.push(snapshot)
  }

  return snapshots
}

function isDecorative(snapshot: ImageSnapshot): boolean {
  if (snapshot.ariaHidden || snapshot.withinAriaHidden) return true
  if (snapshot.role === "presentation" || snapshot.role === "none") return true
  if (snapshot.alt === "") return true

  const tinyIcon = snapshot.renderedWidth <= 32 && snapshot.renderedHeight <= 32
  if (tinyIcon && snapshot.hasLabeledParent) return true

  return false
}

function isMeaningfulImage(snapshot: ImageSnapshot): boolean {
  if (!snapshot.visible) return false
  if (isDecorative(snapshot)) return false
  return snapshot.renderedWidth >= 32 || snapshot.renderedHeight >= 32
}

function describeImageSource(src: string): string {
  try {
    const parsed = new URL(src, "http://localhost:3000")

    if (parsed.pathname === "/_next/image") {
      const original = parsed.searchParams.get("url")
      if (original) {
        return decodeURIComponent(original)
      }
    }
  } catch {
    // Fall through to raw src when URL parsing fails.
  }

  return src
}

for (const pageUrl of ROUTES_TO_CHECK) {
  test(`Validate rendered images on ${pageUrl}`, async ({ page }) => {
    test.setTimeout(150_000)

    await page.goto(pageUrl, { waitUntil: "networkidle" })
    await scrollThroughPage(page)

    const snapshots = await getImageSnapshots(page)
    const loadFailures: ImageIssue[] = []
    const altFailures: ImageIssue[] = []

    for (const snapshot of snapshots) {
      if (!snapshot.visible) continue

      const rawSrc = snapshot.currentSrc || snapshot.src || "(missing src)"
      const src = describeImageSource(rawSrc)

      if (!isDecorative(snapshot) && (!snapshot.complete || snapshot.naturalWidth <= 0 || snapshot.naturalHeight <= 0 || !snapshot.currentSrc)) {
        loadFailures.push({
          pageUrl,
          src,
          reason: `Image did not finish loading correctly (complete=${snapshot.complete}, natural=${snapshot.naturalWidth}x${snapshot.naturalHeight}, rendered-via=${rawSrc})`,
        })
      }

      if (isMeaningfulImage(snapshot) && (!snapshot.alt || snapshot.alt.trim().length < 3)) {
        altFailures.push({
          pageUrl,
          src,
          reason: `Meaningful image is missing descriptive alt text (alt=${JSON.stringify(snapshot.alt)})`,
        })
      }
    }

    expect(
      loadFailures,
      loadFailures.map((failure) => `${failure.pageUrl} -> ${failure.src}: ${failure.reason}`).join("\n")
    ).toEqual([])

    expect(
      altFailures,
      altFailures.map((failure) => `${failure.pageUrl} -> ${failure.src}: ${failure.reason}`).join("\n")
    ).toEqual([])
  })
}
