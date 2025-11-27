/* eslint-disable @typescript-eslint/no-explicit-any */

// Default API endpoint - override per project if needed
const DEFAULT_LEADS_ENDPOINT = process.env.SERBYTE_LEADS_ENDPOINT ?? "https://www.serbyte.net/api/client/leads"

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
export type SerbyteEnrichmentPrimitiveType = "string" | "number" | "boolean" | "date" | "email" | "phone" | "url"

export type SerbyteEnrichmentFieldConfig = {
  type: SerbyteEnrichmentPrimitiveType
  optional?: boolean
  description?: string
}

export type SerbyteEnrichmentOutputSchema = {
  [key: string]: SerbyteEnrichmentPrimitiveType | SerbyteEnrichmentFieldConfig | SerbyteEnrichmentOutputSchema
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

export type SendSerbyteLeadResult = { success: true; status: number } | { success: false; status: number; error?: string; details?: unknown }

/**
 * Send a lead into the central Serbyte leads API.
 * Call this ONLY from server-side code (server actions, API routes, backend).
 */
export async function sendSerbyteLead(options: SendSerbyteLeadOptions): Promise<SendSerbyteLeadResult> {
  const { apiKey = process.env.SERBYTE_API_KEY!, clientId, formSlug, path, payload, enrich, endpoint = DEFAULT_LEADS_ENDPOINT, throwOnError } = options
  if (!apiKey) {
    throw new Error("SERBYTE_API_KEY is required")
  }

  const body: any = {
    clientId,
    formSlug,
    path,
    payload,
  }

  if (enrich) {
    body.enrich = enrich
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-serbyte-key": apiKey,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  })

  let json: any = null
  try {
    json = await res.json()
  } catch {
    // ignore JSON parse errors - status still tells us enough
  }

  if (!res.ok || !json?.success) {
    const result: SendSerbyteLeadResult = {
      success: false,
      status: res.status,
      error: json?.error ?? `Request failed with status ${res.status}`,
      details: json?.details,
    }

    if (throwOnError) {
      throw new Error(result.error || "Failed to send lead")
    }

    return result
  }

  return { success: true, status: res.status }
}

// EXAMPLE USAGE
// if (!emailSent) {
//   return {
//     success: false,
//     message: "Failed to send email. Please try again or call us directly.",
//   }
// }

// >>> ADD THIS BLOCK <<<

// void sendSerbyteLead({
//   apiKey: process.env.SERBYTE_API_KEY!,      // keep this server-side
//   clientId: "rc-concrete",
//   formSlug: "contact",
//   path: "/contact",
//   payload: {
//     name: result.data.name.trim(),
//     email: result.data.email.trim(),
//     phone: result.data.phone.trim(),
//     message: result.data.message.trim(),
//     details: {
//       address: result.data.address?.trim() || "",
//       source: result.data.howDidYouHearAboutUs?.trim() || "",
//       sourceOther: result.data.howDidYouHearAboutUsOther?.trim() || "",

//     },
//   },

//   // optional enrichment (example)

//   enrich: {
//     data: {
//       address: result.data.address,
//       message: result.data.message,
//     },
//     outputSchema: {
//       address: {
//         street: "string",
//         city: "string",
//         state: "string",
//         zipCode: "string",
//       },
//       service: "string",
//     },
//     instructions: Split address into components where possible, all the address are in WA state,
// based on the message, determine the service requested and return the service in the output schema
// possible services are:
// ${possibleServices?.join(", ")}
// ",
//   },
//   // do NOT block the user on central API failure
//   throwOnError: false,
// })

// return { success: true }
