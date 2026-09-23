import { Buffer } from "node:buffer"
import { expect, test } from "@playwright/test"
import { NextRequest } from "next/server.js"
import { ATTRIBUTION_SESSION_COOKIE_NAME, readAttributionState } from "@/attribution/cookies"
import { proxy } from "@/proxy"

test("history stays within cookie limits while first touch and total visits are preserved", () => {
  const cookies = new Map<string, { value: string }>()
  for (let visit = 1; visit <= 30; visit++) {
    const cookie = Array.from(
      cookies,
      ([name, { value }]) => `${name}=${encodeURIComponent(value)}`
    ).join("; ")
    const response = proxy(
      new NextRequest(`https://example.com/?utm_source=google&utm_campaign=visit-${visit}`, {
        headers: { cookie },
      })
    )
    for (const header of response.headers.getSetCookie()) {
      expect(Buffer.byteLength(header)).toBeLessThan(4096)
    }
    for (const { name, value } of response.cookies.getAll()) {
      // Simulate the next visit after the 30-minute session expires.
      if (name !== ATTRIBUTION_SESSION_COOKIE_NAME) {
        cookies.set(name, { value })
      }
    }
  }
  const state = readAttributionState(cookies)
  expect(state.touchCount).toBe(30)
  expect(state.firstTouch?.campaign).toBe("visit-1")
  expect(state.lastTouch?.campaign).toBe("visit-30")
  expect(state.touches.at(-1)).toEqual(state.lastTouch)
  expect(state.touches.length).toBeGreaterThan(0)
  expect(state.touches.length).toBeLessThan(24)
})

test("long Unicode campaign fields cannot overflow individual or combined cookie headers", () => {
  const url = new URL(`https://example.com/${"long-path".repeat(200)}`)
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term"]) {
    url.searchParams.set(key, "🚀漢字".repeat(200))
  }
  const response = proxy(
    new NextRequest(url, {
      headers: { referer: `https://referrer.example/${"query".repeat(400)}` },
    })
  )
  const headers = response.headers.getSetCookie()
  for (const header of headers) {
    expect(Buffer.byteLength(header)).toBeLessThan(4096)
  }
  expect(Buffer.byteLength(headers.join("\r\n"))).toBeLessThan(6500)
  const state = readAttributionState(response.cookies)
  expect(state.firstTouch?.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/u)
  expect(state.firstTouch?.source?.length).toBeGreaterThan(0)
  expect(state.touches).toEqual([state.firstTouch])
  expect(state.lastTouch).toEqual(state.firstTouch)
})
