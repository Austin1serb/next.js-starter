import { z } from "zod"
import { DOMAIN_URL } from "@/config/site-config"

const siteverifySchema = z.object({
  success: z.literal(true),
  action: z.string().optional(),
  hostname: z.string().optional(),
})

// Public Cloudflare test secret: its dummy response has synthetic action/hostname values.
const TEST_SECRET = "1x0000000000000000000000000000000AA"

// Only import this module from server components, server actions, or server-side tests.
function getTurnstileConfig() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY?.trim()
  const secret = process.env.TURNSTILE_SECRET?.trim()
  return siteKey && secret ? { siteKey, secret } : null
}

export function getTurnstileSiteKey(): string | undefined {
  return getTurnstileConfig()?.siteKey
}

function isExpectedHostname(hostname: string | undefined): boolean {
  if (!hostname) {
    return false
  }

  const configured = process.env.TURNSTILE_HOSTNAMES?.trim()
  const hostnames = (configured || new URL(DOMAIN_URL).hostname)
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)

  if (
    process.env.NODE_ENV === "production" &&
    (hostname === "localhost" || hostname === "127.0.0.1")
  ) {
    return false
  }

  return hostnames.includes(hostname)
}

export async function verifyTurnstileToken(token: unknown): Promise<boolean> {
  const config = getTurnstileConfig()
  // Turnstile is optional for this starter. Either missing key disables it entirely.
  if (!config) {
    return true
  }

  if (typeof token !== "string" || !token.trim() || token.length > 2048) {
    return false
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: config.secret, response: token }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    })

    if (!response.ok) {
      return false
    }

    const result = siteverifySchema.safeParse(await response.json())
    if (!result.success) {
      return false
    }

    // Still call Siteverify with public test keys; real keys must match this form and site.
    return (
      config.secret === TEST_SECRET ||
      (result.data.action === "contact" && isExpectedHostname(result.data.hostname))
    )
  } catch {
    return false
  }
}
