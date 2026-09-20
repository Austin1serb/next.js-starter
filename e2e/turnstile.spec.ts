import process from "node:process"
import { mock } from "node:test"
import { expect, test } from "@playwright/test"
import { getTurnstileSiteKey, verifyTurnstileToken } from "@/app/contact/utils/turnstile"

const environmentNames = [
  "NEXT_PUBLIC_TURNSTILE_SITEKEY",
  "TURNSTILE_SECRET",
  "TURNSTILE_HOSTNAMES",
] as const
const originalEnvironment = Object.fromEntries(
  environmentNames.map((name) => [name, process.env[name]])
)

test.beforeEach(() => {
  process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY = "example-site-key"
  process.env.TURNSTILE_SECRET = "example-secret"
  process.env.TURNSTILE_HOSTNAMES = "example.com,www.example.com"
})

test.afterEach(() => {
  mock.restoreAll()
  for (const name of environmentNames) {
    const value = originalEnvironment[name]
    if (value === undefined) {
      Reflect.deleteProperty(process.env, name)
    } else {
      process.env[name] = value
    }
  }
})

for (const missing of ["both", "site key", "secret"] as const) {
  test(`disables the widget and token requirement without ${missing}`, async () => {
    if (missing !== "secret") {
      process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY = " "
    }
    if (missing !== "site key") {
      process.env.TURNSTILE_SECRET = " "
    }
    const siteverify = mock.method(globalThis, "fetch")

    expect(getTurnstileSiteKey()).toBeUndefined()
    expect(await verifyTurnstileToken(undefined)).toBe(true)
    expect(siteverify.mock.callCount()).toBe(0)
  })
}

test("rejects missing, non-string, and oversized tokens when enabled", async () => {
  const siteverify = mock.method(globalThis, "fetch")

  for (const token of [undefined, null, 123, "", " ", "x".repeat(2049)]) {
    expect(await verifyTurnstileToken(token)).toBe(false)
  }
  expect(siteverify.mock.callCount()).toBe(0)
})

test("verifies the token on the server and accepts the configured action and hostname", async () => {
  const siteverify = mock.method(globalThis, "fetch", () =>
    Promise.resolve(
      Response.json({ success: true, action: "contact", hostname: "www.example.com" })
    )
  )

  expect(getTurnstileSiteKey()).toBe("example-site-key")
  expect(await verifyTurnstileToken("fresh-token")).toBe(true)
  const [endpoint, options] = siteverify.mock.calls[0].arguments
  expect(endpoint).toBe("https://challenges.cloudflare.com/turnstile/v0/siteverify")
  expect(options?.method).toBe("POST")
  expect(String(options?.body)).toBe("secret=example-secret&response=fresh-token")
  expect(options?.signal).toBeInstanceOf(AbortSignal)
})

const invalidResults = [
  { label: "failed verification", response: { success: false } },
  { label: "non-boolean success", response: { success: "true" } },
  { label: "missing metadata", response: { success: true } },
  {
    label: "wrong action",
    response: { success: true, action: "login", hostname: "example.com" },
  },
  {
    label: "wrong hostname",
    response: { success: true, action: "contact", hostname: "unrelated.example" },
  },
  {
    label: "expired or reused token",
    response: { success: false, "error-codes": ["timeout-or-duplicate"] },
  },
]

for (const { label, response } of invalidResults) {
  test(`rejects ${label}`, async () => {
    mock.method(globalThis, "fetch", () => Promise.resolve(Response.json(response)))
    expect(await verifyTurnstileToken("token")).toBe(false)
  })
}

test("rejects non-2xx, malformed JSON, and network failures", async () => {
  const siteverify = mock.method(globalThis, "fetch", () =>
    Promise.resolve(new Response(null, { status: 503 }))
  )
  expect(await verifyTurnstileToken("token")).toBe(false)

  siteverify.mock.mockImplementation(() => Promise.resolve(new Response("not JSON")))
  expect(await verifyTurnstileToken("token")).toBe(false)

  siteverify.mock.mockImplementation(() => Promise.reject(new Error("Network unavailable")))
  expect(await verifyTurnstileToken("token")).toBe(false)
})

test("supports public test keys while still requiring a successful Siteverify response", async () => {
  process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY = "1x00000000000000000000AA"
  process.env.TURNSTILE_SECRET = "1x0000000000000000000000000000000AA"
  const siteverify = mock.method(globalThis, "fetch", () =>
    Promise.resolve(Response.json({ success: true, action: "test", hostname: "localhost" }))
  )

  expect(await verifyTurnstileToken("XXXX.DUMMY.TOKEN.XXXX")).toBe(true)
  siteverify.mock.mockImplementation(() => Promise.resolve(Response.json({ success: false })))
  expect(await verifyTurnstileToken("XXXX.DUMMY.TOKEN.XXXX")).toBe(false)
})
