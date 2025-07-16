"use client"
import { domAnimation, LazyMotion } from "motion/react"

export const MotionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <LazyMotion strict features={domAnimation}>
      {children}
    </LazyMotion>
  )
}
