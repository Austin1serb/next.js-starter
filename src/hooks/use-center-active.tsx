import { useCenterActiveProd } from "./use-center-active.prod"
import { useCenterActiveDebug } from "./use-center-active.debug"

// Flip to `true` to overlay the center band + highlight the active node.
// While `false`, the debug module is fully tree-shaken out of the bundle.
const DEBUG = false as const

export const useCenterActive = DEBUG ? useCenterActiveDebug : useCenterActiveProd
