import { ALL_PAGES, DOMAIN_URL } from "@/config/site-config"

export const SITE_ORIGIN = new URL(DOMAIN_URL).origin

export function normalizeRoute(route: string): string {
  const url = new URL(route, DOMAIN_URL)
  return `${url.pathname}${url.search}`
}

export const ROUTES_TO_CHECK = Array.from(new Set(ALL_PAGES.filter((route) => !route.startsWith("http")).map(normalizeRoute)))

export function isExternalUrl(url: URL): boolean {
  return url.origin !== SITE_ORIGIN
}

export function isAllowedExternalStatus(status: number): boolean {
  return status < 400 || [401, 403, 405, 406, 429].includes(status)
}

export async function mapWithConcurrency<T, U>(items: T[], concurrency: number, worker: (item: T) => Promise<U>): Promise<U[]> {
  const results: U[] = new Array(items.length)
  let nextIndex = 0

  async function runWorker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex++
      results[currentIndex] = await worker(items[currentIndex])
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => runWorker()))
  return results
}
