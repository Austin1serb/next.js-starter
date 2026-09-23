import { type NextRequest, NextResponse, type ProxyConfig } from "next/server.js"
import {
  ATTRIBUTION_SESSION_COOKIE_NAME,
  attributionCookieOptions,
  attributionSessionCookieOptions,
  createSessionCookieValue,
  FIRST_TOUCH_COOKIE_NAME,
  LAST_TOUCH_COOKIE_NAME,
  readAttributionState,
  serializeTouch,
  serializeTouches,
  TOUCH_COUNT_COOKIE_NAME,
  TOUCHES_COOKIE_NAME,
} from "@/attribution/cookies"
import { buildTouchFromRequest } from "@/attribution/core"

export function proxy(request: NextRequest) {
  // Only page visits should create attribution sessions.
  if (request.method !== "GET") {
    return NextResponse.next()
  }

  const response = NextResponse.next()
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

  if (!hasSession) {
    const touches = [...currentState.touches, nextTouch]
    const touchCount = currentState.touchCount + 1

    response.cookies.set(
      LAST_TOUCH_COOKIE_NAME,
      serializeTouch(nextTouch),
      attributionCookieOptions
    )
    response.cookies.set(TOUCHES_COOKIE_NAME, serializeTouches(touches), attributionCookieOptions)
    response.cookies.set(TOUCH_COUNT_COOKIE_NAME, String(touchCount), attributionCookieOptions)
  } else if (!currentState.lastTouch) {
    response.cookies.set(
      LAST_TOUCH_COOKIE_NAME,
      serializeTouch(nextTouch),
      attributionCookieOptions
    )
  }

  if (!hasSession) {
    response.cookies.set(
      ATTRIBUTION_SESSION_COOKIE_NAME,
      createSessionCookieValue(),
      attributionSessionCookieOptions
    )
  }

  return response
}

export const config = {
  matcher: [
    {
      // Exclude API routes, Next.js internals, and file assets.
      source: "/((?!api(?:/|$)|_next(?:/|$)|.*\\..*).*)",
      // Next.js evaluates these before it removes internal RSC headers from Proxy requests.
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
} satisfies ProxyConfig
