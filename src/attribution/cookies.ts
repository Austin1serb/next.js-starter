import {
  ATTRIBUTION_COOKIE_MAX_AGE_SECONDS,
  ATTRIBUTION_SESSION_COOKIE_NAME,
  ATTRIBUTION_SESSION_MAX_AGE_SECONDS,
  FIRST_TOUCH_COOKIE_NAME,
  LAST_TOUCH_COOKIE_NAME,
  TOUCHES_COOKIE_NAME,
  TOUCH_COUNT_COOKIE_NAME,
} from "./constants"
import type { AttributionState, Touch } from "./types"

function parseTouch(raw: string | undefined): Touch | null {
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as Partial<Touch>
    if (typeof parsed.timestamp !== "string" || typeof parsed.landingPath !== "string") return null

    return {
      source: typeof parsed.source === "string" ? parsed.source : null,
      medium: typeof parsed.medium === "string" ? parsed.medium : null,
      campaign: typeof parsed.campaign === "string" ? parsed.campaign : null,
      term: typeof parsed.term === "string" ? parsed.term : null,
      referrer: typeof parsed.referrer === "string" ? parsed.referrer : null,
      landingPath: parsed.landingPath,
      timestamp: parsed.timestamp,
      fromAds: parsed.fromAds === true,
    }
  } catch {
    return null
  }
}

function parseTouches(raw: string | undefined): Touch[] | null {
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null

    return parsed.map((touch) => parseTouch(JSON.stringify(touch))).filter((touch): touch is Touch => Boolean(touch))
  } catch {
    return null
  }
}

function parseTouchCount(raw: string | undefined): number | null {
  if (!raw) return null

  const parsed = Number.parseInt(raw, 10)
  return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : null
}

export function serializeTouch(touch: Touch): string {
  return JSON.stringify(touch)
}

export function serializeTouches(touches: Touch[]): string {
  return JSON.stringify(touches)
}

export function readAttributionState(cookieStore: { get(name: string): { value: string } | undefined }): AttributionState {
  const firstTouch = parseTouch(cookieStore.get(FIRST_TOUCH_COOKIE_NAME)?.value)
  const lastTouch = parseTouch(cookieStore.get(LAST_TOUCH_COOKIE_NAME)?.value)
  const touches = parseTouches(cookieStore.get(TOUCHES_COOKIE_NAME)?.value) ?? (lastTouch ? [lastTouch] : firstTouch ? [firstTouch] : [])

  return {
    firstTouch,
    lastTouch,
    touches,
    touchCount: parseTouchCount(cookieStore.get(TOUCH_COUNT_COOKIE_NAME)?.value) ?? touches.length,
  }
}

export const attributionCookieOptions = {
  httpOnly: true,
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: ATTRIBUTION_COOKIE_MAX_AGE_SECONDS,
}

export const attributionSessionCookieOptions = {
  httpOnly: true,
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: ATTRIBUTION_SESSION_MAX_AGE_SECONDS,
}

export function createSessionCookieValue(): string {
  return Date.now().toString()
}

export { ATTRIBUTION_SESSION_COOKIE_NAME, FIRST_TOUCH_COOKIE_NAME, LAST_TOUCH_COOKIE_NAME, TOUCHES_COOKIE_NAME, TOUCH_COUNT_COOKIE_NAME }
