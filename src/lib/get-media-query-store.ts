export const isServer = typeof globalThis.window === "undefined"
export const isClient = !isServer

const stores = new Map<
  string,
  {
    isMatch: boolean
    mql: MediaQueryList | null
    subs: Set<() => void>
    stop: () => void
  }
>()

export function getMediaQueryStore(query: string) {
  const existing = stores.get(query)
  if (existing) {
    return existing
  }
  const mql = isClient ? globalThis.matchMedia(query) : null
  const subs = new Set<() => void>()
  const update = () => {
    store.isMatch = mql?.matches ?? false
    for (const callback of subs) {
      callback()
    }
  }

  if (mql?.addEventListener) {
    mql.addEventListener("change", update)
  } else if (mql?.addListener) {
    mql.addListener(update) // Safari <14
  }

  const stop = () => {
    if (mql?.removeEventListener) {
      mql.removeEventListener("change", update)
    } else if (mql?.removeListener) {
      mql.removeListener(update)
    }
  }

  const store = { isMatch: mql?.matches ?? false, mql, subs, stop }
  stores.set(query, store)
  return store
}
