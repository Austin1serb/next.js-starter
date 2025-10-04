"use client"
import dynamic from "next/dynamic"
import * as m from "motion/react-m"

export const Motion = m.div

export const LazyUi = () => {
  const ScrollTrigger = dynamic(() => import("./ScrollTrigger").then((mod) => mod.ScrollTrigger), {
    ssr: false,
    loading: () => null,
  })

  return <ScrollTrigger />
}

// const InViewTriggerHeavy = dynamic(() => import("@/app/components/ui/InViewTrigger").then((mod) => mod.InViewTrigger), {
//   ssr: false,
// })

// export function LazyInViewTrigger() {
//   const isTouch = useTouch()
//   const isMobile = useIsMobile()

//   return !isTouch && !isMobile ? null : <InViewTriggerHeavy />
// }
