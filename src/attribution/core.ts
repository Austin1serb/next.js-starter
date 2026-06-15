import { DOMAIN_URL } from "@/config/site-config"
import { PAID_UTM_MEDIA } from "./constants"
import type { AttributionState, SerbyteAttribution, SerbyteTouch, Touch } from "./types"

function normalizeValue(value: string | null): string | null {
  const trimmed = value?.trim()
  return trimmed ? trimmed.toLowerCase() : null
}

function safeUrl(value: string | null): URL | null {
  if (!value) return null
  try {
    return new URL(value)
  } catch {
    return null
  }
}

function getCrossSiteReferrer(referrer: string | null, siteUrl: URL): string | null {
  const parsedReferrer = safeUrl(referrer)
  if (!parsedReferrer) return null
  if (parsedReferrer.origin === siteUrl.origin) return null
  const referrerHostname = getBaseHostname(parsedReferrer.hostname.toLowerCase())
  const requestHostname = getBaseHostname(siteUrl.hostname.toLowerCase())
  const canonicalHostname = getBaseHostname(safeUrl(DOMAIN_URL)?.hostname.toLowerCase() ?? null)
  if (referrerHostname && (referrerHostname === requestHostname || referrerHostname === canonicalHostname)) return null

  return parsedReferrer.toString()
}

function getReferrerSource(referrer: string | null): string | null {
  const parsedReferrer = safeUrl(referrer)
  return parsedReferrer?.hostname?.toLowerCase() ?? null
}

function getBaseHostname(hostname: string | null): string | null {
  if (!hostname) return null
  return hostname.replace(/^(www|m)\./, "")
}

function buildTouch(input: Omit<Touch, "timestamp">): Touch {
  return {
    ...input,
    timestamp: new Date().toISOString(),
  }
}

export function buildTouchFromRequest(siteUrl: URL, referrerHeader: string | null): Touch {
  const searchParams = siteUrl.searchParams
  const crossSiteReferrer = getCrossSiteReferrer(referrerHeader, siteUrl)

  const gclid = searchParams.get("gclid")?.trim()
  if (gclid) {
    return buildTouch({
      source: normalizeValue(searchParams.get("utm_source")) ?? "google",
      medium: normalizeValue(searchParams.get("utm_medium")) ?? "cpc",
      campaign: normalizeValue(searchParams.get("utm_campaign")),
      term: normalizeValue(searchParams.get("utm_term")),
      referrer: crossSiteReferrer,
      landingPath: siteUrl.pathname,
      fromAds: true,
    })
  }

  const gbraid = searchParams.get("gbraid")?.trim()
  if (gbraid) {
    return buildTouch({
      source: normalizeValue(searchParams.get("utm_source")) ?? "google",
      medium: normalizeValue(searchParams.get("utm_medium")) ?? "cpc",
      campaign: normalizeValue(searchParams.get("utm_campaign")),
      term: normalizeValue(searchParams.get("utm_term")),
      referrer: crossSiteReferrer,
      landingPath: siteUrl.pathname,
      fromAds: true,
    })
  }

  const wbraid = searchParams.get("wbraid")?.trim()
  if (wbraid) {
    return buildTouch({
      source: normalizeValue(searchParams.get("utm_source")) ?? "google",
      medium: normalizeValue(searchParams.get("utm_medium")) ?? "cpc",
      campaign: normalizeValue(searchParams.get("utm_campaign")),
      term: normalizeValue(searchParams.get("utm_term")),
      referrer: crossSiteReferrer,
      landingPath: siteUrl.pathname,
      fromAds: true,
    })
  }

  const utmSource = normalizeValue(searchParams.get("utm_source"))
  const utmMedium = normalizeValue(searchParams.get("utm_medium"))
  const utmCampaign = normalizeValue(searchParams.get("utm_campaign"))
  const utmTerm = normalizeValue(searchParams.get("utm_term"))

  if (utmSource || utmMedium || utmCampaign || utmTerm) {
    return buildTouch({
      source: utmSource,
      medium: utmMedium,
      campaign: utmCampaign,
      term: utmTerm,
      referrer: crossSiteReferrer,
      landingPath: siteUrl.pathname,
      fromAds: Boolean(utmMedium && PAID_UTM_MEDIA.has(utmMedium)),
    })
  }

  if (crossSiteReferrer) {
    const referrerSource = getReferrerSource(crossSiteReferrer)
    const baseHostname = getBaseHostname(referrerSource)

    return buildTouch({
      source: baseHostname,
      medium: baseHostname,
      campaign: null,
      term: null,
      referrer: crossSiteReferrer,
      landingPath: siteUrl.pathname,
      fromAds: false,
    })
  }

  return buildTouch({
    source: "direct",
    medium: null,
    campaign: null,
    term: null,
    referrer: null,
    landingPath: siteUrl.pathname,
    fromAds: false,
  })
}

function toSerbyteTouch(touch: Touch | null): SerbyteTouch | null {
  if (!touch) return null

  return {
    source: touch.source,
    medium: touch.medium,
    campaign: touch.campaign,
    term: touch.term,
    referrer: touch.referrer,
    landing_path: touch.landingPath,
    timestamp: touch.timestamp,
    from_ads: touch.fromAds,
  }
}

export function toSerbyteAttribution(state: AttributionState): SerbyteAttribution {
  const touches = state.touches.map(toSerbyteTouch).filter((touch): touch is SerbyteTouch => Boolean(touch))

  return {
    first_touch: toSerbyteTouch(state.firstTouch),
    last_touch: toSerbyteTouch(state.lastTouch),
    touches,
    session_count: state.touchCount,
  }
}

export function toVercelTrackingFields(state: AttributionState): Record<string, string | null> {
  const touch = state.lastTouch ?? state.firstTouch

  return {
    source: touch?.source ?? touch?.referrer ?? null,
    term: touch?.term ?? null,
  }
}
