import { expect, test } from "@playwright/test"
import { unstable_doesMiddlewareMatch as doesProxyMatch } from "next/experimental/testing/server.js"
import { NextRequest } from "next/server.js"
import {
  ATTRIBUTION_SESSION_COOKIE_NAME,
  FIRST_TOUCH_COOKIE_NAME,
  LAST_TOUCH_COOKIE_NAME,
  readAttributionState,
  TOUCH_COUNT_COOKIE_NAME,
} from "@/attribution/cookies"
import { config, proxy } from "@/proxy"

test("matches page routes, including names that start with api", () => {
  for (const url of ["/", "/about", "/contact?utm_source=google", "/apiary"]) {
    expect(doesProxyMatch({ config, url })).toBe(true)
  }
})

test("excludes API routes, Next.js internals, and file assets", () => {
  for (const url of [
    "/api",
    "/api/contact",
    "/_next/static/chunks/app.js",
    "/_next/image",
    "/_next/webpack-hmr",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml",
    "/icons.svg",
  ]) {
    expect(doesProxyMatch({ config, url })).toBe(false)
  }
})

test("excludes prefetches while allowing normal client navigation", () => {
  expect(doesProxyMatch({ config, url: "/about", headers: { "next-router-prefetch": "1" } })).toBe(
    false
  )
  expect(doesProxyMatch({ config, url: "/about", headers: { purpose: "prefetch" } })).toBe(false)
  expect(doesProxyMatch({ config, url: "/about", headers: { rsc: "1" } })).toBe(true)
})

test("ignores HEAD, POST, and OPTIONS requests", () => {
  for (const method of ["HEAD", "POST", "OPTIONS"]) {
    const response = proxy(new NextRequest("https://example.com/contact", { method }))
    expect(response.cookies.getAll()).toHaveLength(0)
  }
})

test("records the first visit and keeps the original attribution within a session", () => {
  const firstResponse = proxy(
    new NextRequest("https://example.com/?utm_source=google&utm_medium=cpc&utm_campaign=spring")
  )
  const state = readAttributionState(firstResponse.cookies)

  expect(state.firstTouch).toMatchObject({
    source: "google",
    medium: "cpc",
    campaign: "spring",
    landingPath: "/",
    fromAds: true,
  })
  expect(state.lastTouch).toEqual(state.firstTouch)
  expect(state.touchCount).toBe(1)
  expect(firstResponse.cookies.get(ATTRIBUTION_SESSION_COOKIE_NAME)?.maxAge).toBe(1800)
  expect(firstResponse.cookies.get(FIRST_TOUCH_COOKIE_NAME)).toMatchObject({
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  })

  const cookie = firstResponse.cookies
    .getAll()
    .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
    .join("; ")
  const nextResponse = proxy(
    new NextRequest("https://example.com/about?utm_source=other", { headers: { cookie } })
  )
  expect(nextResponse.cookies.getAll()).toHaveLength(0)

  const nextSessionCookie = firstResponse.cookies
    .getAll()
    .filter(({ name }) => name !== ATTRIBUTION_SESSION_COOKIE_NAME)
    .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
    .join("; ")
  const nextSessionResponse = proxy(
    new NextRequest("https://example.com/contact?utm_source=newsletter", {
      headers: { cookie: nextSessionCookie },
    })
  )
  expect(nextSessionResponse.cookies.get(FIRST_TOUCH_COOKIE_NAME)).toBeUndefined()
  expect(readAttributionState(nextSessionResponse.cookies).lastTouch?.source).toBe("newsletter")
  expect(nextSessionResponse.cookies.get(TOUCH_COUNT_COOKIE_NAME)?.value).toBe("2")
})

test("Next.js runs the proxy and stores attribution cookies on a page visit", async ({
  request,
}) => {
  const response = await request.get("/?utm_source=google&utm_medium=cpc")
  expect(response.ok()).toBe(true)

  const { cookies } = await request.storageState()
  const state = readAttributionState({
    get(name) {
      const cookie = cookies.find((item) => item.name === name)
      return cookie ? { value: decodeURIComponent(cookie.value) } : undefined
    },
  })
  expect(state.firstTouch?.source).toBe("google")
  expect(state.firstTouch?.fromAds).toBe(true)
  expect(state.touchCount).toBe(1)
  expect(cookies.find((cookie) => cookie.name === LAST_TOUCH_COOKIE_NAME)?.secure).toBe(true)

  const nextResponse = await request.get("/about?utm_source=other")
  expect(nextResponse.ok()).toBe(true)
  expect(nextResponse.headers()["set-cookie"]).toBeUndefined()
})

test("Next.js skips attribution cookies for prefetch requests", async ({ request }) => {
  for (const [header, value] of Object.entries({
    "next-router-prefetch": "1",
    purpose: "prefetch",
  })) {
    const response = await request.get("/about", { headers: { [header]: value } })
    expect(response.ok()).toBe(true)
    expect(response.headers()["set-cookie"]).toBeUndefined()
  }
})

test("Next.js skips attribution cookies for HEAD requests and static files", async ({
  request,
}) => {
  const headResponse = await request.head("/about")
  expect(headResponse.ok()).toBe(true)
  expect(headResponse.headers()["set-cookie"]).toBeUndefined()

  const assetResponse = await request.get("/icons.svg")
  expect(assetResponse.ok()).toBe(true)
  expect(assetResponse.headers()["set-cookie"]).toBeUndefined()
})
