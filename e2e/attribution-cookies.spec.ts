import { Buffer } from "node:buffer"
import { expect, test } from "@playwright/test"
import { NextRequest } from "next/server.js"
import {
  ATTRIBUTION_SESSION_COOKIE_NAME,
  FIRST_TOUCH_COOKIE_NAME,
  LAST_TOUCH_COOKIE_NAME,
  readAttributionState,
  TOUCH_COUNT_COOKIE_NAME,
  TOUCHES_COOKIE_NAME,
} from "@/attribution/cookies"
import { proxy } from "@/proxy"

test("an active session repairs missing touches without counting another visit", () => {
  const response = proxy(
    new NextRequest("https://example.com/?utm_source=repair", {
      headers: {
        cookie: `${ATTRIBUTION_SESSION_COOKIE_NAME}=active; ${TOUCH_COUNT_COOKIE_NAME}=4`,
      },
    })
  )
  expect(readAttributionState(response.cookies).firstTouch?.source).toBe("repair")
  expect(readAttributionState(response.cookies).lastTouch?.source).toBe("repair")
  expect(response.cookies.get(TOUCH_COUNT_COOKIE_NAME)).toBeUndefined()
  expect(response.cookies.get(TOUCHES_COOKIE_NAME)).toBeUndefined()
  expect(response.cookies.get(ATTRIBUTION_SESSION_COOKIE_NAME)).toBeUndefined()
})

test("malformed attribution cookies recover as a fresh visit", () => {
  const cookie = [
    FIRST_TOUCH_COOKIE_NAME,
    LAST_TOUCH_COOKIE_NAME,
    TOUCHES_COOKIE_NAME,
    TOUCH_COUNT_COOKIE_NAME,
  ]
    .map((name) => `${name}=invalid`)
    .join("; ")
  const response = proxy(
    new NextRequest("https://example.com/?utm_source=recovered", { headers: { cookie } })
  )
  const state = readAttributionState(response.cookies)
  expect(state.touchCount).toBe(1)
  expect(state.firstTouch?.source).toBe("recovered")
  expect(state.lastTouch).toEqual(state.firstTouch)
  expect(state.touches).toEqual([state.firstTouch])
})

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
