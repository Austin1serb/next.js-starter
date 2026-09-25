import type { NextRequest, NextResponse } from "next/server"
import {
  ATTRIBUTION_COOKIE_MAX_AGE_SECONDS,
  ATTRIBUTION_SESSION_COOKIE_NAME,
  ATTRIBUTION_SESSION_MAX_AGE_SECONDS,
  ATTRIBUTION_TOUCH_HISTORY_LIMIT,
  FIRST_TOUCH_COOKIE_NAME,
  LAST_TOUCH_COOKIE_NAME,
  TOUCH_COUNT_COOKIE_NAME,
  TOUCHES_COOKIE_NAME,
} from "./constants"
import { buildTouchFromRequest } from "./core"
import type { AttributionState, Touch } from "./types"

// Encoded value budgets leave room for names/attributes and keep all attribution
// cookies together well below typical request-header limits.
const TOUCH_VALUE_BYTES = 1200
const HISTORY_VALUE_BYTES = 2400
const TOUCH_TEXT_FIELDS = [
  "source",
  "medium",
  "campaign",
  "term",
  "referrer",
  "landingPath",
  "timestamp",
] as const

function fitTouch(touch: Touch): Touch {
  const bounded: Touch = {
    source: touch.source,
    medium: touch.medium,
    campaign: touch.campaign,
    term: touch.term,
    referrer: touch.referrer,
    landingPath: touch.landingPath,
    timestamp: touch.timestamp,
    fromAds: touch.fromAds,
  }
  // Shorten the longest field first; ordinary campaign values remain unchanged.
  while (encodeURIComponent(JSON.stringify(bounded)).length > TOUCH_VALUE_BYTES) {
    let longest: (typeof TOUCH_TEXT_FIELDS)[number] = "landingPath"
    for (const key of TOUCH_TEXT_FIELDS) {
      if ((bounded[key]?.length ?? 0) > (bounded[longest]?.length ?? 0)) {
        longest = key
      }
    }
    const characters = Array.from(bounded[longest] ?? "")
    bounded[longest] = characters.slice(0, Math.floor(characters.length / 2)).join("")
  }
  return bounded
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function parseTouch(raw: string | undefined): Touch | null {
  if (!raw) {
    return null
  }

  try {
    const parsed: unknown = JSON.parse(raw)
    if (
      !isRecord(parsed) ||
      typeof parsed.timestamp !== "string" ||
      typeof parsed.landingPath !== "string"
    ) {
      return null
    }

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
  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return null
    }

    return parsed
      .map((touch) => parseTouch(JSON.stringify(touch)))
      .filter((touch): touch is Touch => Boolean(touch))
  } catch {
    return null
  }
}

function parseTouchCount(raw: string | undefined): number | null {
  if (!raw) {
    return null
  }

  const parsed = Number.parseInt(raw, 10)
  return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : null
}

/** JSON cookie value bounded to 1,200 percent-encoded bytes; long text is shortened. */
function serializeTouch(touch: Touch): string {
  return JSON.stringify(fitTouch(touch))
}

/** Keep the newest touches within 2,400 encoded bytes and the history limit. */
function serializeTouches(touches: Touch[]): string {
  const recent = touches.slice(-ATTRIBUTION_TOUCH_HISTORY_LIMIT).map(fitTouch)
  let serialized = JSON.stringify(recent)
  while (encodeURIComponent(serialized).length > HISTORY_VALUE_BYTES) {
    recent.shift()
    serialized = JSON.stringify(recent)
  }
  return serialized
}

export function readAttributionState(cookieStore: {
  get(name: string): { value: string } | undefined
}): AttributionState {
  const firstTouch = parseTouch(cookieStore.get(FIRST_TOUCH_COOKIE_NAME)?.value)
  const lastTouch = parseTouch(cookieStore.get(LAST_TOUCH_COOKIE_NAME)?.value)
  const fallbackTouch = lastTouch ?? firstTouch
  const touches =
    parseTouches(cookieStore.get(TOUCHES_COOKIE_NAME)?.value) ??
    (fallbackTouch ? [fallbackTouch] : [])

  return {
    firstTouch,
    lastTouch,
    touches,
    touchCount: parseTouchCount(cookieStore.get(TOUCH_COUNT_COOKIE_NAME)?.value) ?? touches.length,
  }
}

const attributionCookieOptions = {
  httpOnly: true,
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: ATTRIBUTION_COOKIE_MAX_AGE_SECONDS,
}

const attributionSessionCookieOptions = {
  ...attributionCookieOptions,
  maxAge: ATTRIBUTION_SESSION_MAX_AGE_SECONDS,
}

/**
 * Record one page visit in the response cookies. The caller filters out non-page
 * requests. Preserve the first touch, count once per session, and repair missing
 * first/last touches without incrementing an existing session. Cookie lifetimes,
 * serialization, and history limits are owned here.
 */
export function recordAttributionVisit(request: NextRequest, response: NextResponse): void {
  const hasSession = Boolean(request.cookies.get(ATTRIBUTION_SESSION_COOKIE_NAME)?.value)
  const currentState = readAttributionState(request.cookies)
  const nextTouch = buildTouchFromRequest(request.nextUrl, request.headers.get("referer"))

  if (!currentState.firstTouch) {
    response.cookies.set(
      FIRST_TOUCH_COOKIE_NAME,
      serializeTouch(nextTouch),
      attributionCookieOptions
    )
  }
  if (!hasSession || !currentState.lastTouch) {
    response.cookies.set(
      LAST_TOUCH_COOKIE_NAME,
      serializeTouch(nextTouch),
      attributionCookieOptions
    )
  }
  if (!hasSession) {
    response.cookies.set(
      TOUCHES_COOKIE_NAME,
      serializeTouches([...currentState.touches, nextTouch]),
      attributionCookieOptions
    )
    response.cookies.set(
      TOUCH_COUNT_COOKIE_NAME,
      String(currentState.touchCount + 1),
      attributionCookieOptions
    )
    response.cookies.set(
      ATTRIBUTION_SESSION_COOKIE_NAME,
      Date.now().toString(),
      attributionSessionCookieOptions
    )
  }
}

export {
  ATTRIBUTION_SESSION_COOKIE_NAME,
  FIRST_TOUCH_COOKIE_NAME,
  LAST_TOUCH_COOKIE_NAME,
  TOUCH_COUNT_COOKIE_NAME,
  TOUCHES_COOKIE_NAME,
}
