import { z } from "zod"

// Default API endpoint - override per project if needed
const DEFAULT_LEADS_ENDPOINT =
  process.env.SERBYTE_LEADS_ENDPOINT ?? "https://www.serbyte.net/api/client/leads"

const leadResponseSchema = z.object({
  success: z.boolean().optional(),
  error: z.string().optional(),
  details: z.unknown().optional(),
})

// Referral options you can reuse in any project
export const referralOptions = [
  { value: "google", label: "Google Search" },
  { value: "facebook", label: "Facebook, Instagram, etc." },
  // { value: "instagram", label: "Instagram" },
  { value: "yelp", label: "Yelp" },
  { value: "referral", label: "Friend / Referral" },
  { value: "drive-by", label: "Saw Our Truck / Job Site" },
  // { value: "reddit", label: "Reddit" },
  { value: "repeat-client", label: "Repeat Client" },
  { value: "chatgpt", label: "ChatGPT / Other AI" },
  { value: "other", label: "Other" },
]
// Core payload that matches LeadIngestSchema.payload
export type SerbyteLeadPayload = {
  name: string
  email: string
  phone?: string | null
  message?: string | null
  details?: Record<string, unknown>
}

// Enrichment DSL (mirror of what API expects)
export type SerbyteEnrichmentPrimitiveType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "email"
  | "phone"
  | "url"

export type SerbyteEnrichmentFieldConfig = {
  type: SerbyteEnrichmentPrimitiveType
  optional?: boolean
  description?: string
}

export type SerbyteEnrichmentOutputSchema = {
  [key: string]:
    | SerbyteEnrichmentPrimitiveType
    | SerbyteEnrichmentFieldConfig
    | SerbyteEnrichmentOutputSchema
}

export type SerbyteEnrichmentConfig = {
  // If omitted or empty, API can default to using payload
  data?: Record<string, unknown>
  outputSchema: SerbyteEnrichmentOutputSchema
  instructions?: string
}

// Options for sending a lead to Serbyte central API
export type SendSerbyteLeadOptions = {
  apiKey?: string // SERBYTE_API_KEY (server env only)
  clientId: string // eg. "rc-concrete"
  formSlug: string // eg. "contact", "estimate"
  path: string // eg. "/contact"
  payload: SerbyteLeadPayload
  enrich?: SerbyteEnrichmentConfig
  endpoint?: string // override default endpoint if needed
  throwOnError?: boolean
  possibleServices?: string[]
}

export type SendSerbyteLeadResult =
  | { success: true; status: number }
  | { success: false; status: number; error?: string; details?: unknown }

/**
 * Send a lead server-side with a 10-second deadline. Failures are returned by default;
 * throwOnError opts into rejection. Status 0 means no HTTP response was received.
 */
export async function sendSerbyteLead(
  options: SendSerbyteLeadOptions
): Promise<SendSerbyteLeadResult> {
  const {
    apiKey = process.env.SERBYTE_API_KEY,
    clientId,
    formSlug,
    path,
    payload,
    enrich,
    endpoint = DEFAULT_LEADS_ENDPOINT,
    throwOnError = false,
  } = options
  let status = 0
  let failure: SendSerbyteLeadResult

  try {
    if (!apiKey?.trim()) {
      throw new Error("SERBYTE_API_KEY is required")
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-serbyte-key": apiKey,
      },
      body: JSON.stringify({ clientId, formSlug, path, payload, ...(enrich ? { enrich } : {}) }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    })
    status = response.status
    const parsed = leadResponseSchema.safeParse(await response.json())
    const result = parsed.success ? parsed.data : null

    if (response.ok && result?.success) {
      return { success: true, status }
    }

    failure = {
      success: false,
      status,
      error: result?.error || `Lead delivery failed with status ${status}`,
      details: result?.details,
    }
  } catch (error) {
    failure = {
      success: false,
      status,
      error: error instanceof Error ? error.message : "Lead delivery failed",
    }
  }

  if (throwOnError) {
    throw new Error(failure.error || "Lead delivery failed")
  }
  return failure
}
