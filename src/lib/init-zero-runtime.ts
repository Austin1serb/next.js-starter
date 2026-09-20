"use client"

/* ② activate the runtime shipped in the package */
import { activateZeroUiRuntime } from "@react-zero-ui/core/experimental/runtime"
/* ① import the generated defaults */
import { variantKeyMap } from "../../.zero-ui/attributes"

activateZeroUiRuntime(variantKeyMap)

export const ZeroUiRuntime = () => null // this component just runs the side effect
