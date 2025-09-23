// ScrollTrigger.tsx
"use client"

import { useEffect } from "react"
import { useScroll } from "motion/react"
import { useUI } from "@react-zero-ui/core"

export const ScrollTrigger = () => {
  const { scrollY } = useScroll()
  const [, setHasScrolled] = useUI<"true" | "false">("scrolled750", "false")

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (window.innerWidth > 768) {
        setHasScrolled(latest >= 550 ? "true" : "false")
      } else {
        setHasScrolled(latest >= 400 ? "true" : "false")
      }
    })
    return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollY])

  return null
}
