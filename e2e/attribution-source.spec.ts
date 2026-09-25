import { expect, test } from "@playwright/test"
import { buildTouchFromRequest } from "@/attribution/core"
import { DOMAIN_URL } from "@/config/site-config"

for (const parameter of ["gclid", "gbraid", "wbraid"]) {
  test(`${parameter} identifies Google ads and respects explicit campaign fields`, () => {
    expect(
      buildTouchFromRequest(new URL(`https://example.com/?${parameter}=click`), null)
    ).toMatchObject({
      source: "google",
      medium: "cpc",
      fromAds: true,
    })
    const url = new URL(`https://example.com/landing?${parameter}=click`)
    url.searchParams.set("utm_source", " Custom ")
    url.searchParams.set("utm_medium", " Display ")
    url.searchParams.set("utm_campaign", " Spring ")
    url.searchParams.set("utm_term", " Garden ")
    expect(buildTouchFromRequest(url, "https://referrer.example/")).toMatchObject({
      source: "custom",
      medium: "display",
      campaign: "spring",
      term: "garden",
      landingPath: "/landing",
      referrer: "https://referrer.example/",
      fromAds: true,
    })
  })
}

test("empty click IDs do not override organic campaigns or direct visits", () => {
  const url = new URL("https://example.com/")
  for (const key of ["gclid", "gbraid", "wbraid"]) {
    url.searchParams.set(key, " ")
  }
  expect(buildTouchFromRequest(url, null)).toMatchObject({ source: "direct", fromAds: false })
  url.searchParams.set("utm_source", "Newsletter")
  expect(buildTouchFromRequest(url, null)).toMatchObject({ source: "newsletter", fromAds: false })
})

test("external referrers are recorded and own-site referrers are ignored", () => {
  const url = new URL("https://example.com/contact")
  expect(buildTouchFromRequest(url, "https://www.search.example/results")).toMatchObject({
    source: "search.example",
    medium: "search.example",
    fromAds: false,
  })
  for (const referrer of ["https://www.example.com/", DOMAIN_URL, "invalid URL"]) {
    expect(buildTouchFromRequest(url, referrer)).toMatchObject({ source: "direct", referrer: null })
  }
})
