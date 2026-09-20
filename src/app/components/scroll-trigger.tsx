// ScrollTrigger.tsx
"use client"

import { useUI } from "@react-zero-ui/core"
import { useScroll } from "motion/react"
import { useEffect } from "react"

export const ScrollTrigger = () => {
  const { scrollY } = useScroll()
  const [, setHasScrolled] = useUI<"true" | "false">("scrolled750", "false")

  // biome-ignore lint/correctness/useExhaustiveDependencies: Preserve the existing subscription lifecycle tied to scrollY.
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (window.innerWidth > 768) {
        setHasScrolled(latest >= 550 ? "true" : "false")
      } else {
        setHasScrolled(latest >= 400 ? "true" : "false")
      }
    })
    return unsubscribe
  }, [scrollY])

  return null
}
