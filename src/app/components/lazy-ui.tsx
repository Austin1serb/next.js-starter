"use client"
import * as m from "motion/react-m"
import dynamic from "next/dynamic"

export const Motion = m.div

export const LazyUi = () => {
  const ScrollTrigger = dynamic(() => import("./scroll-trigger").then((mod) => mod.ScrollTrigger), {
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
