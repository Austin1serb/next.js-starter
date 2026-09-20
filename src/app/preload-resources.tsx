// app/preload-resources.tsx
"use client"

import * as ReactDOM from "react-dom"

export function PreloadResources() {
  ReactDOM.preload("/icons.svg", { as: "image" })
  // ReactDOM.preconnect("https://www.google-analytics.com")
  // ReactDOM.prefetchDNS("https://www.google-analytics.com")
  return null
}
