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

export type SerbyteTouch = {
  source: string | null
  medium: string | null
  campaign: string | null
  term: string | null
  referrer: string | null
  landing_path: string | null
  timestamp: string | null
  from_ads: boolean
}

export type SerbyteAttribution = {
  first_touch: SerbyteTouch | null
  last_touch: SerbyteTouch | null
  touches: SerbyteTouch[]
  session_count: number
}
