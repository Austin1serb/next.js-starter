import { NextResponse, type NextRequest } from "next/server"
import { buildTouchFromRequest } from "@/attribution/core"
import { ATTRIBUTION_TOUCH_HISTORY_LIMIT } from "@/attribution/constants"
import {
  ATTRIBUTION_SESSION_COOKIE_NAME,
  FIRST_TOUCH_COOKIE_NAME,
  LAST_TOUCH_COOKIE_NAME,
  TOUCHES_COOKIE_NAME,
  TOUCH_COUNT_COOKIE_NAME,
  attributionCookieOptions,
  attributionSessionCookieOptions,
  createSessionCookieValue,
  readAttributionState,
  serializeTouch,
  serializeTouches,
} from "@/attribution/cookies"

export function proxy(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next()
  }

  const response = NextResponse.next()
  const hasSession = Boolean(request.cookies.get(ATTRIBUTION_SESSION_COOKIE_NAME)?.value)
  const currentState = readAttributionState(request.cookies)
  const nextTouch = buildTouchFromRequest(request.nextUrl, request.headers.get("referer"))

  if (!currentState.firstTouch) {
    response.cookies.set(FIRST_TOUCH_COOKIE_NAME, serializeTouch(nextTouch), attributionCookieOptions)
  }

  if (!hasSession) {
    const touches = [...currentState.touches, nextTouch].slice(-ATTRIBUTION_TOUCH_HISTORY_LIMIT)
    const touchCount = currentState.touchCount + 1

    response.cookies.set(LAST_TOUCH_COOKIE_NAME, serializeTouch(nextTouch), attributionCookieOptions)
    response.cookies.set(TOUCHES_COOKIE_NAME, serializeTouches(touches), attributionCookieOptions)
    response.cookies.set(TOUCH_COUNT_COOKIE_NAME, String(touchCount), attributionCookieOptions)
  } else if (!currentState.lastTouch) {
    response.cookies.set(LAST_TOUCH_COOKIE_NAME, serializeTouch(nextTouch), attributionCookieOptions)
  }

  if (!hasSession) {
    response.cookies.set(ATTRIBUTION_SESSION_COOKIE_NAME, createSessionCookieValue(), attributionSessionCookieOptions)
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
}
