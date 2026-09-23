export type Touch = {
  source: string | null
  medium: string | null
  campaign: string | null
  term: string | null
  referrer: string | null
  landingPath: string
  timestamp: string
  fromAds: boolean
}

export type AttributionState = {
  firstTouch: Touch | null
  lastTouch: Touch | null
  touches: Touch[]
  touchCount: number
}
