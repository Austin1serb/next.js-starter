import { type NextRequest, NextResponse, type ProxyConfig } from "next/server.js"
import { recordAttributionVisit } from "@/attribution/cookies"

export function proxy(request: NextRequest) {
  const response = NextResponse.next()
  // Only page visits should create attribution sessions.
  if (request.method === "GET") {
    recordAttributionVisit(request, response)
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
